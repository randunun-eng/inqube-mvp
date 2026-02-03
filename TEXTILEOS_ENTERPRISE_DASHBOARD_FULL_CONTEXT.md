# TEXTILEOS — ENTERPRISE MANUFACTURING INTELLIGENCE PLATFORM
## Complete Agentic App Rebuild Context
### Merges: Harsha Meta-Prompt + TextileOS Vision AI Screenshots + InQube Backend

---

## ██ SECTION 1: PLATFORM IDENTITY

| Property | Value |
|---|---|
| Platform Name | TextileOS |
| Tagline | Enterprise Manufacturing Intelligence |
| Owner | Harsha W. — Founder |
| Target Client | InQube Global (Brandix Group) — Smart Garment Manufacturer |
| Design System | Salesforce Lightning Design System (SLDS) aligned |
| Framework | React 18+ |
| Styling | Tailwind CSS (custom palette mapped to SLDS) |
| Charts | Recharts + D3.js |
| Icons | Lucide React |
| State Management | React hooks (useState, useContext, useReducer) |

---

## ██ SECTION 2: COLOR SYSTEM & TYPOGRAPHY

### 2.1 CSS Custom Properties (Use Exactly These)

```css
:root {
  /* Brand Primary */
  --sf-brand-primary: #0176d3;
  --sf-brand-primary-active: #014486;
  --sf-brand-primary-hover: #0b5cab;

  /* Neutral Palette */
  --sf-color-background: #f3f3f3;
  --sf-color-background-alt: #ffffff;
  --sf-color-border: #c9c9c9;
  --sf-text-primary: #181818;
  --sf-text-secondary: #444444;
  --sf-text-tertiary: #706e6b;

  /* Status Colors */
  --sf-success: #2e844a;
  --sf-warning: #dd7a01;
  --sf-error: #ba0517;
  --sf-info: #0176d3;

  /* Chart Palette (Use in This Order) */
  --chart-1: #1589ee;   /* Blue — primary series */
  --chart-2: #5867e8;   /* Indigo — secondary series */
  --chart-3: #5fc9f8;   /* Cyan — tertiary series */
  --chart-4: #ff538a;   /* Pink/Coral — alerts/defects (used for Pareto bars) */
  --chart-5: #00c7b1;   /* Teal — positive/success series */
  --chart-6: #f59b00;   /* Amber — warning series */

  /* TextileOS Specific */
  --textileos-status-running: #2e844a;
  --textileos-status-maintenance: #dd7a01;
  --textileos-status-stopped: #ba0517;
  --textileos-efficiency-good: #2e844a;      /* Green text for efficiency > threshold */
  --textileos-defect-pareto: #E8475B;        /* Coral/red — Pareto bar color */
}
```

### 2.2 Typography

```css
:root {
  --font-family-display: 'Salesforce Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-heading-large: 1.75rem;    /* 28px — page titles */
  --font-size-heading-medium: 1.25rem;   /* 20px — section headers */
  --font-size-heading-small: 1rem;       /* 16px — card titles */
  --font-size-body: 0.875rem;            /* 14px — body text, table rows */
  --font-size-caption: 0.75rem;          /* 12px — labels, badges, sub-text */
  --font-weight-bold: 700;
  --font-weight-regular: 400;
}
```

### 2.3 Component Specs

```yaml
card_component:
  border_radius: 8px
  box_shadow: "0 2px 4px rgba(0,0,0,0.1)"
  padding: 1rem
  background: var(--sf-color-background-alt)  # white

navigation_component:
  type: global_navigation_bar
  height: 48px
  app_launcher: icon_grid (top-left)
  search: global_omnisearch
  user_menu: top-right (avatar + name + role)

page_header:
  breadcrumb: true
  page_title: bold
  action_buttons: right_aligned

data_table:
  row_height: 44px
  header_style: sticky
  zebra_striping: true
  inline_edit: supported

charts:
  library: recharts | d3
  animation: smooth_transition
  legend: bottom_center
  tooltip: interactive
```

---

## ██ SECTION 3: GLOBAL LAYOUT ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────────┐
│ GLOBAL HEADER (48px)                                            │
│ [☰ App Launcher] [T] TextileOS  [🔍 Search...]  [🔔] [⚙] [👤] │
├───────┬─────────────────────────────────────────────────────────┤
│       │ PAGE HEADER                                             │
│       │ Breadcrumb > Module > Sub-View  [Export] [Filter]       │
│  NAV  ├─────────────────────────────────────────────────────────┤
│  RAIL │                                                         │
│  64px │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                   │
│       │  │ KPI1 │ │ KPI2 │ │ KPI3 │ │ KPI4 │  ← KPI Row       │
│ ───── │  └──────┘ └──────┘ └──────┘ └──────┘                   │
│ 💰    │  ┌─────────────────────┬───────────────────┐            │
│ Finance│  │  PRIMARY CHART     │  SECONDARY CHART  │            │
│ 👥    │  │  (e.g. production  │  (e.g. Pareto     │            │
│ HR    │  │   line chart)      │   bar chart)      │            │
│ 📊    │  └─────────────────────┴───────────────────┘            │
│ Mktg  │  ┌─────────────────────────────────────────┐            │
│ 🛒    │  │  DATA TABLE / DETECTION LOG             │            │
│ Procur│  │  (sortable, filterable, exportable)     │            │
│ 🏭    │  └─────────────────────────────────────────┘            │
│ Mfg   │                                                         │
│ 📡    │                          [AI] ← Floating chatbot       │
│ IoT   │                                                         │
└───────┴─────────────────────────────────────────────────────────┘
```

### Responsive Grid
```yaml
breakpoints:
  mobile:        320px  - 767px   → 4 columns
  tablet:        768px  - 1023px  → 8 columns
  desktop:       1024px - 1439px  → 12 columns
  large_desktop: 1440px+          → 12 columns
gutter: 16px
```

---

## ██ SECTION 4: NAVIGATION — 6 MODULES

The left nav rail contains icons + labels. Only one module is active at a time. Each module has its own full dashboard page.

| # | Icon | Module Name | Key Sub-Views |
|---|---|---|---|
| 1 | 💰 | Finance | Revenue, Cost Centers, Cash Flow |
| 2 | 👥 | HR | Headcount, Skills, Clearances |
| 3 | 📊 | Marketing & BD | Pipeline, Win/Loss, Capture |
| 4 | 🛒 | Procurement | Suppliers, POs, Spend |
| 5 | 🏭 | Manufacturing | Production Lines, OEE, Quality |
| 6 | 📡 | IoT & Sensors | Vision AI, Predictive Maint, Energy |

**Active Module in Screenshots: IoT & Sensors → Vision AI – Production Floor**

---

## ██ SECTION 5: RBAC (Role-Based Access Control)

```yaml
rbac_matrix:
  executive:        # C-Suite
    - all_modules_read
    - cross_business_unit_access
    - export_all

  department_head:  # Module owners
    - own_module_full_access
    - adjacent_module_summary_view
    - export_own_module

  manager:          # Operational managers (Harsha W. role in screenshot)
    - team_level_data_only
    - limited_export

  analyst:          # Viewers
    - read_only_assigned_views
    - no_export_pii

