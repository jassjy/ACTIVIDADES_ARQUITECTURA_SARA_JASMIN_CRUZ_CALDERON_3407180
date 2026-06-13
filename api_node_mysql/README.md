================================================================================
                    API NODE.JS + MYSQL - DOCUMENTACIÓN COMPLETA
================================================================================

ÍNDICE
1. DESCRIPCIÓN GENERAL
2. ESTRUCTURA DEL PROYECTO
3. TECNOLOGÍAS UTILIZADAS
4. ARCHIVOS CREADOS Y SU FUNCIÓN
5. ENDPOINTS DE LA API
6. EJEMPLOS DE USO
7. INSTRUCCIONES DE INSTALACIÓN
8. CARACTERÍSTICAS DE SEGURIDAD
9. RESPUESTAS DE LA API

================================================================================
1. DESCRIPCIÓN GENERAL
================================================================================

He creado una API RESTful completa usando Node.js y MySQL. Esta API permite 
gestionar usuarios y productos con operaciones CRUD (Crear, Leer, Actualizar, 
Eliminar). Incluye un sistema de login básico con encriptación de contraseñas.

La API sigue una arquitectura en capas (MVC - Modelo Vista Controlador) para 
mantener el código organizado, modular y fácil de mantener.

================================================================================
2. ESTRUCTURA DEL PROYECTO
================================================================================

API_NODE_MYSQL/
│
├── src/                          # Carpeta principal del código fuente
│   ├── .env                      # Variables de entorno (configuración)
│   ├── app.js                    # Punto de entrada de la aplicación
│   ├── db.js                     # Configuración de conexión a MySQL
│   │
│   ├── controllers/              # CAPA DE CONTROLADORES
│   │   ├── userController.js     # Lógica de negocio para usuarios
│   │   └── productController.js  # Lógica de negocio para productos
│   │
│   └── routes/                   # CAPA DE RUTAS
│       ├── userRoutes.js         # Definición de rutas para usuarios
│       └── productRoutes.js      # Definición de rutas para productos
│
├── COMANDOS.md                   # Comandos útiles del proyecto
├── database.sql                  # Script para crear la base de datos
├── package.json                  # Dependencias y scripts del proyecto
├── package-lock.json             # Versiones exactas de dependencias
└── README.txt                    # Este archivo de documentación

================================================================================
3. TECNOLOGÍAS UTILIZADAS
================================================================================

Tecnología         | Versión | Función
-------------------|---------|----------------------------------------
Node.js           | v14+    | Entorno de ejecución JavaScript
Express           | v4.18.2 | Framework para crear la API REST
MySQL             | v5.7+   | Base de datos relacional
mysql2            | v3.6.0  | Conector Node.js -> MySQL (con promesas)
bcrypt            | v5.1.0  | Encriptación de contraseñas
dotenv            | v16.3.1 | Gestión de variables de entorno
cors              | v2.8.5  | Permitir peticiones desde otros dominios
nodemon           | v3.0.1  | Reinicio automático del servidor (desarrollo)

================================================================================
4. ARCHIVOS CREADOS Y SU FUNCIÓN
================================================================================

4.1 package.json
--------------------
Propósito: Define el proyecto, sus dependencias y scripts.
Contenido:
- name: "api-node-mysql"
- scripts: "start" (producción) y "dev" (desarrollo con nodemon)
- dependencias: express, mysql2, dotenv, bcrypt, cors
- devDependencias: nodemon

4.2 src/.env
--------------------
Propósito: Almacena configuraciones sensibles fuera del código.
Variables:
- DB_HOST: Dirección del servidor MySQL (localhost)
- DB_PORT: Puerto de MySQL (3306)
- DB_USER: Usuario de la base de datos
- DB_PASSWORD: Contraseña del usuario
- DB_NAME: Nombre de la base de datos (api_usuarios)
- PORT: Puerto donde corre la API (3000)

4.3 database.sql
--------------------
Propósito: Script SQL para crear la estructura de la base de datos.
Contenido:
- CREATE DATABASE api_usuarios
- CREATE TABLE usuarios (id, nombre, correo, password, edad, created_at)
- CREATE TABLE productos (id, nombre, precio, stock, created_at)
- INSERT de datos de ejemplo

