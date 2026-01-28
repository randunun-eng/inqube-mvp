/**
 * GMS-Enterprise | Factory Command Center
 * --------------------------------------
 * Dashboard #1 in the InQube Pitch Strategy
 *
 * PURPOSE:
 * - Demonstrates full garment factory visibility
 * - Generic (non-InQube-specific)
 * - Shows OT + IT understanding
 *
 * NOTE:
 * Production version connects to real PLCs, MES, ERP, SAP via MQTT & APIs.
 * This is a 24-hour MVP using simulated data.
 */

export default {
    async fetch() {
        return new Response(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>GMS-Enterprise | Factory Command Center</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

  <!-- Tailwind -->
  <script src="https://cdn.tailwindcss.com"></script>

  <!-- Chart.js -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

  <style>
    body { background:#0f172a; }
    .card { transition: all .25s ease; }
    .card:hover { transform: translateY(-2px); }
  </style>
</head>

<body class="text-slate-100 min-h-screen">

<!-- ================= HEADER ================= -->
<header class="border-b border-slate-800 px-6 py-4 flex justify-between items-center">
  <div>
    <h1 class="text-xl font-bold">GMS-Enterprise</h1>
    <p class="text-sm text-slate-400">Factory Command Center • Garment Manufacturing</p>
  </div>
  <div class="text-sm text-emerald-400 flex items-center gap-2">
    <span class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
    SYSTEM ONLINE
  </div>
</header>

<main class="p-6 max-w-7xl mx-auto space-y-8">

  <!-- ================= KPI CARDS ================= -->
  <section class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="card bg-slate-800 p-4 rounded-lg">
      <p class="text-xs text-slate-400 uppercase">OEE Efficiency</p>
      <p class="text-2xl font-bold">68.4%</p>
      <p class="text-xs text-emerald-400">↑ Target 65%</p>
    </div>
    <div class="card bg-slate-800 p-4 rounded-lg">
      <p class="text-xs text-slate-400 uppercase">DHU</p>
      <p class="text-2xl font-bold">4.2</p>
      <p class="text-xs text-emerald-400">↓ Improving</p>
    </div>
    <div class="card bg-slate-800 p-4 rounded-lg">
      <p class="text-xs text-slate-400 uppercase">Cut-to-Ship</p>
      <p class="text-2xl font-bold">98.9%</p>
      <p class="text-xs text-slate-400">Last 24 hrs</p>
    </div>
    <div class="card bg-slate-800 p-4 rounded-lg">
      <p class="text-xs text-slate-400 uppercase">Est. Revenue Today</p>
      <p class="text-2xl font-bold">$42,800</p>
      <p class="text-xs text-slate-400">Finished goods scan</p>
    </div>
  </section>

  <!-- ================= PRODUCTION CHART ================= -->
  <section class="card bg-slate-800 p-6 rounded-xl">
    <h2 class="text-lg font-semibold mb-4">Hourly Production vs Target</h2>
    <canvas id="prodChart" height="120"></canvas>
  </section>

  <!-- ================= COST BREAKDOWN ================= -->
  <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div class="card bg-slate-800 p-6 rounded-xl md:col-span-1">
      <h2 class="text-lg font-semibold mb-4">Cost Distribution</h2>
      <canvas id="costChart"></canvas>
    </div>

    <!-- ================= MACHINE HEALTH ================= -->
    <div class="card bg-slate-800 p-6 rounded-xl md:col-span-2">
      <h2 class="text-lg font-semibold mb-4">Machine Health Status</h2>
      <table class="w-full text-sm">
        <thead class="text-slate-400 border-b border-slate-700">
          <tr>
            <th class="text-left py-2">Machine</th>
            <th class="text-left py-2">Department</th>
            <th class="text-left py-2">Temp</th>
            <th class="text-left py-2">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-700">
          <tr>
            <td class="py-2">CUT-CNC-01</td>
            <td>Cutting</td>
            <td>42°C</td>
            <td class="text-emerald-400">Healthy</td>
          </tr>
          <tr>
            <td class="py-2">SEW-LINE-04</td>
            <td>Sewing</td>
            <td>78°C</td>
            <td class="text-amber-400">Warning</td>
          </tr>
          <tr>
            <td class="py-2">FIN-PRESS-02</td>
            <td>Finishing</td>
            <td>65°C</td>
            <td class="text-emerald-400">Healthy</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <!-- ================= ARCHITECTURE NOTE ================= -->
  <section class="bg-slate-900 border-l-4 border-indigo-500 p-4 rounded">
    <p class="text-sm text-slate-400">
      <strong class="text-indigo-400">Architecture Note:</strong>
      Shop-floor PLCs → MQTT → Unified Data Lake → ERP/SAP summaries.
      High-frequency machine data is decoupled from transactional systems.
    </p>
  </section>

</main>

<!-- ================= CHART LOGIC ================= -->
<script>
  // Production Chart
  new Chart(document.getElementById('prodChart'), {
    type: 'bar',
    data: {
      labels: ['08:00','09:00','10:00','11:00','12:00','13:00','14:00'],
      datasets: [
        {
          label: 'Actual',
          data: [420, 480, 510, 470, 390, 520, 560],
          backgroundColor: '#38bdf8'
        },
        {
          label: 'Target',
          data: [500, 500, 500, 500, 500, 500, 500],
          backgroundColor: '#334155'
        }
      ]
    },
    options: {
      plugins: { legend: { labels:{ color:'#e5e7eb' }}},
      scales: {
        x:{ ticks:{ color:'#e5e7eb' }},
        y:{ ticks:{ color:'#e5e7eb' }}
      }
    }
  });

  // Cost Pie Chart
  new Chart(document.getElementById('costChart'), {
    type: 'doughnut',
    data: {
      labels: ['Raw Material','Labor','Overhead'],
      datasets: [{
        data: [62, 28, 10],
        backgroundColor: ['#22c55e','#38bdf8','#f59e0b']
      }]
    },
    options: {
      plugins:{ legend:{ labels:{ color:'#e5e7eb' }}}
    }
  });
</script>

</body>
</html>
    `, {
            headers: { "content-type": "text/html;charset=UTF-8" }
        });
    }
};
