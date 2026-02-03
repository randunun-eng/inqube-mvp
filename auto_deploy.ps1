# PowerShell Auto-Deployment Script for InQube
# Target: Oracle Cloud (140.245.244.242)

$ErrorActionPreference = "Stop"

# Configuration
$InstanceIP = "140.245.244.242"
$KeyFile = ".\oracle setup\ssh-key-2026-01-04 (1).key"
$RemoteUser = "ubuntu"

Write-Host "🚀 Starting InQube Deployment to Oracle Cloud..." -ForegroundColor Cyan

# 0. Fix Key Permissions
Write-Host "🔑 Fixing SSH Key permissions..."
$keyPath = Resolve-Path $KeyFile
$acl = Get-Acl -Path $keyPath
$acl.SetAccessRuleProtection($true, $false)
$rule = New-Object System.Security.AccessControl.FileSystemAccessRule($env:USERNAME, "Read", "Allow")
$acl.SetAccessRule($rule)
Set-Acl -Path $keyPath -AclObject $acl
Write-Host "✅ Key permissions fixed." -ForegroundColor Green

# 1. Test SSH Connection
Write-Host "🔌 Testing SSH connection..."
$testCmd = "ssh -i `"$KeyFile`" -o StrictHostKeyChecking=no -o ConnectTimeout=10 ${RemoteUser}@${InstanceIP} 'echo OK'"
try {
    $result = Invoke-Expression $testCmd 2>&1
    if ($result -notmatch "OK") {
        throw "SSH connection test failed"
    }
    Write-Host "✅ SSH connection successful." -ForegroundColor Green
}
catch {
    Write-Host "❌ Cannot connect to $InstanceIP" -ForegroundColor Red
    Write-Host "Error: $_" -ForegroundColor Red
    exit 1
}

# 2. Deploy via SSH
Write-Host "📦 Deploying latest code from GitHub..."
$sshCmd = "ssh -i `"$KeyFile`" -o StrictHostKeyChecking=no ${RemoteUser}@${InstanceIP}"

& $sshCmd @'
set -e
echo "🚀 Starting deployment..."

if [ ! -d "inqube-mvp" ]; then
    echo "📥 Cloning repository..."
    git clone https://github.com/randunun-eng/inqube-mvp.git
else
    echo "⬇️  Pulling latest changes..."
    cd inqube-mvp
    git pull origin main
    cd ..
fi

cd inqube-mvp

echo "🛑 Stopping services..."
docker compose down || true

echo "🔨 Building and starting services..."
docker compose up -d --build

echo "⏳ Waiting for database..."
sleep 15

echo "📊 Running database migrations..."
docker compose exec -T api alembic upgrade head || echo "⚠️  Migrations skipped"

echo "✅ Verifying deployment..."
docker compose ps

echo ""
echo "✅ Deployment Complete!"
echo "🌍 API: http://140.245.244.242"
echo "📚 Docs: http://140.245.244.242/docs"
'@

Write-Host ""
Write-Host "✅ DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "🌐 Dashboard: http://140.245.244.242" -ForegroundColor Cyan
Write-Host "📖 API Docs: http://140.245.244.242/docs" -ForegroundColor Cyan
Write-Host ""
Write-Host "🧪 Test login:" -ForegroundColor Yellow
Write-Host 'curl -X POST "http://140.245.244.242/api/v1/login/access-token" \' -ForegroundColor Gray
Write-Host '  -H "Content-Type: application/x-www-form-urlencoded" \' -ForegroundColor Gray
Write-Host '  -d "username=admin@inqube.ai&password=admin123"' -ForegroundColor Gray
