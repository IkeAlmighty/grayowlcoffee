// import App from "next/app";
// import "bootstrap/dist/css/bootstrap.css";
import "../public/globals.css";
import { SessionProvider as NextAuthProvider } from "next-auth/react";

function App({ Component, pageProps }) {
  return (
    <NextAuthProvider>
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}

export default App;
