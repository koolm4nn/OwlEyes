# README

For app 'name-to-be-chosen'. 

### Database
Finance data is accessed using a sqlite database. On disk, the database is encypted using AES-256-GCM. When a database is selected, database is decrypted and loaded into in-memory sqlite instance. On shutdown or error, the in-memory database is saved to disk. 
better-sqlite3 is used as a wrapper. 


### Layers
Repository: Responsible for direct db access: Querying tables
Service: Using repositories 
ApiClient: Fetch layer to separate concerns from hooks 
Hooks: Accessed by components


### Input Validation
- Zod (type, required fields, min/max length, ..)
- validate.js (sanitizing)