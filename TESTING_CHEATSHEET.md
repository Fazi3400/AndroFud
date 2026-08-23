# Testing Cheatsheet - Avoid 429 Rate Limit

## ⚡ Quick Reference

### ✅ What To Do:
```
1. Wait between sign-ups (5-15 minutes minimum)
2. Use DIFFERENT email each time
3. Click button ONCE and wait
4. Don't refresh during submission
5. If 429 error → STOP and wait 1 hour
```

### ❌ What NOT To Do:
```
1. Don't retry same email quickly
2. Don't click submit multiple times
3. Don't refresh page during loading
4. Don't open multiple browser tabs
5. Don't try to spam sign-ups
```

---

## 🧪 Safe Test Scenarios

### Scenario 1: Single Account Sign-Up (SAFE ✅)
```
Time: 2 minutes
Limit Used: 1/4
Rate: Low risk

Steps:
1. Go to /sign-up
2. Email: testuser@example.com
3. Name: Test User
4. Password: Test@123!
5. Click Continue (ONCE)
6. Wait for redirect
✅ DONE - No more sign-ups for 15 minutes
```

### Scenario 2: Multiple Accounts (SAFE ✅)
```
Time: 1 hour total
Limit Used: 4/4 (max for hour)
Rate: Controlled

Time: 00:00 - Sign-up #1: test1@example.com ✅
Time: 00:15 - Sign-up #2: test2@example.com ✅
Time: 00:30 - Sign-up #3: test3@example.com ✅
Time: 00:45 - Sign-up #4: test4@example.com ✅
Time: 01:00 - WAIT 1 hour before next batch
```

### Scenario 3: Sign-In Testing (SAFE ✅)
```
Time: 5 minutes
Limit Used: 3/10
Rate: Very low risk

Steps:
1. Sign in with correct password ✅
2. Sign in with wrong password ✅
3. Sign in with non-existent email ✅
✅ You have 7 more attempts available in next hour
```

### Scenario 4: Error Testing (BE CAREFUL ⚠️)
```
Time: 2 minutes
Limit Used: 2-3/4
Rate: Moderate

Test sign-up validation errors:
1. Missing name → should show error ✅
2. Invalid email → should show error ✅
3. Weak password → should show error ✅

These DON'T use rate limit (validation errors)
Only signup requests that reach Supabase count toward limit
```

---

## 📧 Test Email Addresses (Use in Order)

### For Quick Testing:
```
Attempt 1: test1@example.com
Attempt 2: test2@example.com
Attempt 3: test3@example.com
Attempt 4: test4@example.com
⏸️ WAIT 1 HOUR
Attempt 5: test5@example.com
Attempt 6: test6@example.com
...and so on
```

### Using Gmail Aliases (Clever Trick):
```
If your email is: myemail@gmail.com

Use these:
- myemail+test1@gmail.com ✅
- myemail+test2@gmail.com ✅
- myemail+test3@gmail.com ✅
- myemail+test4@gmail.com ✅
- ⏸️ WAIT 1 HOUR
- myemail+test5@gmail.com ✅

All go to same inbox but counted as different emails!
```

---

## 🚨 If You Get 429 Error

### Immediate Action:
```
1. DO NOT refresh page
2. DO NOT click submit again
3. READ the error message carefully
4. Click OK on error toast
5. WAIT 1-2 hours
6. Try with different email
```

### What Went Wrong:
```
You tried to sign up 4+ times in 1 hour
OR
You clicked submit button multiple times
OR
Someone else on your network did many sign-ups
```

### How to Recover:
```
Option 1 (RECOMMENDED):
- Wait 1 hour
- Use different email
- Try again

Option 2 (Use VPN):
- Connect to different IP address
- Try sign-up again
- (Only for testing, not recommended for production)

Option 3 (Wait Longer):
- Wait 2-3 hours to be safe
- Use completely different email
- Try again
```

---

## ⏱️ Time Management

### Development Schedule:
```
Day 1:
  14:00 - Create 4 test accounts
  (test1, test2, test3, test4)
  
Day 2 (after 1 hour):
  15:00+ - Create 4 more test accounts
  (test5, test6, test7, test8)
```

