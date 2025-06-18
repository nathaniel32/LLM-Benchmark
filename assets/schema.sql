PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS t_category (
    c_id INTEGER PRIMARY KEY AUTOINCREMENT,
    c_category TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS t_input (
    c_id INTEGER PRIMARY KEY AUTOINCREMENT,
    c_input TEXT NOT NULL UNIQUE,
    t_category_id INTEGER NOT NULL,
    FOREIGN KEY (t_category_id) REFERENCES t_category(c_id)
);

CREATE TABLE IF NOT EXISTS t_output (
    c_id INTEGER PRIMARY KEY AUTOINCREMENT,
    c_output TEXT NOT NULL,
    c_total_duration INTEGER NOT NULL,
    c_token INTEGER,
    c_score DECIMAL NOT NULL,
    c_note TEXT,
    c_source TEXT,
    t_input INTEGER NOT NULL,
    FOREIGN KEY (t_input) REFERENCES t_input(c_id)
);