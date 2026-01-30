# Install Docker Compose & Redeploy (Fixed)
$InstanceIP = "140.245.244.242"
$KeyFile = ".\oracle setup\ssh-key-2026-01-04 (1).key"
$RemoteUser = "ubuntu"

Write-Host "Installing Docker Compose..." -ForegroundColor Cyan

# We use single quotes for the outer PowerShell string, and double quotes inside for bash
$cmd = 'sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && sudo chmod +x /usr/local/bin/docker-compose && docker-compose --version && cd inqube-backend && sudo docker-compose up -d --build'

# Construct the SSH command carefully
$sshCmd = "ssh -i `"$KeyFile`" -o StrictHostKeyChecking=no ${RemoteUser}@${InstanceIP} `"$cmd`""

Invoke-Expression $sshCmd
