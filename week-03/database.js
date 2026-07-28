const Database = require("better-sqlite3");

const db = new Database("tasks.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS tasks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0
    );
`);


const taskcount = db.prepare("SELECT COUNT(*) AS count FROM tasks").get();

if (taskcount.count === 0) {
    const insert = db.prepare(`
        INSERT INTO tasks (title,completed)
        VALUES(?,?)
        `);

        insert.run("Learn Express",0);
        insert.run("Learn SQLite",0);
        insert.run("Build REST API",1);

}
module.exports = db;