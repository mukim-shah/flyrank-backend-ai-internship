const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const getAllTasks = async () => {
    const result = await pool.query(
        "SELECT * FROM tasks ORDER BY id"
    );

    return result.rows;
};

const getTaskById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM tasks WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

const createTask = async (title, completed = false) => {
    const result = await pool.query(
        `INSERT INTO tasks (title, completed)
         VALUES ($1, $2)
         RETURNING *`,
        [title, completed]
    );

    return result.rows[0];
};

const updateTask = async (id, title, completed) => {
    const result = await pool.query(
        `UPDATE tasks
         SET title = $1, completed = $2
         WHERE id = $3
         RETURNING *`,
        [title, completed, id]
    );

    return result.rows[0];
};

const deleteTask = async (id) => {
    const result = await pool.query(
        "DELETE FROM tasks WHERE id = $1 RETURNING *",
        [id]
    );

    return result.rows[0];
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};