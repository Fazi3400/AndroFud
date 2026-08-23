# Cookie Options Fix — Step by Step Guide

## The Problem

### Before (Error)
```typescript
set(name: string, value: string, options: CookieOptions) {
  cookieStore.set(name, value, options);  // ❌ Type mismatch error
}
```

**Error Message:**
```
reference/functions/cookies#cookiessetname-value-options
cookieStore.set(name, value, options) has incompatible types
```

**Why It Fails:**
- Supabase `CookieOptions` ≠ Next.js cookie options
- Missing required properties
- Property format differences

---

## Understanding Cookie Options

### Supabase CookieOptions Format
```typescript
{
  maxAge?: number;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}
```

### Next.js Cookie Options Format
```typescript
{
  maxAge?: number;
  path?: string;          // Required default: "/"
  domain?: string;
  secure?: boolean;       // Required default: true
  httpOnly?: boolean;     // Required default: true
  sameSite?: string;      // Required default: "lax"
}
```

**Key Differences:**
1. Next.js requires `path` default to `"/"`
2. Next.js requires `secure` default to `true`
3. Next.js requires `httpOnly` default to `true`
4. Next.js requires `sameSite` default to `"lax"`

---

## Step-by-Step Fix

### Step 1: Understand the Current Code
```typescript
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient({ cookieStore }) {
  return createServerClient(url, key, {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        cookieStore.set(name, value, options);  // ❌ Problem here
      },
      remove(name: string, options: CookieOptions) {
        cookieStore.set(name, "", options);     // ❌ Problem here too
      },
    },
  });
}
```

### Step 2: Map Supabase Options to Next.js Format

The solution is to **transform** Supabase options into Next.js options:

```typescript
set(name: string, value: string, options: CookieOptions) {
  // Transform Supabase options → Next.js options
  cookieStore.set(name, value, {
    ...options,                           // Keep existing properties
    maxAge: options.maxAge,               // Keep maxAge as-is
    path: options.path || "/",            // Default to "/"
    domain: options.domain,               // Keep domain
    secure: options.secure || true,       // Default to true
    httpOnly: options.httpOnly !== false, // Default to true
    sameSite: (options.sameSite as any) || "lax",  // Default to "lax"
  });
}
```

### Step 3: Explain Each Property

```typescript
// Spread existing options
...options

// 1. maxAge: How long cookie lasts (in seconds)
maxAge: options.maxAge
// If Supabase says 3600, keep it as 3600

// 2. path: Which URLs can access this cookie
path: options.path || "/"
// If not specified, allow all paths ("/")

// 3. domain: Which domains can access this cookie
domain: options.domain
// If not specified, current domain only

// 4. secure: Only send over HTTPS
secure: options.secure || true
// Default to true (secure by default)

// 5. httpOnly: Cannot be accessed by JavaScript
httpOnly: options.httpOnly !== false
// If not specified or true, set to true (secure default)

// 6. sameSite: CSRF protection
sameSite: (options.sameSite as any) || "lax"
// Default to "lax" (prevents most CSRF attacks)
// "strict" = most secure but breaks some flows
// "lax" = good balance
// "none" = allows cross-site (requires secure: true)
```

### Step 4: Apply Same Fix to Remove

```typescript
remove(name: string, options: CookieOptions) {
  // To delete a cookie, set it with maxAge: 0
  cookieStore.set(name, "", {
    ...options,
    maxAge: 0,                            // ← Force expiration
    path: options.path || "/",
    domain: options.domain,
    secure: options.secure || true,
    httpOnly: options.httpOnly !== false,
    sameSite: (options.sameSite as any) || "lax",
  });
}
```

### Step 5: Complete Fixed Code

