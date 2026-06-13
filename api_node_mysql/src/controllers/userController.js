const pool = require('../db');
const bcrypt = require('bcrypt');

// Respuesta unificada
const apiResponse = (success, message, data = null, error = null) => {
    return { success, message, data, error };
};

// Obtener todos los usuarios
const getUsuarios = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, nombre, correo, edad, created_at FROM usuarios ORDER BY id');
        res.json(apiResponse(true, 'Usuarios obtenidos correctamente', rows));
    } catch (error) {
        console.error(error);
        res.status(500).json(apiResponse(false, 'Error al obtener usuarios', null, error.message));
    }
};

// Obtener un usuario por ID
const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT id, nombre, correo, edad, created_at FROM usuarios WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json(apiResponse(false, 'Usuario no encontrado', null, 'USER_NOT_FOUND'));
        }
        res.json(apiResponse(true, 'Usuario obtenido correctamente', rows[0]));
    } catch (error) {
        console.error(error);
        res.status(500).json(apiResponse(false, 'Error al obtener el usuario', null, error.message));
    }
};

// Crear un nuevo usuario (registro)
const createUsuario = async (req, res) => {
    const { nombre, correo, password, edad } = req.body;
    
    // Validar campos requeridos
    if (!nombre || !correo || !password) {
        return res.status(400).json(apiResponse(false, 'Nombre, correo y password son requeridos', null, 'MISSING_FIELDS'));
    }
    
    try {
        // Verificar si el correo ya existe
        const [existing] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        if (existing.length > 0) {
            return res.status(400).json(apiResponse(false, 'El correo ya está registrado', null, 'DUPLICATE_EMAIL'));
        }
        
        // Encriptar password
        const passwordHash = await bcrypt.hash(password, 10);
        
        // Insertar usuario
        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, correo, password, edad) VALUES (?, ?, ?, ?)',
            [nombre, correo, passwordHash, edad || null]
        );
        
        res.status(201).json(apiResponse(true, 'Usuario registrado correctamente', {
            id: result.insertId,
            nombre,
            correo,
            edad
        }));
    } catch (error) {
        console.error(error);
        res.status(500).json(apiResponse(false, 'Error al crear el usuario', null, error.message));
    }
};

// Login de usuario
const loginUsuario = async (req, res) => {
    const { correo, password } = req.body;
    
    if (!correo || !password) {
        return res.status(400).json(apiResponse(false, 'Correo y password son requeridos', null, 'MISSING_FIELDS'));
    }
    
    try {
        const [rows] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        
        if (rows.length === 0) {
            return res.status(401).json(apiResponse(false, 'Credenciales incorrectas', null, 'INVALID_CREDENTIALS'));
        }
        
        const usuario = rows[0];
        const passwordValido = await bcrypt.compare(password, usuario.password);
        
        if (!passwordValido) {
            return res.status(401).json(apiResponse(false, 'Credenciales incorrectas', null, 'INVALID_CREDENTIALS'));
        }
        
        // Login exitoso (sin JWT por ahora)
        res.json(apiResponse(true, 'Login exitoso', {
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.correo,
            edad: usuario.edad
        }));
    } catch (error) {
        console.error(error);
        res.status(500).json(apiResponse(false, 'Error en el login', null, error.message));
    }
};

// Actualizar un usuario
const updateUsuario = async (req, res) => {
    const { id } = req.params;
    const { nombre, correo, edad, password } = req.body;
    
    try {
        let query = 'UPDATE usuarios SET nombre = ?, correo = ?, edad = ?';
        let params = [nombre, correo, edad];
        
        if (password) {
            const passwordHash = await bcrypt.hash(password, 10);
            query += ', password = ?';
            params.push(passwordHash);
        }
        
        query += ' WHERE id = ?';
        params.push(id);
        
        const [result] = await pool.query(query, params);
        
        if (result.affectedRows === 0) {
            return res.status(404).json(apiResponse(false, 'Usuario no encontrado', null, 'USER_NOT_FOUND'));
        }
        
        res.json(apiResponse(true, 'Usuario actualizado correctamente'));
    } catch (error) {
        console.error(error);
        res.status(500).json(apiResponse(false, 'Error al actualizar el usuario', null, error.message));
    }
};

// Eliminar un usuario
const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json(apiResponse(false, 'Usuario no encontrado', null, 'USER_NOT_FOUND'));
        }
        
        res.json(apiResponse(true, 'Usuario eliminado correctamente'));
    } catch (error) {
        console.error(error);
        res.status(500).json(apiResponse(false, 'Error al eliminar el usuario', null, error.message));
    }
};

module.exports = {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    loginUsuario,
    updateUsuario,
    deleteUsuario
};