data_masking:
  - salary_data_masked_for_non_hr
  - contract_values_visible_by_clearance_level
  - supplier_pricing_masked_by_role
```

**Login Screen Required.** JWT auth. Session timeout: 15 min. Audit log: who viewed what, when.

---

## ██ SECTION 6: VISION AI — PRODUCTION FLOOR (Primary Build Target)

This is the module shown in the TextileOS screenshots. It lives under **IoT & Sensors** nav item.

### 6.1 Top Capacity Ribbon (Persists Across All Pages)

```
┌──────────────────────────────────────────────────────┐
│  ⇄ Capacity    ■ Planned  ■ Actual        Quality 97% │
└──────────────────────────────────────────────────────┘
```
- Thin horizontal strip
- `Planned` = lighter blue, `Actual` = darker blue
- Quality percentage shown top-right

### 6.2 Vision AI – Production Floor Section

#### Left Panel: Live Camera Feed

- **Large image container** (simulated with placeholder gradient or stock image)
- **AI Detection Bounding Box Overlays** rendered ON TOP of image:
  - Each detection = a colored rectangle + label tag
  - Label floats at top-left of bounding box
  - Colors: Red/Orange for defects (`Misalign`, `Scratch`), Green for `Gap`
- **Bottom-left overlay on image:** `Line A • Assembly • 10:42:11` (live timestamp, updates every second)

#### Line Selector Tabs (Below Camera)

```
┌──────────────┐  ┌─────────────────┐  ┌──────────────┐
│ Line A •     │  │ Line B •        │  │ Line C •     │
│ Assembly  ●  │  │ Packaging       │  │ QA Cell      │
└──────────────┘  └─────────────────┘  └──────────────┘
  ← ACTIVE           unselected            unselected
```

**Behavior:** Switching tabs updates:
- Camera feed overlay (different detections per line)
- All KPI values
- Cycle time, active alerts, camera health
- Detection log filters to selected line (or shows all)

#### Right Panel: Vision Model Card

```
┌─────────────────────────┐
│ Vision Model            │
│ DefectNet v3.2          │
│ Latency 1.8s  Acc 98.4% │
└─────────────────────────┘
```

#### KPI Cards (Right Column)

| Card | Line A Value | Line B Value |
|---|---|---|
| Pass Rate | **96.4%** | **98.1%** |
| Defects Detected | **12** | **5** |
| Throughput | **820/hr** | **910/hr** |

Each: gray label on top, large bold value below.

#### Sub-Metric Cards (Row)

| Cycle Time | Active Alerts | Camera Health |
|---|---|---|
| 4.1 min (A) / 3.8 min (B) | 3 (A) / 1 (B) | 98.9% |

Light gray background, smaller text.

#### Recent Vision AI Detections Table

| Timestamp | Line | Defect Type | Confidence |
|---|---|---|---|
| 10:41:58 | Line A | Misalignment | 91% |
| 10:42:42 | Line B | Packaging gap | 88% |
| 10:41:25 | Line C | Surface void | 93% |

- Rows: 44px height, zebra striping
- Sortable columns
- Confidence shown right-aligned
- Auto-refreshes via WebSocket (new rows append at top)

### 6.3 Vision Defect Pareto (Right Column Chart)

**Chart Type:** Vertical bar chart, bars sorted descending (Pareto style)

| Category | Count | Bar Color |
|---|---|---|
| Stitching | ~230 | #E8475B (coral/red) |
| Fabric | ~165 | #E8475B |
| Size Var | ~115 | #E8475B |
| Color | ~95 | #E8475B |

- Y-axis: 0 → 65 → 130 → 195 → 260
- All bars same color family (single-color Pareto)
- X-axis labels: category names
- Subtle horizontal gridlines, no vertical gridlines
- Interactive tooltip on hover showing exact count + %

### 6.4 Production Line Status Table (Bottom)

| LINE | EFFICIENCY | QUALITY | OUTPUT | STATUS |
|---|---|---|---|---|
| Line A — Sports Bras | 94.2% | 98.4% | 12.4K / 13.0K | 🟢 RUNNING |
| Line B — Performance | 91.8% | 97.2% | 18.2K / 19.0K | 🟢 RUNNING |
| Line C — Seamless | 88.4% | 96.8% | 8.4K / 9.5K | 🟡 MAINTENANCE |
| Line D — Engineered | 92.6% | 98.8% | 6.2K / 6.5K | 🟢 RUNNING |

- Efficiency values: green text (above threshold)
- Output format: `ActualK / TargetK`
- Status badges: RUNNING = green bg white text, MAINTENANCE = amber bg white text
- Sticky header, sortable columns
- Each row clickable → drill-down to line detail view

---

## ██ SECTION 7: IoT & SENSORS KPI FRAMEWORK

```yaml
iot_kpis:
  strategic_tier:                         # Executive view
    - predictive_maintenance_savings      # $ saved by catching failures early
    - asset_availability_rate             # % uptime across all lines
    - energy_cost_per_unit                # $/unit energy cost
    - carbon_emission_tracking            # CO2 kg per production run
    - anomaly_detection_accuracy          # DefectNet accuracy %

  operational_tier:                       # Manager view (default on dashboard)
    - sensor_uptime_percentage            # % sensors reporting healthy
    - mean_time_between_failures          # MTBF hours
    - mean_time_to_repair                 # MTTR hours
    - temperature_pressure_alerts         # Count of threshold breaches
    - vibration_threshold_breaches        # Count of vibration anomalies
```

---

## ██ SECTION 8: MANUFACTURING MODULE KPI FRAMEWORK

```yaml
manufacturing_kpis:
  executive_tier:
    - overall_equipment_effectiveness     # OEE % (target >85%)
    - schedule_performance_index          # SPI (>1.0 = on schedule)
    - cost_performance_index              # CPI (>1.0 = under budget)
    - quality_escape_rate                 # Defects that escaped to customer
    - capacity_utilization                # % of max throughput used

  operational_tier:
    - first_pass_yield                    # % passing first inspection
    - cycle_time_variance                 # Std dev of cycle times
    - labor_efficiency_ratio              # Output per labor hour
    - scrap_rate_by_operation             # Waste % per process step
    - wip_inventory_value                 # $ value of work-in-progress
```

---

## ██ SECTION 9: INTERACTIVITY REQUIREMENTS

### 9.1 Global (All Modules)
- **Cross-filtering:** Click any chart element → filters entire dashboard
- **Drill-down:** Click KPI card → expand to detailed view / modal
- **Time range selector:** Global date picker → affects all data
- **Export:** PDF, Excel, PowerPoint from any view
- **Bookmarking:** Save custom filter combos
- **Alerts:** Configurable threshold notifications
- **Comments:** Collaborate on data points

### 9.2 IoT Module Specific
- **Real-time stream toggle:** Turn live WebSocket feed on/off
- **Sensor configuration panel:** View/edit sensor thresholds
- **Maintenance ticket creation:** One-click from any alert
- **Line tab switching:** Instant (cached data, no full reload)
- **Pareto time filter:** Today / This Week / This Month

### 9.3 Manufacturing Module Specific
- **Work order status update:** Inline edit in table
- **Quality deviation entry:** Modal form from table row
- **Schedule adjustment modal:** Drag or click to reschedule

---

## ██ SECTION 10: PERFORMANCE SLAs

```yaml
performance_sla:
  initial_load:      < 3 seconds
  filter_response:   < 500ms
  chart_render:      < 1 second
  data_refresh:
    IoT_realtime:    15-second intervals (WebSocket)
    transactional:   5-minute intervals (REST polling)

