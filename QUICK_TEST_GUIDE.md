# Quick Test Guide - Sign-Up & Profile Setup

## 🧪 Complete Test Scenario

### Test 1: Regular User Sign-Up
**What to test**: Sign-up flow creates profile and shows icon in header

**Steps:**
1. Open http://localhost:3000/sign-up (or your dev URL)
2. Fill in form:
   - Name: "Test User"
   - Email: "test@example.com" (use new email each time)
   - Password: "Test@123!"
3. Click "Continue"

**Expected Result:**
- ✅ See success message: "Account Created"
- ✅ Redirected to homepage
- ✅ Profile icon appears in header (top right)
- ✅ User initials "TU" show in avatar

**Verify in Database:**
```sql
-- In Supabase SQL Editor
SELECT * FROM profiles WHERE email = 'test@example.com';
```
Should show: name, email, is_admin=false, created_at

---

### Test 2: Click Profile Icon in Header
**What to test**: Dropdown menu appears with all options

**Steps:**
1. After sign-up, click profile icon in header
2. Dropdown menu should appear

**Expected Menu Items:**
- ✅ Your name and email displayed
- ✅ Orders link
- ✅ Wishlist link
- ✅ Cart link
- ✅ Setting link
- ✅ Log out button

---

### Test 3: Logout
**What to test**: Logout removes profile icon and shows sign-in link

**Steps:**
1. Click profile icon
2. Click "Log out"

**Expected Result:**
- ✅ Profile icon disappears
- ✅ User icon (sign-in link) appears in header
- ✅ Redirected to homepage
- ✅ All user-specific pages are no longer accessible

---

### Test 4: Sign In After Logout
**What to test**: Sign-in works and shows profile icon

**Steps:**
1. Click user icon (sign-in link) in header
2. Go to http://localhost:3000/sign-in
3. Fill in:
   - Email: "test@example.com" (from Test 1)
   - Password: "Test@123!"
4. Click "Sign in"

**Expected Result:**
- ✅ See success message: "Login Sucess"
- ✅ Redirected to homepage
- ✅ Profile icon appears again
- ✅ Dropdown menu works

---

### Test 5: Admin User Redirect (if applicable)
**What to test**: Admin users are redirected to admin dashboard

**Steps:**
1. Make a user admin in Supabase:
   - Go to Supabase Dashboard
   - Authentication → Users
   - Click on a user
   - Edit `app_metadata` to add `{"isAdmin": true}`
   - Save
2. Sign out (if currently signed in)
3. Sign in with the admin user

**Expected Result:**
- ✅ Auto-redirect to `/admin` dashboard
- ✅ Profile dropdown shows "Admin" option
- ✅ Non-admin users see redirect to `/`

---

## 🔍 Debugging Checklist

### If Profile Icon Doesn't Show After Sign-Up:

**Check 1: Browser Console**
```
Open DevTools (F12) → Console tab
Look for:
- Any red error messages
- Check if "SIGNED_IN" event is logged
```

**Check 2: Database Entry**
```sql
SELECT * FROM profiles 
ORDER BY created_at DESC 
LIMIT 5;
```
Should show your new profile.

**Check 3: Browser Storage**
```
DevTools → Application → Cookies
Look for: sb-<project-id>-auth-token
If missing, session wasn't created
```

**Check 4: Clear Cache**
```
1. DevTools → Application tab
2. Clear cookies and storage
3. Refresh page
4. Try signing up again
```

---

## 📱 Device Testing

### Desktop:
- ✅ Chrome/Edge: Profile icon in header top-right
- ✅ Firefox: Same position
- ✅ Safari: Same position

### Mobile:
- ✅ Profile icon in mobile navbar
- ✅ Dropdown menu appears on click
- ✅ Menu items are touchable

---

## 🚀 Performance Check

### Load Times:
- Sign-up form should load in < 2s
- Redirect should happen in < 1s
- Profile icon should show < 3s after redirect

### Check in DevTools:
```
1. Open Network tab
2. Sign up
3. Look for:
   - auth/v1/signup (POST) - should be green
   - /api/profile or database insert - should be green
   - No 500 errors
```

---

## ✅ Checklist for Production Ready

Before deploying to production:

- [ ] Sign-up creates auth user
- [ ] Sign-up creates profile entry
- [ ] Profile icon shows in header
- [ ] Dropdown menu works
- [ ] Sign-in works
- [ ] Sign-out works
- [ ] Admin redirect works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Database has all profile entries
- [ ] Email verification (if enabled) works

---

## 🆘 Common Issues & Fixes

### Issue: Profile icon not showing after sign-up

**Fix 1:** 
```
Clear browser cache:
DevTools → Application → Storage → Clear All
```

**Fix 2:**
```
Check Supabase status:
Go to supabase.com/status
Make sure service is not down
```

**Fix 3:**
```
Verify .env has correct Supabase URL:
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### Issue: Profile created in database but header doesn't show icon

**Cause:** AuthProvider not detecting auth state change

**Fix:**
```
1. Refresh the page (F5)
2. Sign out and sign in again
3. Check if session is valid in cookies
```

### Issue: "Failed to create user profile" error

**Cause:** Database connection or email duplicate

**Fix:**
```
1. Try different email address
2. Check if email already exists:
   SELECT * FROM profiles WHERE email = 'your-email@example.com'
3. Check Supabase logs for errors
```

---

## 📊 Test Results Template

Use this to track your testing:

```
Test Date: 2026-07-18
Tester: [Your Name]

Test 1 - Sign-Up: [PASS/FAIL]
  - Profile created: [✓/✗]
  - Icon shows: [✓/✗]
  - Redirect works: [✓/✗]

Test 2 - Dropdown Menu: [PASS/FAIL]
  - All items visible: [✓/✗]
  - Links work: [✓/✗]

Test 3 - Logout: [PASS/FAIL]
  - Icon disappears: [✓/✗]
  - Sign-in link shows: [✓/✗]

Test 4 - Sign In: [PASS/FAIL]
  - Auth works: [✓/✗]
  - Icon shows: [✓/✗]

Test 5 - Admin: [PASS/FAIL]
  - Redirect to /admin: [✓/✗]
  - Admin options show: [✓/✗]

Overall: [PASS/FAIL]
Notes: [Any issues found]
```

---

**Ready to test!** Start with Test 1 and work through the scenarios. 🚀
