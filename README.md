# InQube Manufacturing Intelligence MVP

> **Bridging the gap between Operational Technology (OT) and Information Technology (IT).**
> A comprehensive suite of dashboards for the modern smart factory.

---

## 🌐 Live Demonstrations

This repository hosts three distinct dashboards, each serving a specific strategic purpose in the manufacturing lifecycle.

| Dashboard | Purpose | Live Link |
| :--- | :--- | :--- |
| **1. Factory Command Center** | **Macro View:** Full factory visibility (Cutting, Sewing, Finishing). Connects shop-floor IoT to executive KPIs. | [🚀 Launch Dashboard](https://factory-portfolio.randunun.workers.dev) |
| **2. InQube Smart Lab** | **Micro View:** Predictive quality control for the **Smart Bra Lamination** process. Features Agentic AI for anomaly detection. | [🚀 Launch Dashboard](https://inqube-demo.randunun.workers.dev) |
| **3. Carbon Intelligence** | **Strategic View:** Machine-level carbon accounting. Enables UNGC & SBTi compliance reporting using real telemetry. | [🚀 Launch Dashboard](https://carbon-intelligence.randunun.workers.dev) |

---

## 🏗️ The "Three-Dashboard" Architecture

This system bridges the gap between **Operational Technology (OT)** and **Information Technology (IT)**, feeding three distinct views from a single unified data lake.

```mermaid
graph TD
    subgraph "Level 1: The Physical Layer (OT)"
        A[Factory Floor Machines] -->|Telemetry| B(Edge Gateway / MQTT)
        A2[Smart Lab Sensors] -->|High Freq Data| B
        A3[Energy Meters] -->|CO2 Data| B
    end

    subgraph "Level 2: The Data Foundation (IT)"
        B -->|Stream| C{Unified Data Lake<br/>(Snowflake / Fabric)}
        C -->|Context| D[ERP / SAP Integration]
        C -->|Intelligence| E[AI Engine]
    end

    subgraph "Level 3: The Three-Dashboard Arsenal"
        C -->|Aggregated KPIs| D1[1. Factory Command Center<br/>(Macro View)]
        E -->|Real-time Alerts| D2[2. InQube Smart Lab<br/>(Micro View)]
        C -->|Compliance Data| D3[3. Carbon Intelligence<br/>(Strategic View)]
    end

    style D1 fill:#3b82f6,stroke:#fff,stroke-width:2px,color:#fff
    style D2 fill:#10b981,stroke:#fff,stroke-width:2px,color:#fff
    style D3 fill:#f59e0b,stroke:#fff,stroke-width:2px,color:#fff
```

### Strategic Alignment
*   **Dashboard #1 (Blue):** Solves the **Executive** need for visibility.
*   **Dashboard #2 (Green):** Solves the **Engineering** need for predictive quality (Agentic AI).
*   **Dashboard #3 (Orange):** Solves the **Sustainability** need for UNGC/SBTi compliance.

---

## 🚀 Key Features

*   **Real-time Visualization**: High-frequency data rendering using Chart.js and WebSockets (simulated).
*   **Agentic AI**: "Human-in-the-loop" interface where AI proposes actions and operators approve/reject.
*   **Sustainability Tracking**: ISO 14064-1 compliant carbon accounting at the machine level.
*   **Premium UI**: "Industrial Future" aesthetic designed for modern control rooms (Glassmorphism, Dark Mode).
*   **Edge Native**: Deployed on Cloudflare Workers for global low-latency access (<50ms).

## 🛠️ Technology Stack

*   **Runtime:** Cloudflare Workers (Serverless)
*   **Frontend:** HTML5, Tailwind CSS, Vanilla JS
*   **Visualization:** Chart.js
*   **Icons:** Phosphor Icons
*   **Deployment:** Wrangler CLI

---

## 📦 Local Development

1.  **Clone the repository**
    ```bash
    git clone https://github.com/randunun-eng/inqube-mvp.git
    cd inqube-mvp
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Dashboards Locally**
    ```bash
    # Run Factory Command Center
    npx wrangler dev --config wrangler-factory.toml

    # Run Smart Lab Monitor
    npx wrangler dev --config wrangler.toml

    # Run Carbon Intelligence
    npx wrangler dev --config wrangler-carbon.toml
    ```

---

## ⚠️ Prototype Disclaimer
*This project is a 24-hour MVP demonstration using simulated data streams. In a production environment, this architecture connects to real PostgreSQL/TimescaleDB instances and live IoT telemetry.*
