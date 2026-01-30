# Diagnose 504 Error (Fixed)
$InstanceIP = "140.245.244.242"
$KeyFile = ".\oracle setup\ssh-key-2026-01-04 (1).key"
$RemoteUser = "ubuntu"

Write-Host "Diagnosing 504 Error (Attempt 2)..." -ForegroundColor Cyan

# Single line command string
$cmd = "echo '--- CONTAINER STATUS ---'; sudo docker ps -a; echo ''; echo '--- API LOGS ---'; sudo docker logs inqube-api --tail 20; echo ''; echo '--- NGINX LOGS ---'; sudo docker logs inqube-nginx --tail 20"

Invoke-Expression "ssh -i `"$KeyFile`" -o StrictHostKeyChecking=no ${RemoteUser}@${InstanceIP} `"$cmd`""
