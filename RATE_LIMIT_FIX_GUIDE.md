# Rate Limit (429) Error - Fix & Prevention Guide

## 🔧 What Was Fixed

Supabase has built-in rate limiting to prevent abuse. When you were getting **429 errors**, it meant:
- ❌ Too many sign-up/sign-in attempts from same IP/email
- ❌ Retrying requests too quickly
- ❌ No protection against accidental double-clicks

## ✅ What's Now Fixed

### 1. **Double-Submit Prevention**
- ✅ Button disabled during submission (already working)
- ✅ Added check to prevent `onSubmit` running twice
- ✅ Added timeout tracking to prevent race conditions

### 2. **Better Rate Limit Error Handling**
- ✅ Detects 429 status code
- ✅ Shows user-friendly message: "Too many attempts. Please wait a few minutes."
- ✅ Also handles other common errors gracefully

### 3. **Improved Error Messages**
- ✅ Rate limit errors: "Wait a few minutes and try again"
- ✅ Email already registered: "Use sign-in instead"
- ✅ Invalid credentials: "Check email or password"

## 🚀 How to Use (Avoid 429 Errors)

### ✅ DO:
1. **Wait between attempts**
   - If you get 429 error, wait 5-10 minutes before trying again
   - Don't click submit button multiple times

2. **Use different emails**
   - Each sign-up attempt uses a new test email
   - Avoid retrying same email quickly

3. **Click once, wait**
   - Click "Continue" button once
   - Wait for redirect or error message
   - Don't click multiple times

### ❌ DON'T:
1. ❌ Click submit button repeatedly
2. ❌ Refresh page during submission
3. ❌ Try same email multiple times in short interval
4. ❌ Open multiple browser tabs for same form

## 🔍 Understanding Rate Limits

### Supabase Default Limits (per IP address):
- **Sign-up**: ~4 requests per hour per IP
- **Sign-in**: ~10 attempts per hour per IP
- **Resets after**: ~1 hour

### Example Timeline:
```
14:00 - Sign-up attempt 1 ✅
14:15 - Sign-up attempt 2 ✅
14:30 - Sign-up attempt 3 ✅
14:45 - Sign-up attempt 4 ✅
15:00 - Sign-up attempt 5 ❌ 429 ERROR
        → Must wait until 15:00-16:00
```

## 🛠️ If You Get 429 Error

### Immediate Fix:
```
1. Read error message: "Too many attempts"
2. Click OK on toast message
3. STOP trying to sign up
4. Wait 5-10 minutes
5. Try again with different email
```

### For Testing Multiple Accounts:
Use different email formats:
```
test1@example.com
test2@example.com
test3@example.com
test4@example.com
test5@example.com  ← After this, wait 1 hour
```

### For Local Development:
If rate limiting is blocking you during development:

**Option 1: Use Different Email Providers**
```
test@example.com
test@test.com
test@demo.com
test@sample.com
test@staging.com
```

**Option 2: Use Email Aliases**
```
yourname+test1@gmail.com
yourname+test2@gmail.com
yourname+test3@gmail.com
```

**Option 3: Wait Longer Between Tests**
```
Test 1 → Wait 15 minutes → Test 2 → Wait 15 minutes → Test 3
```

**Option 4: Use Test Admin Endpoint** (if available)
```
POST /api/users (admin only)
Create users programmatically without rate limit
```

## 📊 Error Messages Explained

### Message: "Too many sign-up attempts"
```
Cause: Exceeded ~4 sign-ups per hour from your IP
Fix: Wait 1 hour OR use different IP/email
Time: 5-60 minutes depending on how many attempts
```

### Message: "Invalid email or password"
```
Cause: Wrong credentials entered
Fix: Check email/password spelling
Time: Retry immediately (no rate limit)
```

### Message: "Email already registered"
```
Cause: Email exists in database
Fix: Use different email OR sign in with that email
Time: Retry immediately (no rate limit)
```

### Message: "Too many login attempts"
```
Cause: Exceeded ~10 sign-in attempts per hour
Fix: Wait 1 hour OR use different IP
Time: 5-60 minutes
```

## 🔐 Rate Limit Handling Code

### What's Protected:
```typescript
// Sign-up form
- ✅ Prevents double-submit
- ✅ Handles 429 errors gracefully
- ✅ Shows user-friendly messages
- ✅ Clears loading state on error

// Sign-in form
- ✅ Same protections as sign-up
- ✅ Better error messages
- ✅ Prevents multiple attempts
```

### Error Detection:
```typescript
if (error?.status === 429 || errorMessage.includes("429")) {
  // Handle rate limit
  errorMessage = "Too many attempts. Please wait a few minutes.";
}
```

## 📱 Testing Rate Limits (Safe Way)

### Test 1: Single Successful Sign-Up
```
1. Go to /sign-up
2. Email: test1@example.com
3. Name: Test User
4. Password: Test@123!
5. Click "Continue" ONCE
6. Wait for success message
✅ Limit count: 1/4
```

### Test 2: Wait & Try Again
```
1. Wait 15 minutes
2. Go to /sign-up
3. Email: test2@example.com (different email!)
4. Repeat sign-up
✅ Limit count: 2/4
```

### Test 3: Trigger Rate Limit (Optional)
```
Only if you want to test error handling:

1. Repeat sign-ups with different emails: test3, test4, test5
2. On 5th attempt, should get 429 error
3. Verify error message displays correctly
⚠️ Then wait 1 hour before trying again
```

## 🌍 Production Considerations

### For Live Server:
- ✅ Rate limits apply to all users equally
- ✅ Each user has separate rate limit bucket
- ✅ Legitimate users won't be affected
- ✅ Protects against bot attacks

### Admin Should Know:
- ⚠️ Users might report "Too many attempts" error
- ✅ This is normal - educate users to wait and retry
- ✅ Not a bug, it's security feature

### To Increase Rate Limits:
Contact Supabase support:
1. Go to Supabase Dashboard
2. Help/Support tab
3. Request higher rate limits for production

## 🎯 Best Practices

### Development:
```
1. Use test data file for multiple accounts
2. Create 5-10 test accounts in advance
3. Rotate between them during testing
4. Don't create new accounts every test
```

### Testing:
```
1. Test once per email address
2. Test error scenarios separately
3. Use staging environment for load testing
4. Don't test with production emails
```

### User Communication:
```
Display helpful message if user gets 429:
"Please wait a few minutes before trying again.
This is a security feature to protect your account."
```

## 🔧 Technical Details

### Files Modified:
1. **src/features/auth/components/SignupForm.tsx**
   - Added double-submit prevention
   - Added rate limit error handling
   - Added timeout management

2. **src/features/auth/components/SigninForm.tsx**
   - Same improvements as SignupForm
   - Better error messages
   - Cleanup on unmount

### What Prevents 429 Now:
```
1. Button disabled during submission
2. isLoading state check
3. Timeout cleanup
4. Error state reset
5. Single request per submit
```

## ✅ Checklist Before Going Live

- [ ] Test sign-up with valid email
- [ ] Test with invalid password
- [ ] Test with existing email
- [ ] Verify error messages are user-friendly
- [ ] Test multiple accounts (with waiting)
- [ ] Confirm rate limit error is handled
- [ ] Check mobile experience
- [ ] Verify button disabling works

---

**Summary**: Rate limits are normal and secure. Just wait a few minutes if you get 429 error! 🚀

