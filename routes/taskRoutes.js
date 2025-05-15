const express = require('express');
const router = express.Router();
const { createTask, getTasks, getTask, updateTask, deleteTask } = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');

router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.get('/:id', auth, getTask);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;