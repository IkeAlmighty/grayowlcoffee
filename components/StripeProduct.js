import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

export default async function StripeProduct({ priceId, imageUrl }) {
  const [processingPayment, setProcessingPayment] = useState(false);

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

  async function createCheckoutSession() {
    setProcessingPayment(true);

    const stripe = await stripePromise;

    const checkoutSession = await fetch("/api/stripe/create-stripe-session", {
      method: "POST",
      body: JSON.stringify({ price_id: priceId, quantity: 1 }),
    });

    const res = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (res.error) alert(result.error.message);

    setProcessingPayment(false);
  }

  //TODO: imple the view per product
  //TODO: imple more precise controls on quantity bought of the item
  return <></>;
}
