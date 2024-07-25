# PROYECTO8-IKERPARDO

E una aplicación de gestión de usuarios y fotos donde los usuarios pueden subir fotos a su feed.

## Requisitos

- Node.js
- Cuenta en MongoDB Atlas
- Cuenta en Cloudinary

## Configuración

1. Clona este repositorio:
   git clone https://github.com/paaardo/PROYECTO8-IKERPARDO
   cd PROYECTO8-IKERPARDO

2. Cargar semilla:
   node seed.js

3. Ejecuta el proyecto:
   npm start

## Endpoints

GET /api/usuarios - Obtener todos los usuarios.
POST /api/usuarios - Crear un nuevo usuario.
GET /api/usuarios/:id - Obtener un usuario por su ID.
PUT /api/usuarios/:id - Actualizar un usuario por su ID.
DELETE /api/usuarios/:id - Elimina un usuario y las fotos subidas por el mismo

GET /api/fotos - Obtener todas las fotos.
POST /api/fotos - Subir una nueva foto.
GET /api/fotos/:id - Obtener una foto por su ID.
PUT /api/fotos/:id - Actualizar una foto por su ID.
DELETE /api/fotos/:id - Eliminar una foto por su ID.
