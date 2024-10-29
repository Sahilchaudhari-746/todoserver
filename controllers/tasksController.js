const pool = require('../config/db');

// CREATE: Add a new task
const createTask = async (req, res) => {
    const { task } = req.body;
    try {
        const newTask = await pool.query('INSERT INTO Tasks (task) VALUES ($1) RETURNING *', [task]);
        res.json(newTask.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
};

const getAllTasks = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM tasks ORDER BY created_at DESC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// READ: Get all tasks
const getTasks = async (req, res) => {
    try {
        const allTasks = await pool.query('SELECT * FROM Tasks');
        res.json(allTasks.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
};

// UPDATE: Update a task
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { task, status } = req.body;
    try {
        const updatedTask = await pool.query(
            'UPDATE Tasks SET task = $1, status = $2 WHERE id = $3 RETURNING *',
            [task, status, id]
        );
        if (updatedTask.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updatedTask.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
};

// DELETE: Delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await pool.query('DELETE FROM Tasks WHERE id = $1 RETURNING *', [id]);
        if (deletedTask.rows.length === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getAllTasks,
};
