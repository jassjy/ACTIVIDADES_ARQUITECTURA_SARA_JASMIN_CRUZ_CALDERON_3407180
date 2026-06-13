from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config.database import connect_db, close_db
from app.routes.userRoutes import router as user_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # CONECTAR BD
    await connect_db()
    yield
    # CERRAR BD
    await close_db()


app = FastAPI(lifespan=lifespan)

# MIDDLEWARES
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# RUTAS
app.include_router(user_router, prefix="/api/users")


# HOME
@app.get("/")
def home():
    return {"message": "API funcionando correctamente"}
