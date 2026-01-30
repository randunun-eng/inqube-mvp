# Debug Deployment
$InstanceIP = "140.245.244.242"
$KeyFile = ".\oracle setup\ssh-key-2026-01-04 (1).key"
$RemoteUser = "ubuntu"

Write-Host "Running Docker Compose manually..."

$cmd = "cd inqube-backend && sudo docker-compose build --no-cache && sudo docker-compose up -d"
Invoke-Expression "ssh -i `"$KeyFile`" -o StrictHostKeyChecking=no ${RemoteUser}@${InstanceIP} `"$cmd`""
