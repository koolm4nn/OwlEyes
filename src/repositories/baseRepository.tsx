import { getDb } from "@/db/dbSingleton";

/**
 * BAse class for the repository layer responsible for accessing the tables in the database.
 * 
 * Provides basic CRUD operations.
 */
export abstract class BaseRepository{
    protected db;

    /**
     * Set the database for the repositories
     */
    constructor(){
        this.db = getDb();
    }
}