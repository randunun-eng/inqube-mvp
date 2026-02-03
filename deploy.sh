#!/bin/bash

# InQube Enterprise Deployment Script
# Run this on your Oracle Cloud VM

set -e  # Exit on error

echo "🚀 Starting InQube Enterprise Deployment..."

# 1. Navigate to project directory
cd ~/inqube-mvp || { echo "❌ Project directory not found. Cloning..."; git clone https://github.com/randunun-eng/inqube-mvp.git ~/inqube-mvp && cd ~/inqube-mvp; }

# 2. Pull latest code
echo "⬇️  Pulling latest code from GitHub..."
git pull origin main

# 3. Stop existing services
echo "🛑 Stopping existing services..."
docker compose down || true

# 4. Build and start services
echo "🔨 Building and starting services..."
docker compose up -d --build

# 5. Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# 6. Run database migrations
echo "📊 Running database migrations..."
docker compose exec -T api alembic upgrade head

# 7. Verify deployment
echo "✅ Verifying deployment..."
docker compose ps

# 8. Test health endpoint
echo "🏥 Testing health endpoint..."
curl -f http://localhost/health || curl -f http://localhost:8000/health

echo ""
echo "✅ Deployment Complete!"
echo "🌍 API is running at: http://140.245.244.242"
echo "📚 API Docs: http://140.245.244.242/docs"
echo ""
echo "🧪 Test the API:"
echo 'curl -X POST "http://140.245.244.242/api/v1/login/access-token" \'
echo '  -H "Content-Type: application/x-www-form-urlencoded" \'
echo '  -d "username=admin@inqube.ai&password=admin123"'
