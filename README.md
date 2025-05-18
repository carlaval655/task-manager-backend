# Task Manager API

Este es el backend para la aplicación **Task Manager**, que permite gestionar tareas y usuarios a través de una API REST. La autenticación se realiza mediante JWT, y los passwords se hashean usando bcrypt. La aplicación utiliza PostgreSQL como base de datos y está desplegada en Render.

## 🚀 Tecnologías utilizadas

- **Node.js** y **Express.js** para el servidor.
- **PostgreSQL** como base de datos.
- **JWT** (JSON Web Token) para la autenticación de usuarios.
- **Bcrypt** para el hash de contraseñas.
- **Dotenv** para la gestión de variables de entorno.
- **CORS** para permitir conexiones desde el frontend.
- **Sequelize** (o el paquete `pg`) para la conexión y gestión de la base de datos.
- Despliegue en [Render](https://render.com/).

## 📦 Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/carlaval655/task-manager-backend.git
   cd task-manager-backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```
3. Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:

   ```env
    PORT=5000
    DB_HOST=localhost
    DB_USER=tu_usuario
    DB_PASSWORD=tu_contraseña
    DB_NAME=task_manager
    JWT_SECRET=tu_secreto
    ```

## 🧪 Scripts disponibles

- **npm run dev** – Inicia el servidor en modo desarrollo con nodemon (si lo tienes configurado).
- **npm start** – Inicia el servidor en modo producción.

```bash
npm run dev
# o
npm start
```

## 📁 Estructura del proyecto

La estructura del backend es la siguiente:

```
src/
├── controllers/
│   ├── authController.js     # Controla el registro y login de usuarios
│   └── taskController.js     # Controla el CRUD de tareas
├── middleware/
│   └── authMiddleware.js     # Middleware para proteger las rutas (validación del JWT)
├── models/
│   ├── User.js               # Modelo de usuario (con hash de contraseña)
│   └── Task.js               # Modelo de tarea
├── routes/
│   ├── authRoutes.js         # Rutas para la autenticación (registro / login)
│   └── taskRoutes.js         # Rutas para el manejo de tareas (protegidas)
├── utils/                    # Funciones auxiliares, si las hubiera
├── app.js                    # Configuración general de Express, middlewares, etc.
└── server.js                 # Arranque del servidor
```

## 📡 Endpoints de la API

### Autenticación

| Método | Ruta                   | Descripción                                      |
|--------|------------------------|--------------------------------------------------|
| POST   | `/api/auth/register`   | Registro de usuarios                             |
| POST   | `/api/auth/login`      | Login y obtención del token JWT                  |

> Al iniciar sesión, se devuelve un token JWT que deberás enviar en las cabeceras de las siguientes peticiones protegidas en el formato:  
> `Authorization: Bearer <token>`

### Tareas (rutas protegidas)

| Método | Ruta                 | Descripción                                  |
|--------|----------------------|----------------------------------------------|
| GET    | `/api/tasks`         | Obtener todas las tareas (opcional, con filtros: status, search, from, to) |
| POST   | `/api/tasks`         | Crear una nueva tarea                        |
| GET    | `/api/tasks/:id`     | Obtener una tarea en particular              |
| PUT    | `/api/tasks/:id`     | Actualizar una tarea                         |
| DELETE | `/api/tasks/:id`     | Eliminar una tarea                           |

> **Nota:** Todas las rutas de tareas requieren el token JWT en el header.

## 🔐 Autenticación y seguridad

- **JWT:** Al iniciar sesión, se genera un token JWT con la información del usuario.
- **Bcrypt:** Las contraseñas se guardan en la base de datos después de ser hasheadas usando bcrypt.
- **Middleware:** Se utiliza un middleware en `authMiddleware.js` para validar el token en cada petición protegida.

## 🌐 Despliegue

El backend está desplegado en [Render](https://render.com/). La URL de la API es:  

🔗 [https://task-manager-backend-5fqy.onrender.com](https://task-manager-backend-5fqy.onrender.com)
