# PowerShell Diagnostic Script for Oracle VM (Fixed)
# Target: 140.245.244.242

$ErrorActionPreference = "Stop"
$InstanceIP = "140.245.244.242"
$KeyFile = ".\oracle setup\ssh-key-2026-01-04 (1).key"
$RemoteUser = "ubuntu"

Write-Host "Running Deep Diagnostics (Attempt 2)..." -ForegroundColor Cyan

# Commands as a single line to avoid CRLF issues
$cmd = "echo '--- 1. DOCKER STATUS ---'; sudo docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'; echo '--- 2. PORT LISTENERS ---'; sudo netstat -tlnp | grep 8000; echo '--- 3. LOCAL CURL TEST ---'; curl -s -o /dev/null -w '%{http_code}' http://localhost:8000/api/health; echo ''; echo '--- 4. FIREWALL ---'; sudo iptables -L INPUT -n | grep 8000"

Invoke-Expression "ssh -i `"$KeyFile`" -o StrictHostKeyChecking=no ${RemoteUser}@${InstanceIP} `"$cmd`""
