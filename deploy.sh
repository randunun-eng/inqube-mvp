#!/bin/bash

# InQube Enterprise Deployment Script
# Run this on your Oracle Cloud VM

echo "🚀 Starting InQube Enterprise Deployment..."

# 1. Update System
echo "📦 Updating system packages..."
sudo apt-get update && sudo apt-get upgrade -y

# 2. Install Docker & Docker Compose
if ! command -v docker &> /dev/null
then
    echo "🐳 Installing Docker..."
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker $USER
    echo "✅ Docker installed."
else
    echo "✅ Docker already installed."
fi

if ! command -v docker-compose &> /dev/null
then
    echo "🐳 Installing Docker Compose..."
    sudo apt-get install -y docker-compose
    echo "✅ Docker Compose installed."
fi

# 3. Setup Project Directory
echo "📂 Setting up project directory..."
mkdir -p inqube-backend
cd inqube-backend

# 4. Pull/Update Code (Simulated for now, normally git pull)
# For this MVP, we assume files are transferred via SCP or Git
# echo "⬇️ Pulling latest code..."
# git pull origin main

# 5. Start Services
echo "🔥 Starting services..."
sudo docker-compose down
sudo docker-compose up -d --build

echo "✅ Deployment Complete!"
echo "🌍 API is running at: http://$(curl -s ifconfig.me)"