### Testing Multiple Features:
```
Account 1 (test1@example.com):
  - Test sign-up ✅
  - Test profile icon ✅
  - Test logout ✅
  
Account 2 (test2@example.com):
  - Test sign-in ✅
  - Test dropdown menu ✅
  - Test settings ✅
  
Account 3 (test3@example.com):
  - Test admin features ✅
  - Test redirects ✅
  - Test permissions ✅
  
Account 4 (test4@example.com):
  - Test error scenarios ✅
  - Test edge cases ✅
  
⏸️ WAIT 1 HOUR
  
Account 5+ (test5@example.com...):
  - More testing...
```

---

## 🎯 Common Mistakes & Fixes

### Mistake 1: Clicking Submit 3 Times
```
❌ Click submit
❌ Nothing happens, click again
❌ Still loading, click again
❌ RESULT: 429 Error

✅ FIX:
✅ Click submit
✅ SEE button is disabled
✅ WAIT for loading to finish
```

### Mistake 2: Retrying Same Email
```
❌ Sign-up with test@example.com
❌ Get any error
❌ Try same email again immediately
❌ RESULT: 429 Error (email already exists)

✅ FIX:
✅ Sign-up with test1@example.com
✅ Get error? Use test2@example.com next time
✅ Always use different email for each attempt
```

### Mistake 3: Multiple Browser Tabs
```
❌ Open /sign-up in Tab 1
❌ Open /sign-up in Tab 2
❌ Fill both and submit both
❌ RESULT: 429 Error

✅ FIX:
✅ Use only ONE browser tab
✅ Complete one sign-up before starting another
✅ Close unused tabs
```

### Mistake 4: Page Refresh During Submit
```
❌ Click submit
❌ See loading spinner
❌ Refresh page (Ctrl+R)
❌ RESULT: 429 Error (request duplicated)

✅ FIX:
✅ Click submit
✅ DO NOT refresh
✅ Wait for redirect or error message
```

---

## 📊 Rate Limit Status

### Check Your Current Status:
Currently your limits are:
- **Sign-up**: ~4 per hour per IP ✅
- **Sign-in**: ~10 per hour per IP ✅
- **Resets**: Every 1 hour from first request

### Calculate Remaining:
```
Hour: 14:00-15:00
Attempts used: 2/4
Remaining: 2 attempts available

Next hour: 15:00-16:00
New window: 4/4 attempts available again
```

---

## 🏁 Pre-Launch Checklist

### Before Testing:
- [ ] Understand rate limits exist
- [ ] Have 10+ test emails ready (or use Gmail aliases)
- [ ] Clear browser cache & cookies
- [ ] Close other browser tabs
- [ ] Check internet connection
- [ ] Check Supabase status

### During Testing:
- [ ] Click button ONCE
- [ ] Watch loading spinner
- [ ] Wait for result (success or error)
- [ ] Don't refresh during loading
- [ ] If 429 error → STOP testing
- [ ] Wait 1 hour before next batch

### After Testing:
- [ ] Document which emails were used
- [ ] Keep track of failed attempts
- [ ] Note any error messages
- [ ] Report bugs separately from rate limit errors

---

## 🆘 Need Help?

### Issue: Getting 429 immediately
**Solution**: Your IP or email has exceeded limits. Wait 1 hour.

### Issue: Button won't disable
**Solution**: Hard refresh browser (Ctrl+Shift+R)

### Issue: Keeps loading forever
**Solution**: Check internet, wait 30 seconds, try again

### Issue: Different error message
**Solution**: Check message carefully, it's not 429

---

## 📝 Testing Log Template

Keep track of your sign-ups:

```
Date: 2026-07-18

Attempt 1: test1@example.com → ✅ Success
Attempt 2: test2@example.com → ✅ Success
Attempt 3: test3@example.com → ✅ Success
Attempt 4: test4@example.com → ✅ Success
Attempt 5: test5@example.com → ❌ 429 (rate limit)

Waited 1 hour...

Attempt 6: test5@example.com → ✅ Success
Attempt 7: test6@example.com → ✅ Success
```

---

**Remember**: Rate limits protect your account. Be patient! ⏰
