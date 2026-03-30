# Project Structure - stypz

A Next.js-based cloud infrastructure portal application.

## Root Level

```
stypz/
├── .env.example             # Environment variables template
├── .env.local               # Local environment configuration (gitignored)
├── .git/                    # Git repository
├── .gitignore               # Git ignore rules
├── LICENSE                  # License file
├── README.md                # Project documentation
├── STRUCTURE.md             # This file - project structure
├── CHANGES.md               # Recent changes and fixes
├── package.json             # Node.js dependencies and scripts
├── package-lock.json        # Locked dependency versions
├── tsconfig.json            # TypeScript configuration
├── next.config.js           # Next.js configuration
├── postcss.config.mjs       # PostCSS configuration
├── eslint.config.mjs        # ESLint configuration
├── middleware.ts            # Next.js middleware for auth/routes
└── patch_user.py            # Python utility script
```

## Directory Structure

### `/app` - Next.js App Router

The main application directory using Next.js 13+ App Router.

```
app/
├── (portal)/                      # Portal section (authenticated routes)
│   └── portal/
│       ├── layout.tsx             # Portal layout wrapper with SessionProvider
│       ├── page.tsx               # Portal dashboard (client-side)
│       ├── api/
│       │   └── page.tsx           # API management page
│       ├── billing/
│       │   └── page.tsx           # Billing and payments page
│       ├── budget/
│       │   └── page.tsx           # Budget tracking page
│       ├── components/
│       │   ├── InstanceCard.tsx   # Instance card component
│       │   ├── Sidebar.tsx        # Responsive sidebar navigation
│       │   └── Topbar.tsx         # Top bar with user menu
│       ├── instances/
│       │   └── page.tsx           # Instance management (create, start, stop)
│       └── services/
│           └── page.tsx           # Services overview page
│
├── (site)/                        # Public site section
│   ├── layout.tsx                 # Site layout wrapper
│   ├── page.tsx                   # Home page
│   ├── about/
│   │   └── page.tsx               # About page
│   ├── components/
│   │   ├── Footer.tsx             # Site footer
│   │   └── Navbar.tsx             # Site navigation bar
│   ├── contact/
│   │   └── page.tsx               # Contact page
│   ├── features/
│   │   └── page.tsx               # Features page
│   ├── login/
│   │   └── page.tsx               # Login page (with email validation)
│   ├── pricing/
│   │   └── page.tsx               # Pricing page
│   ├── privacy/
│   │   └── page.tsx               # Privacy policy page
│   ├── products/
│   │   └── page.tsx               # Products page
│   ├── security/
│   │   └── page.tsx               # Security page
│   ├── signup/
│   │   └── page.tsx               # Sign up page (with email validation)
│   └── terms/
│       └── page.tsx               # Terms of service page
│
├── api/                           # API routes
│   └── auth/
│       └── [...nextauth]/
│           └── route.ts           # NextAuth authentication handler
│
├── favicon.ico                    # Site favicon
├── globals.css                    # Global styles with responsive utilities
├── layout.tsx                     # Root layout
├── providers.tsx                  # NextAuth SessionProvider
└── providers.tsx                  # Context providers
```

### `/components` - Reusable UI Components

```
components/
└── ui/                            # UI component library
    ├── Badge.tsx                  # Badge component
    ├── Button.tsx                 # Button component
    ├── GlassCard.tsx              # Glass morphism card component
    └── Input.tsx                  # Input component
```

### `/lib` - Utility Libraries

```
lib/
├── api.ts                         # API utilities with auth token handling
├── auth.ts                        # NextAuth configuration and callbacks
├── emailValidator.ts              # Email validation and disposable detection
├── mockData.ts                    # Mock data for development
└── utils.ts                       # General utility functions
```

### `/public` - Static Assets

