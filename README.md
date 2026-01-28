# InQube Manufacturing Intelligence MVP

> **A Next-Gen Manufacturing Intelligence Dashboard powered by Cloudflare Workers.**
> Real-time monitoring, AI-driven insights, and seamless data integration.

---

## 🧠 Graphical Brainstorm: The Process

### 1. High-Level Architecture
How data flows from the factory floor to the decision-maker.

```mermaid
graph LR
    subgraph "Factory Floor (Data Sources)"
        A[IoT Sensors] -->|MQTT| D[Data Lake]
        B[ERP System] -->|REST| D
        C[SAP Orders] -->|SOAP| D
    end

    subgraph "InQube Core"
        D[(Unified Data Lake)] -->|Stream| E{AI Engine}
        E -->|Analyze| F[Anomaly Detection]
        E -->|Predict| G[Trend Forecasting]
    end

    subgraph "User Interface"
        F -->|Alerts| H[Dashboard]
        G -->|Insights| H
        H -->|Action| I((User Decision))
    end

    I -->|Feedback Loop| E
    style D fill:#4f46e5,stroke:#fff,stroke-width:2px,color:#fff
    style E fill:#10b981,stroke:#fff,stroke-width:2px,color:#fff
    style H fill:#f59e0b,stroke:#fff,stroke-width:2px,color:#fff
```

### 2. The AI Decision Loop
How the system turns raw data into actionable recommendations.

```mermaid
sequenceDiagram
    participant S as Sensors (T-802)
    participant L as Data Lake
    participant AI as InQube AI
    participant D as Dashboard
    participant U as Plant Manager

    Note over S, U: Real-time Monitoring Phase
    S->>L: Send Temperature Data (176°C)
    L->>AI: Stream Update
    AI->>AI: Analyze Pattern (Drift Detected)
    
    Note over AI, U: Insight Generation Phase
    AI->>D: Trigger Alert #47
    D->>U: Show Recommendation (Increase Setpoint)
    
    Note over U, S: Action Phase
    U->>D: Approve Recommendation
    D->>S: Adjust Heater Parameters
    D->>AI: Log Success (Reinforcement Learning)
```

---

## 🚀 Key Features

*   **Real-time Visualization**: Live charts and KPI monitoring using Chart.js.
*   **AI-Driven Insights**: Automatic anomaly detection and actionable recommendations.
*   **Interactive Decision Making**: "Human-in-the-loop" interface for approving/rejecting AI suggestions.
*   **Premium UI**: "Industrial Future" aesthetic with glassmorphism and Tailwind CSS.
*   **Edge Deployed**: Runs globally on Cloudflare Workers for <50ms latency.

## 🛠️ Technology Stack

| Component | Technology |
| :--- | :--- |
| **Runtime** | Cloudflare Workers (Serverless) |
| **Frontend** | HTML5, Tailwind CSS, Vanilla JS |
| **Visualization** | Chart.js |
| **Icons** | Phosphor Icons |
| **Deployment** | Wrangler CLI |

## 📦 Setup & Deployment

1.  **Clone the repository**
    ```bash
    git clone https://github.com/randunun-eng/inqube-mvp.git
    cd inqube-mvp
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Locally**
    ```bash
    npx wrangler dev
    ```

4.  **Deploy to Cloudflare**
    ```bash
    npx wrangler deploy
    ```

---

## ⚠️ Prototype Disclaimer
*This is a 24-hour MVP demonstration using simulated data. In a production environment, this would connect to real PostgreSQL/TimescaleDB instances and live IoT telemetry streams.*
