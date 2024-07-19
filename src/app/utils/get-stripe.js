import { Stripe, loadStripe } from '@stripe/stripe-js';

let stripePromise
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.STRIPE_KEY);
  }
  return stripePromise;
};

export default getStripe;