```
public/
├── cpu/                           # CPU animation frames (271 images)
│   ├── ezgif-frame-001.jpg
│   ├── ezgif-frame-002.jpg
│   └── ... (ezgif-frame-003.jpg through ezgif-frame-271.jpg)
│
├── database.webp                  # Database illustration
├── file.svg                       # File icon
├── globe.svg                      # Globe icon
├── hero-network.png               # Hero network image
├── hero.webp                      # Hero image
├── logo.svg                       # Logo (SVG)
├── logo.webp                      # Logo (WebP)
├── network.webp                   # Network illustration
├── next.svg                       # Next.js logo
├── security.webp                  # Security illustration
├── vercel.svg                     # Vercel logo
└── window.svg                     # Window icon
```

### `/types` - TypeScript Type Definitions

```
types/
└── index.ts                       # Type definitions and interfaces
```

## File Summary

### Configuration Files
| File | Purpose |
|------|---------|
| `.env.local` | Local environment variables (API URLs, auth secret) |
| `.env.example` | Template for environment variables |
| `package.json` | Dependencies and npm scripts |
| `tsconfig.json` | TypeScript compiler options |
| `next.config.js` | Next.js configuration |
| `postcss.config.mjs` | PostCSS plugins (Tailwind CSS) |
| `eslint.config.mjs` | ESLint linting rules |
| `middleware.ts` | Route protection and authentication |

### Core Application Files
| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout with providers |
| `app/providers.tsx` | NextAuth SessionProvider |
| `app/globals.css` | Global CSS, Tailwind, responsive utilities |

### Authentication
| File | Purpose |
|------|---------|
| `app/api/auth/[...nextauth]/route.ts` | NextAuth.js API route |
| `lib/auth.ts` | Authentication configuration with email validation |
| `lib/emailValidator.ts` | Disposable email detection (500+ domains) |
| `middleware.ts` | Route protection for /portal |

### UI Components
| Component | Location |
|-----------|----------|
| Button | `components/ui/Button.tsx` |
| Input | `components/ui/Input.tsx` |
| Badge | `components/ui/Badge.tsx` |
| GlassCard | `components/ui/GlassCard.tsx` |
| Navbar | `app/(site)/components/Navbar.tsx` |
| Footer | `app/(site)/components/Footer.tsx` |
| Sidebar | `app/(portal)/portal/components/Sidebar.tsx` |
| Topbar | `app/(portal)/portal/components/Topbar.tsx` |
| InstanceCard | `app/(portal)/portal/components/InstanceCard.tsx` |

## Route Structure

### Public Routes (Site)
- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `/features` - Features page
- `/pricing` - Pricing page
- `/privacy` - Privacy policy
- `/products` - Products page
- `/security` - Security page
- `/login` - Login page (with email validation)
- `/signup` - Sign up page (with disposable email detection)
- `/terms` - Terms of service

### Protected Routes (Portal) - Requires Authentication
- `/portal` - Dashboard with overview
- `/portal/api` - API key management
- `/portal/billing` - Billing and payments
- `/portal/budget` - Budget tracking
- `/portal/instances` - Instance management (create, start, stop, delete)
- `/portal/services` - Services overview

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Authentication**: NextAuth.js v4 with JWT
- **UI**: Custom component library with glassmorphism
- **Linting**: ESLint v9
- **Email Validation**: Custom implementation with 500+ disposable domains

## Asset Counts

- **CPU Animation Frames**: 271 images
- **SVG Icons**: 6 files
- **WebP Images**: 5 files
- **PNG Images**: 1 file
- **Total Public Assets**: 284 files

## Recent Changes (See CHANGES.md)

1. ✅ **Login Issue Fixed** - Proper authentication flow and error handling
2. ✅ **Centralized Env Variables** - Single source of truth for configuration
3. ✅ **Portal Redirect Fixed** - Users now properly redirect after login
4. ✅ **Email Verification** - Disposable email detection and blocking
5. ✅ **Responsive Portal UI** - Professional design across all devices

## Responsive Design

### Breakpoints
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px  
- **Desktop**: > 1024px

### Mobile Optimizations
- Hamburger menu sidebar with overlay
- Card-based layouts instead of tables
- Touch-friendly 44px minimum targets
- Safe area insets for notched devices
- Prevents zoom on input focus (iOS)

### Desktop Features
- Persistent sidebar navigation
- Table views for data-dense pages
- Enhanced hover effects
- User dropdown menu in topbar
