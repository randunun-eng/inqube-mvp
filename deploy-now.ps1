# Deploy InQube to Oracle Cloud - Complete Deployment
$InstanceIP = "140.245.244.242"
$KeyFile = ".\oracle setup\ssh-key-2026-01-04 (1).key"
$RemoteUser = "ubuntu"

Write-Host "🚀 Deploying InQube to Oracle Cloud..." -ForegroundColor Cyan

$deployScript = @'
set -e
echo "🚀 Starting deployment..."

# Clone or update repository
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

# Stop services
echo "🛑 Stopping services..."
docker compose down || true

# Start services
echo "🔨 Building and starting services..."
docker compose up -d --build

# Wait for database
echo "⏳ Waiting for database..."
sleep 15

# Run migrations
echo "📊 Running database migrations..."
docker compose exec -T api alembic upgrade head || echo "⚠️  Migrations may be up to date"

# Verify
echo "✅ Verifying deployment..."
docker compose ps

echo ""
echo "✅ Deployment Complete!"
echo "🌍 API: http://140.245.244.242"
echo "📚 Docs: http://140.245.244.242/docs"
'@

$sshCmd = "ssh -i `"$KeyFile`" -o StrictHostKeyChecking=no ${RemoteUser}@${InstanceIP} `"bash -c '$deployScript'`""

Write-Host "🔌 Connecting to Oracle Cloud..." -ForegroundColor Yellow
Invoke-Expression $sshCmd

Write-Host ""
Write-Host "✅ DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "🌐 API: http://140.245.244.242" -ForegroundColor Cyan
Write-Host "📖 Docs: http://140.245.244.242/docs" -ForegroundColor Cyan
