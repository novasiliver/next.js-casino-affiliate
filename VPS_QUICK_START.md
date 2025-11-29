# VPS Quick Start Guide - Ubuntu 22.04

## 🚀 Fastest Path to Deployment

### Step 1: Initial Server Setup (5 minutes)

```bash
# Connect to your VPS
ssh root@your-server-ip

# Run automated setup script
wget https://raw.githubusercontent.com/yourusername/next.js-casino-affiliate/main/scripts/vps-setup.sh
bash vps-setup.sh

# Or manually install:
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs mysql-server nginx certbot python3-certbot-nginx git build-essential
sudo npm install -g pm2
```

### Step 2: Setup Database (2 minutes)

```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE casino_affiliate CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'casino_user'@'localhost' IDENTIFIED BY 'your_strong_password';
GRANT ALL PRIVILEGES ON casino_affiliate.* TO 'casino_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Step 3: Deploy Application (5 minutes)

```bash
# Clone repository
cd ~
git clone https://github.com/yourusername/next.js-casino-affiliate.git
cd next.js-casino-affiliate

# Create environment file
nano .env.production
```

Add:
```env
DATABASE_URL="mysql://casino_user:your_strong_password@localhost:3306/casino_affiliate"
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_EXPIRES_IN=7d
```

```bash
# Setup and build
npm ci
npx prisma generate
npx prisma migrate deploy
npm run build

# Start with PM2
pm2 start npm --name "casino-affiliate" -- start
pm2 save
pm2 startup
```

### Step 4: Configure Nginx (3 minutes)

```bash
sudo nano /etc/nginx/sites-available/casino-affiliate
```

Paste:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

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
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/casino-affiliate /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

### Step 5: Setup SSL (2 minutes)

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Step 6: Create Admin User (1 minute)

```bash
cd ~/next.js-casino-affiliate
npx prisma studio
# Create user in browser interface
```

---

## 📋 Complete Command List

```bash
# 1. Setup
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs mysql-server nginx certbot python3-certbot-nginx git build-essential
sudo npm install -g pm2

# 2. Database
sudo mysql -u root -p
# (Run SQL commands from Step 2)

# 3. Deploy
cd ~
git clone https://github.com/yourusername/next.js-casino-affiliate.git
cd next.js-casino-affiliate
nano .env.production  # Add your config
npm ci
npx prisma generate
npx prisma migrate deploy
npm run build
pm2 start npm --name "casino-affiliate" -- start
pm2 save
pm2 startup

# 4. Nginx
sudo nano /etc/nginx/sites-available/casino-affiliate
# (Add config from Step 4)
sudo ln -s /etc/nginx/sites-available/casino-affiliate /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# 5. SSL
sudo certbot --nginx -d yourdomain.com
```

---

## 🔄 Future Deployments

Use the deploy script:

```bash
cd ~/next.js-casino-affiliate
bash scripts/deploy.sh
```

Or manually:

```bash
cd ~/next.js-casino-affiliate
git pull
npm ci
npx prisma generate
npx prisma migrate deploy
npm run build
pm2 restart casino-affiliate
```

---

## 🛠️ Useful Commands

```bash
# Application
pm2 status                    # Check status
pm2 logs casino-affiliate     # View logs
pm2 restart casino-affiliate  # Restart
pm2 stop casino-affiliate    # Stop

# Nginx
sudo systemctl status nginx   # Check status
sudo systemctl restart nginx  # Restart
sudo nginx -t                 # Test config

# Database
sudo systemctl status mysql   # Check MySQL
mysql -u casino_user -p      # Connect

# SSL
sudo certbot certificates    # List certs
sudo certbot renew           # Renew
```

---

## ⚠️ Important Notes

1. **Security**: Change default passwords immediately
2. **Firewall**: Only open necessary ports (80, 443, 22)
3. **Backups**: Set up automated database backups
4. **Updates**: Keep system and dependencies updated
5. **Monitoring**: Set up monitoring for uptime and errors

---

## 📚 Full Documentation

For detailed instructions, see: `DEPLOYMENT_VPS.md`

---

**Total Setup Time:** ~20 minutes
**Difficulty:** Intermediate

