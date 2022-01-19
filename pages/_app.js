// import App from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import "../public/globals.css";
import { Provider as NextAuthProvider } from "next-auth/client";
import { Elements as StripeElementsProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

function App({ Component, pageProps }) {
  const stripeOptions = {
    clientSecret: process.env.STRIPE_SECRET_KEY,
  };

  return (
    <StripeElementsProvider stripe={stripePromise} options={stripeOptions}>
      <NextAuthProvider>
        <Component {...pageProps} />
      </NextAuthProvider>
    </StripeElementsProvider>
  );
}

export default App;
