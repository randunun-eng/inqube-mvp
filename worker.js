
export default {
    async fetch() {
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>InQube | Manufacturing Intelligence</title>

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          },
          colors: {
            slate: {
              850: '#151f32',
              900: '#0f172a',
              950: '#020617',
            },
            primary: {
              400: '#38bdf8', // Sky 400
              500: '#0ea5e9', // Sky 500
              600: '#0284c7', // Sky 600
            },
            accent: {
              400: '#2dd4bf', // Teal 400
            }
          }
        }
      }
    }
  </script>

  <!-- Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  
  <!-- Icons -->
  <script src="https://unpkg.com/@phosphor-icons/web"></script>

  <style>
    body {
      background-color: #020617; /* Slate 950 */
      color: #e2e8f0; /* Slate 200 */
    }
    
    /* Glassmorphism */
    .glass-panel {
      background: rgba(30, 41, 59, 0.7); /* Slate 800 with opacity */
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.08);
    }
    
    .glass-header {
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    /* Scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #0f172a; 
    }
    ::-webkit-scrollbar-thumb {
      background: #334155; 
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #475569; 
    }

    /* Animations */
    .fade-in { animation: fadeIn 0.5s ease-out; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    
    .pulse-dot {
      box-shadow: 0 0 0 0 rgba(45, 212, 191, 0.7);
      animation: pulse-teal 2s infinite;
    }
    @keyframes pulse-teal {
      0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(45, 212, 191, 0.7); }
      70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(45, 212, 191, 0); }
      100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(45, 212, 191, 0); }
    }

    .status-indicator {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 6px;
    }
    .status-good { background-color: #2dd4bf; box-shadow: 0 0 8px #2dd4bf; }
    .status-warn { background-color: #fbbf24; box-shadow: 0 0 8px #fbbf24; }
    .status-bad { background-color: #f87171; box-shadow: 0 0 8px #f87171; }

    /* Custom Chart Tooltip */
    #chartjs-tooltip {
      opacity: 1;
      position: absolute;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      border-radius: 4px;
      pointer-events: none;
      transform: translate(-50%, 0);
      transition: all .1s ease;
    }
  </style>
</head>

<body class="flex h-screen overflow-hidden antialiased selection:bg-primary-500 selection:text-white">

  <!-- SIDEBAR -->
  <aside class="w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-20 hidden md:flex">
    <!-- Logo -->
    <div class="h-16 flex items-center px-6 border-b border-slate-800">
      <div class="flex items-center gap-2 text-primary-400">
        <i class="ph-fill ph-hexagon text-2xl"></i>
        <span class="text-lg font-bold tracking-wide text-white">InQube<span class="font-light text-slate-400">.ai</span></span>
      </div>
    </div>

    <!-- Nav -->
    <nav class="flex-1 py-6 px-3 space-y-1">
      <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary-500/10 text-primary-400 border border-primary-500/20">
        <i class="ph ph-squares-four text-lg"></i>
        <span class="font-medium text-sm">Dashboard</span>
      </a>
      <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors">
        <i class="ph ph-chart-line-up text-lg"></i>
        <span class="font-medium text-sm">Analytics</span>
      </a>
      <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors">
        <i class="ph ph-factory text-lg"></i>
        <span class="font-medium text-sm">Production Lines</span>
      </a>
      <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors group">
        <div class="relative">
          <i class="ph ph-warning-circle text-lg group-hover:text-amber-400 transition-colors"></i>
          <span class="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
        </div>
        <span class="font-medium text-sm">Alerts</span>
      </a>
      <a href="#" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors">
        <i class="ph ph-gear text-lg"></i>
        <span class="font-medium text-sm">Settings</span>
      </a>
    </nav>

    <!-- User Profile -->
    <div class="p-4 border-t border-slate-800">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-500 to-accent-400 flex items-center justify-center text-xs font-bold text-slate-900">
          JD
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-white truncate">John Doe</p>
          <p class="text-xs text-slate-500 truncate">Plant Manager</p>
        </div>
        <i class="ph ph-caret-down text-slate-500"></i>
      </div>
    </div>
  </aside>

  <!-- MAIN CONTENT -->
  <div class="flex-1 flex flex-col min-w-0 bg-[url('https://assets.codepen.io/t-1/grid.png')] bg-repeat">
    
    <!-- HEADER -->
    <header class="h-16 glass-header flex items-center justify-between px-6 z-10 sticky top-0">
      <div class="flex items-center gap-4">
        <button class="md:hidden text-slate-400 hover:text-white"><i class="ph ph-list text-2xl"></i></button>
        <h1 class="text-lg font-semibold text-slate-100 hidden sm:block">Plant Overview <span class="text-slate-500 font-normal mx-2">/</span> Line A-04</h1>
      </div>

      <div class="flex items-center gap-6">
        <!-- System Status -->
        <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span class="text-xs font-medium text-emerald-400 tracking-wide">SYSTEM ONLINE</span>
        </div>

        <!-- Search -->
        <div class="relative hidden md:block">
          <i class="ph ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"></i>
          <input type="text" placeholder="Search metrics, logs..." class="bg-slate-900/50 border border-slate-700 rounded-full py-1.5 pl-9 pr-4 text-sm text-slate-300 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 w-64 transition-all">
        </div>

        <!-- Notifications -->
        <button class="relative text-slate-400 hover:text-white transition-colors">
          <i class="ph ph-bell text-xl"></i>
          <span class="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
        </button>
      </div>
    </header>

    <!-- SCROLLABLE CONTENT -->
    <main class="flex-1 overflow-y-auto p-6 space-y-6">
      
      <!-- KPI GRID -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- KPI 1 -->
        <div class="glass-panel rounded-xl p-5 relative overflow-hidden group">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <i class="ph ph-lightning text-6xl text-primary-500"></i>
          </div>
          <div class="flex justify-between items-start mb-4">
            <div>
              <p class="text-xs font-medium text-slate-400 uppercase tracking-wider">OEE Efficiency</p>
              <h3 class="text-2xl font-bold text-white mt-1">88.5%</h3>
            </div>
            <span class="flex items-center text-emerald-400 text-xs font-medium bg-emerald-400/10 px-2 py-1 rounded">
              <i class="ph ph-trend-up mr-1"></i> 2.1%
            </span>
          </div>
          <div class="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
            <div class="bg-primary-500 h-full rounded-full" style="width: 88.5%"></div>
          </div>
          <p class="text-xs text-slate-500 mt-3">Target: 85% <span class="float-right">Line A-04</span></p>
        </div>

        <!-- KPI 2 -->
        <div class="glass-panel rounded-xl p-5 relative overflow-hidden group">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <i class="ph ph-warning-octagon text-6xl text-amber-500"></i>
          </div>
          <div class="flex justify-between items-start mb-4">
            <div>
              <p class="text-xs font-medium text-slate-400 uppercase tracking-wider">Defect Rate (DHU)</p>
              <h3 class="text-2xl font-bold text-white mt-1">3.8</h3>
            </div>
            <span class="flex items-center text-emerald-400 text-xs font-medium bg-emerald-400/10 px-2 py-1 rounded">
              <i class="ph ph-trend-down mr-1"></i> 0.4
            </span>
          </div>
          <div class="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
            <div class="bg-amber-500 h-full rounded-full" style="width: 15%"></div>
          </div>
          <p class="text-xs text-slate-500 mt-3">Threshold: < 4.0 <span class="float-right">Quality Check</span></p>
        </div>

        <!-- KPI 3 -->
        <div class="glass-panel rounded-xl p-5 relative overflow-hidden group">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <i class="ph ph-package text-6xl text-purple-500"></i>
          </div>
          <div class="flex justify-between items-start mb-4">
            <div>
              <p class="text-xs font-medium text-slate-400 uppercase tracking-wider">Production Output</p>
              <h3 class="text-2xl font-bold text-white mt-1">847 <span class="text-sm font-normal text-slate-500">units</span></h3>
            </div>
            <span class="flex items-center text-slate-400 text-xs font-medium bg-slate-700/50 px-2 py-1 rounded">
              On Track
            </span>
          </div>
          <div class="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
            <div class="bg-purple-500 h-full rounded-full" style="width: 65%"></div>
          </div>
          <p class="text-xs text-slate-500 mt-3">Daily Goal: 1,200 <span class="float-right">Shift 2</span></p>
        </div>

        <!-- KPI 4 -->
        <div class="glass-panel rounded-xl p-5 relative overflow-hidden group">
          <div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <i class="ph ph-thermometer text-6xl text-rose-500"></i>
          </div>
          <div class="flex justify-between items-start mb-4">
            <div>
              <p class="text-xs font-medium text-slate-400 uppercase tracking-wider">Avg Temp</p>
              <h3 class="text-2xl font-bold text-white mt-1">176°C</h3>
            </div>
            <span class="flex items-center text-rose-400 text-xs font-medium bg-rose-400/10 px-2 py-1 rounded animate-pulse">
              <i class="ph ph-warning mr-1"></i> Drift
            </span>
          </div>
          <div class="w-full bg-slate-700 h-1 rounded-full overflow-hidden">
            <div class="bg-rose-500 h-full rounded-full" style="width: 76%"></div>
          </div>
          <p class="text-xs text-slate-500 mt-3">Range: 170-180°C <span class="float-right">Lamination</span></p>
        </div>
      </div>

      <!-- MAIN DASHBOARD AREA -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- LEFT COLUMN (Charts) -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Temperature Chart -->
          <div class="glass-panel rounded-xl p-6">
            <div class="flex items-center justify-between mb-6">
              <div>
                <h3 class="text-lg font-semibold text-white">Lamination Temperature</h3>
                <p class="text-sm text-slate-400">Real-time sensor data stream (Sensor ID: T-802)</p>
              </div>
              <div class="flex gap-2">
                <button class="px-3 py-1 text-xs font-medium bg-slate-800 text-slate-300 rounded hover:bg-slate-700 transition">1H</button>
                <button class="px-3 py-1 text-xs font-medium bg-primary-500/20 text-primary-400 border border-primary-500/30 rounded">LIVE</button>
              </div>
            </div>
            <div class="relative h-64 w-full">
              <canvas id="tempChart"></canvas>
            </div>
          </div>

          <!-- Data Pipeline -->
          <div class="glass-panel rounded-xl p-6">
            <h3 class="text-lg font-semibold text-white mb-6">Data Pipeline Topology</h3>
            <div class="flex flex-col md:flex-row items-center justify-between gap-4 relative">
              <!-- Connecting Line Background -->
              <div class="absolute top-1/2 left-0 w-full h-0.5 bg-slate-700 -z-10 hidden md:block"></div>

              <!-- Node 1 -->
              <div class="flex flex-col items-center gap-3 bg-slate-900/80 p-4 rounded-lg border border-slate-700 z-0 w-full md:w-auto">
                <div class="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <i class="ph ph-database text-xl"></i>
                </div>
                <div class="text-center">
                  <div class="text-sm font-bold text-slate-200">SAP / ERP</div>
                  <div class="text-xs text-emerald-400 flex items-center justify-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Connected
                  </div>
                </div>
              </div>

              <!-- Node 2 -->
              <div class="flex flex-col items-center gap-3 bg-slate-900/80 p-4 rounded-lg border border-slate-700 z-0 w-full md:w-auto">
                <div class="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <i class="ph ph-cpu text-xl"></i>
                </div>
                <div class="text-center">
                  <div class="text-sm font-bold text-slate-200">IoT Gateway</div>
                  <div class="text-xs text-emerald-400 flex items-center justify-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> 42ms Latency
                  </div>
                </div>
              </div>

              <!-- Node 3 (Central) -->
              <div class="flex flex-col items-center gap-3 bg-slate-800 p-5 rounded-xl border border-primary-500/50 shadow-[0_0_20px_rgba(14,165,233,0.15)] z-10 w-full md:w-auto">
                <div class="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center text-white pulse-dot">
                  <i class="ph ph-circles-three-plus text-2xl"></i>
                </div>
                <div class="text-center">
                  <div class="text-sm font-bold text-white">InQube Data Lake</div>
                  <div class="text-xs text-slate-400">Processing 1.2GB/s</div>
                </div>
              </div>

              <!-- Node 4 -->
              <div class="flex flex-col items-center gap-3 bg-slate-900/80 p-4 rounded-lg border border-slate-700 z-0 w-full md:w-auto">
                <div class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <i class="ph ph-brain text-xl"></i>
                </div>
                <div class="text-center">
                  <div class="text-sm font-bold text-slate-200">AI Engine</div>
                  <div class="text-xs text-emerald-400 flex items-center justify-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Active
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Architecture Note -->
            <div class="mt-5 p-4 bg-white/5 rounded-lg border-l-4 border-emerald-500">
              <p class="text-xs text-slate-400 m-0">
                <strong class="text-emerald-500">Architecture Note:</strong> 
                This demonstration uses an open-source data lake (PostgreSQL + TimescaleDB). 
                The pipeline is designed to be modular - compatible with Snowflake, Microsoft Fabric, 
                AWS Redshift, or any SQL-based data warehouse. Data format: Parquet/JSON (industry standard).
              </p>
            </div>
          </div>

        </div>

        <!-- RIGHT COLUMN (AI & Logs) -->
        <div class="space-y-6">
          
          <!-- AI Recommendation Card -->
          <div class="glass-panel rounded-xl p-0 overflow-hidden border-l-4 border-l-amber-500">
            <div class="bg-amber-500/10 p-4 border-b border-amber-500/20 flex justify-between items-center">
              <div class="flex items-center gap-2 text-amber-400">
                <i class="ph-fill ph-robot text-xl"></i>
                <span class="font-bold tracking-wide text-sm">AI RECOMMENDATION #47</span>
              </div>
              <span class="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">High Confidence (87%)</span>
            </div>
            
            <div class="p-5 space-y-4">
              <div>
                <div class="text-xs text-slate-400 mb-1">Detected Anomaly</div>
                <div class="text-sm text-white font-medium">Lamination temperature drift detected. Projected quality risk for next 150 units.</div>
              </div>

              <div class="bg-slate-900/50 rounded-lg p-3 border border-slate-700/50">
                <div class="text-xs text-slate-500 mb-2 uppercase tracking-wider font-bold">Suggested Actions</div>
                <ul class="space-y-2">
                  <li class="flex items-start gap-2 text-sm">
                    <i class="ph-fill ph-check-circle text-emerald-500 mt-0.5"></i>
                    <span class="text-slate-300">Increase heater setpoint <span class="text-white font-bold">+3°C</span></span>
                  </li>
                  <li class="flex items-start gap-2 text-sm">
                    <i class="ph-fill ph-check-circle text-emerald-500 mt-0.5"></i>
                    <span class="text-slate-300">Reduce belt speed to <span class="text-white font-bold">2.3 m/min</span></span>
                  </li>
                </ul>
              </div>

              <div class="pt-2">
                <div class="text-xs text-emerald-400 font-medium mb-3 flex items-center gap-1">
                  <i class="ph-fill ph-coins"></i> Expected Savings: $180 (Rework Prevention)
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <button onclick="decision('Approved')" class="bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg text-sm font-medium transition shadow-lg shadow-emerald-900/20">Approve</button>
                  <button onclick="decision('Rejected')" class="bg-slate-700 hover:bg-slate-600 text-slate-200 py-2 rounded-lg text-sm font-medium transition">Reject</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Live Logs -->
          <div class="glass-panel rounded-xl p-5 flex flex-col h-[300px]">
            <h3 class="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
              <i class="ph ph-terminal-window text-slate-400"></i> System Logs
            </h3>
            <div id="aiLog" class="flex-1 overflow-y-auto font-mono text-xs space-y-2 pr-2 custom-scrollbar">
              <!-- Logs injected by JS -->
            </div>
          </div>

          <!-- Decision History -->
          <div class="glass-panel rounded-xl p-5">
            <h3 class="text-sm font-semibold text-slate-300 mb-3">Recent Decisions</h3>
            <div class="space-y-3" id="history">
              <div class="flex items-center justify-between text-sm pb-2 border-b border-slate-700/50">
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span class="text-slate-300">Temp adjustment</span>
                </div>
                <span class="text-slate-500 text-xs">10m ago</span>
              </div>
              <div class="flex items-center justify-between text-sm pb-2 border-b border-slate-700/50">
                <div class="flex items-center gap-3">
                  <div class="w-2 h-2 rounded-full bg-slate-500"></div>
                  <span class="text-slate-300">Belt speed change</span>
                </div>
                <span class="text-slate-500 text-xs">25m ago</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  </div>

  <!-- Toast Container -->
  <div id="toastContainer" class="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none"></div>

  <script>
    /* ================= CHART CONFIG ================= */
    const ctx = document.getElementById('tempChart').getContext('2d');
    
    // Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.5)'); // Sky 400
    gradient.addColorStop(1, 'rgba(56, 189, 248, 0.0)');

    let tempData = [182, 180, 179, 177, 176];
    let labels = ['10:00', '10:05', '10:10', '10:15', '10:20'];

    Chart.defaults.color = '#64748b';
    Chart.defaults.font.family = 'Inter';

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: tempData,
            borderColor: '#38bdf8',
            backgroundColor: gradient,
            borderWidth: 2,
            pointBackgroundColor: '#0f172a',
            pointBorderColor: '#38bdf8',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            fill: true,
            tension: 0.4
          },
          {
            label: 'Threshold',
            data: Array(5).fill(175),
            borderColor: '#f43f5e', // Rose 500
            borderWidth: 1,
            borderDash: [5, 5],
            pointRadius: 0,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleColor: '#e2e8f0',
            bodyColor: '#94a3b8',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1,
            padding: 10,
            displayColors: false,
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#64748b' }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.05)' },
            ticks: { color: '#64748b' },
            suggestedMin: 170,
            suggestedMax: 185
          }
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
      }
    });

    // Simulate Live Data
    setInterval(() => {
      const lastVal = tempData[tempData.length - 1];
      const newVal = parseFloat((lastVal + (Math.random() - 0.6)).toFixed(1)); // Slight downward trend
      
      tempData.push(newVal);
      tempData.shift();
      
      // Update time labels
      const now = new Date();
      const timeString = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');
      labels.push(timeString);
      labels.shift();

      chart.update('none'); // 'none' for performance
    }, 3000);


    /* ================= LOGIC & LOGS ================= */
    const logEl = document.getElementById('aiLog');
    const messages = [
      { text: "Connected to Sensor Grid A-04", type: "info" },
      { text: "Fetching telemetry data...", type: "info" },
      { text: "Stream established (Latency: 42ms)", type: "success" },
      { text: "Analyzing thermal patterns...", type: "process" },
      { text: "WARNING: Temp drift detected > 2%", type: "warning" },
      { text: "Correlation found: Belt speed variance", type: "info" },
      { text: "Generating mitigation strategy...", type: "process" },
      { text: "Recommendation #47 ready for review", type: "success" }
    ];

    let logIndex = 0;

    function addLog(msg, type) {
      const div = document.createElement('div');
      div.className = "flex gap-2 animate-pulse-once";
      
      let color = "text-slate-400";
      let icon = ">";
      
      if (type === 'warning') { color = "text-amber-400"; icon = "!"; }
      if (type === 'success') { color = "text-emerald-400"; icon = "✓"; }
      if (type === 'process') { color = "text-primary-400"; icon = "⚙"; }

      const time = new Date().toLocaleTimeString('en-US', {hour12: false, hour: '2-digit', minute:'2-digit', second:'2-digit'});

      div.innerHTML = \`
        <span class="text-slate-600 shrink-0">[\${time}]</span>
        <span class="\${color} font-bold shrink-0">\${icon}</span>
        <span class="\${color} opacity-90">\${msg}</span>
      \`;
      
      logEl.appendChild(div);
      logEl.scrollTop = logEl.scrollHeight;
    }

    const logInterval = setInterval(() => {
      if (logIndex >= messages.length) return;
      addLog(messages[logIndex].text, messages[logIndex].type);
      logIndex++;
    }, 1500);


    /* ================= INTERACTIONS ================= */
    function decision(type) {
      showToast(type);
      
      // Add to history
      const historyEl = document.getElementById('history');
      const newEntry = document.createElement('div');
      newEntry.className = "flex items-center justify-between text-sm pb-2 border-b border-slate-700/50 fade-in";
      
      let dotColor = "bg-slate-500";
      if (type === 'Approved') dotColor = "bg-emerald-500";
      if (type === 'Rejected') dotColor = "bg-red-500";

      newEntry.innerHTML = \`
        <div class="flex items-center gap-3">
          <div class="w-2 h-2 rounded-full \${dotColor}"></div>
          <span class="text-slate-300">Temp drift control</span>
        </div>
        <span class="text-slate-500 text-xs">Just now</span>
      \`;
      
      historyEl.prepend(newEntry);
      
      // Log it
      addLog(\`User \${type} Recommendation #47\`, type === 'Approved' ? 'success' : 'warning');
    }

    function showToast(type) {
      const toast = document.createElement('div');
      toast.className = "pointer-events-auto flex items-center gap-3 bg-slate-800 border border-slate-700 text-slate-200 px-4 py-3 rounded-lg shadow-xl transform transition-all duration-300 translate-y-10 opacity-0";
      
      let icon = '<i class="ph-fill ph-info text-blue-400 text-xl"></i>';
      let title = "Notification";
      
      if (type === 'Approved') {
        icon = '<i class="ph-fill ph-check-circle text-emerald-400 text-xl"></i>';
        title = "Optimization Applied";
      } else if (type === 'Rejected') {
        icon = '<i class="ph-fill ph-x-circle text-red-400 text-xl"></i>';
        title = "Recommendation Dismissed";
      }

      toast.innerHTML = \`
        \${icon}
        <div>
          <h4 class="font-semibold text-sm">\${title}</h4>
          <p class="text-xs text-slate-400">System updating parameters...</p>
        </div>
      \`;

      document.getElementById('toastContainer').appendChild(toast);

      // Animate in
      requestAnimationFrame(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
      });

      // Remove
      setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
      }, 3000);
    }
  </script>
</body>
</html>
    `;

        return new Response(html, {
            headers: { "content-type": "text/html;charset=UTF-8" }
        });
    }
};