```typescript
import { CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient({
  cookieStore,
  isAdmin = false,
}: {
  cookieStore: ReturnType<typeof cookies>;
  isAdmin?: boolean;
}) {
  return createServerClient(
    `https://${env.NEXT_PUBLIC_SUPABASE_PROJECT_REF}.supabase.co`,
    isAdmin ? env.DATABASE_SERVICE_ROLE : env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        // ✅ GET: No transformation needed
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        
        // ✅ SET: Transform Supabase → Next.js options
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set(name, value, {
            ...options,
            maxAge: options.maxAge,
            path: options.path || "/",
            domain: options.domain,
            secure: options.secure || true,
            httpOnly: options.httpOnly !== false,
            sameSite: (options.sameSite as any) || "lax",
          });
        },
        
        // ✅ REMOVE: Set maxAge to 0 (expires immediately)
        remove(name: string, options: CookieOptions) {
          cookieStore.set(name, "", {
            ...options,
            maxAge: 0,  // ← This deletes the cookie
            path: options.path || "/",
            domain: options.domain,
            secure: options.secure || true,
            httpOnly: options.httpOnly !== false,
            sameSite: (options.sameSite as any) || "lax",
          });
        },
      },
    },
  );
}
```

---

## Why This Works

### Before Fix ❌
```
Supabase passes: { maxAge: 3600, sameSite: "lax" }
                 ↓
Next.js expects: { path: "/"?, secure: true?, httpOnly: true?, sameSite: "lax"? }
                 ↓
Missing required properties → TYPE ERROR
```

### After Fix ✅
```
Supabase passes: { maxAge: 3600, sameSite: "lax" }
                 ↓
We transform to: { maxAge: 3600, path: "/", secure: true, httpOnly: true, sameSite: "lax" }
                 ↓
Next.js receives: Complete options with all required properties → SUCCESS
```

---

## Cookie Flow Explained

### Setting a Cookie
```
1. User logs in
   ↓
2. Supabase says: "Set session cookie, maxAge: 3600"
   ↓
3. Our code adds defaults: path, secure, httpOnly, sameSite
   ↓
4. cookieStore.set() receives complete options
   ↓
5. Cookie stored in browser with all properties
```

### Removing a Cookie
```
1. User logs out
   ↓
2. Supabase says: "Remove session cookie"
   ↓
3. Our code sets maxAge: 0 (tells browser to delete)
   ↓
4. Our code adds other defaults
   ↓
5. cookieStore.set() called with empty value + maxAge: 0
   ↓
6. Browser deletes cookie immediately
```

---

## Real-World Example

### Scenario: User Login

```typescript
// Supabase internally calls:
options.set("auth-token", "abc123xyz", {
  maxAge: 86400,  // 24 hours
  sameSite: "lax"
});

// Before fix: ❌ Error
// After fix: ✅ Works
cookieStore.set("auth-token", "abc123xyz", {
  maxAge: 86400,          // ← From Supabase
  path: "/",              // ← Our default
  domain: undefined,      // ← From Supabase (undefined = current domain)
  secure: true,           // ← Our default
  httpOnly: true,         // ← Our default
  sameSite: "lax",        // ← From Supabase
});

// Result: Cookie set with all required properties ✅
```

---

## Type Safety Note

```typescript
// We use 'as any' to convert type:
sameSite: (options.sameSite as any) || "lax"

// Why? Because:
// - Supabase has: 'strict' | 'lax' | 'none'
// - Next.js expects: string
// - We need to tell TypeScript: "Trust me, this is valid"
```

---

## Testing the Fix

```bash
npm run dev

# Then:
1. Go to http://localhost:3001
2. Log in
3. Check browser DevTools → Application → Cookies
4. Should see auth cookies with:
   - Secure ✅
   - HttpOnly ✅
   - SameSite=Lax ✅
   - Path=/  ✅
```

---

## Summary

| Step | Action | Why |
|------|--------|-----|
| 1 | Spread `...options` | Keep Supabase's original values |
| 2 | Add `path: "/" default` | Required by Next.js |
| 3 | Add `secure: true` default | Required for HTTPS |
| 4 | Add `httpOnly: true` default | Protects against XSS |
| 5 | Add `sameSite: "lax"` default | Protects against CSRF |
| 6 | For remove: set `maxAge: 0` | Tells browser to delete cookie |

---

## Key Takeaway

**The fix bridges two different cookie option formats:**
- Supabase SSR provides minimal options
- Next.js requires sensible security defaults
- We map one to the other automatically

This way:
- ✅ Supabase works with its options
- ✅ Next.js gets all required properties
- ✅ Cookies are secure by default
- ✅ No type errors

