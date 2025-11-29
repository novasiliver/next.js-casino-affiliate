# VPS Deployment Guide - Ubuntu 22.04

Complete step-by-step guide for deploying the Next.js Casino Affiliate site on Ubuntu 22.04 VPS.

## 📋 Prerequisites

- Ubuntu 22.04 VPS (minimum 2GB RAM, 2 vCPU recommended)
- Root or sudo access
- Domain name pointed to your VPS IP (optional but recommended)
- SSH access to your server

---

## 🔧 Step 1: Initial Server Setup

### 1.1 Update System

```bash
sudo apt update && sudo apt upgrade -y
```

### 1.2 Create Non-Root User (Recommended)

```bash
# Create new user
sudo adduser deploy
sudo usermod -aG sudo deploy

# Switch to new user
su - deploy
```

### 1.3 Setup SSH Key (Optional but Recommended)

```bash
# On your local machine, generate SSH key if you don't have one
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy public key to server
ssh-copy-id deploy@your-server-ip
```

---

## 🗄️ Step 2: Install MySQL Database

### 2.1 Install MySQL

```bash
sudo apt install mysql-server -y
```

### 2.2 Secure MySQL Installation

```bash
sudo mysql_secure_installation
```

Follow prompts:
- Set root password (or use auth_socket)
- Remove anonymous users: Yes
- Disallow root login remotely: Yes
- Remove test database: Yes
- Reload privilege tables: Yes

### 2.3 Create Database and User

```bash
sudo mysql -u root -p
```

In MySQL prompt:

```sql
-- Create database
CREATE DATABASE casino_affiliate CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create user
CREATE USER 'casino_user'@'localhost' IDENTIFIED BY 'casino_user123';

-- Grant privileges
GRANT ALL PRIVILEGES ON casino_affiliate.* TO 'casino_user'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;

-- Exit
EXIT;
```

### 2.4 Test Connection

```bash
mysql -u casino_user -p casino_affiliate
# Enter password, then type EXIT;
```

---

## 📦 Step 3: Install Node.js and npm

### 3.1 Install Node.js 20.x (LTS)

```bash
# Install NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install Node.js
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

### 3.2 Install PM2 (Process Manager)

```bash
sudo npm install -g pm2
```

### 3.3 Install Additional Tools

```bash
sudo apt install -y git build-essential
```

---

## 🌐 Step 4: Install and Configure Nginx

### 4.1 Install Nginx

```bash
sudo apt install nginx -y
```

### 4.2 Start and Enable Nginx

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 4.3 Configure Firewall

```bash
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
```

---

## 📥 Step 5: Deploy Application

### 5.1 Clone Repository

```bash
# Navigate to home directory
cd ~

# Clone your repository
git clone https://github.com/yourusername/next.js-casino-affiliate.git
cd next.js-casino-affiliate

# Or if using private repo with SSH
# git clone git@github.com:yourusername/next.js-casino-affiliate.git
```

### 5.2 Install Dependencies

```bash
npm ci --production=false
```

### 5.3 Create Environment File

```bash
nano .env.production
```

Add the following (adjust values):

```env
# Database
DATABASE_URL="mysql://casino_user:your_strong_password_here@localhost:3306/casino_affiliate"

# Application
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://yourdomain.com

# JWT Authentication
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRES_IN=7d
```

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Save and exit (Ctrl+X, then Y, then Enter)

### 5.4 Set File Permissions

```bash
# Make .env readable only by owner
chmod 600 .env.production
```

### 5.5 Run Database Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# (Optional) Seed database
npm run db:seed
```

### 5.6 Build Application

```bash
npm run build
```

### 5.7 Test Production Build Locally

```bash
npm start
```

Visit `http://your-server-ip:3000` to verify it works. Press Ctrl+C to stop.

---

## ⚙️ Step 6: Configure PM2

### 6.1 Create PM2 Ecosystem File

```bash
nano ecosystem.config.js
```

Add:

