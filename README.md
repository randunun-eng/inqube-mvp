# InQube MVP - Enterprise IoT Platform

> **Status**: Phase 2 Complete - Backend Authentication & Database Integration ✅

Enterprise-grade Manufacturing Intelligence platform with Real-time IoT monitoring, AI-powered recommendations, and Predictive analytics.

## 🚀 What's New (Jan 30, 2026)

### ✅ Backend API Implemented
- **JWT Authentication** with PostgreSQL
- **FastAPI** + **SQLAlchemy** + **Alembic**
- **Docker Compose** infrastructure
- **Production-ready** deployment setup

[See CHANGELOG.md](CHANGELOG.md) for detailed changes.

---

## Architecture

```
Frontend (Cloudflare Workers)
    ↓
Backend API (FastAPI) ← JWT Auth
    ↓
PostgreSQL + TimescaleDB ← Real-time data
    ↓
MQTT Broker ← IoT Sensors
```

---

## Project Structure

```
inqube-mvp/
├── backend/                    # FastAPI Backend (NEW)
│   ├── alembic/               # Database migrations
│   ├── api/                   # API endpoints
│   │   ├── deps.py           # Auth dependencies
│   │   └── v1/
│   │       ├── api.py        # Router aggregator
│   │       └── endpoints/
│   │           ├── auth.py   # Login endpoint
│   │           └── users.py  # User profile
│   ├── core/
│   │   ├── config.py         # Settings
│   │   └── security.py       # JWT + Password hashing
│   ├── db/
│   │   ├── base.py           # SQLAlchemy base
│   │   └── session.py        # DB connection
│   ├── models/               # Database models
│   │   ├── user.py
│   │   ├── factory.py
│   │   └── sensor.py
│   ├── main.py               # FastAPI app
│   ├── verify_auth.py        # Test script
│   ├── Dockerfile
│   └── requirements.txt
│
├── inqube-demo.js             # Main dashboard (Cloudflare Worker)
├── factory-portfolio.js       # Factory portfolio view
├── carbon-dashboard.js        # Carbon footprint tracker
├── docker-compose.yml         # Infrastructure definition
└── CHANGELOG.md               # Detailed change log

```

---

## Quick Start

### Prerequisites
- Docker & Docker Compose
- Git

### Local Development
```bash
git clone https://github.com/randunun-eng/inqube-mvp.git
cd inqube-mvp
docker compose up -d
```

### Access Points
- **API Docs**: http://localhost:8000/docs
- **Dashboard**: Deploy `inqube-demo.js` to Cloudflare Workers

### Test Authentication
```bash
docker compose exec api python verify_auth.py
```

Default credentials: `admin@inqube.ai` / `admin123`

---

## Deployment

### Oracle Cloud (Production)
Already deployed at: **http://140.245.244.242**

```bash
ssh user@140.245.244.242
cd inqube-mvp
git pull
docker compose up -d --build
docker compose exec api alembic upgrade head
```

### Cloudflare Workers (Frontend)
```bash
wrangler deploy inqube-demo.js
wrangler deploy factory-portfolio.js --config wrangler-factory.toml
wrangler deploy carbon-dashboard.js --config wrangler-carbon.toml
```

---

## Features

### Implemented ✅
- JWT Authentication & RBAC
- PostgreSQL Database with SQLAlchemy
- User Management API
- Docker containerization
- Database migrations (Alembic)
- Automated testing script

### In Progress 🔄
- Real-time telemetry WebSocket
- MQTT broker integration
- TimescaleDB hypertables

### Roadmap 📋
- Connect frontend to backend API
- Live dashboard with real data
- AI recommendation engine
- Energy optimization algorithms

---

## API Endpoints

### Authentication
- `POST /api/v1/login/access-token` - Login (get JWT token)

### Users
- `GET /api/v1/users/me` - Get current user profile (protected)

### Health
- `GET /health` - Health check
- `GET /` - API info

**Full API Docs**: http://localhost:8000/docs (Swagger UI)

---

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **PostgreSQL 15** - Relational database
- **TimescaleDB** - Time-series extension
- **SQLAlchemy** - ORM
- **Alembic** - Database migrations
- **Redis** - Caching layer
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

### Frontend
- **Cloudflare Workers** - Edge computing
- **Tailwind CSS** - Styling
- **Chart.js** - Data visualization

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Orchestration
- **Nginx** - Reverse proxy (production)

---

## Documentation

- [CHANGELOG.md](CHANGELOG.md) - Complete change history
- [ARCHITECTURE_AND_SCHEMA.md](.gemini/antigravity/brain/8a0bfb7d-c6ee-4034-92cf-0d3fa5d17e27/ARCHITECTURE_AND_SCHEMA.md) - System design
- [HARSHA_FEEDBACK_ANALYSIS.md](HARSHA_FEEDBACK_ANALYSIS.md) - Requirements analysis
- [ENTERPRISE_GAPS_ANALYSIS.md](ENTERPRISE_GAPS_ANALYSIS.md) - Gap analysis

---

## License

Apache License 2.0 - See [LICENSE](LICENSE)

---

## Contact

For enterprise deployment support, contact: admin@inqube.ai

---

**Status**: Ready for Phase 3 (Real-time Data Infrastructure)
