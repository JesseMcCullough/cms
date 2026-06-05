import { DatabaseSync } from "node:sqlite";

const database = new DatabaseSync("cms.db");

database.exec(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS pages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE
    );
    
    CREATE TABLE IF NOT EXISTS sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    fields TEXT NOT NULL,
    component_name TEXT
    );

    CREATE TABLE IF NOT EXISTS page_sections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    page_id INTEGER NOT NULL,
    section_id INTEGER NOT NULL,
    content TEXT NOT NULL,

    FOREIGN KEY (page_id) REFERENCES pages(id),
    FOREIGN KEY (section_id) REFERENCES sections(id)
    );
`);

export default database;
