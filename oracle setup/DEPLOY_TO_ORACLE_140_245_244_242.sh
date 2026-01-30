#!/bin/bash
#####################################################################
# INQUBE ENTERPRISE BACKEND DEPLOYMENT
# Oracle Cloud Instance: 140.245.244.242
# Generated: January 29, 2026
#####################################################################

set -e  # Exit on error

echo "==========================================="
echo "InQube Enterprise Backend Deployment"
echo "Target: 140.245.244.242"
echo "==========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Update System
echo -e "${GREEN}[1/8] Updating system packages...${NC}"
sudo apt update && sudo apt upgrade -y

# Step 2: Install PostgreSQL
echo -e "${GREEN}[2/8] Installing PostgreSQL...${NC}"
sudo apt install -y postgresql postgresql-contrib

# Configure PostgreSQL to accept connections
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" /etc/postgresql/*/main/postgresql.conf

# Step 3: Create Database
echo -e "${GREEN}[3/8] Creating InQube database...${NC}"
sudo -u postgres psql << SQL
CREATE DATABASE inqube_production;
CREATE USER inqube WITH ENCRYPTED PASSWORD 'InQube2026!Secure';
GRANT ALL PRIVILEGES ON DATABASE inqube_production TO inqube;
\c inqube_production
GRANT ALL ON SCHEMA public TO inqube;
SQL

echo -e "${YELLOW}Database created: inqube_production${NC}"
echo -e "${YELLOW}Username: inqube${NC}"
echo -e "${YELLOW}Password: InQube2026!Secure${NC}"

# Step 4: Install Python and dependencies
echo -e "${GREEN}[4/8] Installing Python and FastAPI...${NC}"
sudo apt install -y python3-pip python3-venv

# Create backend directory
mkdir -p ~/inqube-backend
cd ~/inqube-backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-jose[cryptography] passlib[bcrypt] python-multipart

# Step 5: Create FastAPI Backend
echo -e "${GREEN}[5/8] Creating FastAPI backend application...${NC}"

cat > main.py << 'PYTHON'
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, Float, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from datetime import datetime
import random
from typing import List, Optional
from pydantic import BaseModel

# Database Configuration
DATABASE_URL = "postgresql://inqube:InQube2026!Secure@localhost/inqube_production"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Database Models
class SensorReading(Base):
    __tablename__ = "sensor_readings"
    id = Column(Integer, primary_key=True, index=True)
    machine_id = Column(String, index=True)
    temperature = Column(Float)
    pressure = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)

class Decision(Base):
    __tablename__ = "decisions"
    id = Column(Integer, primary_key=True, index=True)
    recommendation_id = Column(Integer)
    action = Column(String)
    user_id = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)

# Create tables
Base.metadata.create_all(bind=engine)

# Pydantic Models
class TelemetryResponse(BaseModel):
    temperature: float
    pressure: float
    timestamp: str
    machine_id: str

class DecisionCreate(BaseModel):
    recommendation_id: int
    action: str
    user_id: str = "admin"

