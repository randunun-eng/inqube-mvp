from fastapi import APIRouter
from api.v1.endpoints import auth, users, telemetry, websocket

api_router = APIRouter()

api_router.include_router(auth.router, tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(telemetry.router, prefix="/telemetry", tags=["telemetry"])
api_router.include_router(websocket.router, prefix="/ws", tags=["websocket"])

