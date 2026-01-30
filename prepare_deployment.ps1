# PowerShell Script to Package InQube for Deployment

Write-Host "📦 Packaging InQube for Oracle Cloud Deployment..." -ForegroundColor Cyan

$deployDir = "deploy_package"
$zipFile = "inqube-deploy.zip"

# 1. Clean up previous builds
if (Test-Path $deployDir) { Remove-Item -Recurse -Force $deployDir }
if (Test-Path $zipFile) { Remove-Item -Force $zipFile }

# 2. Create staging directory
New-Item -ItemType Directory -Force -Path $deployDir | Out-Null

# 3. Copy necessary files
Write-Host "   Copying files..."
Copy-Item -Recurse -Path "backend" -Destination $deployDir
Copy-Item -Recurse -Path "nginx" -Destination $deployDir
Copy-Item -Path "docker-compose.yml" -Destination $deployDir
Copy-Item -Path "deploy.sh" -Destination $deployDir

# 4. Create Zip Archive
Write-Host "   Zipping archive..."
Compress-Archive -Path "$deployDir\*" -DestinationPath $zipFile

# 5. Clean up staging
Remove-Item -Recurse -Force $deployDir

Write-Host "✅ Package created: $zipFile" -ForegroundColor Green
Write-Host "---------------------------------------------------"
Write-Host "NEXT STEP: Run the following command to upload to your Oracle VM:" -ForegroundColor Yellow
Write-Host "scp $zipFile ubuntu@<YOUR_ORACLE_IP>:~/" -ForegroundColor White
Write-Host "---------------------------------------------------"
