from fastapi import APIRouter
from app.controllers.userController import register, login, get_users, delete_user

router = APIRouter()

# REGISTRO
router.add_api_route("/register", register, methods=["POST"])

# LOGIN
router.add_api_route("/login", login, methods=["POST"])

# LISTAR
router.add_api_route("/", get_users, methods=["GET"])

# ELIMINAR
router.add_api_route("/{user_id}", delete_user, methods=["DELETE"])
