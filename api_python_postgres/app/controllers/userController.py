import bcrypt
from fastapi import HTTPException
from app.config.database import get_pool
from app.utils.response import api_response
from app.schemas.user import UserRegister, UserLogin


# ========================================
# REGISTRAR USUARIO
# ========================================
async def register(payload: UserRegister):
    pool = get_pool()

    # VALIDAR SI EXISTE
    usuario_existe = await pool.fetchrow(
        "SELECT * FROM usuarios WHERE correo = $1", payload.correo
    )

    if usuario_existe:
        raise HTTPException(
            status_code=400,
            detail=api_response(False, "Correo ya registrado", None, "DUPLICATE_EMAIL"),
        )

    # HASH PASSWORD
    password_hash = bcrypt.hashpw(payload.password.encode(), bcrypt.gensalt()).decode()

    # INSERT SQL
    resultado = await pool.fetchrow(
        "INSERT INTO usuarios (nombre, correo, password) VALUES ($1, $2, $3) RETURNING id",
        payload.nombre,
        payload.correo,
        password_hash,
    )

    return api_response(
        True,
        "Usuario registrado correctamente",
        {"id": resultado["id"], "nombre": payload.nombre, "correo": payload.correo},
    )


# ========================================
# LOGIN
# ========================================
async def login(payload: UserLogin):
    pool = get_pool()

    usuario = await pool.fetchrow(
        "SELECT * FROM usuarios WHERE correo = $1", payload.correo
    )

    if not usuario:
        raise HTTPException(
            status_code=404,
            detail=api_response(False, "Usuario no encontrado"),
        )

    # VALIDAR PASSWORD
    password_correcto = bcrypt.checkpw(
        payload.password.encode(), usuario["password"].encode()
    )

    if not password_correcto:
        raise HTTPException(
            status_code=401,
            detail=api_response(False, "Contraseña incorrecta"),
        )

    return api_response(
        True,
        "Login exitoso",
        {"id": usuario["id"], "nombre": usuario["nombre"], "correo": usuario["correo"]},
    )


# ========================================
# LISTAR USUARIOS
# ========================================
async def get_users():
    pool = get_pool()

    result = await pool.fetch("SELECT id, nombre, correo FROM usuarios")

    return api_response(True, "Lista usuarios", [dict(r) for r in result])


# ========================================
# ELIMINAR USUARIO
# ========================================
async def delete_user(user_id: int):
    pool = get_pool()

    await pool.execute("DELETE FROM usuarios WHERE id = $1", user_id)

    return api_response(True, "Usuario eliminado")
