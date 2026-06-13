# API Python (FastAPI) + PostgreSQL

API REST de usuarios con FastAPI y PostgreSQL. Versión sin JWT (adaptada desde Node.js/Express).

## Instalación

```bash
pip install -r requirements.txt
```

## Configurar base de datos PostgreSQL

1. Conectarse a PostgreSQL como superusuario:
```bash
psql -U postgres
```

2. Crear usuario y base de datos:
```sql
CREATE USER api_user WITH PASSWORD 'Api123456*';
CREATE DATABASE api_usuarios OWNER api_user;
GRANT ALL PRIVILEGES ON DATABASE api_usuarios TO api_user;
```

3. Conectarse a la BD y crear la tabla:
```bash
psql -U api_user -d api_usuarios
```
```sql
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. Editar `.env` con tus credenciales si son diferentes.

## Ejecutar

```bash
fastapi dev app/main.py
```

O en producción:

```bash
fastapi run app/main.py
```

La API quedará en `http://localhost:8000` y la documentación interactiva en `http://localhost:8000/docs`.

## Endpoints

| Ruta                 | Método | Acción           |
|----------------------|--------|------------------|
| /api/users/register  | POST   | Crear usuario    |
| /api/users/login     | POST   | Login            |
| /api/users           | GET    | Listar usuarios  |
| /api/users/:id       | DELETE | Eliminar usuario |

## Estructura del proyecto

```
app/
├── main.py                 # App FastAPI, middlewares, rutas
├── config/
│   └── database.py         # Pool de conexión (asyncpg)
├── controllers/
│   └── userController.py   # Lógica de endpoints
├── routes/
│   └── userRoutes.py        # Definición de rutas
├── schemas/
│   └── user.py             # Modelos Pydantic (validación)
└── utils/
    └── response.py         # Formato de respuesta estándar
```

## Diferencias vs Node.js/Express

| Node/Express      | Python/FastAPI         |
|--------------------|------------------------|
| express            | fastapi[standard]      |
| pg (Pool)          | asyncpg (Pool)         |
| bcrypt (npm)       | bcrypt (pip)           |
| dotenv             | python-dotenv          |
| req.body (manual)  | Pydantic Schemas       |
| app.listen()       | fastapi dev/run        |
| pool.query()       | pool.fetch/fetchrow/execute |
| $1, $2, $3...      | $1, $2, $3... (igual)  |