4.4 src/db.js
--------------------
Propósito: Configurar y exportar la conexión a MySQL.
Qué hace:
- Importa mysql2/promise (versión con promesas)
- Lee variables de entorno con dotenv
- Crea un pool de conexiones (conexiones reutilizables)
- Exporta el pool para usarlo en los controladores

4.5 src/app.js
--------------------
Propósito: Punto de entrada principal de la API.
Qué hace:
- Importa express, cors, dotenv
- Configura middlewares (cors, json, urlencoded)
- Define las rutas base (/api/usuarios, /api/productos)
- Define ruta de bienvenida (/)
- Manejador de errores 404
- Inicia el servidor en el puerto especificado

4.6 src/controllers/userController.js
--------------------
Propósito: Lógica de negocio para usuarios (el corazón de la API).
Funciones implementadas:

getUsuarios(): 
- Obtiene todos los usuarios de la BD
- Excluye el campo password por seguridad
- Retorna respuesta JSON unificada

getUsuarioById(id):
- Busca un usuario por su ID
- Retorna 404 si no existe

createUsuario(nombre, correo, password, edad):
- Valida campos requeridos
- Verifica que el correo no exista (evita duplicados)
- Encripta la contraseña con bcrypt (10 rondas)
- Inserta el usuario en la BD
- Retorna 201 (creado) con los datos del nuevo usuario

loginUsuario(correo, password):
- Valida credenciales
- Busca usuario por correo
- Compara contraseña hasheada con bcrypt.compare()
- Retorna datos del usuario (sin password) si es exitoso
- Retorna 401 si las credenciales son incorrectas

updateUsuario(id, datos):
- Actualiza nombre, correo, edad y opcionalmente password
- Si se envía password, lo encripta nuevamente
- Retorna 404 si el usuario no existe

deleteUsuario(id):
- Elimina un usuario por ID
- Retorna 404 si el usuario no existe

4.7 src/routes/userRoutes.js
--------------------
Propósito: Definir las rutas HTTP y conectarlas con los controladores.
Rutas definidas:
- GET    /api/usuarios          -> getUsuarios
- GET    /api/usuarios/:id      -> getUsuarioById
- POST   /api/usuarios          -> createUsuario
- POST   /api/usuarios/login    -> loginUsuario
- PUT    /api/usuarios/:id      -> updateUsuario
- DELETE /api/usuarios/:id      -> deleteUsuario

4.8 src/controllers/productController.js
--------------------
Propósito: Lógica de negocio para productos.
Funciones:
- getProductos(): Lista todos los productos
- getProductoById(id): Obtiene un producto específico
- createProducto(nombre, precio, stock): Crea nuevo producto
- updateProducto(id, datos): Actualiza producto existente
- deleteProducto(id): Elimina un producto

4.9 src/routes/productRoutes.js
--------------------
Propósito: Definir rutas para productos.
Rutas:
- GET    /api/productos         -> getProductos
- GET    /api/productos/:id     -> getProductoById
- POST   /api/productos         -> createProducto
- PUT    /api/productos/:id     -> updateProducto
- DELETE /api/productos/:id     -> deleteProducto

4.10 COMANDOS.md
--------------------
Propósito: Guía rápida de comandos.
Contenido:
- Comandos de instalación (npm install)
- Configuración de BD
- Comandos para ejecutar (npm run dev, npm start)
- Ejemplos de peticiones con cURL

================================================================================
5. ENDPOINTS DE LA API
================================================================================

