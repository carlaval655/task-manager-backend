# Backend - Task Manager API

Este es el backend de la aplicación **Task Manager**. Proporciona una API REST con autenticación JWT para la gestión de usuarios y tareas.

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- PostgreSQL (con Sequelize o pg)
- JWT (Json Web Token)
- Bcrypt para hash de contraseñas
- Dotenv
- CORS
- Render para despliegue

## 📦 Instalación

Clona este repositorio e instala las dependencias:

```bash
git clone https://github.com/tu-usuario/task-manager-backend.git
cd task-manager-backend
npm install
```

## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz del proyecto y configura lo siguiente:

```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/tasks
JWT_SECRET=supersecretkey
```

## 🧪 Scripts disponibles

```bash
npm run dev    # Inicia el servidor con nodemon
npm start      # Inicia el servidor en producción
```

## 📁 Estructura del proyecto

```
src/
├── controllers/
│   ├── authController.js
│   └── taskController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   └── Task.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── taskRoutes.js
├── app.js
└── server.js
```

## 📡 Endpoints de la API

### 🔐 Autenticación

| Método | Ruta        | Descripción         |
|--------|-------------|---------------------|
| POST   | /api/auth/register | Registro de usuario |
| POST   | /api/auth/login    | Login y entrega de token JWT |

### 📋 Tareas (protegidas con JWT)

| Método | Ruta              | Descripción              |
|--------|-------------------|--------------------------|
| GET    | /api/tasks        | Obtener todas las tareas |
| POST   | /api/tasks        | Crear una nueva tarea    |
| GET    | /api/tasks/:id    | Obtener una tarea        |
| PUT    | /api/tasks/:id    | Actualizar una tarea     |
| DELETE | /api/tasks/:id    | Eliminar una tarea       |

> Todas las rutas de tareas requieren autenticación con token JWT en el header: `Authorization: Bearer <token>`

## 🌐 Despliegue

La API está desplegada en [Render](https://render.com/), accede aquí:

🔗 https://task-manager-api.onrender.com