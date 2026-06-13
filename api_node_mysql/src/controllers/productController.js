const pool = require('../db');

// Respuesta unificada
const apiResponse = (success, message, data = null, error = null) => {
    return { success, message, data, error };
};

// Obtener todos los productos
const getProductos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM productos ORDER BY id');
        res.json(apiResponse(true, 'Productos obtenidos correctamente', rows));
    } catch (error) {
        console.error(error);
        res.status(500).json(apiResponse(false, 'Error al obtener productos', null, error.message));
    }
};

// Obtener un producto por ID
const getProductoById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json(apiResponse(false, 'Producto no encontrado', null, 'PRODUCT_NOT_FOUND'));
        }
        res.json(apiResponse(true, 'Producto obtenido correctamente', rows[0]));
    } catch (error) {
        console.error(error);
        res.status(500).json(apiResponse(false, 'Error al obtener el producto', null, error.message));
    }
};

// Crear un nuevo producto
const createProducto = async (req, res) => {
    const { nombre, precio, stock } = req.body;
    
    if (!nombre || precio === undefined) {
        return res.status(400).json(apiResponse(false, 'Nombre y precio son requeridos', null, 'MISSING_FIELDS'));
    }
    
    try {
        const [result] = await pool.query(
            'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)',
            [nombre, precio, stock || 0]
        );
        
        res.status(201).json(apiResponse(true, 'Producto creado correctamente', {
            id: result.insertId,
            nombre,
            precio,
            stock
        }));
    } catch (error) {
        console.error(error);
        res.status(500).json(apiResponse(false, 'Error al crear el producto', null, error.message));
    }
};

// Actualizar un producto
const updateProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio, stock } = req.body;
    
    try {
        const [result] = await pool.query(
            'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?',
            [nombre, precio, stock, id]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json(apiResponse(false, 'Producto no encontrado', null, 'PRODUCT_NOT_FOUND'));
        }
        
        res.json(apiResponse(true, 'Producto actualizado correctamente'));
    } catch (error) {
        console.error(error);
        res.status(500).json(apiResponse(false, 'Error al actualizar el producto', null, error.message));
    }
};

// Eliminar un producto
const deleteProducto = async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json(apiResponse(false, 'Producto no encontrado', null, 'PRODUCT_NOT_FOUND'));
        }
        
        res.json(apiResponse(true, 'Producto eliminado correctamente'));
    } catch (error) {
        console.error(error);
        res.status(500).json(apiResponse(false, 'Error al eliminar el producto', null, error.message));
    }
};

module.exports = {
    getProductos,
    getProductoById,
    createProducto,
    updateProducto,
    deleteProducto
};