# Setup HTTPS/SSL on Oracle Server
$InstanceIP = "140.245.244.242"
$KeyFile = ".\oracle setup\ssh-key-2026-01-04 (1).key"
$RemoteUser = "ubuntu"
$Domain = "140-245-244-242.nip.io"

Write-Host "Setting up HTTPS/SSL..." -ForegroundColor Cyan
Write-Host "Domain: $Domain" -ForegroundColor Yellow

# Single line command
$cmd = "sudo apt-get update && sudo apt-get install -y certbot python3-certbot-nginx && sudo certbot --nginx -d $Domain --non-interactive --agree-tos --email admin@example.com --redirect"

Invoke-Expression "ssh -i `"$KeyFile`" -o StrictHostKeyChecking=no ${RemoteUser}@${InstanceIP} `"$cmd`""
