# Admin Redirect Debug Guide

## Issue
Admin users aren't being redirected to `/admin` dashboard after sign-in.

## Debug Steps

### Step 1: Check Supabase User Metadata
1. Go to Supabase Dashboard
2. Authentication → Users
3. Click on your admin user
4. Look at the `app_metadata` field
5. It should show:
```json
{
  "isAdmin": true
}
```

**If it shows something different:**
- `"isAdmin": "true"` (string) - WRONG
- `"isAdmin": false` - User is not admin
- `isAdmin` field missing - Need to add it

### Step 2: Check Browser Console Logs

1. Open the browser DevTools (F12)
2. Go to Console tab
3. Sign in with your admin account
4. Look for logs like:
```
SigninForm - User: admin@example.com
SigninForm - isAdmin value: true
SigninForm - isAdmin type: boolean
SigninForm - Full app_metadata: {isAdmin: true}
SigninForm - Redirecting to: /admin
```

**What to look for:**
- `isAdmin value: true` ✅ (should be `true`, not `"true"` or `false`)
- `isAdmin type: boolean` ✅ (should be boolean)
- `Redirecting to: /admin` ✅ (should redirect to /admin)

### Step 3: Check Server Logs

1. Look at your terminal/server logs where the Next.js app is running
2. After sign-in, you should see:
```
Admin Layout - User: admin@example.com
Admin Layout - isAdmin: true
Admin Layout - Full app_metadata: {isAdmin: true}
```

**Common issues:**
- `isAdmin: false` - User doesn't have admin flag
- `isAdmin: undefined` - Metadata not being read
- `Not admin, redirecting to home` - Non-admin user trying to access

## Possible Solutions

### If isAdmin is `"true"` (string instead of boolean):
1. Go to Supabase Dashboard
2. Edit user's `app_metadata`
3. Change from `"isAdmin": "true"` to `"isAdmin": true`
4. Save

### If isAdmin is not showing at all:
1. Add it manually in Supabase
2. Click Edit user
3. Set `app_metadata` to:
```json
{
  "isAdmin": true
}
```

### If isAdmin is true but still redirecting to home:
1. Clear browser cookies (Sign out completely)
2. Sign in again
3. The session might be cached

## Testing the Fix

After making changes:

1. **Complete sign-out:**
   - Click profile icon → Log out
   - Clear browser cookies (DevTools → Application → Cookies → Delete all)

2. **Sign in again:**
   - Check console logs in step 2
   - Should redirect to `/admin` automatically
   - Should NOT redirect to home page

3. **Verify admin dashboard loads:**
   - Page should show admin layout
   - Sidebar should be visible
   - No "redirect" behavior

## If Still Not Working

Check both console and server logs for:
1. What is the actual value of `isAdmin`?
2. What is the type of `isAdmin`?
3. Is the redirect URL showing `/admin` or `/`?
4. Are there any error messages?

Report these findings for further debugging.

---

## Debug Console Output Format

When you sign in, you should see in the browser console (F12):

```
✅ CORRECT:
SigninForm - User: admin@example.com
SigninForm - isAdmin value: true
SigninForm - isAdmin type: boolean
SigninForm - Full app_metadata: {isAdmin: true}
SigninForm - Redirecting to: /admin
Admin Layout - User: admin@example.com
Admin Layout - isAdmin: true

❌ WRONG:
SigninForm - isAdmin value: false
SigninForm - isAdmin type: undefined
SigninForm - isAdmin value: "true"  (string, not boolean)
SigninForm - Redirecting to: /  (redirecting to home instead of /admin)
Not admin, redirecting to home
```

---

After checking these logs, you'll know exactly what's wrong and how to fix it! 🔍
