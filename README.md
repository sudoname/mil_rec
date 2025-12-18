# Lagos State Military Recruitment EOI Portal

A futuristic, mobile-first web application for Lagos State indigenes to register their Expression of Interest (EOI) in joining the Nigerian Military.

## 🎨 Design

- **Theme**: Dark mode, militaristic & futuristic
- **Colors**: Military green, navy blue, gold accents
- **Style**: Glassmorphism, subtle glows, bold typography
- **Mobile-first**: Responsive design optimized for all devices

## 🛠 Tech Stack

- **Frontend**: Next.js 15 (App Router) + TypeScript + TailwindCSS
- **Backend**: Next.js Route Handlers
- **Database**: MySQL
- **ORM**: Prisma
- **Auth**: NextAuth (credentials) for Admin
- **File Storage**: Local disk (`/public/uploads`)

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm/pnpm
- MySQL database (5.7+ or 8.0+)
- Git

### Setup Steps

1. **Clone and Navigate**
   ```bash
   cd /path/to/mil_rec
   ```

2. **Install Dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your database credentials:
   ```env
   DATABASE_URL="mysql://user:password@localhost:3306/mil_rec"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="generate-a-random-secret-here"
   ADMIN_SEED_EMAIL="admin@ossg.lagos.gov.ng"
   ADMIN_SEED_PASSWORD="Change@123"
   ```

   **Generate NEXTAUTH_SECRET**:
   ```bash
   openssl rand -base64 32
   ```

4. **Database Setup**
   ```bash
   # Run migrations
   npm run db:migrate

   # Seed initial data (admin user + sample data)
   npm run db:seed
   ```

5. **Start Development Server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

