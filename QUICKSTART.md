# Quick Start — NOWPayments Crypto Integration

## What You're Getting

✅ **Complete crypto payment system** powered by NOWPayments  
✅ **Fixed webhook verification** (was broken, now uses correct IPN secret key)  
✅ **Live status updates** on crypto checkout page (polls every 10 seconds)  
✅ **QR code** for wallet scanning  
✅ **Real order pages** with actual database data (no more placeholders)  
✅ **Postman collection** for testing webhooks locally  

## One-Minute Setup

1. **Your `.env.local` is already configured:**
   ```env
   NOWPAYMENTS_API_KEY=QHMR6MY-G9B4PB7-MPDN5RD-PP1AZ2B
   NOWPAYMENTS_IPN_SECRET_KEY=lBiGLTvrMF6L36B0aBb/SmtNpdeh96hD
   NEXT_PUBLIC_SITE_URL=http://localhost:3001
   ```

2. **Start the dev server:**
   ```bash
   npm run dev
   ```
   Server runs at `http://localhost:3001`

3. **Test the flow:**
   - Add item → Checkout → Select "Crypto"
   - See QR code, pay address, live status polling
   - Visit `/orders` to see real order data

4. **Test webhooks in Postman:**
   - Import: `postman/NOWPayments-Androfud.postman_collection.json`
   - Run: "Create Crypto Checkout" → "Send Webhook (Payment Confirmed)"
   - Verify: Order status flips to `paid` in database

## Key Files Changed

| File | What Changed |
|------|-------------|
| `src/lib/payments/nowPayments.ts` | ⚠️ CRITICAL: Fixed webhook signature verification |
| `src/app/(store)/crypto-checkout/page.tsx` | Added QR code & live polling |
| `src/app/(store)/orders/[orderId]/page.tsx` | Wired to real database (was hardcoded) |
| `src/app/(store)/orders/page.tsx` | Added payment status & method badges |
| `.env.local` | Renamed `NOEPAYMENTS_IPN_KEY` → `NOWPAYMENTS_IPN_SECRET_KEY` |
| `src/env.mjs` | Added IPN secret to env schema |

## Testing Checklist

- [ ] Dev server starts without errors
- [ ] Add item to cart → Checkout → Crypto selection works
- [ ] Crypto checkout page shows:
  - [ ] Payment ID
  - [ ] QR code (next to address)
  - [ ] Pay address & amount in crypto
  - [ ] Status updates with spinner
- [ ] Order confirmation page (`/orders/{id}`) shows:
  - [ ] Real amount from database
  - [ ] Order items with quantities
  - [ ] Payment status (Paid/Unpaid)
  - [ ] Payment method (₿ Crypto/💳 Card)
- [ ] In Postman:
  - [ ] "Create Crypto Checkout" returns payment details
  - [ ] "Send Webhook (Valid Signature)" returns 200 OK
  - [ ] "Send Webhook (Invalid Signature)" returns 401
  - [ ] Order status flips to `paid` after valid webhook

## Documentation

- **`CRYPTO_PAYMENT_TESTING.md`** — Complete testing guide with Postman instructions
- **`IMPLEMENTATION_SUMMARY.md`** — Technical deep-dive on what was fixed and why
- **`PAYMENT_SETUP_GUIDE.md`** — Original setup guide for Lemon Squeezy & NOWPayments

## The Critical Fix

**What was broken:**
- Webhook signature verification used the wrong key (API key instead of IPN secret)
- Real webhooks from NOWPayments were silently rejected (401)
- Orders never auto-updated to `paid` after payment

**What we fixed:**
- Use `NOWPAYMENTS_IPN_SECRET_KEY` for webhook verification (not API key)
- Hash recursively key-sorted JSON (not raw body)
- Orders now correctly update to `paid` when payment confirmed

See `IMPLEMENTATION_SUMMARY.md` for the technical details.

## Next Steps

1. **Test locally** with the Postman collection
2. **Deploy** to production with your real NOWPayments API key & IPN secret
3. **Configure IPN callback** in NOWPayments dashboard: `https://yourdomain.com/api/webhooks/nowpayments`
4. **Monitor** first few payments to ensure webhooks are received

## Troubleshooting

**Q: QR code not showing?**  
A: Check browser console. Make sure `qrcode` package is installed (`npm install qrcode`).

**Q: Webhook returns 401 (invalid signature)?**  
A: Verify `NOWPAYMENTS_IPN_SECRET_KEY` matches your dashboard. Check Postman pre-request script is enabled.

**Q: Order not updating to `paid` after webhook?**  
A: 
1. Verify webhook returned 200 OK (not 401)
2. Check Supabase directly: `SELECT * FROM orders WHERE id = '...'`
3. Look for errors in server logs

**Q: Build fails with TypeScript errors?**  
A: Run `npm run dev` instead. Dev mode has more lenient type checking. Production build has a pre-existing unrelated issue in `src/lib/supabase/client.ts` that's not in scope for this task.

## Rollback

If something breaks, all changes are isolated to:
- `src/lib/payments/nowPayments.ts`
- `src/app/(store)/crypto-checkout/page.tsx`
- `src/app/(store)/orders/[orderId]/page.tsx`
- `src/app/(store)/orders/page.tsx`
- `src/env.mjs`
- `src/lib/utils.ts`

You can revert just these files if needed.

---

**Need help?** See `CRYPTO_PAYMENT_TESTING.md` for the full testing guide.
