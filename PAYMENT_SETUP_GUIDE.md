# Payment Integration Setup Guide

This project now uses **Lemon Squeezy** for card payments and **NOWPayments** for cryptocurrency payments.

## Overview

- **Lemon Squeezy**: Card, PayPal, Apple Pay, Google Pay
- **NOWPayments**: 160+ cryptocurrencies (Bitcoin, Ethereum, etc.)

## Setup Instructions

### 1. Lemon Squeezy Setup (Card Payments)

#### Create Account
1. Go to [https://www.lemonsqueezy.com](https://www.lemonsqueezy.com)
2. Sign up for an account
3. Verify your email

#### Get API Keys
1. Go to Settings → API
2. Create a new API key
3. Copy your API key

#### Create Store
1. Go to Settings → Stores
2. Create a new store
3. Get your Store ID from the URL or settings

#### Update Environment Variables
Add these to your `.env.local`:
```env
NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID=YOUR_STORE_ID
LEMON_SQUEEZY_API_KEY=YOUR_API_KEY
```

#### Setup Webhook (Optional but Recommended)
1. Go to Settings → Webhooks
2. Add webhook URL: `https://yourdomain.com/api/webhooks/lemon-squeezy`
3. Select "Order Created" event
4. Add your webhook secret (you'll need to update the verification code)

### 2. NOWPayments Setup (Crypto Payments)

#### Create Account
1. Go to [https://nowpayments.io](https://nowpayments.io)
2. Sign up for a free account
3. Verify your email

#### Get API Key
1. Go to Dashboard → Settings → API
2. Copy your API Key

#### Update Environment Variables
Add this to your `.env.local`:
```env
NOWPAYMENTS_API_KEY=YOUR_API_KEY
```

#### Setup IPN Callback (Optional but Recommended)
1. Go to Dashboard → Settings → IPN Settings
2. Add callback URL: `https://yourdomain.com/api/webhooks/nowpayments`
3. This will automatically receive payment status updates

### 3. How It Works

#### Card Payment Flow
1. User selects "Card Payment" at checkout
2. Redirected to Lemon Squeezy checkout
3. User enters card details and completes payment
4. Webhook notifies your server (or user is redirected to success URL)
5. Order status updates to "PAID" and "PREPARING"

#### Crypto Payment Flow
1. User selects "Crypto Payment" at checkout
2. Gets payment details including:
   - Wallet address to send crypto to
   - Amount in cryptocurrency
   - QR code for easy scanning
3. User sends cryptocurrency
4. NOWPayments confirms transaction and notifies your server
5. Order status updates based on payment confirmation

### 4. Testing

#### Test Lemon Squeezy
Lemon Squeezy provides test mode:
1. Create a test store in Lemon Squeezy
2. Use test products with no actual charges
3. Use test payment methods to verify checkout

#### Test NOWPayments
NOWPayments has a sandbox/test mode:
1. You can test with small amounts
2. NOWPayments will show you payment details
3. Payments are not charged to your wallet

### 5. File Structure

New payment files:
```
src/lib/payments/
├── lemonSqueezy.ts          # Lemon Squeezy API client
└── nowPayments.ts           # NOWPayments API client

src/app/api/
├── checkout/
│   └── route.ts             # Main checkout endpoint (supports both payment methods)
├── payment-status/
│   └── route.ts             # Get crypto payment status
└── webhooks/
    ├── lemon-squeezy/
    │   └── route.ts         # Lemon Squeezy webhook handler
    └── nowpayments/
        └── route.ts         # NOWPayments webhook handler

src/app/crypto-checkout/
└── page.tsx                 # Crypto payment display page

src/features/carts/components/
└── CheckoutButton.tsx       # Updated to show payment method selection
```

### 6. Database Schema

The `orders` table now tracks:
- `payment_method`: "card" or "crypto"
- `payment_status`: "paid", "unpaid", or "no_payment_required"
- `order_status`: "pending", "PREPARING", "canceled", etc.

Note: The old `stripe_payment_intent_id` field is still in the schema but no longer used. You can safely migrate it out in a future update.

### 7. Environment Variables Reference

**Server-side** (`.env.local` or `.env`):
```env
LEMON_SQUEEZY_API_KEY=your_api_key_here
NOWPAYMENTS_API_KEY=your_api_key_here
```

**Client-side** (safe to expose):
```env
NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID=your_store_id_here
```

### 8. Troubleshooting

**Lemon Squeezy Issues**:
- Verify Store ID is correct
- Check API key has necessary permissions
- Ensure webhook URL is accessible from the internet

**NOWPayments Issues**:
- Verify API key is active
- Check that IPN callback URL is correct
- Monitor payment status updates in NOWPayments dashboard

### 9. API Reference

#### Create Checkout
```typescript
POST /api/checkout
{
  orderProducts: { productId: { quantity: number } },
  guest: boolean,
  paymentMethod: "card" | "crypto"
}
```

Response:
- **Card**: `{ paymentMethod: "card", checkoutUrl: "..." }`
- **Crypto**: `{ paymentMethod: "crypto", paymentId: number, payAddress: "...", payAmount: number, payCurrency: "..." }`

#### Get Payment Status
```typescript
GET /api/payment-status?paymentId=YOUR_PAYMENT_ID
```

Returns complete payment status from NOWPayments.

### 10. Migration Notes

#### From Stripe
- All Stripe SDK dependencies have been removed
- Old webhook routes deleted
- Old checkout session endpoint deleted
- Update any references to Stripe in your code

#### Keep in mind
- The database still has the `stripe_payment_intent_id` column but it's unused
- You can run a migration to remove it later
- All new payments will use Lemon Squeezy or NOWPayments

## Support

- **Lemon Squeezy Docs**: https://docs.lemonsqueezy.com
- **NOWPayments Docs**: https://documenter.getpostman.com/view/7907941/S1a32n38

## Notes

- Crypto payments are **fully decentralized** - payments go directly to your wallet
- Lemon Squeezy handles **PCI compliance** for card payments
- Both services handle **currency conversion** automatically
- You receive **immediate notifications** when payments are confirmed
