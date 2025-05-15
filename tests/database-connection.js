// testConnection.js
const sequelize = require('../config/db');

sequelize.authenticate()
  .then(() => console.log('Conexión exitosa ✅'))
  .catch(err => console.error('Error de conexión ❌:', err));