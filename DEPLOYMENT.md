# Deployment Checklist

Use this checklist when deploying Stypz to production.

## Pre-Deployment

### Environment Configuration

- [ ] Copy `.env.example` to `.env.local`
- [ ] Set `NEXT_PUBLIC_API_URL` to production API endpoint
- [ ] Set `NEXTAUTH_URL` to production domain (e.g., `https://stypz.com`)
- [ ] Generate secure `NEXTAUTH_SECRET` (min 32 characters):
  ```bash
  openssl rand -base64 32
  ```
- [ ] Verify all environment variables are set
- [ ] Add `.env.local` to `.gitignore` (should already be there)

### Code Quality

- [ ] Run `npm run lint` - no errors
- [ ] Run `npm run build` - successful build
- [ ] Test all authentication flows locally
- [ ] Test email validation with disposable emails
- [ ] Verify responsive design on multiple devices

### Backend API

- [ ] Backend API is deployed and accessible
- [ ] All required endpoints are implemented
- [ ] CORS is properly configured
- [ ] SSL/TLS is enabled (HTTPS)
- [ ] API authentication is working

## Deployment Steps

### 1. Build the Application

```bash
npm run build
```

Verify the build completes without errors.

### 2. Deploy to Hosting Platform

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Set environment variables in Vercel dashboard:
- `NEXT_PUBLIC_API_URL`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

#### Other Platforms

```bash
# Build
npm run build

# Start
npm start
```

### 3. Configure Domain

- [ ] Point domain to hosting platform
- [ ] Enable HTTPS/SSL
- [ ] Update `NEXTAUTH_URL` with production domain

### 4. Update API Configuration

- [ ] Update backend API to accept production domain
- [ ] Configure CORS for production domain
- [ ] Test API connectivity

## Post-Deployment Testing

### Authentication

- [ ] Sign up with valid email - should succeed
- [ ] Sign up with disposable email - should be blocked
- [ ] Login with valid credentials - should redirect to portal
- [ ] Login with invalid credentials - should show error
- [ ] Logout - should redirect to home/login
- [ ] Access `/portal` without login - should redirect to login

### Portal Functionality

- [ ] Dashboard loads with user data
- [ ] Instances page shows list (or empty state)
- [ ] Create instance modal works
- [ ] Start/Stop/Restart actions work
- [ ] Billing page displays correctly
- [ ] All navigation links work

### Responsive Design

- [ ] Test on mobile (< 640px)
  - [ ] Sidebar collapses and opens with hamburger
  - [ ] Instances show as cards
  - [ ] Touch targets are large enough
  - [ ] No horizontal scrolling

- [ ] Test on tablet (640-1024px)
  - [ ] Responsive grid layouts work
  - [ ] Navigation is accessible

- [ ] Test on desktop (> 1024px)
  - [ ] Sidebar is persistent
  - [ ] Tables display correctly
  - [ ] All features accessible

### Performance

- [ ] Page load time < 3 seconds
- [ ] No console errors
- [ ] Images are optimized
- [ ] No unnecessary re-renders

### Security

- [ ] HTTPS is enforced
- [ ] Authentication tokens are secure
- [ ] API requests include auth headers
- [ ] Protected routes require authentication
- [ ] No sensitive data in client-side code

## Monitoring

### Set Up Monitoring

- [ ] Error tracking (e.g., Sentry)
- [ ] Analytics (e.g., Vercel Analytics)
- [ ] Uptime monitoring
- [ ] Performance monitoring

### Logging

- [ ] Server logs are accessible
- [ ] Error logs are being captured
- [ ] Authentication attempts are logged

## Rollback Plan

If deployment fails:

1. Check build logs for errors
2. Verify environment variables
3. Check backend API connectivity
4. Rollback to previous version if needed
5. Test locally to reproduce issue

## Maintenance

### Regular Tasks

- [ ] Update dependencies monthly
- [ ] Review and rotate `NEXTAUTH_SECRET` quarterly
- [ ] Monitor error logs weekly
- [ ] Review performance metrics monthly
- [ ] Update disposable email domain list as needed

### Security Updates

- [ ] Subscribe to Next.js security advisories
- [ ] Subscribe to NextAuth.js security advisories
- [ ] Monitor npm audit reports
- [ ] Apply security patches promptly

## Support Contacts

- **Hosting Platform**: [Your hosting provider support]
- **Domain Registrar**: [Your domain registrar support]
- **Backend API**: [Backend team contact]
- **Emergency**: [Emergency contact information]

---

## Quick Reference

### Environment Variables

```env
NEXT_PUBLIC_API_URL=https://api.stypz.com
NEXTAUTH_URL=https://stypz.com
NEXTAUTH_SECRET=your-production-secret-here
```

### Build Commands

```bash
npm install
npm run build
npm start
```

### Useful URLs

- Production: `https://stypz.com`
- API: `https://api.stypz.com`
- Vercel Dashboard: `https://vercel.com/dashboard`

---

For more information, see:
- [STRUCTURE.md](./STRUCTURE.md) - Project structure
- [CHANGES.md](./CHANGES.md) - Recent changes
- [README.md](./README.md) - Getting started