```javascript
module.exports = {
  apps: [{
    name: 'casino-affiliate',
    script: 'npm',
    args: 'start',
    cwd: '/home/deploy/next.js-casino-affiliate',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G'
  }]
};
```

Save and exit.

### 6.2 Create Logs Directory

```bash
mkdir -p logs
```

### 6.3 Start Application with PM2

```bash
pm2 start ecosystem.config.js
```

### 6.4 Save PM2 Configuration

```bash
pm2 save
pm2 startup
```

Follow the command it outputs (usually something like):
```bash
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u deploy --hp /home/deploy
```

### 6.5 Verify PM2 Status

```bash
pm2 status
pm2 logs casino-affiliate
```

---

## 🔒 Step 7: Configure Nginx Reverse Proxy

### 7.1 Create Nginx Configuration

```bash
sudo nano /etc/nginx/sites-available/casino-affiliate
```

Add:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # If you don't have a domain, use your server IP
    # server_name _;

    # Increase body size for file uploads
    client_max_body_size 10M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Optional: Serve static files directly
    location /_next/static {
        proxy_pass http://localhost:3000;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }
}
```

Save and exit.

### 7.2 Enable Site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/casino-affiliate /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 7.3 Verify Setup

Visit `http://yourdomain.com` or `http://your-server-ip` - you should see your site!

---

## 🔐 Step 8: Setup SSL with Let's Encrypt

### 8.1 Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 8.2 Obtain SSL Certificate

```bash
# Replace with your domain
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow prompts:
- Enter email address
- Agree to terms
- Choose whether to redirect HTTP to HTTPS (recommended: Yes)

### 8.3 Auto-Renewal Setup

Certbot automatically sets up auto-renewal. Test it:

```bash
sudo certbot renew --dry-run
```

### 8.4 Verify SSL

Visit `https://yourdomain.com` - you should see a secure connection!

---

## 🔄 Step 9: Setup Auto-Deployment (Optional)

### 9.1 Create Deployment Script

```bash
nano ~/deploy.sh
```

Add:

```bash
#!/bin/bash

cd /home/deploy/next.js-casino-affiliate

# Pull latest changes
git pull origin main

# Install dependencies
npm ci --production=false

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Build application
npm run build

# Restart PM2
pm2 restart casino-affiliate

echo "Deployment complete!"
```

Make executable:

```bash
chmod +x ~/deploy.sh
```

### 9.2 Setup Git Hooks (Optional)

For automatic deployment on push, you can set up a webhook or use GitHub Actions.

---

## 🛠️ Step 10: Create Admin User

### 10.1 Using Prisma Studio

```bash
cd ~/next.js-casino-affiliate
npx prisma studio
```

This will open Prisma Studio in your browser. Create a user in the User table.

### 10.2 Or Create via Script

```bash
nano create-admin.js
```

Add:

```javascript
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const email = 'admin@example.com';
  const password = 'your-secure-password';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: 'Admin',
      role: 'admin'
    }
  });

  console.log('Admin user created:', user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run:

```bash
node create-admin.js
```

**Important:** Delete this file after use:
```bash
rm create-admin.js
```

---

## 📊 Step 11: Monitoring and Maintenance

### 11.1 PM2 Monitoring

```bash
# View logs
pm2 logs casino-affiliate

# View real-time monitoring
pm2 monit

# View status
pm2 status

# Restart application
pm2 restart casino-affiliate

# Stop application
pm2 stop casino-affiliate
```

### 11.2 System Monitoring

```bash
# Check system resources
htop
# or
top

# Check disk space
df -h

# Check memory
free -h
```

### 11.3 Nginx Logs

```bash
# Access logs
sudo tail -f /var/log/nginx/access.log

# Error logs
sudo tail -f /var/log/nginx/error.log
```

### 11.4 Database Backup Script

```bash
nano ~/backup-db.sh
```

Add:

```bash
#!/bin/bash

BACKUP_DIR="/home/deploy/backups"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="casino_affiliate"
DB_USER="casino_user"
DB_PASS="your_strong_password_here"

mkdir -p $BACKUP_DIR

mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# Keep only last 7 days of backups
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete

