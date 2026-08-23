# Testing Checklist — NOWPayments Integration

Use this checklist to verify all components work correctly.

## Pre-Testing Setup

- [ ] Dev server running: `npm run dev`
- [ ] Server responds at `http://localhost:3001`
- [ ] Postman installed & collection imported
- [ ] Browser DevTools open (Network & Console tabs)
- [ ] Supabase browser open to check database changes

## Manual UI Testing

### Crypto Checkout Page

**Setup:**
- [ ] Add an item to cart
- [ ] Click "Check out"
- [ ] Select "Crypto" payment method

**Verify:**
- [ ] Page shows "Creating crypto payment..." spinner initially
- [ ] Payment details appear (Payment ID, Amount, Address)
- [ ] QR code is displayed next to the address
- [ ] Status shows initial payment status (usually "waiting")
- [ ] No console errors

**Polling Test:**
- [ ] Open Network tab, filter by `/api/payment-status`
- [ ] Wait 10 seconds
- [ ] Confirm request appears
- [ ] Verify request repeats every ~10 seconds
- [ ] Status text updates or spinner continues

### Order Confirmation Page

**Setup:**
- [ ] After crypto checkout, note the order ID
- [ ] Navigate to `/orders/{orderId}` (use order ID from URL)

**Verify:**
- [ ] Page loads without error
- [ ] Shows real data (not "Hugo Lam" placeholder):
  - [ ] Order ID matches
  - [ ] Amount matches cart total
  - [ ] Currency is shown (CAD)
  - [ ] Created date is recent
- [ ] Shows order items:
  - [ ] Product names appear
  - [ ] Quantities are correct
  - [ ] Prices match
- [ ] Status badges show:
  - [ ] Payment status (Paid/Unpaid) in color
  - [ ] Order status
  - [ ] Payment method (₿ Crypto or 💳 Card)
- [ ] No console errors

**Negative Test:**
- [ ] Navigate to non-existent order: `/orders/fake123`
- [ ] Verify 404 page appears (not error)

### Orders List Page

**Setup:**
- [ ] Log in with a user account
- [ ] Navigate to `/orders`

**Verify:**
- [ ] Page loads (may be empty if no orders)
- [ ] If orders exist, each card shows:
  - [ ] Order date
  - [ ] Total amount
  - [ ] Payment status badge (color-coded)
  - [ ] Payment method badge (₿ or 💳)
  - [ ] Order ID
  - [ ] Order items listed
- [ ] Click on an order → links to order detail page
- [ ] No console errors

## Postman Testing

### Test 1: Create Crypto Checkout

**Request:**
- [ ] Method: POST
- [ ] URL: `{{baseUrl}}/api/checkout`
- [ ] Body is set to crypto checkout parameters
- [ ] Click Send

**Verify Response:**
- [ ] Status: **200 OK**
- [ ] Response contains:
  - [ ] `paymentId` (number)
  - [ ] `payAddress` (crypto address string)
  - [ ] `payAmount` (amount in crypto)
  - [ ] `payCurrency` (e.g., "BTC", "ETH")
  - [ ] `priceAmount` (USD amount)
  - [ ] `priceCurrency` (e.g., "usd")
- [ ] Console shows: "✅ Crypto payment created"
- [ ] Collection variables populated:
  - [ ] `{{paymentId}}` is set
  - [ ] `{{payAddress}}` is set
  - [ ] `{{orderId}}` is set

### Test 2: Get Payment Status

**Request:**
- [ ] Method: GET
- [ ] URL: `{{baseUrl}}/api/payment-status?paymentId={{paymentId}}`
- [ ] Click Send

**Verify Response:**
- [ ] Status: **200 OK**
- [ ] Response contains payment status (e.g., "waiting")
- [ ] Console shows: "✅ Payment Status: ..." with full response

### Test 3: Send Webhook (Valid Signature)

**Request:**
- [ ] Method: POST
- [ ] URL: `{{baseUrl}}/api/webhooks/nowpayments`
- [ ] Pre-request script is enabled (checkbox)
- [ ] Click Send

**Verify Response:**
- [ ] Status: **200 OK**
- [ ] Response: `{"success":true}`
- [ ] Console shows: "✅ Webhook accepted! Signature verified."

**Verify Database Update:**
- [ ] Open Supabase → `orders` table
- [ ] Find order by `id` (use `{{orderId}}` from earlier)
- [ ] Check `payment_status`:
  - [ ] Before test: `"unpaid"`
  - [ ] After test: **`"paid"`** ✓
- [ ] Check `order_status`:
  - [ ] Before test: `"pending"`
  - [ ] After test: **`"preparing"`** ✓

**Verify Frontend Update:**
- [ ] Refresh `/orders/{orderId}` page
- [ ] Payment status badge now shows **"paid"** in green
- [ ] Order items still display correctly

### Test 4: Send Webhook (Invalid Signature)

**Request:**
- [ ] Method: POST
- [ ] URL: `{{baseUrl}}/api/webhooks/nowpayments`
- [ ] Pre-request script is enabled
- [ ] Click Send

**Verify Response:**
- [ ] Status: **401 Unauthorized** (MUST reject invalid signature!)
- [ ] Response: `{"error":"Invalid signature"}`
- [ ] Console shows: "❌ Webhook rejected. Status: 401"