# FastAPI App
app = FastAPI(
    title="InQube Enterprise API",
    description="Production-grade API for InQube Manufacturing Intelligence",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact Cloudflare domains
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Routes
@app.get("/")
async def root():
    return {
        "status": "InQube Enterprise API",
        "version": "1.0.0",
        "timestamp": datetime.now().isoformat(),
        "environment": "production"
    }

@app.get("/api/health")
async def health_check(db: Session = Depends(get_db)):
    try:
        # Test database connection
        db.execute("SELECT 1")
        return {
            "status": "healthy",
            "database": "connected",
            "timestamp": datetime.now().isoformat()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/api/telemetry", response_model=TelemetryResponse)
async def get_telemetry(db: Session = Depends(get_db)):
    """Get latest sensor telemetry (simulated for demo)"""
    # Simulate temperature data (in production, query from real sensors)
    temp = round(180 + random.uniform(-5, 5), 1)
    pressure = round(45 + random.uniform(-2, 2), 1)
    
    # Save to database
    reading = SensorReading(
        machine_id="LAM-04",
        temperature=temp,
        pressure=pressure
    )
    db.add(reading)
    db.commit()
    
    return TelemetryResponse(
        temperature=temp,
        pressure=pressure,
        timestamp=datetime.now().isoformat(),
        machine_id="LAM-04"
    )

@app.post("/api/decisions")
async def create_decision(decision: DecisionCreate, db: Session = Depends(get_db)):
    """Save user decision"""
    db_decision = Decision(
        recommendation_id=decision.recommendation_id,
        action=decision.action,
        user_id=decision.user_id
    )
    db.add(db_decision)
    db.commit()
    db.refresh(db_decision)
    
    return {
        "status": "success",
        "decision_id": db_decision.id,
        "message": f"Decision '{decision.action}' recorded"
    }

@app.get("/api/decisions")
async def get_decisions(limit: int = 10, db: Session = Depends(get_db)):
    """Get recent decisions"""
    decisions = db.query(Decision).order_by(Decision.timestamp.desc()).limit(limit).all()
    return {
        "count": len(decisions),
        "decisions": [
            {
                "id": d.id,
                "action": d.action,
                "recommendation_id": d.recommendation_id,
                "timestamp": d.timestamp.isoformat()
            } for d in decisions
        ]
    }

@app.get("/api/history")
async def get_sensor_history(
    machine_id: str = "LAM-04",
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """Get sensor reading history"""
    readings = db.query(SensorReading)\
        .filter(SensorReading.machine_id == machine_id)\
        .order_by(SensorReading.timestamp.desc())\
        .limit(limit)\
        .all()
    
    return {
        "machine_id": machine_id,
        "count": len(readings),
        "readings": [
            {
                "temperature": r.temperature,
                "pressure": r.pressure,
                "timestamp": r.timestamp.isoformat()
            } for r in readings
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
PYTHON

echo -e "${YELLOW}Backend code created: ~/inqube-backend/main.py${NC}"

# Step 6: Create systemd service
echo -e "${GREEN}[6/8] Creating systemd service for auto-start...${NC}"

sudo tee /etc/systemd/system/inqube-api.service > /dev/null << SERVICE
[Unit]
Description=InQube Enterprise API
After=network.target postgresql.service

[Service]
Type=simple
User=ubuntu
WorkingDirectory=/home/ubuntu/inqube-backend
Environment="PATH=/home/ubuntu/inqube-backend/venv/bin"
ExecStart=/home/ubuntu/inqube-backend/venv/bin/uvicorn main:app --host 0.0.0.0 --port 8000
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
SERVICE

# Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable inqube-api
sudo systemctl start inqube-api

echo -e "${YELLOW}Service created and started: inqube-api${NC}"

# Step 7: Configure Firewall
echo -e "${GREEN}[7/8] Configuring firewall...${NC}"

# Check if ufw is active
if sudo ufw status | grep -q "Status: active"; then
    sudo ufw allow 8000/tcp
    sudo ufw allow 22/tcp
    echo -e "${YELLOW}Firewall rules added${NC}"
else
    echo -e "${YELLOW}UFW not active, skipping firewall config${NC}"
fi

# Step 8: Verify Installation
echo -e "${GREEN}[8/8] Verifying installation...${NC}"

sleep 3

# Test API
if curl -s http://localhost:8000/api/health | grep -q "healthy"; then
    echo -e "${GREEN}✓ API is running and healthy!${NC}"
else
    echo -e "${RED}✗ API health check failed${NC}"
    echo -e "${YELLOW}Check logs: sudo journalctl -u inqube-api -f${NC}"
fi

echo ""
echo "==========================================="
echo -e "${GREEN}DEPLOYMENT COMPLETE!${NC}"
echo "==========================================="
echo ""
echo -e "${YELLOW}Your API is now running at:${NC}"
echo -e "  ${GREEN}http://140.245.244.242:8000${NC}"
echo ""
echo -e "${YELLOW}API Endpoints:${NC}"
echo "  GET  http://140.245.244.242:8000/"
echo "  GET  http://140.245.244.242:8000/api/health"
echo "  GET  http://140.245.244.242:8000/api/telemetry"
echo "  POST http://140.245.244.242:8000/api/decisions"
echo "  GET  http://140.245.244.242:8000/api/history"
echo ""
echo -e "${YELLOW}Database Details:${NC}"
echo "  Host: localhost"
echo "  Database: inqube_production"
echo "  Username: inqube"
echo "  Password: InQube2026!Secure"
echo ""
echo -e "${YELLOW}Useful Commands:${NC}"
echo "  Check API status:  sudo systemctl status inqube-api"
echo "  View logs:         sudo journalctl -u inqube-api -f"
echo "  Restart API:       sudo systemctl restart inqube-api"
echo "  Stop API:          sudo systemctl stop inqube-api"
echo ""
echo -e "${GREEN}Next Step: Open security group ports in Oracle Console${NC}"
echo "==========================================="

