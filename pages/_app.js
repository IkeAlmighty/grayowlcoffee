// import App from "next/app";
import "../public/globals.css";
import { Provider } from "next-auth/client";

function App({ Component, pageProps }) {
  return (
    <Provider>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
