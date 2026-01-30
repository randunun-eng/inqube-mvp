from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from typing import Optional
import random
import jwt
from passlib.context import CryptContext

# JWT Configuration
SECRET_KEY = "your-secret-key-change-in-production"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

app = FastAPI(
    title="InQube Enterprise API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory user store (replace with real DB in production)
users_db = {
    "admin@inqube.com": {
        "email": "admin@inqube.com",
        "password": "admin123",  # Temporary plain text
        "role": "admin",
        "full_name": "Admin User"
    }
}

# Pydantic Models
class UserRegister(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: str = "viewer"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class UserResponse(BaseModel):
    email: str
    full_name: str
    role: str

class TelemetryData(BaseModel):
    timestamp: str
    temperature: float
    energy: float
    vibration: float
    status: str

class DecisionCreate(BaseModel):
    recommendation_id: int
    action: str
    user_id: str

# Helper Functions
def verify_password(plain_password, stored_password):
    # Temporary simple check - replace with bcrypt in production
    return plain_password == stored_password

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None or email not in users_db:
            raise HTTPException(status_code=401, detail="Invalid authentication")
        return users_db[email]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# --- ENDPOINTS ---

@app.get("/")
def root():
    return {
        "message": "InQube Enterprise API",
        "status": "online",
        "version": "1.0.0",
        "docs_url": "https://140.245.244.242/docs"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Authentication Endpoints
@app.post("/api/v1/auth/register", response_model=UserResponse)
def register(user: UserRegister):
    if user.email in users_db:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    users_db[user.email] = {
        "email": user.email,
        "password": user.password,  # Plain text for now
        "role": user.role,
        "full_name": user.full_name
    }
    
    return {
        "email": user.email,
        "full_name": user.full_name,
        "role": user.role
    }

@app.post("/api/v1/auth/login", response_model=Token)
def login(credentials: UserLogin):
    user = users_db.get(credentials.email)
    if not user or not verify_password(credentials.password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(data={"sub": credentials.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/v1/auth/me", response_model=UserResponse)
def get_me(current_user: dict = Depends(get_current_user)):
    return {
        "email": current_user["email"],
        "full_name": current_user["full_name"],
        "role": current_user["role"]
    }

# Public Endpoints
@app.get("/api/v1/telemetry", response_model=TelemetryData)
def get_telemetry():
    """Public endpoint - simulates reading from TimescaleDB"""
    base_temp = 180
    base_energy = 450
    
    return {
        "timestamp": datetime.now().isoformat(),
        "temperature": round(base_temp + random.uniform(-2, 2), 1),
        "energy": round(base_energy + random.uniform(-10, 10), 1),
        "vibration": round(random.uniform(0.1, 0.5), 3),
        "status": "optimal"
    }

# Protected Endpoints (Requires Authentication)
@app.post("/api/v1/decisions")
def create_decision(
    decision: DecisionCreate,
    current_user: dict = Depends(get_current_user)
):
    """Protected endpoint - requires JWT token"""
    if current_user["role"] not in ["admin", "operator"]:
        raise HTTPException(status_code=403, detail="Insufficient permissions")
    
    return {
        "status": "success",
        "message": f"Decision '{decision.action}' recorded by {current_user['full_name']}",
        "timestamp": datetime.now().isoformat(),
        "user": current_user["email"]
    }