MÓDULO DE USUARIOS (base: http://localhost:3000/api/usuarios)

Método   | Endpoint              | Descripción
---------|-----------------------|------------------------------------
GET      | /                     | Obtener todos los usuarios
GET      | /:id                  | Obtener usuario por ID
POST     | /                     | Registrar nuevo usuario
POST     | /login                | Iniciar sesión
PUT      | /:id                  | Actualizar usuario
DELETE   | /:id                  | Eliminar usuario

MÓDULO DE PRODUCTOS (base: http://localhost:3000/api/productos)

Método   | Endpoint              | Descripción
---------|-----------------------|------------------------------------
GET      | /                     | Obtener todos los productos
GET      | /:id                  | Obtener producto por ID
POST     | /                     | Crear nuevo producto
PUT      | /:id                  | Actualizar producto
DELETE   | /:id                  | Eliminar producto

================================================================================
6. EJEMPLOS DE USO
================================================================================

6.1 REGISTRAR USUARIO (POST /api/usuarios)

Petición:
------------------------------------------------
POST http://localhost:3000/api/usuarios
Content-Type: application/json

{
    "nombre": "Carlos Pérez",
    "correo": "carlos@email.com",
    "password": "miPassword123",
    "edad": 30
}

Respuesta Exitosa (201 Created):
------------------------------------------------
{
    "success": true,
    "message": "Usuario registrado correctamente",
    "data": {
        "id": 1,
        "nombre": "Carlos Pérez",
        "correo": "carlos@email.com",
        "edad": 30
    },
    "error": null
}

Respuesta Error (400):
------------------------------------------------
{
    "success": false,
    "message": "El correo ya está registrado",
    "data": null,
    "error": "DUPLICATE_EMAIL"
}

6.2 LOGIN (POST /api/usuarios/login)

Petición:
------------------------------------------------
POST http://localhost:3000/api/usuarios/login
Content-Type: application/json

{
    "correo": "carlos@email.com",
    "password": "miPassword123"
}

Respuesta Exitosa (200):
------------------------------------------------
{
    "success": true,
    "message": "Login exitoso",
    "data": {
        "id": 1,
        "nombre": "Carlos Pérez",
        "correo": "carlos@email.com",
        "edad": 30
    },
    "error": null
}

6.3 LISTAR USUARIOS (GET /api/usuarios)

Petición:
------------------------------------------------
GET http://localhost:3000/api/usuarios

Respuesta:
------------------------------------------------
{
    "success": true,
    "message": "Usuarios obtenidos correctamente",
    "data": [
        {
            "id": 1,
            "nombre": "Carlos Pérez",
            "correo": "carlos@email.com",
            "edad": 30,
            "created_at": "2024-01-15T10:30:00.000Z"
        }
    ],
    "error": null
}

6.4 CREAR PRODUCTO (POST /api/productos)

Petición:
------------------------------------------------
POST http://localhost:3000/api/productos
Content-Type: application/json

{
    "nombre": "Laptop Gamer",
    "precio": 1299.99,
    "stock": 25
}

Respuesta:
------------------------------------------------
{
    "success": true,
    "message": "Producto creado correctamente",
    "data": {
        "id": 1,
        "nombre": "Laptop Gamer",
        "precio": 1299.99,
        "stock": 25
    },
    "error": null
}

================================================================================
7. INSTRUCCIONES DE INSTALACIÓN
================================================================================

PASO 1: Instalar Node.js
------------------------------------------------
Descargar e instalar Node.js desde https://nodejs.org/ (versión LTS recomendada)

PASO 2: Instalar MySQL
------------------------------------------------
Descargar e instalar MySQL desde https://dev.mysql.com/downloads/
O usar XAMPP/WAMP/MAMP que incluyen MySQL

PASO 3: Crear el proyecto
------------------------------------------------
mkdir API_NODE_MYSQL
cd API_NODE_MYSQL
npm init -y

PASO 4: Instalar dependencias
------------------------------------------------
npm install express mysql2 dotenv bcrypt cors
npm install -D nodemon

PASO 5: Copiar todos los archivos del proyecto
------------------------------------------------
Crear cada archivo con el contenido proporcionado en este documento
Mantener exactamente la estructura de carpetas mostrada

PASO 6: Configurar variables de entorno
------------------------------------------------
Editar el archivo src/.env con tus credenciales de MySQL:
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña

PASO 7: Crear la base de datos
------------------------------------------------
Abrir MySQL y ejecutar:
mysql -u root -p
source database.sql
(O copiar y pegar el contenido de database.sql)

PASO 8: Ejecutar la API
------------------------------------------------
Modo desarrollo (con auto-reinicio):
npm run dev

Modo producción:
npm start

PASO 9: Probar la API
------------------------------------------------
Abrir navegador: http://localhost:3000
Usar Postman, Insomnia o cURL para probar endpoints

================================================================================
8. CARACTERÍSTICAS DE SEGURIDAD
================================================================================

8.1 SQL PARAMETRIZADO (PREPARED STATEMENTS)
------------------------------------------------
Todas las consultas SQL usan valores parametrizados con (?).
Ejemplo:
await pool.query('SELECT * FROM usuarios WHERE id = ?', [id])

Esto PREVIENE INYECCIÓN SQL (no se pueden inyectar comandos maliciosos).

8.2 ENCRIPTACIÓN DE CONTRASEÑAS (BCRYPT)
------------------------------------------------
- Las contraseñas NUNCA se guardan en texto plano
- Se usa bcrypt.hash(password, 10) para encriptar (10 rondas = seguro)
- El hash resultante es único e irreversible
- bcrypt.compare() compara contraseña ingresada con hash guardado

Ejemplo de hash generado:
"123456" -> "$2b$10$abcdefghijklmnopqrstuvwxyz1234567890"

8.3 VARIABLES DE ENTORNO
------------------------------------------------
- Datos sensibles (contraseñas, usuarios) no están en el código
- Archivo .env está en .gitignore (no se sube a repositorios)
- process.env accede a las variables

8.4 VALIDACIÓN DE DATOS DE ENTRADA
------------------------------------------------
- Se verifica que campos requeridos no estén vacíos
- Se valida que el correo no exista antes de registrar
- Se usa status codes HTTP apropiados (200, 201, 400, 401, 404, 500)

8.5 CORS HABILITADO
------------------------------------------------
- Permite peticiones desde otros dominios (útil para frontend separado)
- En producción se puede restringir a dominios específicos

================================================================================
9. RESPUESTAS DE LA API
================================================================================

Todas las respuestas siguen un formato UNIFICADO para facilitar el consumo.

9.1 ESTRUCTURA DE RESPUESTA
------------------------------------------------
{
    "success": boolean,      // true = éxito, false = error
    "message": string,       // Mensaje descriptivo
    "data": object | array,  // Datos de respuesta (null si error)
    "error": string | null   // Código de error (null si éxito)
}

9.2 CÓDIGOS DE ERROR POSIBLES
------------------------------------------------
Código                    | Significado
--------------------------|------------------------------------
MISSING_FIELDS            | Faltan campos requeridos
DUPLICATE_EMAIL           | El correo ya está registrado
USER_NOT_FOUND            | Usuario no encontrado
PRODUCT_NOT_FOUND         | Producto no encontrado
INVALID_CREDENTIALS       | Credenciales incorrectas
ROUTE_NOT_FOUND           | Ruta no existe

9.3 CÓDIGOS DE ESTADO HTTP UTILIZADOS
------------------------------------------------
200 - OK: Petición exitosa (GET, PUT, DELETE)
201 - Created: Recurso creado exitosamente (POST registro)
400 - Bad Request: Error en los datos enviados
401 - Unauthorized: Credenciales incorrectas
404 - Not Found: Recurso no encontrado
500 - Internal Server Error: Error en el servidor

================================================================================
10. POSIBLES MEJORAS FUTURAS (OPCIONALES)
================================================================================

- Agregar autenticación con JWT (JSON Web Tokens)
- Implementar refresh tokens
- Agregar validaciones más estrictas (email válido, edad positiva, etc.)
- Añadir paginación en listados (limit y offset)
- Implementar logging con Winston o Morgan
- Agregar pruebas unitarias con Jest
- Documentación automática con Swagger
- Rate limiting para prevenir ataques de fuerza bruta
- Validación de datos con express-validator

================================================================================
11. SOLUCIÓN DE PROBLEMAS COMUNES
================================================================================

ERROR: "Cannot find module 'express'"
Solución: Ejecutar npm install

ERROR: "Access denied for user"
Solución: Verificar credenciales en archivo .env

ERROR: "Unknown database 'api_usuarios'"
Solución: Ejecutar database.sql para crear la BD

ERROR: "Port 3000 already in use"
Solución: Cambiar PORT en .env o matar proceso en ese puerto

ERROR: "Connection refused"
Solución: Verificar que MySQL esté corriendo

================================================================================
12. CONCLUSIÓN
================================================================================

Este proyecto demuestra la implementación completa de una API REST profesional
con Node.js y MySQL, siguiendo las mejores prácticas de desarrollo:

✓ Arquitectura en capas (MVC)
✓ Código modular y organizado
✓ Seguridad en consultas SQL (parametrizadas)
✓ Encriptación de contraseñas con bcrypt
✓ Manejo adecuado de errores
✓ Respuestas JSON unificadas
✓ Variables de entorno para configuración

La API está lista para ser consumida por cualquier frontend (React, Angular, 
Vue, móvil) y puede ser fácilmente extendida para agregar más funcionalidades.

