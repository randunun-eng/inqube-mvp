# PowerShell Auto-Deployment Script for InQube
# Target: Oracle Cloud (140.245.244.242)

$ErrorActionPreference = "Stop"

# Configuration
$InstanceIP = "140.245.244.242"
$KeyFile = ".\oracle setup\ssh-key-2026-01-04 (1).key"
$RemoteUser = "ubuntu"
$ZipFile = "inqube-deploy.zip"
$DeployDir = "deploy_package"

Write-Host "Starting Deployment..." -ForegroundColor Cyan

# 0. Fix Key Permissions (Crucial for Windows OpenSSH)
Write-Host "Fixing SSH Key permissions..."
$keyPath = Resolve-Path $KeyFile
$acl = Get-Acl -Path $keyPath
$acl.SetAccessRuleProtection($true, $false) # Disable inheritance
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule($env:USERNAME, "Read", "Allow")
$acl.SetAccessRule($rule)
Set-Acl -Path $keyPath -AclObject $acl
Write-Host "Key permissions fixed." -ForegroundColor Green

# 1. Packaging
Write-Host "Packaging application..."
if (Test-Path $DeployDir) { Remove-Item -Recurse -Force $DeployDir }
if (Test-Path $ZipFile) { Remove-Item -Force $ZipFile }

New-Item -ItemType Directory -Force -Path $DeployDir | Out-Null
Copy-Item -Recurse -Path "backend" -Destination $DeployDir
Copy-Item -Recurse -Path "nginx" -Destination $DeployDir
Copy-Item -Path "docker-compose.yml" -Destination $DeployDir
Copy-Item -Path "deploy.sh" -Destination $DeployDir

Compress-Archive -Path "$DeployDir\*" -DestinationPath $ZipFile
Remove-Item -Recurse -Force $DeployDir
Write-Host "Package created." -ForegroundColor Green

# 2. Uploading
Write-Host "Uploading to Oracle Cloud..."
$scpCmd = "scp -i `"$KeyFile`" -o StrictHostKeyChecking=no $ZipFile ${RemoteUser}@${InstanceIP}:~/"
Invoke-Expression $scpCmd

# 3. Executing
Write-Host "Executing deployment on server..."
$sshCmd = "ssh -i `"$KeyFile`" -o StrictHostKeyChecking=no ${RemoteUser}@${InstanceIP} 'sudo apt-get install -y unzip && unzip -o inqube-deploy.zip -d inqube-backend && cd inqube-backend && chmod +x deploy.sh && ./deploy.sh'"
Invoke-Expression $sshCmd

Write-Host "DEPLOYMENT COMPLETE!" -ForegroundColor Green