optimization_strategies:
  - lazy_loading_for_below_fold_content
  - virtualized_scrolling_for_large_tables   # 10,000+ rows
  - websocket_for_real_time_updates          # Detection feed
  - query_caching_with_invalidation          # Redis
  - progressive_data_loading                 # Skeleton → data
```

---

## ██ SECTION 11: API LAYER (Maps to Existing InQube FastAPI Backend)

### Already Built (on Oracle Cloud 140.245.244.242)
```
POST   /api/v1/auth/login           → JWT token
GET    /api/v1/auth/me              → Current user + role
GET    /api/v1/telemetry/latest     → Latest sensor readings
GET    /api/v1/telemetry/history    → Time-range filtered history
POST   /api/v1/decisions            → Record operator decision (auth required)
WS     /api/v1/ws/telemetry         → Real-time telemetry stream
```

### New Endpoints Needed for Vision AI Module
```
GET    /api/v1/vision/lines                  → All production lines + status
GET    /api/v1/vision/lines/{id}/kpis        → Line-specific KPIs
GET    /api/v1/vision/lines/{id}/detections  → Detection history (paginated)
GET    /api/v1/vision/pareto                 → Defect category aggregation
                                               ?timeRange=today|week|month
GET    /api/v1/vision/model-info             → DefectNet model metadata
WS     /api/v1/ws/vision/detections          → Live detection stream
WS     /api/v1/ws/vision/feed/{line_id}      → Live camera overlay updates

