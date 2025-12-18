# Deployment Guide to ossg.techsphere.ng

## Prerequisites on Droplet
- Node.js 18+ installed
- MySQL 8.0 installed
- Nginx installed
- PM2 installed globally: `npm install -g pm2`
- Git installed

## Step 1: Transfer Files to Droplet

### Option A: Using Git (Recommended)
```bash
# On droplet
cd /var/www
git clone <your-repo-url> mil_rec
cd mil_rec
```

### Option B: Using SCP (if no Git repo)
```bash
# On your local machine
# Compress the project (exclude node_modules and .next)
tar -czf mil_rec.tar.gz --exclude=node_modules --exclude=.next .

# Upload to droplet
scp mil_rec.tar.gz root@ossg.techsphere.ng:/var/www/

# On droplet
cd /var/www
tar -xzf mil_rec.tar.gz -C mil_rec
cd mil_rec
```

## Step 2: Setup MySQL Database on Droplet

```bash
# Login to MySQL
mysql -u root -p

# Create database and user
CREATE DATABASE mil_rec CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'mil_rec_user'@'localhost' IDENTIFIED BY 'YourStrongPassword123!';
GRANT ALL PRIVILEGES ON mil_rec.* TO 'mil_rec_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## Step 3: Configure Environment Variables

```bash
# On droplet, in /var/www/mil_rec
nano .env
```

Add:
```env
DATABASE_URL="mysql://mil_rec_user:YourStrongPassword123!@localhost:3306/mil_rec"
NEXTAUTH_SECRET="generate-a-long-random-string-here"
NEXTAUTH_URL="https://ossg.techsphere.ng"
NODE_ENV="production"
```

Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

## Step 4: Install Dependencies and Build

```bash
cd /var/www/mil_rec

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Push database schema
npx prisma db push

# Seed the database
node scripts/seed-army-data.js
npx ts-node prisma/seed.ts

# Build for production
npm run build
```

## Step 5: Start with PM2

```bash
# Start the app with PM2
pm2 start npm --name "mil_rec" -- start

# Save PM2 process list
pm2 save

# Setup PM2 to start on system boot
pm2 startup

# Check status
pm2 status
pm2 logs mil_rec
```

## Step 6: Configure Nginx

```bash
# Create Nginx configuration
sudo nano /etc/nginx/sites-available/ossg.techsphere.ng
```

Add this configuration:
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name ossg.techsphere.ng;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ossg.techsphere.ng;

    # SSL certificates (adjust paths if needed)
    ssl_certificate /etc/letsencrypt/live/ossg.techsphere.ng/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/ossg.techsphere.ng/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Proxy to Next.js app
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

    # Next.js static files
    location /_next/static {
        alias /var/www/mil_rec/.next/static;
        expires 365d;
        access_log off;
    }

    # Public files
    location /posters {
        alias /var/www/mil_rec/public/posters;
        expires 7d;
        access_log off;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
}
```

Enable the site:
```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/ossg.techsphere.ng /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

## Step 7: Setup SSL with Let's Encrypt (if not already done)

```bash
# Install certbot if not installed
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d ossg.techsphere.ng

# Auto-renewal is setup automatically
# Test renewal:
sudo certbot renew --dry-run
```

## Step 8: Upload Poster Images

```bash
# Create posters directory
mkdir -p /var/www/mil_rec/public/posters

# Upload your poster files (from local machine)
scp poster1.jpg poster2.jpg root@ossg.techsphere.ng:/var/www/mil_rec/public/posters/

# Set correct permissions
chmod 644 /var/www/mil_rec/public/posters/*
```

## Useful PM2 Commands

```bash
# View logs
pm2 logs mil_rec

# Restart app
pm2 restart mil_rec

# Stop app
pm2 stop mil_rec

# Delete app from PM2
pm2 delete mil_rec

# Monitor
pm2 monit

# View all processes
pm2 list
```

## Updating the Application

When you need to update:

```bash
cd /var/www/mil_rec

# Pull latest changes (if using Git)
git pull

# Or upload new files via SCP

# Install any new dependencies
npm install

# Rebuild
npm run build

# Update database schema if needed
npx prisma db push

# Restart the app
pm2 restart mil_rec
```

## Troubleshooting

### Check if app is running:
```bash
pm2 status
pm2 logs mil_rec --lines 50
```

### Check if port 3000 is in use:
```bash
netstat -tulpn | grep :3000
```

### Check Nginx:
```bash
sudo nginx -t
sudo systemctl status nginx
sudo tail -f /var/log/nginx/error.log
```

### Database connection issues:
```bash
# Test MySQL connection
mysql -u mil_rec_user -p mil_rec

# Check if database exists
SHOW DATABASES;
USE mil_rec;
SHOW TABLES;
```

## Security Checklist

- [ ] Change default database password
- [ ] Set strong NEXTAUTH_SECRET
- [ ] Setup firewall (ufw) to only allow ports 22, 80, 443
- [ ] Keep Node.js and npm updated
- [ ] Regular database backups
- [ ] Monitor PM2 logs for errors
- [ ] Setup fail2ban for SSH protection

## Database Backup

```bash
# Create backup script
nano /root/backup-mil-rec.sh
```

Add:
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
mysqldump -u mil_rec_user -p'YourStrongPassword123!' mil_rec > /root/backups/mil_rec_$DATE.sql
# Keep only last 7 days
find /root/backups -name "mil_rec_*.sql" -mtime +7 -delete
```

Setup cron:
```bash
chmod +x /root/backup-mil-rec.sh
crontab -e
# Add: 0 2 * * * /root/backup-mil-rec.sh
```

## Notes

- This setup runs Next.js in standalone mode on port 3000
- Nginx acts as reverse proxy and handles SSL
- PM2 keeps the app running and restarts on crashes
- Other sites on your droplet remain unaffected (different server blocks in Nginx)
- Make sure ossg.techsphere.ng DNS points to your droplet IP
