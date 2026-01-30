from datetime import datetime, timedelta
from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from api.deps import get_db, get_current_user
from models.telemetry import Telemetry
from models.user import User

router = APIRouter()

@router.get("/latest")
def get_latest_telemetry(
    sensor_id: Optional[str] = None,
    limit: int = Query(default=10, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get the latest telemetry readings.
    Optionally filter by sensor_id.
    """
    query = db.query(Telemetry).order_by(desc(Telemetry.timestamp))
    
    if sensor_id:
        query = query.filter(Telemetry.sensor_id == sensor_id)
    
    results = query.limit(limit).all()
    
    return [
        {
            "id": str(r.id),
            "sensor_id": str(r.sensor_id),
            "timestamp": r.timestamp.isoformat(),
            "value": r.value,
            "unit": r.unit,
            "status": r.status
        }
        for r in results
    ]


@router.get("/history")
def get_telemetry_history(
    sensor_id: str,
    start_time: Optional[datetime] = None,
    end_time: Optional[datetime] = None,
    limit: int = Query(default=100, le=1000),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get historical telemetry data for a specific sensor.
    """
    query = db.query(Telemetry).filter(Telemetry.sensor_id == sensor_id)
    
    if start_time:
        query = query.filter(Telemetry.timestamp >= start_time)
    if end_time:
        query = query.filter(Telemetry.timestamp <= end_time)
    
    results = query.order_by(desc(Telemetry.timestamp)).limit(limit).all()
    
    return [
        {
            "timestamp": r.timestamp.isoformat(),
            "value": r.value,
            "unit": r.unit,
            "status": r.status
        }
        for r in results
    ]