POST   /api/v1/alerts/acknowledge            → Acknowledge an active alert
POST   /api/v1/alerts/create-ticket          → Create maintenance ticket from alert
```

### Database Schema (PostgreSQL + TimescaleDB)

```sql
-- Production Lines
CREATE TABLE production_lines (
    id              SERIAL PRIMARY KEY,
    line_name       VARCHAR(20) NOT NULL,        -- "Line A"
    process_type    VARCHAR(50) NOT NULL,        -- "Assembly", "Packaging", "QA Cell", "Finishing"
    product_type    VARCHAR(100),                -- "Sports Bras", "Performance", "Seamless", "Engineered"
    status          VARCHAR(20) DEFAULT 'RUNNING',  -- RUNNING | MAINTENANCE | STOPPED
    efficiency      FLOAT,                       -- 88.4 – 94.2
    quality_rate    FLOAT,                       -- 96.8 – 98.8
    output_actual   INTEGER,                     -- 6200 – 18200
    output_target   INTEGER,                     -- 6500 – 19000
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Vision Detections (Time-series hypertable)
CREATE TABLE vision_detections (
    id              SERIAL,
    line_id         INTEGER REFERENCES production_lines(id),
    camera_id       VARCHAR(50),
    defect_type     VARCHAR(100) NOT NULL,       -- Misalignment | Scratch | Gap | Surface void | Packaging gap
    confidence      FLOAT NOT NULL,              -- 0.88 – 0.95
    bounding_box    JSONB,                       -- {"x": 120, "y": 80, "w": 60, "h": 40}
    detected_at     TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (id, detected_at)
);
-- SELECT create_hypertable('vision_detections', 'detected_at');

-- Line KPI Snapshots (for historical trending)
CREATE TABLE line_kpi_snapshots (
    id              SERIAL,
    line_id         INTEGER REFERENCES production_lines(id),
    pass_rate       FLOAT,
    defects_count   INTEGER,
    throughput_hr   INTEGER,
    cycle_time_min  FLOAT,
    active_alerts   INTEGER,
    camera_health   FLOAT,
    recorded_at     TIMESTAMPTZ NOT NULL,
    PRIMARY KEY (id, recorded_at)
);

-- Pareto View (auto-generated from detections)
CREATE OR REPLACE VIEW defect_pareto_today AS
SELECT
    defect_type,
    COUNT(*)::int AS count,
    ROUND(COUNT(*) * 100.0 / NULLIF(SUM(COUNT(*)) OVER(), 0), 1) AS pct
FROM vision_detections
WHERE detected_at >= CURRENT_DATE
GROUP BY defect_type
ORDER BY count DESC;

-- Alerts
CREATE TABLE alerts (
    id              SERIAL PRIMARY KEY,
    line_id         INTEGER REFERENCES production_lines(id),
    alert_type      VARCHAR(50),                 -- DEFECT | MAINTENANCE | THRESHOLD
    severity        VARCHAR(20),                 -- LOW | MEDIUM | HIGH | CRITICAL
    message         TEXT,
    acknowledged    BOOLEAN DEFAULT FALSE,
    ack_by          VARCHAR(100),
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    ack_at          TIMESTAMPTZ
);
```

---

## ██ SECTION 12: MOCK DATA (Exact Values — Use These)

### 12.1 Production Lines
```json
[
  { "id": 1, "line_name": "Line A", "process_type": "Assembly",   "product_type": "Sports Bras",  "status": "RUNNING",     "efficiency": 94.2, "quality_rate": 98.4, "output_actual": 12400, "output_target": 13000 },
  { "id": 2, "line_name": "Line B", "process_type": "Packaging", "product_type": "Performance",  "status": "RUNNING",     "efficiency": 91.8, "quality_rate": 97.2, "output_actual": 18200, "output_target": 19000 },
  { "id": 3, "line_name": "Line C", "process_type": "QA Cell",   "product_type": "Seamless",     "status": "MAINTENANCE","efficiency": 88.4, "quality_rate": 96.8, "output_actual": 8400,  "output_target": 9500  },
  { "id": 4, "line_name": "Line D", "process_type": "Finishing", "product_type": "Engineered",   "status": "RUNNING",     "efficiency": 92.6, "quality_rate": 98.8, "output_actual": 6200,  "output_target": 6500  }
]
```

### 12.2 Line KPIs (Tab-Dependent)
```json
{
  "Line A": {
    "pass_rate": 96.4,
    "defects_detected": 12,
    "throughput": 820,
    "cycle_time": 4.1,
    "active_alerts": 3,
    "camera_health": 98.9,
    "detections_on_feed": [
      { "type": "Misalign", "color": "#E8475B", "x": 35, "y": 22, "w": 18, "h": 25 },
      { "type": "Scratch", "color": "#E8475B", "x": 62, "y": 45, "w": 14, "h": 18 }
    ]
  },
  "Line B": {
    "pass_rate": 98.1,
    "defects_detected": 5,
    "throughput": 910,
    "cycle_time": 3.8,
    "active_alerts": 1,
    "camera_health": 98.9,
    "detections_on_feed": [
      { "type": "Gap", "color": "#2e844a", "x": 28, "y": 18, "w": 16, "h": 20 }
    ]
  },
  "Line C": {
    "pass_rate": 94.7,
    "defects_detected": 8,
    "throughput": 650,
    "cycle_time": 5.2,
    "active_alerts": 2,
    "camera_health": 92.1,
    "detections_on_feed": [
      { "type": "Surface void", "color": "#dd7a01", "x": 45, "y": 35, "w": 20, "h": 15 }
    ]
  }
}
```

### 12.3 Recent Detections (Live Feed — New Entries Prepend)
```json
[
  { "timestamp": "10:41:58", "line": "Line A", "defect": "Misalignment",   "confidence": 91 },
  { "timestamp": "10:42:42", "line": "Line B", "defect": "Packaging gap",  "confidence": 88 },
  { "timestamp": "10:41:25", "line": "Line C", "defect": "Surface void",   "confidence": 93 }
]
```

### 12.4 Pareto Data
```json
[
  { "category": "Stitching", "count": 230 },
  { "category": "Fabric",    "count": 165 },
  { "category": "Size Var",  "count": 115 },
  { "category": "Color",     "count": 95  }
]
```

### 12.5 Capacity Ribbon
```json
{
  "planned":  [85, 88, 92, 78, 90, 85, 88],
  "actual":   [82, 86, 89, 75, 87, 83, 91],
  "quality_pct": 97
}
```

---

## ██ SECTION 13: DEFECT TYPE DOMAIN KNOWLEDGE

| Defect Type | What It Means | Why It Matters |
|---|---|---|
| **Stitching** | Seam/stitch alignment off-spec | #1 issue; buyer audits reject batches (Nike/Adidas) |
| **Fabric** | Raw material defect (hole, thin spot, weave error) | Catches upstream material quality failures |
| **Size Var** | Dimension outside ±2mm tolerance | Critical for activewear fit; smart clothing especially |
| **Color** | Pantone color mismatch | Buyer rejects ENTIRE batch if color off |
| **Surface void** | Hollow/thin spot in bonded/seamless fabric | Specific to InQube's seamless garments |
| **Packaging gap** | Missing material in packaging | Customer-facing; retail presentation + product protection |
| **Misalignment** | Panel/seam position deviation | Visible defect; caught by vision AI bounding box |
| **Scratch** | Surface abrasion damage | Transport or machine contact damage |
| **Gap** | Missing material section | Packaging or assembly gap |

---

## ██ SECTION 14: FLOATING AI CHATBOT BUTTON

- Position: **bottom-right corner**, always visible
- Style: Dark circle, ~48px diameter, teal accent
- Text/Icon: "AI" in white bold text
- On click: Opens a chat panel (right side drawer) connected to Ollama local LLM
- The LLM can answer questions about current dashboard data, defect trends, and manufacturing KPIs
- This is the "Agentic" part — it reads the current dashboard state and answers contextually

---

## ██ SECTION 15: SECURITY & COMPLIANCE CONTEXT

| Requirement | Relevance to InQube |
|---|---|
| ITAR / EAR | Not applicable (garment, not defense) — but structure remains |
| SOX | Financial data accuracy for Brandix Group consolidated reporting |
| GDPR | Employee data (HR module) |
| ISO 27001 | InQube/Brandix security certification |
| Data Classification | Unclassified (production metrics), Confidential (financials, supplier pricing) |
| JWT Auth | All API endpoints protected |
| Audit Log | Who viewed, who changed, timestamp — stored in `audit_log` table |

---

## ██ SECTION 16: DEMO SCRIPT (What to Show Harsha)

### Executive Overview (2 min)
1. Login → show RBAC (Manager role)
2. Unified command center → IoT Vision AI module
3. Real-time detection feed appearing via WebSocket
4. Pareto chart updating as new detections come in

### Deep Dive: Vision AI + IoT (3 min)
1. Switch Line A → Line B → show all KPIs update
2. Show bounding boxes change on camera feed
3. Click active alert → show drill-down detail
4. Click "Create Maintenance Ticket" → show modal
5. Show Production Line Status table → click Line C (MAINTENANCE) → drill-down

### Cross-Module Link (2 min)
1. Show Manufacturing module OEE view
2. Drill into Line C → "Why is it in MAINTENANCE?"
3. Shows linked IoT alert that triggered the status change
4. Show cost impact in Finance module (scrap cost from defects)

---

## ██ SECTION 17: COMPLETE SYSTEM PROMPT FOR AGENTIC APP

Copy this block EXACTLY into your agentic app as the system context:

---

```
SYSTEM: You are building TextileOS — an enterprise manufacturing intelligence platform 
for InQube Global (smart garment manufacturer, part of Brandix Group, Sri Lanka).

DESIGN SYSTEM: Salesforce Lightning aligned. Light theme. White cards on #f3f3f3 background.
Brand primary: #0176d3. Success: #2e844a. Warning: #dd7a01. Error: #ba0517.
Pareto bars: #E8475B (coral). Font: Salesforce Sans / system sans-serif.

FRAMEWORK: React 18+, Tailwind CSS (custom palette), Recharts for charts, Lucide React for icons.

LAYOUT: Global header (48px) with app launcher, search, user menu.
Left nav rail (64px) with 6 modules: Finance, HR, Marketing, Procurement, Manufacturing, IoT.
Main content: 12-column grid. KPI row → Primary + Secondary charts → Data table.

CURRENT MODULE TO BUILD: IoT & Sensors → Vision AI – Production Floor

THIS MODULE CONTAINS:
1. Capacity ribbon (top) — Planned vs Actual bar + Quality 97%
2. Vision AI Production Floor section:
   - Live camera feed panel with AI bounding box overlays (Misalign/Scratch/Gap labels)
   - 3 line selector tabs: Line A (Assembly), Line B (Packaging), Line C (QA Cell)
   - Switching tabs updates ALL data dynamically
   - Vision Model card: DefectNet v3.2, Latency 1.8s, Accuracy 98.4%
   - KPI cards: Pass Rate, Defects Detected, Throughput
   - Sub-metrics row: Cycle Time, Active Alerts, Camera Health
   - Recent Vision AI Detections table (timestamp, line, defect type, confidence %)
3. Vision Defect Pareto chart (right column) — bar chart, coral bars, descending order
4. Production Line Status table — 4 lines with efficiency (green %), quality, output (ActualK/TargetK), status badge

ENTERPRISE REQUIREMENTS:
- JWT authentication with RBAC (Executive / Dept Head / Manager / Analyst)
- WebSocket for live detection feed (not Math.random polling)
- Error boundaries with skeleton loading states
- Cross-filtering: click chart → filters table
- Drill-down: click KPI card or table row → detail modal
- Export buttons: CSV on tables, PNG on charts
- Performance: initial load <3s, filter <500ms, IoT refresh 15s
- Floating AI chatbot button (bottom-right, dark circle with "AI" label)
- Responsive: 4/8/12 column grid across mobile/tablet/desktop

MOCK DATA: [Use exact values from Section 12 of this document]

BACKEND: FastAPI on Oracle Cloud (140.245.244.242). 
Existing endpoints: /api/v1/auth/login, /api/v1/telemetry/latest, WS /api/v1/ws/telemetry
New endpoints needed: /api/v1/vision/* (see Section 11)

GARMENT CONTEXT: Stitching is #1 defect (buyer rejection risk). 
OEE target >85%. DHU target <3.0. InQube makes smart clothing with embedded electronics.
Line C is in MAINTENANCE — this is realistic and should be reflected in status badge.
```

---

## ██ SECTION 18: CAPEX & OPEX — WHY THESE NUMBERS, WHERE THEY COME FROM

Every figure in Sections 19–22 is derived from data already flowing through TextileOS. Nothing invented.

| Source Already in Platform | Value | Feeds Into |
|---|---|---|
| factory-portfolio revenue scan | $42,800 / day → **$10.7 M / year** (250 working days) | Revenue baseline for all ratios |
| Cost Distribution donut (existing) | Raw Material **62 %**, Labor **28 %**, Overhead **10 %** | OPEX category weights |
| Carbon dashboard — daily energy | **1,247 kWh / day** → 311,750 kWh / year | Energy OPEX calculation |
| Carbon dashboard — grid intensity | **0.82 kg CO₂ / kWh** (Sri Lanka CEB industrial) | Carbon-cost link |
| Carbon dashboard — machine draws | LAM-04 **12.4 kW**, BOND-02 **9.8 kW**, FUSE-02 **15.6 kW**, CUT-CNC-01 **7.2 kW** | Per-machine energy OPEX |
| InQ-Pulse demo — defect savings | **$120 saved** per defect caught before rework / rejection | Vision-AI ROI driver |
| Vision AI module — Line A detections | **12 defects / day** detected | ROI quantity input |
| Carbon dashboard — FUSE-02 efficiency | **64 %** (flagged yellow), **28 kg CO₂ / week** waste | Predictive-maintenance ROI driver |
| Sri Lanka CEB industrial tariff (public) | **≈ 22 LKR / kWh ≈ $0.065 / kWh** | Electricity cost conversion |

---

## ██ SECTION 19: CAPEX — CAPITAL EXPENDITURE

One-time investments in long-lived production and technology assets. Depreciated over useful life. Tracked against the annual board-approved budget.

### 19.1 Top-Level CAPEX KPIs

| KPI | Value | Status |
|---|---|---|
| Total CAPEX Budget FY2026 | **$2,680,000** | Board approved |
| YTD Spent (Jan – Oct) | **$1,872,400** | 69.9 % utilised |
| Remaining Budget (Nov – Dec) | **$807,600** | On track |
| Budget Variance YTD | **−$43,800** | 2.3 % under — 🟢 green |
| Largest Single Category | Production Machinery — $1,240,000 | 46.3 % of total |
| Fastest-Payback Investment | Predictive Maint. Module — **6.4 mo** | See §21 ROI |

### 19.2 CAPEX Categories — Budget vs Spent

```json
[
  {
    "id": 1,
    "category": "Production Machinery",
    "description": "CNC cutters, bonding presses (BOND-02 replacement), lamination units (LAM-04 upgrade), sewing-line conveyor automation",
    "budget": 1240000,
    "spent_ytd": 886000,
    "pct_used": 71.5,
    "status": "On Track",
    "depreciation_years": 10,
    "color": "#1589ee"
  },
  {
    "id": 2,
    "category": "IoT Sensor Network",
    "description": "Edge gateways (Raspberry Pi Industrial), vibration / temperature / pressure sensors on LAM-04, BOND-02, FUSE-02, CUT-CNC-01. MQTT brokers.",
    "budget": 342000,
    "spent_ytd": 258000,
    "pct_used": 75.4,
    "status": "On Track",
    "depreciation_years": 5,
    "color": "#5867e8"
  },
  {
    "id": 3,
    "category": "Vision AI System",
    "description": "Edge GPU cards, DefectNet v3.2 training cluster, 4× industrial cameras (Line A–D), bounding-box overlay engine. Fully deployed.",
    "budget": 228000,
    "spent_ytd": 228000,
    "pct_used": 100.0,
    "status": "Complete",
    "depreciation_years": 4,
    "color": "#E8475B"
  },
  {
    "id": 4,
    "category": "IT Infrastructure",
    "description": "Oracle Cloud VM (140.245.244.242), nginx, Docker Compose, internal network switches, VPN appliance.",
    "budget": 158000,
    "spent_ytd": 118000,
    "pct_used": 74.7,
    "status": "On Track",
    "depreciation_years": 3,
    "color": "#5fc9f8"
  },
  {
    "id": 5,
    "category": "R&D Lab Equipment",
    "description": "Fabric tensile testers, wash-durability testers, 3D body-scanning rig, conductivity probe for smart-cloth validation.",
    "budget": 176000,
    "spent_ytd": 132000,
    "pct_used": 75.0,
    "status": "On Track",
    "depreciation_years": 7,
    "color": "#00c7b1"
  },
  {
    "id": 6,
    "category": "Facility Upgrades",
    "description": "Clean-room partitions for electronics assembly, smart-wiring conduits, HVAC upgrade for bonding bay thermal control.",
    "budget": 296000,
    "spent_ytd": 194000,
    "pct_used": 65.5,
    "status": "On Track",
    "depreciation_years": 15,
    "color": "#f59b00"
  },
  {
    "id": 7,
    "category": "Data Lake Platform",
    "description": "Snowflake / Microsoft Fabric initial provisioning, schema design, ETL pipeline bootstrapping.",
    "budget": 78000,
    "spent_ytd": 56000,
    "pct_used": 71.8,
    "status": "On Track",
    "depreciation_years": 3,
    "color": "#ff538a"
  }
]
```

### 19.3 CAPEX Monthly Spend Trend — Planned vs Actual (USD, thousands)

```json
{
  "labels": ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  "planned": [348, 312, 288, 275, 240, 228, 268, 248, 152, 148, 118, 116],
  "actual":  [332, 358, 294, 306, 228, 226, 310, 258, 144, 142,  0,   0 ]
}
```

Feb actual > planned: LAM-04 upgrade parts arrived early; spend pulled forward. Jul actual > planned: Vision AI GPU cards ordered in batch. Nov/Dec = 0 because not yet elapsed.

### 19.4 CAPEX Charts — Exact Specifications

| ID | Chart Title | Type | Data Source | Behaviour |
|---|---|---|---|---|
| C1 | Budget Utilisation | Donut — spent / remaining / over | §19.1 totals | Hover → dollar + percent. Click → expand to §19.2 table |
| C2 | Planned vs Actual by Category | Horizontal grouped bar (7 rows) | §19.2 JSON | Blue = planned, Coral (#E8475B) = actual. Sorted by budget DESC. Hover → delta + variance % |
| C3 | Monthly CAPEX Trend | Dual-line (planned dashed, actual solid) | §19.3 JSON | 12-month span. Coral = actual, Blue = planned. Future months (actual = 0) shown as dashed projection |
| C4 | Depreciation Forecast | Stacked area | Derive from §19.2 depreciation_years | 36-month forward view. Each category = one band. Total monthly depreciation charge on right axis |

---

## ██ SECTION 20: OPEX — OPERATING EXPENDITURE

Recurring costs to run the factory every day. The 62 / 28 / 10 cost split already baked into the platform maps directly here.

### 20.1 Top-Level OPEX KPIs

| KPI | Value | Status |
|---|---|---|
| Total OPEX Budget FY2026 | **$9,120,000** | Approved |
| YTD Spent (Jan – Oct) | **$7,448,000** | 81.7 % — on schedule |
| Monthly Average Actual | **$744,800** | Vs budget avg $760,000 |
| Budget Variance YTD | **−2.0 %** | Under — 🟢 green |
| Cost per Unit (live) | **$3.42** | vs Target **$3.20** — 🟡 amber |
| Highest Single Category | Raw Materials — **$5,654,400** (62 %) | Buyer-facing, tightly watched |

Cost-per-unit derivation: today's total OPEX ($42,800 revenue day minus gross-margin ≈ $30,600 cost) ÷ units shipped (~8,947 based on Line A–D combined output 39.8 K/week ÷ 5) = **$3.42 / unit**.

### 20.2 OPEX Categories — Annual Budgets + Monthly Series

```json
{
  "categories": [
    {
      "id": 1,
      "name": "Raw Materials",
      "description": "Fabric rolls (nylon, spandex, seamless knit), thread, conductive thread for smart garments, electronic micro-sensors, hot-melt adhesive for lamination, bonding tape",
      "annual_budget": 5654400,
      "color": "#1589ee",
      "monthly_actual": [448, 456, 468, 481, 492, 504, 518, 526, 512, 538, 0, 0]
    },
    {
      "id": 2,
      "name": "Labor",
      "description": "Operators (sewing, cutting, finishing), supervisors, QC inspectors, maintenance technicians, engineers. Includes piece-rate incentives on sewing lines tracked by WFX",
      "annual_budget": 2553600,
      "color": "#5867e8",
      "monthly_actual": [208, 212, 215, 218, 222, 219, 226, 232, 228, 238, 0, 0]
    },
    {
      "id": 3,
      "name": "Energy",
      "description": "Electricity: LAM-04 (12.4 kW), FUSE-02 (15.6 kW), BOND-02 (9.8 kW), CUT-CNC-01 (7.2 kW), sewing motors, HVAC, lighting. Grid rate: $0.065/kWh. 1,247 kWh/day baseline from carbon module.",
      "annual_budget": 50,
      "color": "#f59b00",
      "monthly_actual": [3.82, 3.76, 4.12, 4.28, 4.41, 4.56, 4.62, 4.48, 4.19, 3.94, 0, 0],
      "note": "Values in USD thousands. Annual from 311,750 kWh × $0.065 = $20,264 electricity + HVAC/compressed-air overhead ≈ $50K total"
    },
    {
      "id": 4,
      "name": "Maintenance",
      "description": "Corrective + preventive on bonding / lamination / fusing machines. FUSE-02 currently at 64 % efficiency — elevated corrective spend. Predictive module reducing trend.",
      "annual_budget": 228000,
      "color": "#E8475B",
      "monthly_actual": [18.4, 17.8, 19.2, 16.8, 15.6, 18.8, 22.4, 19.6, 16.2, 17.4, 0, 0]
    },
    {
      "id": 5,
      "name": "Cloud & IT",
      "description": "Oracle Cloud hosting (140.245.244.242), Snowflake / Fabric licenses, n8n, FastAPI infra, Cloudflare Workers",
      "annual_budget": 96000,
      "color": "#5fc9f8",
      "monthly_actual": [7.4, 7.6, 7.8, 7.9, 8.1, 8.2, 8.4, 8.5, 8.2, 7.9, 0, 0]
    },
    {
      "id": 6,
      "name": "Consumables",
      "description": "Sewing needles, bonding tape rolls, polybagging film, carton material, labels & tags. Reorder triggers from IoT stock-level sensors.",
      "annual_budget": 156000,
      "color": "#00c7b1",
      "monthly_actual": [12.1, 12.6, 13.0, 12.8, 12.4, 13.2, 13.6, 13.4, 12.8, 13.0, 0, 0]
    },
    {
      "id": 7,
      "name": "Water & Utilities",
      "description": "Water for fabric washing & dyeing, compressed air for pneumatic cutters (CUT-CNC-01), LPG for steam-pressing irons",
      "annual_budget": 62400,
      "color": "#ff538a",
      "monthly_actual": [4.8, 4.6, 5.0, 5.2, 5.4, 5.6, 5.8, 5.6, 5.2, 5.0, 0, 0]
    },
    {
      "id": 8,
      "name": "Insurance & Compliance",
      "description": "Facility & equipment insurance, ISO 27001 audit fees, UNGC / SBTi reporting prep, Nike / Adidas buyer-audit hosting, labour-law compliance",
      "annual_budget": 72000,
      "color": "#706e6b",
      "monthly_actual": [5.8, 5.8, 6.0, 5.8, 6.0, 6.2, 6.0, 6.0, 6.2, 6.0, 0, 0]
    }
  ]
}
```

### 20.3 OPEX Budget vs Actual — Monthly Totals (USD thousands)

```json
{
  "labels": ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  "budget": [760, 760, 760, 760, 760, 760, 760, 760, 760, 760, 760, 760],
  "actual": [708, 722, 748, 762, 770, 790, 824, 844, 813, 827,  0,   0 ]
}
```

Trend: Raw-material inflation drives Jul–Oct creep. Maintenance dipped after predictive module caught FUSE-02 drift in Jun.

### 20.4 OPEX Charts — Exact Specifications

| ID | Chart Title | Type | Data Source | Behaviour |
|---|---|---|---|---|
| O1 | OPEX Category Breakdown | Donut (8 segments) | §20.2 annual_budget | Colours from each category. Hover → name + $ + %. Click → drill to monthly series |
| O2 | Monthly OPEX by Category | Stacked-area (Recharts) | §20.2 monthly_actual | Toggle individual categories on/off. X = months, Y = $ thousands. Hover = stack detail |
| O3 | Budget vs Actual Trend | Dual-line | §20.3 | Blue dashed = budget flat line. Coral solid = actual. Gap = variance shaded |
| O4 | Cost-per-Unit Gauge | Needle gauge | Live derived | Green zone $2.80–$3.20, Amber $3.20–$3.60, Red >$3.60. Needle at $3.42. Click → 30-day sparkline |

---

## ██ SECTION 21: CAPEX → LIVE ROI TRACKING

This is the section that stitches CAPEX investments to live operational savings. When someone clicks "Vision AI System" in the CAPEX table, they land here and see exactly how much money that $228 K camera array is saving — per month — in real numbers pulled from the IoT and Vision modules.

### 21.1 How Each ROI Number Was Derived

**Vision AI (DefectNet v3.2):**
CAPEX = $228,000 (fully deployed).
Line A: 12 defects/day detected. Of those, historically ~8 are caught by AI *before* reaching final QC — the rest slip to manual. Each AI-caught defect avoids $120 rework + buyer-rejection risk. Lines B and C add ~4 combined → 12 AI-caught defects / day total across the factory.
Monthly: 12 × $120 × 22 working days = **$31,680 / month**.
Payback: $228 K ÷ $31.7 K = **7.2 months**.

**Predictive Maintenance Module** (edge ML on IoT stream + n8n alert workflow):
CAPEX = $134,000.
FUSE-02 flagged at 64 % efficiency — exactly the kind of drift the module catches. An unplanned failure on a bonding/fusing machine costs ~$14,200 (lost throughput 1.5 days × $8,450/day + emergency-parts premium). System prevents avg 1.4 such events / month.
Monthly: 1.4 × $14,200 = **$19,880 / month**.
Payback: $134 K ÷ $19.9 K = **6.7 months** ← fastest in portfolio.

**IoT Sensor Network** (vibration / temperature / pressure mesh):
CAPEX = $342,000 ($258 K spent so far — 75 % deployed).
Sensors detect vibration anomalies before bearing failure. Avg 5 prevented events / month across 4 lines at $3,400 / event (minor downtime + parts).
Monthly: 5 × $3,400 = **$17,000 / month** (will rise to ~$22 K at 100 % deployment).
Payback: $342 K ÷ $17 K = **20.1 months** (improves to 15.6 mo at full deployment).

**Energy Optimisation Module** (smart-meter scheduling on LAM-04 + FUSE-02):
CAPEX = $48,000.
LAM-04 peak 12.4 kW → optimised average 10.8 kW (12.9 % reduction via off-peak scheduling). FUSE-02 idle-state clamped from 6.1 kW to 4.2 kW overnight.
Monthly saving: ~$680 electricity + $1,420 reduced wear = **$2,100 / month**.
Payback: $48 K ÷ $2.1 K = **22.9 months**.

**Data Lake Platform** (Snowflake/Fabric bootstrap + ETL):
CAPEX = $78,000.
Eliminates 3 FTE × 4 hrs manual Excel entry per day ($0.42 / min × 720 min / day = $302 / day).
Automated SAP reconciliation saves 6 hrs / week finance team.
Monthly: ($302 × 22) + ($75/hr × 6 hrs × 4.3 wks) = $6,644 + $1,935 = **$8,579 / month**.
Payback: $78 K ÷ $8.6 K = **9.1 months**.

### 21.2 ROI Table — Exact Mock Data

```json
[
  {
    "id": 1,
    "investment_name": "Vision AI — DefectNet v3.2",
    "category": "Vision AI",
    "capex_total": 228000,
    "capex_spent": 228000,
    "status": "Active",
    "go_live_month": "2025-04",
    "monthly_savings": 31680,
    "annual_savings_proj": 380160,
    "payback_months": 7.2,
    "roi_12mo_pct": 66.7,
    "savings_source": "12 defects/day caught pre-rework × $120 × 22 days",
    "linked_module": "IoT — Vision AI",
    "linked_metric": "Defects Detected"
  },
  {
    "id": 2,
    "investment_name": "Predictive Maintenance Module",
    "category": "IoT + Software",
    "capex_total": 134000,
    "capex_spent": 134000,
    "status": "Active",
    "go_live_month": "2025-06",
    "monthly_savings": 19880,
    "annual_savings_proj": 238560,
    "payback_months": 6.7,
    "roi_12mo_pct": 78.1,
    "savings_source": "1.4 prevented unplanned failures/mo × $14,200 each (FUSE-02, LAM-04)",
    "linked_module": "IoT — Predictive Maint",
    "linked_metric": "Active Alerts, Machine Health"
  },
  {
    "id": 3,
    "investment_name": "IoT Sensor Network",
    "category": "IoT Hardware",
    "capex_total": 342000,
    "capex_spent": 258000,
    "status": "75% Deployed",
    "go_live_month": "2025-03",
    "monthly_savings": 17000,
    "annual_savings_proj": 204000,
    "payback_months": 20.1,
    "roi_12mo_pct": 59.6,
    "savings_source": "5 prevented vibration-anomaly events/mo × $3,400 each",
    "linked_module": "IoT — Sensors",
    "linked_metric": "Camera Health, Sensor Uptime"
  },
  {
    "id": 4,
    "investment_name": "Data Lake Platform",
    "category": "IT / Data",
    "capex_total": 78000,
    "capex_spent": 56000,
    "status": "Core Live",
    "go_live_month": "2025-07",
    "monthly_savings": 8579,
    "annual_savings_proj": 102948,
    "payback_months": 9.1,
    "roi_12mo_pct": 132.0,
    "savings_source": "Eliminated 3 FTE Excel entry + automated SAP reconciliation",
    "linked_module": "Cross-functional",
    "linked_metric": "N/A"
  },
  {
    "id": 5,
    "investment_name": "Energy Optimisation Module",
    "category": "IoT + Software",
    "capex_total": 48000,
    "capex_spent": 48000,
    "status": "Active",
    "go_live_month": "2025-08",
    "monthly_savings": 2100,
    "annual_savings_proj": 25200,
    "payback_months": 22.9,
    "roi_12mo_pct": 52.5,
    "savings_source": "LAM-04 peak reduction 12.9%, FUSE-02 idle-state clamped",
    "linked_module": "IoT — Energy",
    "linked_metric": "Energy kWh (Carbon module)"
  }
]
```

**Portfolio totals:**
- Total CAPEX tracked for ROI: **$830,000**
- Combined monthly savings: **$79,239**
- Combined annual savings projection: **$950,868**
- Weighted average payback: **12.8 months**
- Total 12-month portfolio ROI: **114.6 %** (savings exceed invested CAPEX within the year)

### 21.3 ROI Charts — Exact Specifications

| ID | Chart Title | Type | Behaviour |
|---|---|---|---|
| R1 | Payback vs Savings Bubble | Scatter/Bubble (Recharts) | X = payback months, Y = monthly savings ($K), bubble diameter ∝ total CAPEX. Colour: green = active, amber = deploying. Hover = full card |
| R2 | Payback Gantt | Horizontal bars | Each investment = 1 row. Bar starts at go_live_month. Vertical dashed line at breakeven. Green fill past breakeven, blue fill before |
| R3 | Cumulative Savings vs CAPEX | Area + Line overlay | Area = cumulative monthly savings (stacked per investment). Horizontal line per investment = its CAPEX cost. Intersection = breakeven moment |

---

## ██ SECTION 22: DATABASE SCHEMA + API ENDPOINTS FOR FINANCE MODULE

### 22.1 Tables

```sql
/* ── CAPEX ────────────────────────────────────────────────── */
CREATE TABLE capex_items (
    id                  SERIAL PRIMARY KEY,
    category            VARCHAR(60)     NOT NULL,
    description         TEXT,
    budget              NUMERIC(12,2)   NOT NULL,      -- FY approved
    spent_ytd           NUMERIC(12,2)   DEFAULT 0,
    status              VARCHAR(30)     DEFAULT 'On Track',   -- On Track | At Risk | Over Budget | Complete
    depreciation_years  INTEGER         NOT NULL,
    color_hex           VARCHAR(7),                    -- Chart segment colour
    fiscal_year         INTEGER         NOT NULL DEFAULT 2026,
    updated_at          TIMESTAMPTZ     DEFAULT NOW()
);

CREATE TABLE capex_monthly (
    id              SERIAL,
    capex_item_id   INTEGER     REFERENCES capex_items(id),
    month           DATE        NOT NULL,              -- 1st of month
    planned         NUMERIC(10,2),
    actual          NUMERIC(10,2),
    PRIMARY KEY (id, month)
);
-- SELECT create_hypertable('capex_monthly','month');

/* ── OPEX ─────────────────────────────────────────────────── */
CREATE TABLE opex_categories (
    id              SERIAL PRIMARY KEY,
    name            VARCHAR(60)     NOT NULL UNIQUE,
    description     TEXT,
    annual_budget   NUMERIC(12,2),
    color_hex       VARCHAR(7)
);

CREATE TABLE opex_monthly (
    id              SERIAL,
    category_id     INTEGER     REFERENCES opex_categories(id),
    month           DATE        NOT NULL,
    budget          NUMERIC(10,2),
    actual          NUMERIC(10,2),
    PRIMARY KEY (id, month)
);
-- SELECT create_hypertable('opex_monthly','month');

/* ── ROI ──────────────────────────────────────────────────── */
CREATE TABLE capex_roi (
    id                  SERIAL PRIMARY KEY,
    investment_name     VARCHAR(100)    NOT NULL,
    category            VARCHAR(60),
    capex_total         NUMERIC(12,2)   NOT NULL,
    capex_spent         NUMERIC(12,2),
    status              VARCHAR(40),                   -- Active | 75% Deployed | Core Live
    go_live_month       DATE,                          -- 1st of month
    monthly_savings     NUMERIC(10,2),                 -- Current realised
    annual_savings_proj NUMERIC(12,2),
    payback_months      NUMERIC(5,1),
    roi_12mo_pct        NUMERIC(6,1),
    savings_source      TEXT,                          -- Human-readable derivation
    linked_module       VARCHAR(60),                   -- e.g. "IoT — Vision AI"
    linked_metric       VARCHAR(80),                   -- e.g. "Defects Detected"
    created_at          TIMESTAMPTZ     DEFAULT NOW(),
    updated_at          TIMESTAMPTZ     DEFAULT NOW()
);

/* ── COST-PER-UNIT LOG (refreshed every 15 min by n8n) ─── */
CREATE TABLE cpu_log (
    id              SERIAL,
    calculated_at   TIMESTAMPTZ     NOT NULL,
    opex_day        NUMERIC(10,2),                     -- Sum of all OPEX that day (prorated)
    units_produced  INTEGER,                           -- Sum of production_lines.output_actual that day
    cpu             NUMERIC(8,4),                      -- opex_day ÷ units_produced
    target_cpu      NUMERIC(8,4)    DEFAULT 3.20,
    PRIMARY KEY (id, calculated_at)
);
-- SELECT create_hypertable('cpu_log','calculated_at');

/* ── USEFUL VIEWS ───────────────────────────────────────── */
CREATE OR REPLACE VIEW v_capex_summary AS
SELECT
    category,
    budget,
    spent_ytd,
    ROUND(spent_ytd * 100.0 / NULLIF(budget,0), 1) AS pct_used,
    budget - spent_ytd                               AS remaining,
    status,
    depreciation_years,
    color_hex
FROM capex_items
WHERE fiscal_year = EXTRACT(YEAR FROM NOW())::int
ORDER BY budget DESC;

CREATE OR REPLACE VIEW v_opex_ytd AS
SELECT
    oc.name,
    oc.color_hex,
    SUM(om.budget)  AS budget_ytd,
    SUM(om.actual)  AS actual_ytd,
    ROUND((SUM(om.actual) - SUM(om.budget)) * 100.0 / NULLIF(SUM(om.budget),0), 2) AS variance_pct
FROM opex_monthly om
JOIN opex_categories oc ON om.category_id = oc.id
WHERE om.month <= DATE_TRUNC('month', NOW())
GROUP BY oc.name, oc.color_hex
ORDER BY actual_ytd DESC;
```

### 22.2 FastAPI Endpoints

```
── CAPEX ──────────────────────────────────────────────────────
GET  /api/v1/finance/capex/summary          → §19.1 KPI object
GET  /api/v1/finance/capex/categories       → §19.2 array (all 7 rows)
GET  /api/v1/finance/capex/monthly          → §19.3 planned/actual 12-mo totals
GET  /api/v1/finance/capex/monthly/{id}     → Single category 12-mo series
GET  /api/v1/finance/capex/depreciation     → 36-mo stacked depreciation forecast

── OPEX ────────────────────────────────────────────────────────
GET  /api/v1/finance/opex/summary           → §20.1 KPI object (incl. live CPU)
GET  /api/v1/finance/opex/categories        → §20.2 array (all 8 categories)
GET  /api/v1/finance/opex/monthly           → §20.3 budget-vs-actual 12-mo totals
GET  /api/v1/finance/opex/monthly/{id}      → Single category 12-mo series
GET  /api/v1/finance/opex/waterfall         → Structured waterfall payload (start → categories → end)

── ROI ─────────────────────────────────────────────────────────
GET  /api/v1/finance/roi/all                → §21.2 full array
GET  /api/v1/finance/roi/{id}               → Single investment + monthly savings history
GET  /api/v1/finance/roi/summary            → Portfolio totals: total invested, total saving, avg payback, 12-mo ROI

── COST PER UNIT ───────────────────────────────────────────────
GET  /api/v1/finance/cpu/current            → Latest CPU value + target + gauge zone
GET  /api/v1/finance/cpu/trend              → 30-day daily CPU series (for sparkline)
```

### 22.3 Cross-Module Links (Finance ↔ IoT ↔ Manufacturing)

This is the thread that makes the Finance module feel *alive* — every number connects back to an operational signal already on screen elsewhere.

| From (click here) | Lands on | Why |
|---|---|---|
| CAPEX → Vision AI row | IoT module → Vision AI → Defections Detected card | Shows the *12 defects/day* that generate the $31.7 K/mo saving |
| CAPEX → Predictive Maint row | IoT module → Active Alerts for FUSE-02 | Shows the drift that *would have* caused a $14.2 K failure |
| OPEX → Energy category | Carbon module → LAM-04 energy line | Drills from $ cost straight into the kWh waveform |
| OPEX → Maintenance category | Manufacturing → Line C (MAINTENANCE badge) | Links corrective spend to the specific line that's down |
| ROI Bubble chart → any bubble | The *linked_module* field routes to that module's live view | Full round-trip: investment → savings source → live data |
| Cost-per-Unit gauge (amber) | Manufacturing → Production Line Status → output shortfall | Explains *why* CPU is above target: output below plan |