**Verify Database Not Updated:**
- [ ] Check Supabase order record
- [ ] `payment_status` is still `"unpaid"` (NOT changed to "paid")
- [ ] This confirms signature verification is working ✓

### Test 5: Create Card Checkout (Optional)

**Request:**
- [ ] Method: POST
- [ ] URL: `{{baseUrl}}/api/checkout`
- [ ] Body: change `paymentMethod` to `"card"`
- [ ] Click Send

**Verify Response:**
- [ ] Status: **200 OK**
- [ ] Response contains:
  - [ ] `checkoutUrl` (URL to Lemon Squeezy)
  - [ ] `paymentMethod: "card"`
- [ ] URL is accessible in browser (redirects to checkout)

## Browser DevTools Verification

### Network Tab
- [ ] Open DevTools → Network
- [ ] Go through crypto checkout flow
- [ ] Verify requests appear:
  - [ ] `POST /api/checkout` → 200
  - [ ] `GET /api/payment-status` → 200 (repeats every 10s)
  - [ ] No 401 or 500 errors

### Console Tab
- [ ] No red errors
- [ ] Check for warnings (yellow)
- [ ] Look for log messages:
  - [ ] "Creating crypto payment..."
  - [ ] "Payment status updated: ..." (repeating)
  - [ ] No "failed to fetch" messages

### React DevTools (Optional)
- [ ] Inspect crypto-checkout component
- [ ] Verify state:
  - [ ] `paymentData` populated with payment details
  - [ ] `liveStatus` updates every 10 seconds
  - [ ] `qrCode` contains data URL

## Database Verification

### Direct Query
1. Open Supabase dashboard
2. Go to SQL Editor
3. Run:
   ```sql
   SELECT id, amount, payment_status, order_status, payment_method, created_at
   FROM orders
   ORDER BY created_at DESC
   LIMIT 5;
   ```
4. Verify:
   - [ ] Most recent order has `payment_method = "crypto"` or `"card"`
   - [ ] After webhook test, order has `payment_status = "paid"`
   - [ ] Order amounts are correct (>0)

## Performance Verification

- [ ] Crypto checkout page loads in < 2 seconds
- [ ] QR code generates in < 1 second
- [ ] Payment status polling doesn't spike CPU/memory
- [ ] Order page loads in < 1 second
- [ ] No N+1 queries (check DevTools Network for excessive requests)

## Error Handling Verification

Test error scenarios:
- [ ] **Empty cart**: Click checkout → redirects to cart page
- [ ] **Failed API call**: Simulate by disconnecting internet
  - [ ] Should show error message
  - [ ] "Back to Cart" button should work
- [ ] **Invalid order ID**: `/orders/nonexistent`
  - [ ] Should show 404 page (not crash)
- [ ] **Webhook timeout**: Wait > 30 seconds before sending webhook
  - [ ] Order should still update correctly

## Signature Verification Deep-Dive (Optional)

To verify the signature algorithm is correct:

1. In Postman, send "Create Crypto Checkout"
2. Note the response payload
3. In Postman pre-request script, log the signature:
   - [ ] Pre-request script computes signature
   - [ ] Logs "🔐 Signature: ..." to console
4. In Postman test script, capture response:
   - [ ] Test script shows webhook accepted
5. Manually verify signature:
   - [ ] Use Node.js to compute HMAC-SHA512 independently
   - [ ] Compare with Postman's computed signature
   - [ ] They should match ✓

Example Node.js verification:
```javascript
const crypto = require('crypto');
const payload = { /* webhook payload */ };
const sortedPayload = /* recursively sort keys */;
const secret = 'lBiGLTvrMF6L36B0aBb/SmtNpdeh96hD';
const sig = crypto.createHmac('sha512', secret)
  .update(JSON.stringify(sortedPayload))
  .digest('hex');
console.log('Computed signature:', sig);
```

## Final Checklist

- [ ] All 5 Postman tests pass
- [ ] All manual UI tests pass
- [ ] Database updates correctly after webhooks
- [ ] No console errors or warnings
- [ ] QR code displays and is scannable
- [ ] Status polling updates every 10 seconds
- [ ] Order pages show real data (not placeholders)
- [ ] Signature verification rejects invalid webhooks
- [ ] Performance is acceptable (no hanging requests)
- [ ] All documentation is clear and complete

## Troubleshooting During Testing

| Issue | Diagnosis | Fix |
|-------|-----------|-----|
| QR code not showing | Check browser console for errors | Ensure `qrcode` package installed |
| Status doesn't update | Check Network tab for payment-status requests | Verify polling interval works (10s) |
| Webhook returns 401 | Check IPN_SECRET_KEY matches dashboard | Verify pre-request script enabled in Postman |
| Order not updating after webhook | Check database directly | Look for errors in server logs |
| Page shows placeholder data | Check if it's the old page (cache issue) | Hard refresh (Ctrl+Shift+R) |
| Payment creation fails | Check error message on page | Verify API key in .env.local |

## When Testing is Complete

- [ ] All items checked ✓
- [ ] No blockers found
- [ ] All 5 Postman tests pass
- [ ] Database updates verified
- [ ] Ready for production deployment

**Sign-off:** ___________________  **Date:** ___________________

