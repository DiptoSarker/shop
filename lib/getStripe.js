import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      "pk_test_51MvB4EFAbZEDzPxwaON9FLltMdybwsfNfinUmw4yqIuYxkV6cFL1L10aJeidB2kxkOW90TIkL7d6GVd8YdYYFmGb00pK0vLs3c"
    );
  }

  return stripePromise;
};

export default getStripe;
