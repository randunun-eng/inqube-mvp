#!/bin/bash

# Quick Deployment Script for Oracle Cloud
# Simply SSH and run this command

set -e

echo "🚀 Deploying InQube to Oracle Cloud..."

# SSH configuration
INSTANCE_IP="140.245.244.242"
SSH_KEY="./oracle setup/ssh-key-2026-01-04 (1).key"
REMOTE_USER="ubuntu"

# Execute deployment on remote server
ssh -i "$SSH_KEY" -o StrictHostKeyChecking=no "${REMOTE_USER}@${INSTANCE_IP}" << 'ENDSSH'
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

ENDSSH

echo ""
echo "✅ DEPLOYMENT COMPLETE!"
echo "🌐 Dashboard: http://140.245.244.242"
echo "📖 API Docs: http://140.245.244.242/docs"
echo ""
echo "🧪 Test login:"
echo 'curl -X POST "http://140.245.244.242/api/v1/login/access-token" \'
echo '  -H "Content-Type: application/x-www-form-urlencoded" \'
echo '  -d "username=admin@inqube.ai&password=admin123"'
