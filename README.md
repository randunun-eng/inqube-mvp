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

## 🧠 System Architecture

### 1. The Data Pipeline
How we turn physical machine signals into business intelligence.

```mermaid
graph LR
    subgraph "OT Layer (Factory Floor)"
        A[IoT Sensors] -->|MQTT| D[Unified Data Lake]
        B[PLCs / SCADA] -->|OPC-UA| D
        C[Energy Meters] -->|Modbus| D
    end

    subgraph "IT Layer (Cloud)"
        D[(Snowflake / Fabric)] -->|Stream| E{AI Engine}
        E -->|Analyze| F[Anomaly Detection]
        E -->|Calculate| G[Carbon Footprint]
    end

    subgraph "Action Layer (User)"
        F -->|Alerts| H[Dashboards]
        G -->|Reports| H
        H -->|Decision| I((Plant Manager))
    end

    I -->|Control Signal| A
    style D fill:#4f46e5,stroke:#fff,stroke-width:2px,color:#fff
    style E fill:#10b981,stroke:#fff,stroke-width:2px,color:#fff
    style H fill:#f59e0b,stroke:#fff,stroke-width:2px,color:#fff
```

### 2. The AI Decision Loop (Agentic Workflow)
How the "Smart Lab" dashboard prevents defects before they happen.

```mermaid
sequenceDiagram
    participant S as Sensor (T-802)
    participant L as Data Lake
    participant AI as InQube AI
    participant D as Dashboard
    participant U as Operator

    Note over S, U: Real-time Monitoring
    S->>L: Telemetry: 176°C (Drifting)
    L->>AI: Stream Update
    AI->>AI: Detect Pattern (Quality Risk)
    
    Note over AI, U: Intervention
    AI->>D: Trigger Alert #47
    D->>U: Recommendation: Increase Setpoint +3°C
    
    Note over U, S: Resolution
    U->>D: Approve Action
    D->>S: Adjust Heater Parameters
    D->>AI: Log Success (Reinforcement Learning)
```

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
