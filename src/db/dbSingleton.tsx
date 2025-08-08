import { loadEncryptedDatabase } from "@/db/loadDb";
import Database from "better-sqlite3";
import path from 'path';

let dbInstance: Database.Database | null = null;
const encryptedPath = path.join(process.cwd(), "db.sqlite");

export function getDb(): Database.Database {
    console.log("CWD: ");
    console.log(process.cwd());
    if(!dbInstance){
        dbInstance = loadEncryptedDatabase(encryptedPath);
    };

    return dbInstance;
}