import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import styles from "./StripeProduct.module.css";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function StripeProduct({ priceId, imageUrl, name }) {
  const [processingPayment, setProcessingPayment] = useState(false);

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
  return (
    <div className={`${styles.card}`}>
      <div className="row my-2 text-center">
        <div className="col">{name}</div>
      </div>
      <div className="row">
        <div className="col">
          <img src={imageUrl} />
        </div>
      </div>
    </div>
  );
}
