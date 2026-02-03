# TextileOS — Enterprise Manufacturing Intelligence Platform

**Owner:** Harsha W. (InQube Global / Brandix Group)  
**Target:** Smart Garment Manufacturing  
**Tech Stack:** React 18+, Tailwind CSS (Salesforce Lightning Design System), Recharts, FastAPI, PostgreSQL + TimescaleDB, Cloudflare Workers.

---

## 🚀 Project Context
**Single Source of Truth:** `TEXTILEOS_ENTERPRISE_DASHBOARD_FULL_CONTEXT.md`

This platform merges the "Vision AI" production floor intelligence with enterprise financial (CAPEX/OPEX) and operational metrics.

## 6 Modules
1. **💰 Finance:** CAPEX budget tracking, OPEX variance analysis, ROI on IoT investments.
2. **👥 HR:** Headcount, skills, clearances.
3. **📊 Marketing:** Pipeline, win/loss.
4. **🛒 Procurement:** Suppliers, spend analysis.
5. **🏭 Manufacturing:** OEE, production lines (Line A-D), quality.
6. **📡 IoT & Sensors:** Vision AI (DefectNet), sensor telemetry, predictive maintenance.

## Deployment
- **Frontend:** Cloudflare Workers (Edge-hosted React app)
- **Backend:** FastAPI on Oracle Cloud (`140.245.244.242`)
- **Database:** PostgreSQL + TimescaleDB (Hypertable for telemetry/metrics)

---
*For development, refer strictly to the context file listed above.*