6. **Admin Access**
   - URL: [http://localhost:3000/admin](http://localhost:3000/admin)
   - Email: `admin@ossg.lagos.gov.ng` (or your ADMIN_SEED_EMAIL)
   - Password: `Change@123` (or your ADMIN_SEED_PASSWORD)

## 📁 Project Structure

```
mil_rec/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── auth/[...nextauth]/   # NextAuth endpoint
│   │   ├── applications/         # Application CRUD
│   │   ├── posters/              # Poster management
│   │   ├── contact/              # Contact form
│   │   └── settings/             # Site settings
│   ├── admin/                    # Admin panel pages
│   │   ├── applications/         # Manage applications
│   │   ├── posters/              # Poster manager
│   │   ├── settings/             # Site content editor
│   │   ├── messages/             # Contact messages
│   │   └── page.tsx              # Admin dashboard
│   ├── show-interest/            # Multi-step EOI form
│   ├── about/                    # About page
│   ├── contact/                  # Contact page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── providers.tsx             # Session provider
│   └── globals.css               # Global styles
├── components/                   # Reusable components
│   ├── layout/                   # Navbar, Footer
│   ├── forms/                    # Form components
│   └── ui/                       # UI primitives
├── lib/                          # Utilities
│   ├── prisma.ts                 # Prisma client
│   ├── auth.ts                   # NextAuth config
│   ├── validations.ts            # Zod schemas
│   ├── constants.ts              # LGAs, branches, etc.
│   └── utils.ts                  # Helper functions
├── prisma/                       # Database
│   ├── schema.prisma             # Database schema
│   └── seed.ts                   # Seed script
├── public/                       # Static files
│   ├── posters/                  # Poster placeholders
│   ├── hero/                     # Hero images
│   ├── stock/                    # Stock images
│   └── uploads/                  # User uploads
└── types/                        # TypeScript types

## 🎯 Features

### Public Pages

1. **Home (`/`)**
   - Bold military-style banner
   - Official notice panel
   - Poster carousel (auto-play, manual controls)
   - Branches overview
   - CTA sections

2. **Show Interest (`/show-interest`)**
   - Multi-step form wizard:
     - Step 1: Personal Info
     - Step 2: Lagos Indigene Info
     - Step 3: Education
     - Step 4: Branch Selection & Skills
     - Step 5: File Uploads (optional)
     - Step 6: Consent & Submit
   - Server-side validation
   - Progress indicator
   - Unique Reference ID on success

3. **About Us (`/about`)**
   - Initiative overview
   - Governor's call-to-action
   - Process explanation
   - Disclaimers
   - Editable content via Admin

4. **Contact Us (`/contact`)**
   - Office information
   - Contact person cards (phone/role)
   - Contact form

### Admin Panel (`/admin`)

Protected by NextAuth. Features:

1. **Dashboard**
   - Total applications
   - Today's registrations
   - Status breakdown
   - Top LGAs chart
   - Branch interest stats

2. **Applications Management**
   - Search by name/phone/reference
   - Filters: status, branch, LGA, age
   - CSV export
   - Application detail view
   - Status workflow (NEW → REVIEWING → SHORTLISTED → CONTACTED → REJECTED)
   - Internal notes

3. **Poster Manager**
   - Upload new posters
   - Edit title/caption
   - Toggle active/inactive
   - Set display order
   - Preview & delete

4. **Site Content Manager**
   - Edit Governor notice
   - Edit department info
   - Edit office address
   - Manage contact persons
   - Edit about page content
   - Edit disclaimers

5. **Contact Messages**
   - View submissions
   - Mark as resolved
   - Search/filter

## 🗄 Database Schema

### Key Models

- **User**: Admin accounts
- **Application**: EOI submissions
- **UploadedFile**: Attached documents
- **Poster**: Carousel images
- **ContactMessage**: Form submissions
- **SiteSetting**: Editable content (key-value)

See `prisma/schema.prisma` for full schema.

## 🔐 Security

- NextAuth for admin authentication
- Zod validation (client + server)
- Rate limiting on public forms (TODO: implement middleware)
- File upload restrictions (size + type)
- SQL injection protection (Prisma ORM)
- XSS protection (React escaping)

## 🚀 Deployment

### Prerequisites
- MySQL database (shared hosting via cPanel, or services like PlanetScale, Railway)
- Node.js hosting (Vercel, Railway, Render, or shared hosting with Node.js support)

### Steps

1. **Database**
   - Create MySQL database (via cPanel or hosting provider)
   - Run migrations: `npm run db:migrate`
   - Run seed: `npm run db:seed`

2. **Environment Variables**
   Set in your hosting platform:
   ```
   DATABASE_URL=
   NEXTAUTH_URL=
   NEXTAUTH_SECRET=
   ADMIN_SEED_EMAIL=
   ADMIN_SEED_PASSWORD=
   ```

3. **Build & Deploy**
   ```bash
   npm run build
   npm start
   ```

### Vercel Deployment

```bash
vercel --prod
```

Set environment variables in Vercel dashboard.

## 📝 Development Tasks

### To Complete

1. **Show Interest Form**
   - Create multi-step wizard component
   - Implement file upload handling
   - Add form validation UI feedback
   - Create success page with Reference ID

2. **Poster Carousel**
   - Implement auto-play carousel
   - Add manual controls (prev/next)
   - Modal view on click
   - Download button

3. **Admin Pages**
   - Complete dashboard with charts
   - Build applications table with filters
   - Create application detail view
   - Build poster upload form
   - Create content editor forms

4. **API Routes**
   - POST `/api/applications` - Submit EOI
   - GET `/api/applications` - List (admin)
   - PATCH `/api/applications/[id]` - Update status
   - POST `/api/posters` - Upload poster
   - POST `/api/contact` - Submit contact form
   - GET/PUT `/api/settings` - Manage site settings

5. **Utilities**
   - CSV export function
   - File upload middleware
   - Rate limiting middleware

### Sample API Route Pattern

```typescript
// app/api/applications/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { applicationSchema } from '@/lib/validations';
import { generateReferenceId } from '@/lib/utils';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = applicationSchema.parse(body);

    const application = await prisma.application.create({
      data: {
        ...validated,
        referenceId: generateReferenceId(),
        branches: JSON.stringify(validated.branches),
        skills: JSON.stringify(validated.skills || []),
      },
    });

    return NextResponse.json({
      success: true,
      referenceId: application.referenceId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Validation failed' },
      { status: 400 }
    );
  }
}
```

## 🎨 Placeholder Images

Store royalty-free images in:
- `/public/posters/` - Poster images (poster1.jpg, poster2.jpg, poster3.jpg)
- `/public/hero/` - Hero section backgrounds
- `/public/stock/jets.jpg` - Military jets
- `/public/stock/cyber.jpg` - Cyber security visuals
- `/public/stock/commandos.jpg` - Field operations

Replace with actual images before production.

## 📞 Support

For issues or questions:
- Review this README
- Check `/prisma/schema.prisma` for data structure
- Review `/lib/validations.ts` for form requirements

## ⚖️ Disclaimer

This portal is for Expression of Interest only. It does NOT guarantee enlistment. Final recruitment is conducted by official Nigerian Military channels.

## 🏛 Credits

Developed for Lagos State Government - Office of the Secretary to the State Government (OSSG) Cabinet Office.
