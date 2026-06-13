-- Crear base de datos (ejecutar conectado a postgres)
CREATE DATABASE api_usuarios;

-- Conectarse a la base de datos y ejecutar lo siguiente:

-- Crear tabla usuarios
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
