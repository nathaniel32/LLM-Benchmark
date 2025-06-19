PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS t_category (
    c_id INTEGER PRIMARY KEY AUTOINCREMENT,
    c_category TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS t_model (
    c_id INTEGER PRIMARY KEY AUTOINCREMENT,
    c_model TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS t_input (
    c_id INTEGER PRIMARY KEY AUTOINCREMENT,
    c_input TEXT NOT NULL UNIQUE,
    c_rule TEXT,
    c_note TEXT,
    t_category_id INTEGER NOT NULL,
    FOREIGN KEY (t_category_id) REFERENCES t_category(c_id)
);

CREATE TABLE IF NOT EXISTS t_output (
    c_id INTEGER PRIMARY KEY AUTOINCREMENT,
    c_output_think TEXT,
    c_output_final TEXT,
    c_total_duration INTEGER NOT NULL,
    c_load_duration INTEGER NOT NULL,
    c_prompt_eval_count INTEGER NOT NULL,
    c_prompt_eval_duration INTEGER NOT NULL,
    c_eval_count INTEGER NOT NULL,
    c_eval_duration INTEGER NOT NULL,
    c_score DECIMAL NOT NULL,
    c_note TEXT,
    t_input_id INTEGER NOT NULL,
    t_model_id INTEGER NOT NULL,
    FOREIGN KEY (t_input_id) REFERENCES t_input(c_id),
    FOREIGN KEY (t_model_id) REFERENCES t_model(c_id)
);