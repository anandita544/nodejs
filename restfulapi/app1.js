const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Middleware to parse JSON request body
app.use(bodyParser.json());

const TASKS_FILE_PATH = './tasks.json';

// Check if the tasks file exists, if not, create an empty file
if (!fs.existsSync(TASKS_FILE_PATH)) {
    fs.writeFileSync(TASKS_FILE_PATH, '[]');
}

// Function to read tasks from the file
function readTasksFromFile() {
    const tasksData = fs.readFileSync(TASKS_FILE_PATH);
    return JSON.parse(tasksData);
}

// Function to write tasks to the file
function writeTasksToFile(tasks) {
    fs.writeFileSync(TASKS_FILE_PATH, JSON.stringify(tasks, null, 2));
}

// Routes
// GET all tasks
app.get('/tasks', (req, res) => {
    const tasks = readTasksFromFile();
    res.json(tasks);
});

// GET a specific task by ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const tasks = readTasksFromFile();
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// POST create a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    const tasks = readTasksFromFile();
    const taskId = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
    const newTask = { id: taskId, title, description, completed: false };
    tasks.push(newTask);
    writeTasksToFile(tasks);
    res.status(201).json(newTask);
});

// PUT update an existing task
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description, completed } = req.body;
    const tasks = readTasksFromFile();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { id: taskId, title, description, completed };
        writeTasksToFile(tasks);
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// PATCH update only the completed status of a task
app.patch('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { completed } = req.body;
    const tasks = readTasksFromFile();
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].completed = completed;
        writeTasksToFile(tasks);
        res.json(tasks[taskIndex]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// DELETE a task by ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    let tasks = readTasksFromFile();
    tasks = tasks.filter(task => task.id !== taskId);
    writeTasksToFile(tasks);
    res.json({ message: 'Task deleted successfully' });
});

// Start the server

app.listen(4000, () => {
    console.log(`Server is running on port 4000`);
});