echo "Backup completed: backup_$DATE.sql"
```

Make executable:

```bash
chmod +x ~/backup-db.sh
```

Add to crontab for daily backups:

```bash
crontab -e
```

Add:

```
0 2 * * * /home/deploy/backup-db.sh
```

This runs daily at 2 AM.

---

## 🔧 Step 12: Performance Optimization

### 12.1 Enable Nginx Caching

Edit Nginx config:

```bash
sudo nano /etc/nginx/sites-available/casino-affiliate
```

Add caching (inside server block):

```nginx
# Cache static assets
location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
    proxy_pass http://localhost:3000;
    proxy_cache_valid 200 30d;
    add_header Cache-Control "public, immutable";
    expires 30d;
}
```

Reload:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

### 12.2 Enable Gzip Compression

Edit Nginx config:

```bash
sudo nano /etc/nginx/nginx.conf
```

Uncomment or add:

```nginx
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;
```

Reload:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

### 12.3 Optimize MySQL

```bash
sudo nano /etc/mysql/mysql.conf.d/mysqld.cnf
```

Add/update:

```ini
[mysqld]
max_connections = 200
innodb_buffer_pool_size = 1G
innodb_log_file_size = 256M
query_cache_type = 1
query_cache_size = 64M
```

Restart MySQL:

```bash
sudo systemctl restart mysql
```

---

## 🚨 Troubleshooting

### Application Won't Start

```bash
# Check PM2 logs
pm2 logs casino-affiliate

# Check if port 3000 is in use
sudo lsof -i :3000

# Restart PM2
pm2 restart casino-affiliate
```

### Database Connection Issues

```bash
# Test MySQL connection
mysql -u casino_user -p casino_affiliate

# Check MySQL status
sudo systemctl status mysql

# Check MySQL logs
sudo tail -f /var/log/mysql/error.log
```

### Nginx Issues

```bash
# Test Nginx configuration
sudo nginx -t

# Check Nginx status
sudo systemctl status nginx

# View error logs
sudo tail -f /var/log/nginx/error.log
```

### SSL Certificate Issues

```bash
# Check certificate status
sudo certbot certificates

# Renew certificate manually
sudo certbot renew

# Check auto-renewal
sudo systemctl status certbot.timer
```

### High Memory Usage

```bash
# Check memory usage
free -h

# Restart application
pm2 restart casino-affiliate

# If needed, increase swap
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 📝 Quick Reference Commands

```bash
# Application
pm2 start ecosystem.config.js    # Start app
pm2 restart casino-affiliate      # Restart app
pm2 stop casino-affiliate         # Stop app
pm2 logs casino-affiliate         # View logs
pm2 status                        # Check status

# Database
sudo systemctl status mysql       # Check MySQL status
sudo systemctl restart mysql      # Restart MySQL
mysql -u casino_user -p           # Connect to MySQL

# Nginx
sudo systemctl status nginx       # Check Nginx status
sudo systemctl restart nginx      # Restart Nginx
sudo nginx -t                     # Test config
sudo tail -f /var/log/nginx/error.log  # View errors

# SSL
sudo certbot certificates         # List certificates
sudo certbot renew                # Renew certificates

# Deployment
cd ~/next.js-casino-affiliate
git pull
npm ci
npx prisma generate
npx prisma migrate deploy
npm run build
pm2 restart casino-affiliate
```

---

## ✅ Deployment Checklist

- [ ] Server updated and secured
- [ ] MySQL installed and database created
- [ ] Node.js 20.x installed
- [ ] Application cloned and dependencies installed
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Application built successfully
- [ ] PM2 configured and running
- [ ] Nginx reverse proxy configured
- [ ] SSL certificate installed
- [ ] Admin user created
- [ ] Backup script configured
- [ ] Monitoring setup
- [ ] Site accessible via HTTPS

---

## 🔗 Useful Resources

- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/docs/)
- [Ubuntu Server Guide](https://ubuntu.com/server/docs)

---

**Last Updated:** 2024
**Version:** 1.0

