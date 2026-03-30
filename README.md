# Stypz — Modern Infrastructure, Simplified

A Next.js-based cloud infrastructure portal for deploying and managing VPS instances.

![Stypz](./public/hero.webp)

## Features

- 🚀 **Deploy Infrastructure** - Provision VPS instances in seconds
- 💳 **Billing Management** - Track usage and manage payments
- 🔐 **Secure Authentication** - JWT-based auth with email validation
- 📱 **Fully Responsive** - Works on desktop, tablet, and mobile
- 🎨 **Modern UI** - Glassmorphism design with smooth animations

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running at `http://127.0.0.1:8000` (or update `.env.local`)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/02th/stypz.git
   cd stypz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and set:
   ```env
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
   NEXTAUTH_URL=http://localhost:3001
   NEXTAUTH_SECRET=your-secret-key-here
   ```
   
   Generate a secure secret:
   ```bash
   openssl rand -base64 32
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3001](http://localhost:3001)

## Project Structure

```
stypz/
├── app/                    # Next.js App Router
│   ├── (site)/            # Public pages (home, login, signup)
│   ├── (portal)/          # Protected portal pages
│   └── api/               # API routes (auth)
├── components/            # Reusable UI components
├── lib/                   # Utilities (auth, API, validation)
├── public/                # Static assets
└── types/                 # TypeScript definitions
```

See [STRUCTURE.md](./STRUCTURE.md) for detailed structure.

## Available Scripts

```bash
npm run dev      # Start development server (port 3001)
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS v4
- **Authentication**: NextAuth.js v4 with JWT
- **Icons**: Lucide React
- **Validation**: Custom email validator (500+ disposable domains)

## Recent Improvements

See [CHANGES.md](./CHANGES.md) for details on recent fixes:

1. ✅ Login authentication fixed
2. ✅ Centralized environment variables
3. ✅ Portal redirect after login fixed
4. ✅ Disposable email detection added
5. ✅ Responsive portal UI improvements

## API Requirements

The application requires a backend API with the following endpoints:

- `POST /user/login` - Authentication
- `POST /user/register` - Registration
- `GET /user/me` - Current user
- `GET /instances` - List instances
- `POST /instances` - Create instance
- `PATCH /instances/:id/status` - Update status
- `DELETE /instances/:id` - Delete instance
- `GET /billing` - Billing info
- `GET /billing/invoices` - Invoice history

See [CHANGES.md](./CHANGES.md) for full API specification.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://127.0.0.1:8000` |
| `NEXTAUTH_URL` | NextAuth callback URL | `http://localhost:3001` |
| `NEXTAUTH_SECRET` | JWT signing secret | *(required)* |

## Security Features

- 🔒 JWT-based authentication
- 🚫 Disposable email blocking
- 🔐 Protected routes via middleware
- 🔑 Token-based API requests
- ⚠️ Input validation on forms

## Responsive Design

- 📱 **Mobile** (< 640px): Hamburger menu, card layouts
- 📱 **Tablet** (640-1024px): Responsive grid
- 💻 **Desktop** (> 1024px): Full sidebar, table views

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

See [LICENSE](./LICENSE) file for details.

## Support

For issues and questions, please open an issue on GitHub.

---

Built with [Next.js](https://nextjs.org) and [Tailwind CSS](https://tailwindcss.com)
