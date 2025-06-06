const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ where: { email } });
    if (exists) return res.status(400).json({ message: 'El email ya está registrado' });

    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hash });

    res.json({ message: 'Usuario creado', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error al registrar' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.json({ message: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ message: 'Error en login' });
  }
};

exports.me = async (req, res) => {
  const user = await User.findByPk(req.user.id);
  res.json(user);
};