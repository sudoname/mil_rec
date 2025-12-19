# Lagos State Military Recruitment Portal - Deployment Complete

**Date:** December 18, 2024
**GitHub Repository:** https://github.com/sudoname/mil_rec
**Production URL:** https://ossg.techsphere.ng

## ✅ Deployment Status: COMPLETE

The application is now live and fully functional at https://ossg.techsphere.ng

## Production Configuration

### Server Details
- **Droplet:** ubuntu-s-bot
- **Project Path:** `/var/www/mil_rec`
- **Port:** 3005
- **Process Manager:** PM2
- **Web Server:** Nginx (reverse proxy)

### Database
- **Type:** MySQL 8.0
- **Database Name:** mil_rec
- **Username:** mil_rec_user
- **Password:** NewPassword123!
- **Records Seeded:** 646 army admission records (600 main + 46 supplementary)

### Environment Variables (Production)
Located at: `/var/www/mil_rec/.env`

```env
# Database
DATABASE_URL="mysql://mil_rec_user:NewPassword123!@localhost:3306/mil_rec"

# NextAuth
NEXTAUTH_URL="https://ossg.techsphere.ng"
NEXTAUTH_SECRET="xK8mP2vN9qR5sT7wY3zA4bC6dE8fG0hJ1iL3mN5oP7qR9s="

# Admin Seed Credentials
ADMIN_SEED_EMAIL="admin@ossg.lagos.gov.ng"
ADMIN_SEED_PASSWORD="Change@123"
NODE_ENV="production"
```

### PM2 Configuration
Located at: `/var/www/mil_rec/ecosystem.config.js`

```javascript
module.exports = {
  apps: [{
    name: 'mil_rec',
    script: '.next/standalone/server.js',
    cwd: '/var/www/mil_rec',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: 3005,
      DATABASE_URL: 'mysql://mil_rec_user:NewPassword123!@localhost:3306/mil_rec',
      NEXTAUTH_URL: 'https://ossg.techsphere.ng',
      NEXTAUTH_SECRET: 'xK8mP2vN9qR5sT7wY3zA4bC6dE8fG0hJ1iL3mN5oP7qR9s='
    }
  }]
};
```

## Admin Access

**Login URL:** https://ossg.techsphere.ng/admin

**Default Credentials:**
- Email: admin@ossg.lagos.gov.ng
- Password: Change@123

⚠️ **IMPORTANT:** Change the admin password after first login!

## Live Pages

### Public Pages
- **Homepage:** https://ossg.techsphere.ng
- **Show Interest Form:** https://ossg.techsphere.ng/show-interest
- **About:** https://ossg.techsphere.ng/about
- **Contact:** https://ossg.techsphere.ng/contact
- **Army Main List (600):** https://ossg.techsphere.ng/army-admission/main-list
- **Army Supplementary (46):** https://ossg.techsphere.ng/army-admission/supplementary-list

### Admin Pages
- **Dashboard:** https://ossg.techsphere.ng/admin
- **Applications:** https://ossg.techsphere.ng/admin/applications
- **Messages:** https://ossg.techsphere.ng/admin/messages
- **Settings:** https://ossg.techsphere.ng/admin/settings

## Common Management Commands

### PM2 Management
```bash
# View status
pm2 status

# View logs
pm2 logs mil_rec
pm2 logs mil_rec --lines 50

# Restart app
pm2 restart mil_rec

# Stop app
pm2 stop mil_rec

# Start app
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save
```

### Deployment Updates
```bash
# Navigate to project
cd /var/www/mil_rec

# Pull latest code from GitHub
git pull

# Install new dependencies (if any)
npm install

# Rebuild application
npm run build

# Copy files to standalone
cp .env .next/standalone/.env
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/

# Restart PM2
pm2 restart mil_rec
```

### Database Management
```bash
# Access MySQL
mysql -u mil_rec_user -p mil_rec
# Password: NewPassword123!

# Push schema changes
npx prisma db push

# Seed army data
node scripts/seed-army-data.js

# Seed admin users
npx tsx prisma/seed.ts
```

### Nginx Management
```bash
# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# View Nginx error logs
sudo tail -f /var/log/nginx/error.log
```

## Issues Fixed During Deployment

1. **Next.js 15 Async Params** - Updated API routes to handle Promise-based params
2. **Standalone Mode** - Configured proper standalone server execution
3. **Environment Variables** - Created PM2 ecosystem config for env var management
4. **Port Conflict** - Configured app to run on port 3005 (port 3000 was in use)
5. **Database Connection** - Set up proper MySQL credentials and Prisma configuration
6. **ApplicationsTable Types** - Fixed TypeScript type mismatches for modal data

## Git Commits Made

1. "Add Lagos State Military Recruitment Portal with Army 90RRI results"
2. "Fix Next.js 15 async params compatibility in API routes"
3. "Fix ApplicationsTable to fetch full details before opening modal"

## Next Steps (Future)

- [ ] Add Navy recruitment data when available
- [ ] Add Air Force recruitment data when available
- [ ] Upload poster images to `/var/www/mil_rec/public/posters/`
- [ ] Change admin password from default
- [ ] Set up database backups (see DEPLOYMENT.md for backup script)
- [ ] Monitor PM2 logs regularly

## Tech Stack

- **Framework:** Next.js 15.1.5 (App Router)
- **Database:** MySQL 8.0 with Prisma ORM
- **Authentication:** NextAuth v4
- **Styling:** TailwindCSS
- **Process Manager:** PM2
- **Web Server:** Nginx
- **Runtime:** Node.js 18+

## Support & Documentation

- **Deployment Guide:** See `DEPLOYMENT.md` for detailed deployment instructions
- **GitHub Issues:** https://github.com/sudoname/mil_rec/issues
- **Local Development:** See `README.md` (if exists)

---

**Deployment completed successfully on December 18, 2024**

All 646 army admission records seeded and accessible.
Application running stable on PM2 with proper environment configuration.
