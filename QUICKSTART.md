# Quick Start Guide

Get the Lagos State Military Recruitment EOI Portal running in minutes!

## 📋 Prerequisites Checklist

Before you begin, ensure you have:

- ✅ Node.js 18+ installed (`node --version`)
- ✅ MySQL 5.7+ or 8.0+ running (local or cloud)
- ✅ Git installed (optional)
- ✅ A code editor (VS Code recommended)

## 🚀 5-Minute Setup

### Step 1: Install Dependencies (2 min)

```bash
cd /c/Users/yomi/OSSG/mil_rec
npm install
```

*This installs all required packages listed in package.json*

### Step 2: Configure Database (1 min)

Create a MySQL database named `mil_rec`.

**Option A: Local MySQL**
```sql
-- Run in MySQL command line or phpMyAdmin
CREATE DATABASE mil_rec;
```

**Option B: Shared Hosting (cPanel)**
- Log into cPanel
- Go to MySQL Databases
- Create new database named `mil_rec`
- Create database user and assign to database
- Note the host, username, password, and database name

**Option C: Cloud (PlanetScale/Railway)**
- Create account
- Create new MySQL database
- Copy connection string

### Step 3: Set Environment Variables (1 min)

```bash
# Copy the example
cp .env.example .env

# Edit .env with your values
```

**Minimum required:**
```env
DATABASE_URL="mysql://username:password@localhost:3306/mil_rec"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
```

**For shared hosting, your DATABASE_URL will look like:**
```env
DATABASE_URL="mysql://username:password@hostname:3306/databasename"
```

### Step 4: Initialize Database (1 min)

```bash
# Create tables
npm run db:migrate

# Add sample data + admin user
npm run db:seed
```

*This creates the schema and seeds initial data including an admin account*

### Step 5: Start Development Server (30 sec)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🎯 What You'll See

### Public Site
- **Homepage** (`/`) - Military-themed landing page with banner
- **Show Interest** (`/show-interest`) - Registration form (TO BUILD)
- **About** (`/about`) - Information page (TO BUILD)
- **Contact** (`/contact`) - Contact form (TO BUILD)

### Admin Panel
- **Login** (`/admin/login`) - TO BUILD
  - Use seeded credentials:
    - Email: `admin@ossg.lagos.gov.ng`
    - Password: `Change@123`
- **Dashboard** (`/admin`) - TO BUILD
- **Applications** (`/admin/applications`) - TO BUILD
- **Posters** (`/admin/posters`) - TO BUILD
- **Settings** (`/admin/settings`) - TO BUILD

---

## 🛠 Immediate Next Steps

### 1. Test the Setup

```bash
# Terminal 1: Run dev server
npm run dev

# Terminal 2: Open Prisma Studio (database GUI)
npm run db:studio
```

Visit:
- Frontend: http://localhost:3000
- Prisma Studio: http://localhost:5555

### 2. Verify Seed Data

In Prisma Studio, check:
- ✅ `users` table has 1 admin
- ✅ `site_settings` table has ~8 records
- ✅ `posters` table has 3 placeholder records

### 3. Add Placeholder Images

Create simple placeholder images:

```bash
# Navigate to public folder
cd public/posters

# Option A: Download free military images from:
# - unsplash.com (search: military, jets, cyber security)
# - pexels.com
# - pixabay.com

# Option B: Use solid color placeholders (temp)
# Just create 800x600px colored rectangles named:
# - poster1.jpg
# - poster2.jpg
# - poster3.jpg
```

---

## 🎨 Key Files to Know

### Most Important Files

1. **`app/page.tsx`** - Homepage (already built)
2. **`prisma/schema.prisma`** - Database structure
3. **`lib/validations.ts`** - Form validation rules
4. **`lib/constants.ts`** - LGAs, branches, skills
5. **`app/globals.css`** - Styling system

### Where to Add Features

| Feature | Location |
|---------|----------|
| New page | `app/pagename/page.tsx` |
| API endpoint | `app/api/endpoint/route.ts` |
| Component | `components/ComponentName.tsx` |
| Utility | `lib/utils.ts` |
| Validation | `lib/validations.ts` |

---

## 💻 Development Commands

```bash
# Start dev server
npm run dev

# Run database migrations
npm run db:migrate

# Seed database
npm run db:seed

# Open Prisma Studio
npm run db:studio

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

---

## 📁 Project Structure

```
mil_rec/
├── app/              # Pages & API routes
│   ├── page.tsx      # Homepage ✅
│   ├── api/          # Backend endpoints
│   └── admin/        # Admin panel pages
├── components/       # Reusable UI components
│   ├── layout/       # Navbar, Footer
│   └── forms/        # Form components
├── lib/              # Utilities & configs
│   ├── prisma.ts     # Database client ✅
│   ├── auth.ts       # NextAuth config ✅
│   └── validations.ts # Form schemas ✅
├── prisma/           # Database
│   ├── schema.prisma # Database structure ✅
│   └── seed.ts       # Initial data ✅
└── public/           # Static files
    ├── posters/      # Poster images
    └── uploads/      # User uploads
```

---

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Check MySQL is running
mysql --version

# For shared hosting:
# - Verify host, username, password in cPanel
# - Ensure database user has ALL PRIVILEGES on the database
# - Check if remote connections are allowed

# Verify DATABASE_URL in .env
# Ensure database exists
```

### Port 3000 Already in Use
```bash
# Use different port
PORT=3001 npm run dev
```

### Prisma Migration Failed
```bash
# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# Re-run
npm run db:migrate
npm run db:seed
```

### Module Not Found
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 Learn More

- Read `README.md` for full documentation
- Read `PROJECT_COMPLETION_GUIDE.md` for implementation roadmap
- Check `prisma/schema.prisma` for database structure
- Review `lib/validations.ts` for form requirements

---

## 🎯 Your First Task

**Build the Show Interest Form**

1. Create `app/show-interest/page.tsx`
2. Build multi-step wizard component
3. Implement form validation
4. Add API route to save applications
5. Show success page with Reference ID

See `PROJECT_COMPLETION_GUIDE.md` → Phase 1 for details.

---

## ✅ Checklist

Setup complete when:

- [ ] `npm run dev` works
- [ ] Homepage loads at http://localhost:3000
- [ ] Prisma Studio shows seeded data
- [ ] Admin email/password known
- [ ] Placeholder posters added

---

## 🆘 Need Help?

1. Check error messages in terminal
2. Review browser console (F12)
3. Verify .env file is configured
4. Ensure MySQL is running (or cPanel database is created)
5. Check `README.md` for details

---

## 🎉 You're Ready!

The foundation is built. Time to create the features!

**Next:** Open `PROJECT_COMPLETION_GUIDE.md` and start with Phase 1.

Good luck! 🚀
