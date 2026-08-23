# Authentication Setup Guide

## ✅ What's Configured

Your authentication system is now properly set up with the following features:

### 1. **Sign In / Sign Up Module**
- **Sign In Page**: `/sign-in` - Full email/password authentication
- **Sign Up Page**: `/sign-up` - Account creation with name, email, and password
- Both pages have links to switch between them
- Password reset link available on sign-in page

### 2. **Header Profile Navigation**
The header (`MainNavbar`) now shows:

#### When NOT Logged In:
- User icon that links to `/sign-in`
- Cart and wishlist links available

#### When Logged In:
- Profile avatar with user's initials
- Clicking avatar opens dropdown menu with:
  - User name and email
  - Orders
  - Wishlist
  - Cart
  - Account Settings
  - Logout button

#### Admin Features (if user is admin):
- Admin panel link in dropdown
- Additional admin options (Billing, Settings)

### 3. **Admin Dashboard**
- **Path**: `/admin`
- **Protection**: 
  - Requires login (redirects to `/sign-in` if not logged in)
  - Requires `isAdmin` role (redirects to home if not admin)
  - Non-admin users cannot access admin pages

### 4. **Auto-Redirect After Login**
#### For Regular Users:
- Redirected to homepage (`/`) after sign-in/sign-up
- OR to the page specified in `?from=` query parameter

#### For Admin Users:
- Auto-redirected to `/admin` dashboard after login
- Their role is checked from `app_metadata.isAdmin` in Supabase

## 🔧 How to Set Up Admin Users

Admin status is stored in Supabase's user `app_metadata`. To make a user admin:

### Option 1: Using Supabase Dashboard (Recommended)
1. Go to Supabase Dashboard → Authentication → Users
2. Click on the user you want to make admin
3. Under "User Metadata", in the `app_metadata` field, add:
```json
{
  "isAdmin": true
}
```
4. Save changes

### Option 2: Using API Endpoint (if available)
Check if there's an API endpoint at `/api/users/promote-user` for programmatic admin promotion.

## 📂 File Structure

```
src/
├── features/auth/
│   ├── components/
│   │   ├── UserNav.tsx          ← Profile icon & dropdown (header)
│   │   ├── SigninForm.tsx        ← Sign-in form with auto-redirect
│   │   ├── SignupForm.tsx        ← Sign-up form with auto-redirect
│   │   └── PasswordInput.tsx     ← Password input component
│   └── validations/             ← Form validation schemas
│
├── app/
│   ├── (auth)/
│   │   ├── sign-in/page.tsx      ← Sign-in page
│   │   ├── sign-up/page.tsx      ← Sign-up page
│   │   └── callback/route.ts     ← OAuth callback (if needed)
│   │
│   ├── (admin)/admin/
│   │   ├── layout.tsx            ← ✨ NOW WITH ADMIN CHECK
│   │   ├── dashboard/page.tsx
│   │   └── [other admin pages]
│   │
│   └── (store)/                 ← Public pages
│
├── providers/
│   └── AuthProvider.tsx          ← Manages auth state globally
│
└── middleware.ts                 ← Auth middleware for SSR
```

## 🔐 Security Features

1. **Server-Side Auth Checks**: Admin layout verifies user role on the server
2. **Client-Side Auth Context**: `useAuth()` hook for checking auth state in components
3. **Protected Routes**: Admin routes require authentication and admin role
4. **Supabase JWT**: Secure session tokens via Supabase auth

## 🚀 Testing the Setup

### Test Sign-In/Sign-Up:
1. Go to `/sign-up` → Create an account
2. You'll be redirected to homepage
3. Profile icon should appear in header
4. Click it to see dropdown menu

### Test User Logout:
1. Click profile icon in header
2. Click "Log out" button
3. You'll be redirected to homepage
4. Profile icon should be replaced with sign-in link

### Test Admin Access:
1. Make a user admin in Supabase (see instructions above)
2. Sign in with that admin account
3. Should auto-redirect to `/admin` dashboard
4. Regular users won't have access to `/admin`

## ✨ Features Added/Fixed

### Recent Changes:
1. ✅ **Admin Layout Protection**: Now checks `isAdmin` flag and redirects non-admins
2. ✅ **Auto-Redirect for Admins**: Login automatically redirects admin users to dashboard
3. ✅ **Improved Logout**: Logs user out and redirects to homepage properly
4. ✅ **Redirect on Sign-In Error**: Unauthenticated users trying to access `/admin` are sent to sign-in page

## 📝 Next Steps (Optional)

1. **Profile Picture Upload**: Users can upload avatars in settings
2. **Email Verification**: Implement email verification on sign-up
3. **Password Reset**: Implement password reset flow
4. **Two-Factor Authentication**: Add 2FA for security
5. **Social Login**: Add GitHub/Google login (OAuth)

## 🔗 Useful Links

- **Supabase Auth Docs**: https://supabase.com/docs/guides/auth
- **Next.js Auth**: https://nextjs.org/docs/app/building-your-application/authentication
- **Your Supabase Project**: https://supabase.com/dashboard/projects

## ❓ Troubleshooting

### Profile icon not showing after login?
- Check if `useAuth()` hook is properly getting user data
- Clear browser cache and refresh
- Check Supabase user metadata

### Admin redirect not working?
- Verify user has `isAdmin: true` in Supabase `app_metadata`
- Check if user is fully signed in (session valid)
- Check browser console for errors

### Sign-in button not working?
- Verify Supabase environment variables in `.env`
- Check if email/password are correct
- Check network tab for API errors

---

**Setup completed!** Your authentication module is now ready to use. 🎉
