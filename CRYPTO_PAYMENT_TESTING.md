# NOWPayments Crypto Integration — Testing Guide

## Overview

Complete implementation of NOWPayments crypto payment integration with:
- ✅ Fixed webhook signature verification (uses separate IPN Secret Key)
- ✅ Live payment status polling on crypto checkout page
- ✅ QR code rendering for wallet addresses
- ✅ Real order confirmation page with actual DB data
- ✅ Postman collection for full end-to-end testing

## Setup

### 1. Environment Variables

Both `.env` and `.env.local` should have:
```env
NOWPAYMENTS_API_KEY=QHMR6MY-G9B4PB7-MPDN5RD-PP1AZ2B
NOWPAYMENTS_IPN_SECRET_KEY=lBiGLTvrMF6L36B0aBb/SmtNpdeh96hD
```

The IPN Secret Key is used **only** for verifying webhook signatures. It's different from the API key.

### 2. Start Dev Server

```bash
npm run dev
```

Server runs at `http://localhost:3001` (or 3000 if 3001 is free).

## Testing Flow

### Manual UI Testing

1. **Crypto Checkout Page**
   - Navigate to the store and add an item to cart
   - Click "Check out" → select "Crypto" payment
   - You should see:
     - ✅ Payment ID (from NOWPayments)
     - ✅ **QR code** next to the pay address (NEW!)
     - ✅ Amount in crypto (BTC, ETH, etc.)
     - ✅ Pay address (copyable)
     - ✅ Status updates every 10 seconds with a spinner (NEW!)

2. **Order Confirmation Page**
   - After checkout, you can navigate to `/orders/{orderId}`
   - Should show:
     - ✅ Real order data from database (amount, currency, payment status)
     - ✅ Order items with quantities and prices
     - ✅ Payment method (₿ Crypto or 💳 Card) with badge
     - ✅ Order status and payment status
     - ❌ No more hardcoded "Hugo Lam" fake address

3. **Orders List Page**
   - Visit `/orders` (for logged-in users)
   - Should show:
     - ✅ Payment Status badge (Paid/Unpaid) in color
     - ✅ Payment Method badge (₿ Crypto or 💳 Card)

### Postman Collection Testing

1. **Import Collection**
   - Open Postman
   - File → Import → Select `postman/NOWPayments-Androfud.postman_collection.json`
   - Verify collection variables are set (see below)

2. **Collection Variables**
   - `baseUrl`: `http://localhost:3001`
   - `ipnSecret`: `lBiGLTvrMF6L36B0aBb/SmtNpdeh96hD` (your IPN Secret Key)
   - Other variables auto-populate from responses

3. **Run Tests in Order**

   **Test 1: Create Crypto Checkout**
   ```
   POST http://localhost:3001/api/checkout
   Body: { orderProducts: {...}, guest: true, paymentMethod: "crypto" }
   ```
   - Expect: 200 OK with `paymentId`, `payAddress`, `payAmount`, `payCurrency`
   - Check: Payment ID and order ID are saved as collection variables

   **Test 2: Get Payment Status**
   ```
   GET http://localhost:3001/api/payment-status?paymentId={{paymentId}}
   ```
   - Expect: 200 OK with current `payment_status` (e.g., "waiting", "confirmed", etc.)
   - This simulates what the frontend polls every 10 seconds

   **Test 3: Send Webhook with Valid Signature**
   ```
   POST http://localhost:3001/api/webhooks/nowpayments
   ```
   - Pre-request script generates a **correct HMAC-SHA512 signature** using IPN Secret Key
   - Body: simulated NOWPayments webhook with `payment_status: "finished"`
   - Expect: 200 OK
   - Verify: Order's `payment_status` in DB should flip to `paid`

   **Test 4: Send Webhook with Invalid Signature**
   ```
   POST http://localhost:3001/api/webhooks/nowpayments
   ```
   - Pre-request script uses a **tampered signature**
   - Expect: **401 Unauthorized** (signature verification fails)
   - Verify: Order's `payment_status` does NOT change

4. **Check DB After Webhook**
   - Query Supabase directly:
     ```sql
     SELECT id, payment_status, order_status, payment_method 
     FROM orders 
     ORDER BY created_at DESC LIMIT 1;
     ```
   - Should show:
     - Before webhook: `payment_status = "unpaid"`, `order_status = "pending"`
     - After valid webhook: `payment_status = "paid"`, `order_status = "preparing"`

## Key Fixes Explained

### 1. Webhook Signature Verification ✅ FIXED
**What was wrong:**
- Old code: used `NOWPAYMENTS_API_KEY` as HMAC secret and hashed raw request body
- Real NOWPayments: uses separate `IPN_SECRET_KEY`, hashes a **recursively key-sorted JSON string**
- Result: real webhooks from NOWPayments were always rejected (401) silently

