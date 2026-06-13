from pydantic import BaseModel, EmailStr


class UserRegister(BaseModel):
    nombre: str
    correo: EmailStr
    password: str


class UserLogin(BaseModel):
    correo: EmailStr
    password: str
