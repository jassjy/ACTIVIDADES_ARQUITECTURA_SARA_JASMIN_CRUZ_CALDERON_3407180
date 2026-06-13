const express = require('express');
const router = express.Router();
const {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
} = require('../controllers/productController');

// Rutas de productos
router.get('/', getProductos);           // GET /api/productos
router.get('/:id', getProductoById);     // GET /api/productos/:id
router.post('/', createProducto);        // POST /api/productos
router.put('/:id', updateProducto);      // PUT /api/productos/:id
router.delete('/:id', deleteProducto);   // DELETE /api/productos/:id

module.exports = router;