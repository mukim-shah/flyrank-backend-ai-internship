const repository = require("./repositories/postgresRepository");

const getAllTasks = async () => {
    return await repository.getAllTasks();
};

const getTaskById = async (id) => {
    return await repository.getTaskById(id);
};

const createTask = async (title, completed) => {
    return await repository.createTask(title, completed);
};

const updateTask = async (id, title, completed) => {
    return await repository.updateTask(id, title, completed);
};

const deleteTask = async (id) => {
    return await repository.deleteTask(id);
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
};