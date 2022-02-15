// import App from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import "../public/globals.css";
import { Provider as NextAuthProvider } from "next-auth/client";

function App({ Component, pageProps }) {
  const stripeOptions = {
    clientSecret: process.env.STRIPE_SECRET_KEY,
  };

  return (
    <NextAuthProvider>
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}

export default App;
