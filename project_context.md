# Project Context

This document contains the full context of the project, including file structure and file contents.

## File Contents

## File: backend/api/v1/endpoints/auth.py
`python

from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from core.config import settings
from core.security import create_access_token, verify_password
from api.deps import get_db
from models.user import User

router = APIRouter()

@router.post("/login/access-token")
def login_access_token(
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
):
    """
    OAuth2 compatible token login, get an access token for future requests.
    """
    user = db.query(User).filter(User.email == form_data.username).first()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": str(user.id),
            "email": user.email,
            "role": user.role
        }
    }

## File: backend/api/v1/endpoints/telemetry.py
`python

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

## File: factory-portfolio.js (Truncated)
`javascript

/**
 * GMS-Enterprise | Factory Command Center
 * --------------------------------------
 * Dashboard #1 in the InQube Pitch Strategy
 *
 * PURPOSE:
 * - Demonstrates full garment factory visibility
 * - Generic (non-InQube-specific)
 * - Shows OT + IT understanding
 *
 * NOTE:
 * Production version connects to real PLCs, MES, ERP, SAP via MQTT & APIs.
 * This is a 24-hour MVP using simulated data.
 */

export default {
    async fetch() {
        return new Response(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>GMS-Enterprise | Factory Command Center</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body class="text-slate-100 min-h-screen">
  <!-- Content truncated for brevity in context file, full content in original file -->
</body>
</html>
    `, {
            headers: { "content-type": "text/html;charset=UTF-8" }
        });
    }
};
