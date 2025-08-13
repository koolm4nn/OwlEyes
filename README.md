# README

'OwlEyes' is a personal finance tracker that manages bank accounts, records balances, and helps monitoring financial data.
It provides a simple web interface for adding accounts, tracking balances, and reviewing your data — with all sensitive information encrypted on disk for maximum privacy. 

### Testing status badge
[![Run Tests](https://github.com/koolm4nn/OwlEyes/actions/workflows/run_tests.yml/badge.svg?branch=main)](https://github.com/koolm4nn/OwlEyes/actions/workflows/run_tests.yml)

### Database
SQLite used for persistent data storage.

AES-256-GCM encryption ensures database security on disk.

At runtime:
- Encrypted database is decrypted and loaded into an in-memory SQLite instance.
- On shutdown or error, the in-memory DB is saved and re-encrypted before writing to disk.

better-sqlite3 is used as the SQLite driver/wrapper.


### Architecture / Layers
- Repository – Direct database access (queries, inserts, updates, ..).
- Service – Business logic built on top of repositories.
- API Client – Handles fetch requests, separates data fetching from React hooks.
- Hooks – React hooks for accessing data and triggering mutations from components.


### Input Validation
- Zod (type, required fields, min/max length, ..)
- validate.js (sanitizing)


## Roadmap
- Database Fragmentation (vacuum)