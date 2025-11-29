#!/bin/bash

# VPS Setup Script for Next.js Casino Affiliate
# Run this script on a fresh Ubuntu 22.04 server
# Usage: bash vps-setup.sh

set -e

echo "🚀 Starting VPS Setup for Next.js Casino Affiliate"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
   echo -e "${RED}Please do not run as root. Run as a user with sudo privileges.${NC}"
   exit 1
fi

# Update system
echo -e "${GREEN}📦 Updating system packages...${NC}"
sudo apt update && sudo apt upgrade -y

# Install MySQL
echo -e "${GREEN}🗄️  Installing MySQL...${NC}"
sudo apt install mysql-server -y

# Install Node.js 20.x
echo -e "${GREEN}📦 Installing Node.js 20.x...${NC}"
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2
echo -e "${GREEN}⚙️  Installing PM2...${NC}"
sudo npm install -g pm2

# Install Nginx
echo -e "${GREEN}🌐 Installing Nginx...${NC}"
sudo apt install nginx -y

# Install Certbot
echo -e "${GREEN}🔒 Installing Certbot...${NC}"
sudo apt install certbot python3-certbot-nginx -y

# Install additional tools
echo -e "${GREEN}🛠️  Installing build tools...${NC}"
sudo apt install -y git build-essential

# Configure firewall
echo -e "${GREEN}🔥 Configuring firewall...${NC}"
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
echo "y" | sudo ufw enable

# Verify installations
echo -e "${GREEN}✅ Verifying installations...${NC}"
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"
echo "PM2 version: $(pm2 --version)"
echo "MySQL version: $(mysql --version | awk '{print $5}')"
echo "Nginx version: $(nginx -v 2>&1 | awk -F/ '{print $2}')"

echo ""
echo -e "${GREEN}✅ Basic setup complete!${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Create MySQL database and user (see DEPLOYMENT_VPS.md)"
echo "2. Clone your repository"
echo "3. Configure .env.production file"
echo "4. Run database migrations"
echo "5. Build and start the application"
echo ""
echo "See DEPLOYMENT_VPS.md for detailed instructions."

