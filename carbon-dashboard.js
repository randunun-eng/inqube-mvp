// Carbon Intelligence Dashboard - For Cloudflare Workers
// This dashboard shows real-time energy consumption and carbon footprint tracking
// Aligns with InQube's UNGC and Science-Based Targets initiative (SBTi)

export default {
  async fetch(request) {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carbon Intelligence | InQube Sustainability Monitor</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        body { 
            background: linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%); 
            color: #e2e8f0; 
            font-family: 'Segoe UI', sans-serif; 
            min-height: 100vh;
        }
        .glass-card { 
            background: rgba(30, 41, 59, 0.7); 
            backdrop-filter: blur(10px);
            border: 1px solid rgba(148, 163, 184, 0.1); 
            border-radius: 1rem; 
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .metric-card {
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(37, 99, 235, 0.1) 100%);
            border: 1px solid rgba(59, 130, 246, 0.3);
            transition: all 0.3s ease;
        }
        .metric-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 12px 24px rgba(59, 130, 246, 0.2);
        }
        .carbon-badge {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: bold;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .alert-badge {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            animation: pulse 2s infinite;
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
        }
        .progress-ring {
            transform: rotate(-90deg);
        }
        .tree-icon {
            font-size: 2rem;
            color: #10b981;
        }
    </style>
</head>
<body>

    <!-- Header -->
    <div class="px-6 py-4 border-b border-slate-700/50">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <div class="flex items-center gap-4">
                <div class="bg-green-600 p-3 rounded-lg">
                    <i class="fas fa-leaf text-white text-xl"></i>
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-white">Carbon Intelligence Platform</h1>
                    <p class="text-sm text-slate-400">InQube Global • Sustainability Monitoring</p>
                </div>
            </div>
            <div class="flex items-center gap-4">
                <div class="text-right">
                    <p class="text-xs text-slate-400">UNGC Member • SBTi Approved</p>
                    <p class="text-sm font-bold text-green-400">2024 Carbon Reduction: -12.4%</p>
                </div>
                <div class="carbon-badge">
                    <i class="fas fa-check-circle mr-1"></i> TARGET ON TRACK
                </div>
            </div>
        </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto p-6">
        
        <!-- Top KPI Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            
            <!-- Today's Carbon Footprint -->
            <div class="glass-card p-6 metric-card">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <p class="text-xs text-slate-400 uppercase font-semibold">Today's CO₂</p>
                        <p class="text-3xl font-bold text-white mt-2" id="co2-today">2.45</p>
                        <p class="text-xs text-slate-400">Metric Tons</p>
                    </div>
                    <div class="bg-orange-500/20 p-3 rounded-lg">
                        <i class="fas fa-smog text-orange-400 text-xl"></i>
                    </div>
                </div>
                <div class="flex items-center gap-2 text-sm">
                    <span class="text-red-400"><i class="fas fa-arrow-up"></i> 3.2%</span>
                    <span class="text-slate-400">vs Yesterday</span>
                </div>
            </div>

            <!-- Energy Consumption -->
            <div class="glass-card p-6 metric-card">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <p class="text-xs text-slate-400 uppercase font-semibold">Energy Used</p>
                        <p class="text-3xl font-bold text-white mt-2" id="energy-today">1,247</p>
                        <p class="text-xs text-slate-400">kWh Today</p>
                    </div>
                    <div class="bg-blue-500/20 p-3 rounded-lg">
                        <i class="fas fa-bolt text-blue-400 text-xl"></i>
                    </div>
                </div>
                <div class="flex items-center gap-2 text-sm">
                    <span class="text-green-400"><i class="fas fa-arrow-down"></i> 5.1%</span>
                    <span class="text-slate-400">vs Target</span>
                </div>
            </div>

            <!-- Trees Equivalent -->
            <div class="glass-card p-6 metric-card">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <p class="text-xs text-slate-400 uppercase font-semibold">Trees to Offset</p>
                        <p class="text-3xl font-bold text-white mt-2">134</p>
                        <p class="text-xs text-slate-400">Required for Today</p>
                    </div>
                    <div class="bg-green-500/20 p-3 rounded-lg">
                        <i class="fas fa-tree text-green-400 text-xl"></i>
                    </div>
                </div>
                <div class="flex items-center gap-2 text-sm">
                    <span class="text-slate-400">Based on avg. tree absorption</span>
                </div>
            </div>

            <!-- SBTi Progress -->
            <div class="glass-card p-6 metric-card">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <p class="text-xs text-slate-400 uppercase font-semibold">2025 SBTi Goal</p>
                        <p class="text-3xl font-bold text-green-400 mt-2">87.6%</p>
                        <p class="text-xs text-slate-400">On Track</p>
                    </div>
                    <div class="bg-green-500/20 p-3 rounded-lg">
                        <i class="fas fa-bullseye text-green-400 text-xl"></i>
                    </div>
                </div>
                <div class="flex items-center gap-2 text-sm">
                    <span class="text-green-400"><i class="fas fa-check"></i> 412 days ahead</span>
                </div>
            </div>
        </div>

        <!-- Main Dashboard Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            <!-- Real-Time Energy by Machine -->
            <div class="glass-card p-6 lg:col-span-2">
                <div class="flex justify-between items-center mb-6">
                    <div>
                        <h3 class="text-lg font-bold text-white">Real-Time Energy Consumption by Asset</h3>
                        <p class="text-sm text-slate-400">Live telemetry from IoT sensors • Updated every 5 seconds</p>
                    </div>
                    <button class="bg-slate-700/50 hover:bg-slate-600/50 px-4 py-2 rounded-lg text-sm transition">
                        <i class="fas fa-download mr-2"></i>Export CSV
                    </button>
                </div>
                <canvas id="energyChart" height="100"></canvas>
            </div>

            <!-- Carbon Intensity Breakdown -->
            <div class="glass-card p-6">
                <h3 class="text-lg font-bold text-white mb-6">Carbon Intensity by Process</h3>
                <div class="flex justify-center mb-6">
                    <svg width="180" height="180">
                        <circle class="progress-ring" cx="90" cy="90" r="70" stroke="#1e293b" stroke-width="20" fill="transparent"/>
                        <circle class="progress-ring" cx="90" cy="90" r="70" stroke="#10b981" stroke-width="20" fill="transparent"
                                stroke-dasharray="440" stroke-dashoffset="110" stroke-linecap="round"/>
                        <text x="90" y="85" text-anchor="middle" fill="#fff" font-size="24" font-weight="bold">75%</text>
                        <text x="90" y="105" text-anchor="middle" fill="#94a3b8" font-size="12">Efficient</text>
                    </svg>
                </div>
                
                <div class="space-y-4">
                    <div class="flex justify-between items-center pb-3 border-b border-slate-700/50">
                        <div class="flex items-center gap-3">
                            <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span class="text-sm text-slate-300">Lamination</span>
                        </div>
                        <span class="font-bold text-white">0.92 kg CO₂</span>
                    </div>
                    <div class="flex justify-between items-center pb-3 border-b border-slate-700/50">
                        <div class="flex items-center gap-3">
                            <div class="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span class="text-sm text-slate-300">Bonding</span>
                        </div>
                        <span class="font-bold text-white">0.68 kg CO₂</span>
                    </div>
                    <div class="flex justify-between items-center pb-3 border-b border-slate-700/50">
                        <div class="flex items-center gap-3">
                            <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <span class="text-sm text-slate-300">Cutting</span>
                        </div>
                        <span class="font-bold text-white">0.45 kg CO₂</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="flex items-center gap-3">
                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span class="text-sm text-slate-300">Assembly</span>
                        </div>
                        <span class="font-bold text-white">0.40 kg CO₂</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Machine-Level Monitoring -->
        <div class="glass-card p-6 mb-8">
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h3 class="text-lg font-bold text-white">Machine-Level Carbon Tracking</h3>
                    <p class="text-sm text-slate-400">Granular monitoring enables precise carbon accounting for reporting</p>
                </div>
                <div class="flex gap-3">
                    <span class="px-3 py-1 bg-green-900/30 text-green-400 rounded-full text-xs flex items-center gap-2">
                        <span class="w-2 h-2 bg-green-400 rounded-full"></span> Efficient (4)
                    </span>
                    <span class="px-3 py-1 bg-yellow-900/30 text-yellow-400 rounded-full text-xs flex items-center gap-2">
                        <span class="w-2 h-2 bg-yellow-400 rounded-full"></span> Warning (1)
                    </span>
                    <span class="px-3 py-1 bg-red-900/30 text-red-400 rounded-full text-xs flex items-center gap-2">
                        <span class="w-2 h-2 bg-red-400 rounded-full"></span> Critical (0)
                    </span>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-sm">
                    <thead class="text-slate-400 text-xs uppercase border-b border-slate-700/50">
                        <tr>
                            <th class="text-left py-3 px-4">Asset ID</th>
                            <th class="text-left py-3 px-4">Process</th>
                            <th class="text-left py-3 px-4">Current Draw</th>
                            <th class="text-left py-3 px-4">CO₂ Today</th>
                            <th class="text-left py-3 px-4">Efficiency</th>
                            <th class="text-left py-3 px-4">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800/50">
                        <tr class="hover:bg-slate-800/30 transition">
                            <td class="py-4 px-4 font-mono text-white">LAM-04</td>
                            <td class="py-4 px-4 text-slate-300">Hot Melt Lamination</td>
                            <td class="py-4 px-4 text-white font-bold">12.4 kW</td>
                            <td class="py-4 px-4 text-orange-400 font-bold">0.92 kg</td>
                            <td class="py-4 px-4">
                                <div class="flex items-center gap-2">
                                    <div class="w-20 bg-slate-700 rounded-full h-2">
                                        <div class="bg-green-500 h-2 rounded-full" style="width: 76%"></div>
                                    </div>
                                    <span class="text-white text-xs">76%</span>
                                </div>
                            </td>
                            <td class="py-4 px-4">
                                <span class="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-xs font-bold">
                                    <i class="fas fa-check-circle mr-1"></i>OPTIMAL
                                </span>
                            </td>
                        </tr>
                        <tr class="hover:bg-slate-800/30 transition">
                            <td class="py-4 px-4 font-mono text-white">BOND-02</td>
                            <td class="py-4 px-4 text-slate-300">Seamless Bonding</td>
                            <td class="py-4 px-4 text-white font-bold">9.8 kW</td>
                            <td class="py-4 px-4 text-yellow-400 font-bold">0.68 kg</td>
                            <td class="py-4 px-4">
                                <div class="flex items-center gap-2">
                                    <div class="w-20 bg-slate-700 rounded-full h-2">
                                        <div class="bg-green-500 h-2 rounded-full" style="width: 82%"></div>
                                    </div>
                                    <span class="text-white text-xs">82%</span>
                                </div>
                            </td>
                            <td class="py-4 px-4">
                                <span class="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-xs font-bold">
                                    <i class="fas fa-check-circle mr-1"></i>OPTIMAL
                                </span>
                            </td>
                        </tr>
                        <tr class="hover:bg-slate-800/30 transition">
                            <td class="py-4 px-4 font-mono text-white">CUT-CNC-01</td>
                            <td class="py-4 px-4 text-slate-300">CNC Fabric Cutting</td>
                            <td class="py-4 px-4 text-white font-bold">7.2 kW</td>
                            <td class="py-4 px-4 text-green-400 font-bold">0.45 kg</td>
                            <td class="py-4 px-4">
                                <div class="flex items-center gap-2">
                                    <div class="w-20 bg-slate-700 rounded-full h-2">
                                        <div class="bg-green-500 h-2 rounded-full" style="width: 88%"></div>
                                    </div>
                                    <span class="text-white text-xs">88%</span>
                                </div>
                            </td>
                            <td class="py-4 px-4">
                                <span class="px-3 py-1 bg-green-900/50 text-green-400 rounded-full text-xs font-bold">
                                    <i class="fas fa-check-circle mr-1"></i>OPTIMAL
                                </span>
                            </td>
                        </tr>
                        <tr class="hover:bg-slate-800/30 transition bg-yellow-900/10">
                            <td class="py-4 px-4 font-mono text-white">FUSE-02</td>
                            <td class="py-4 px-4 text-slate-300">Interlining Fusing</td>
                            <td class="py-4 px-4 text-white font-bold">15.6 kW</td>
                            <td class="py-4 px-4 text-red-400 font-bold">1.12 kg</td>
                            <td class="py-4 px-4">
                                <div class="flex items-center gap-2">
                                    <div class="w-20 bg-slate-700 rounded-full h-2">
                                        <div class="bg-yellow-500 h-2 rounded-full" style="width: 64%"></div>
                                    </div>
                                    <span class="text-white text-xs">64%</span>
                                </div>
                            </td>
                            <td class="py-4 px-4">
                                <span class="px-3 py-1 bg-yellow-900/50 text-yellow-400 rounded-full text-xs font-bold">
                                    <i class="fas fa-exclamation-triangle mr-1"></i>REVIEW
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <!-- AI Recommendations -->
        <div class="glass-card p-6">
            <div class="flex items-center gap-3 mb-6">
                <div class="bg-blue-600/20 p-3 rounded-lg">
                    <i class="fas fa-robot text-blue-400 text-xl"></i>
                </div>
                <div>
                    <h3 class="text-lg font-bold text-white">AI Carbon Optimization Recommendations</h3>
                    <p class="text-sm text-slate-400">Based on real-time analysis and historical patterns</p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-green-900/20 border border-green-700/30 rounded-lg p-4">
                    <div class="flex items-start gap-3">
                        <div class="bg-green-600 p-2 rounded">
                            <i class="fas fa-lightbulb text-white"></i>
                        </div>
                        <div class="flex-1">
                            <h4 class="font-bold text-white mb-2">Shift High-Energy Processes</h4>
                            <p class="text-sm text-slate-300 mb-3">Move lamination operations to off-peak hours (10 PM - 6 AM) for cleaner grid energy.</p>
                            <div class="flex gap-2">
                                <span class="px-2 py-1 bg-green-700/30 text-green-400 rounded text-xs font-bold">
                                    -18% CO₂
                                </span>
                                <span class="px-2 py-1 bg-blue-700/30 text-blue-400 rounded text-xs">
                                    Est. Savings: 142 kg/month
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                    <div class="flex items-start gap-3">
                        <div class="bg-blue-600 p-2 rounded">
                            <i class="fas fa-tools text-white"></i>
                        </div>
                        <div class="flex-1">
                            <h4 class="font-bold text-white mb-2">Maintenance Alert: FUSE-02</h4>
                            <p class="text-sm text-slate-300 mb-3">Efficiency dropped 12% this week. Heating element degradation detected.</p>
                            <div class="flex gap-2">
                                <span class="px-2 py-1 bg-orange-700/30 text-orange-400 rounded text-xs font-bold">
                                    Action Required
                                </span>
                                <span class="px-2 py-1 bg-blue-700/30 text-blue-400 rounded text-xs">
                                    Potential Waste: 28 kg CO₂/week
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <!-- Footer Info -->
    <div class="max-w-7xl mx-auto px-6 py-8 text-center text-slate-400 text-sm">
        <p>Data refreshed every 5 seconds • Connected to Snowflake Carbon Analytics Lake</p>
        <p class="mt-2">Methodology: ISO 14064-1 Compliant • Grid Carbon Intensity: 0.82 kg CO₂/kWh (Sri Lanka Average)</p>
    </div>

    <script>
        // --- SIMULATION ENGINE ---
        
        const ctxEnergy = document.getElementById('energyChart').getContext('2d');
        
        let energyData = {
            labels: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
            datasets: [
                {
                    label: 'Lamination (LAM-04)',
                    data: [10.5, 12.8, 11.9, 12.4, 13.1, 12.0, 11.2],
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Bonding (BOND-02)',
                    data: [8.2, 9.9, 9.5, 9.8, 10.2, 9.4, 8.8],
                    borderColor: '#f59e0b',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Cutting (CUT-CNC-01)',
                    data: [6.5, 7.8, 7.1, 7.2, 7.9, 7.0, 6.8],
                    borderColor: '#eab308',
                    backgroundColor: 'rgba(234, 179, 8, 0.1)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Fusing (FUSE-02)',
                    data: [14.2, 16.1, 15.8, 15.6, 16.4, 15.2, 14.8],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    tension: 0.4,
                    fill: true
                }
            ]
        };

        const energyChart = new Chart(ctxEnergy, {
            type: 'line',
            data: energyData,
            options: {
                responsive: true,
                maintainAspectRatio: true,
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'bottom',
                        labels: {
                            color: '#cbd5e1',
                            usePointStyle: true,
                            padding: 15
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.9)',
                        titleColor: '#fff',
                        bodyColor: '#cbd5e1',
                        borderColor: '#475569',
                        borderWidth: 1,
                        padding: 12,
                        displayColors: true,
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + ' kW';
                            },
                            afterLabel: function(context) {
                                let co2 = (context.parsed.y * 0.82).toFixed(2);
                                return 'CO₂: ' + co2 + ' kg/h';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: 'rgba(71, 85, 105, 0.3)' },
                        ticks: { 
                            color: '#94a3b8',
                            callback: function(value) {
                                return value + ' kW';
                            }
                        }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { color: '#94a3b8' }
                    }
                }
            }
        });

        // --- LIVE DATA SIMULATION ---
        // Update top metrics every 3 seconds
        setInterval(() => {
            const co2Element = document.getElementById('co2-today');
            const energyElement = document.getElementById('energy-today');
            
            let currentCO2 = parseFloat(co2Element.innerText);
            let currentEnergy = parseFloat(energyElement.innerText.replace(',', ''));
            
            // Simulate small increases
            let newCO2 = (currentCO2 + Math.random() * 0.05).toFixed(2);
            let newEnergy = Math.floor(currentEnergy + Math.random() * 10);
            
            co2Element.innerText = newCO2;
            energyElement.innerText = newEnergy.toLocaleString();
            
        }, 3000);

    </script>
</body>
</html>
    `;

    return new Response(html, {
      headers: {
        "content-type": "text/html;charset=UTF-8",
      },
    });
  },
};
