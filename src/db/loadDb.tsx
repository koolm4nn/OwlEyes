import fs from "fs";
import os from "os";
import path from "path";
import crypto from "crypto";
import Database from "better-sqlite3";
import { getDb } from "./dbSingleton";

const algorithm = "aes-256-gcm";
const password = "your-secure-password";

const pathToDbSchema = "src/db/schema.sql";

// Encrypt file
function encryptFile(inputPath: string, outputPath: string) {
  // If the file already exists, reuse salt + iv from it
  let salt: Buffer;
  let iv: Buffer;

  if (fs.existsSync(outputPath)) {
    const fileData = fs.readFileSync(outputPath);
    salt = fileData.slice(0, 16);
    iv = fileData.slice(16, 28);
  } else {
    salt = crypto.randomBytes(16);
    iv = crypto.randomBytes(12);
  }

  const key = crypto.scryptSync(password, salt, 32);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const inputData = fs.readFileSync(inputPath);
  const encrypted = Buffer.concat([cipher.update(inputData), cipher.final()]);
  const authTag = cipher.getAuthTag();

  const finalData = Buffer.concat([salt, iv, authTag, encrypted]);
  fs.writeFileSync(outputPath, finalData);
}

// Decrypt file
function decryptFile(inputPath: string): Buffer {
  const fileData = fs.readFileSync(inputPath);
  const salt = fileData.slice(0, 16);
  const iv = fileData.slice(16, 28);
  const authTag = fileData.slice(28, 44);
  const encrypted = fileData.slice(44);

  const key = crypto.scryptSync(password, salt, 32);
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  decipher.setAuthTag(authTag);

  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
}


let cleanupRegistered = false;

// Init encrypted DB into memory
export function loadEncryptedDatabase(encryptedPath: string): Database.Database {
  // Load schema of database
  if(!fs.existsSync(pathToDbSchema)){
    throw new Error("Schema for database could not be found: " + pathToDbSchema);
  }
  const schema = fs.readFileSync(pathToDbSchema, "utf-8");

  console.log("Looking for db at: " + encryptedPath);

  if (!fs.existsSync(encryptedPath)) {
    console.log("No DB found. Creating a new encrypted database...");
    const emptyDbPath = path.join(os.tmpdir(), "init.db");
    const newDb = new Database(emptyDbPath);

    // Optionally, create initial tables here
    newDb.exec(schema);
    newDb.close();
    encryptFile(emptyDbPath, encryptedPath);
    fs.unlinkSync(emptyDbPath);
  } else {
    console.log("DB found in directory.");
  }
  const decryptedBuffer = decryptFile(encryptedPath);

  // Write to in-memory file
  const db = new Database(':memory:');
  const tempDiskPath = path.join(os.tmpdir(), `myapp-tmp-${Date.now()}.db`);

  // Save decrypted buffer to temp file (momentarily)
  fs.writeFileSync(tempDiskPath, decryptedBuffer);
  const tempDiskDb = new Database(tempDiskPath);
  tempDiskDb.pragma("foreign_keys = ON");

  try{
    // Copy schema to db
    db.exec(schema);

    // Dump all into in-memory DB
    const tables = tempDiskDb
    .prepare("SELECT name FROM sqlite_master WHERE type='table'")
    .all() as { name: string }[];

    for (const { name } of tables) {
      const rows: Record<string, unknown>[] = tempDiskDb.prepare(`SELECT * FROM ${name}`).all() as Record<string, unknown>[];

      if (rows.length > 0) {
        const columns = Object.keys(rows[0]).map((c) => `"${c}"`).join(", ");
        const placeholders = Object.keys(rows[0]).map(() => "?").join(", ");
        const insert = db.prepare(`INSERT INTO ${name} (${columns}) VALUES (${placeholders})`);

        const insertMany = db.transaction((rows: Record<string, unknown>[]) => {
          for (const row of rows) {
            insert.run(Object.values(row));
          }
        });

        insertMany(rows);
      }
    }

    tempDiskDb.close();
  } catch(err){
    console.error("Error copying data to memory: ", tempDiskPath, err);
  } finally {
    if(fs.existsSync(tempDiskPath)){
      try{
        // Overwrite database with 0's before deleting (in case deletion fails)
        fs.writeFileSync(tempDiskPath, Buffer.alloc(fs.statSync(tempDiskPath).size, 0));
        fs.unlinkSync(tempDiskPath);
      } catch(err){
        console.warn("Error deleting temp db: ", tempDiskPath, err);
      }
    }
  }

  // Activate write ahead Loggin
  // ACITVATING WAL MODE BLOCKS DB.BACKUP IN CLEANUP METHOD, THUS -> REMOVED
  db.pragma('journal_mode = WAL');

  // Activate foreign key functionality
  db.pragma("foreign_keys = ON");

  // Setup cleanup handler
  const cleanup = async () => {
    console.log("Cleanup called.");

    // Create temporary database
    const tempOutPath = path.join(os.tmpdir(), `myapp-tmp-backup-${Date.now()}.db`);
    const tempDb = new Database(tempOutPath);
    const currentDb = getDb();

    // Write current data to temp. database    
    // Copy schema to db
    tempDb.exec(schema);

    // Dump all into in-memory DB
    const tables = currentDb
    .prepare("SELECT name FROM sqlite_master WHERE type='table'")
    .all() as { name: string }[];

    for (const { name } of tables) {
      const rows: Record<string, unknown>[] = currentDb.prepare(`SELECT * FROM ${name}`).all() as Record<string, unknown>[];

      if (rows.length > 0) {
        const columns = Object.keys(rows[0]).map((c) => `"${c}"`).join(", ");
        const placeholders = Object.keys(rows[0]).map(() => "?").join(", ");
        const insert = tempDb.prepare(`INSERT INTO ${name} (${columns}) VALUES (${placeholders})`);

        const insertMany = tempDb.transaction((rows: Record<string, unknown>[]) => {
          for (const row of rows) {
            insert.run(Object.values(row));
          }
        });

        insertMany(rows);
      }
    }

    // Close the in-memory db
    currentDb.close();
    tempDb.close();

    try{
      // Encrypt and copy data to working directory
      encryptFile(tempOutPath, encryptedPath);

      
      //db.close();
    } catch(err){
      console.error("Error saving DB.");
      console.error(err);
    } finally{
      if(fs.existsSync(tempOutPath)){
        try{
          // Overwrite temp file with 0s, then delete
          fs.writeFileSync(tempOutPath, Buffer.alloc(fs.statSync(tempOutPath).size, 0));
          fs.unlinkSync(tempOutPath);
        } catch(err){
          console.error("Error deleting temp db: ", tempOutPath , err);
        }
      }
    }
  };

  if(!cleanupRegistered){
    process.once("beforeExit", cleanup);
    
    process.once("SIGINT", async () => {
      await cleanup(); 
      process.exit(0); 
    });
    process.once("SIGTERM", async () => {
      await cleanup();
      process.exit(0); 
    });
    
    process.once("uncaughtException", (err) => {
      cleanup();
      process.exit(1);
    });

    cleanupRegistered = true;
  }

  return db;
}