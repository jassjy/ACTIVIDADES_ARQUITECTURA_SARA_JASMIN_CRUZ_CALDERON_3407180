const express = require('express');
const router = express.Router();
const {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    loginUsuario,
    updateUsuario,
    deleteUsuario
} = require('../controllers/userController');

// Rutas de usuarios
router.get('/', getUsuarios);                 // GET /api/usuarios
router.get('/:id', getUsuarioById);           // GET /api/usuarios/:id
router.post('/', createUsuario);              // POST /api/usuarios (registro)
router.post('/login', loginUsuario);          // POST /api/usuarios/login
router.put('/:id', updateUsuario);            // PUT /api/usuarios/:id
router.delete('/:id', deleteUsuario);         // DELETE /api/usuarios/:id

module.exports = router;