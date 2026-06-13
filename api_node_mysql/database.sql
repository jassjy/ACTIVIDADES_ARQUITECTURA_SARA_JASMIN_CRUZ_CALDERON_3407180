-- Crear base de datos
CREATE DATABASE IF NOT EXISTS api_usuarios;

-- Usar base de datos
USE api_usuarios;

-- Crear tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    edad INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar algunos usuarios de ejemplo
INSERT INTO usuarios (nombre, correo, password, edad) VALUES
('Juan Pérez', 'juan@example.com', '$2b$10$ejemploHashParaPruebas1234567890', 30),
('María García', 'maria@example.com', '$2b$10$ejemploHashParaPruebas1234567890', 25),
('Carlos López', 'carlos@example.com', '$2b$10$ejemploHashParaPruebas1234567890', 35);

-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar productos de ejemplo
INSERT INTO productos (nombre, precio, stock) VALUES
('Laptop', 999.99, 10),
('Mouse', 19.99, 50),
('Teclado', 49.99, 30);

-- Verificar datos
SELECT * FROM usuarios;
SELECT * FROM productos;