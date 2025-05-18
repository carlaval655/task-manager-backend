const { Task } = require('../models');
const { Op } = require('sequelize');

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    if (!title) return res.status(400).json({ message: 'El título es obligatorio' });

    const newTask = await Task.create({
      title,
      description,
      status: status || 'pendiente',
      dueDate,
      userId: req.user.id
    });

    res.status(201).json({ message: 'Tarea creada exitosamente', task: newTask });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear tarea', error });
  }
};

exports.getTasks = async (req, res) => {
  const { status, search, from, to } = req.query;
  const where = { userId: req.user.id };

  if (status) where.status = status;
  if (search) {
    where[Op.or] = [
      { title: { [Op.iLike]: `%${search}%` } },
      { description: { [Op.iLike]: `%${search}%` } },
    ];
  }

  if (from && to) {
    where.dueDate = {
      [Op.between]: [new Date(from), new Date(to)]
    };
  }

  try {
    const tasks = await Task.findAll({ where });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas' });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la tarea' });
  }
};

exports.updateTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    // Reglas de transición de estado
    if (task.status === 'completada') {
      return res.status(400).json({ message: 'No se puede modificar una tarea completada' });
    }

    if (status) {
      if (status === 'en progreso' && task.status !== 'pendiente') {
        return res.status(400).json({ message: 'Solo puedes pasar a "en progreso" desde "pendiente"' });
      }
      if (status === 'pendiente') {
        return res.status(400).json({ message: 'No puedes volver a "pendiente"' });
      }
      if (status === 'completada' && task.status !== 'en progreso') {
        return res.status(400).json({ message: 'Solo puedes completar tareas en progreso' });
      }
    }

    await task.update({ title, description, status, dueDate });
    res.json({ message: 'Tarea actualizada', task });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la tarea' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    if (task.status !== 'completada') {
      return res.status(400).json({ message: 'Solo puedes eliminar tareas completadas' });
    }

    await task.destroy();
    res.json({ message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea' });
  }
};