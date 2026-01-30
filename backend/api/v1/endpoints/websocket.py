from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from typing import List
import asyncio
import json
from sqlalchemy.orm import Session
from api.deps import get_db
from models.telemetry import Telemetry

router = APIRouter()

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        """Broadcast message to all connected clients."""
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except:
                pass

manager = ConnectionManager()

@router.websocket("/telemetry")
async def websocket_telemetry_endpoint(
    websocket: WebSocket,
    db: Session = Depends(get_db)
):
    """
    WebSocket endpoint for real-time telemetry streaming.
    Clients connect and receive updates every 3 seconds.
    """
    await manager.connect(websocket)
    try:
        while True:
            # Query latest telemetry data
            latest = db.query(Telemetry).order_by(Telemetry.timestamp.desc()).limit(10).all()
            
            if latest:
                data = [
                    {
                        "sensor_id": str(r.sensor_id),
                        "timestamp": r.timestamp.isoformat(),
                        "value": r.value,
                        "unit": r.unit,
                        "status": r.status
                    }
                    for r in latest
                ]
                await websocket.send_json({"type": "telemetry_update", "data": data})
            
            await asyncio.sleep(3)  # Update every 3 seconds
            
    except WebSocketDisconnect:
        manager.disconnect(websocket)