**How we fixed it:**
- Added `NOWPAYMENTS_IPN_SECRET_KEY` to env schema
- `verifyNOWPaymentsWebhook()` now:
  1. Parses the request body as JSON
  2. Recursively sorts all object keys (matching NOWPayments algorithm)
  3. Serializes to string
  4. Computes HMAC-SHA512 with the **IPN Secret Key**
  5. Compares to the `x-nowpayments-sig` header

### 2. Payment Status URL ✅ FIXED
**What was wrong:**
- `getPaymentStatus()` appended `?checksum=...` which NOWPayments API doesn't accept
- The `generateChecksum()` helper was dead code

**How we fixed it:**
- Removed the checksum query param
- Simple `GET /v1/payment/{id}` now works correctly

### 3. Live Status Polling ✅ ADDED
**What we added:**
- `crypto-checkout/page.tsx` now polls `/api/payment-status` every 10 seconds
- Status updates in real-time (or as fast as NOWPayments confirms)
- Spinner stops and shows green checkmark when payment is `finished`
- Polling stops to save bandwidth once terminal status is reached

### 4. QR Code ✅ ADDED
- Uses the already-installed `qrcode` package
- Generates a data URL from the pay address
- Displayed next to the address for wallet app scanning
- Generated once on mount, no ongoing re-renders

### 5. Real Order Page ✅ FIXED
**What was wrong:**
- `orders/[orderId]/page.tsx` was 100% hardcoded placeholder content
- Ignored the `orderId` parameter (only used it for display)
- Never queried the database

**How we fixed it:**
- Now a proper server component
- Queries Supabase by `orderId`
- Displays real `amount`, `currency`, `order_status`, `payment_status`, `payment_method`
- Shows actual order items with quantities and prices
- 404 if order not found
- Clean layout with color-coded payment status badges

## Files Changed

| File | Change |
|------|--------|
| `.env` | Added `NOWPAYMENTS_IPN_SECRET_KEY` placeholder |
| `.env.local` | Renamed `NOEPAYMENTS_IPN_KEY` → `NOWPAYMENTS_IPN_SECRET_KEY` |
| `src/env.mjs` | Added `NOWPAYMENTS_IPN_SECRET_KEY` to server schema |
| `src/lib/utils.ts` | Fixed `getURL()` to handle empty env strings |
| `src/lib/payments/nowPayments.ts` | Fixed webhook signature verification, removed invalid checksum |
| `src/app/(store)/crypto-checkout/page.tsx` | Added QR code, live polling, status updates |
| `src/app/(store)/orders/[orderId]/page.tsx` | Rewired to real DB data, removed placeholder content |
| `src/app/(store)/orders/page.tsx` | Added payment_status and payment_method to display |
| `postman/NOWPayments-Androfud.postman_collection.json` | New: Complete Postman test suite |

## Troubleshooting

### Payment Status Shows "waiting" Forever
- **Cause**: No actual payment sent to the address, or NOWPayments confirmation is slow
- **Fix**: In Postman, send a valid webhook with `payment_status: "finished"` to simulate confirmation

### QR Code Not Appearing
- **Cause**: `qrcode` package import failed or pay address is empty
- **Check**: Browser console for errors; `payAddress` should be in the payment data
- **Fix**: Ensure `npm install` was run after pulling changes

### Webhook Returns 401 (Invalid Signature)
- **Cause**: IPN Secret Key mismatch or signature algorithm incorrect
- **Check**: 
  - Verify `NOWPAYMENTS_IPN_SECRET_KEY` value matches your NOWPayments dashboard
  - Postman's pre-request script correctly sorts JSON and uses SHA512
  - Signature is computed on the **sorted JSON string**, not raw body

### Order Status Not Updating After Webhook
- **Cause**: Database transaction failed, or webhook was never received
- **Check**:
  - Postman test returns 200 OK?
  - Check `orders` table directly in Supabase: did `payment_status` flip to `paid`?
  - Check server logs for webhook processing errors

## Deployment Notes

### Environment Variables (Production)
1. **Get real API credentials from NOWPayments dashboard:**
   - API Key: Settings → API
   - IPN Secret Key: Settings → IPN Settings (different from API key!)

2. **Set in your deployment platform (Vercel, Docker, etc.):**
   ```
   NOWPAYMENTS_API_KEY=<your-api-key>
   NOWPAYMENTS_IPN_SECRET_KEY=<your-ipn-secret>
   NEXT_PUBLIC_SITE_URL=<your-production-url>
   ```

3. **Configure IPN Callback URL:**
   - NOWPayments Dashboard → Settings → IPN Settings
   - Add: `https://yourdomain.com/api/webhooks/nowpayments`

4. **Test in production:**
   - Send a small test payment (NOWPayments supports test mode)
   - Verify order updates to `paid` after confirmation

## Support

- **NOWPayments API Docs**: https://documenter.getpostman.com/view/7907941/S1a32n38
- **IPN Webhook Spec**: https://nowpayments.io/integrations/no-code
- **Supabase Docs**: https://supabase.com/docs
