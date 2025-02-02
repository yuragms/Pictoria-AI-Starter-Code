// import { loadStripe, Stripe } from '@stripe/stripe-js';

// let stripePromise: Promise<Stripe | null>;

// export const getStripe = () => {
//   if (!stripePromise) {
//     stripePromise = loadStripe(
//       process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE ??
//         process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ??
//         ''
//     );
//     console.log(
//       'load NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
//       process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
//     );
//   }

//   return stripePromise;
// };

import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = async (): Promise<Stripe | null> => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE ||
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
        ''
    );
    console.log(
      'load NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    );
  }

  return stripePromise;
};
