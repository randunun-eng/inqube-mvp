# Force Deployment (Attempt 2: Docker V2)
$InstanceIP = "140.245.244.242"
$KeyFile = ".\oracle setup\ssh-key-2026-01-04 (1).key"
$RemoteUser = "ubuntu"

Write-Host "Forcing Deployment (Docker Compose V2)..." -ForegroundColor Cyan

# Try 'docker compose' (space) instead of hyphen
$cmd = 'cd inqube-backend && sudo docker compose down && sudo docker compose up -d --build'

$sshCmd = "ssh -i `"$KeyFile`" -o StrictHostKeyChecking=no ${RemoteUser}@${InstanceIP} `"$cmd`""
Invoke-Expression $sshCmd
