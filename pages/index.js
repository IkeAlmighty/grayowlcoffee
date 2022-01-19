import Head from "next/head";
import { useSession } from "next-auth/client";
import Location from "../components/home/Location";
import StripeProduct from "../components/StripeProduct";

export default function Home() {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>Gray Owl Coffee</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <span className={`header`}>Gray Owl Coffee</span>

      <div className="go-container with-header">
        <StripeProduct
          name="Product"
          imageUrl={
            "https://cdn.mos.cms.futurecdn.net/YDFk8cgmSKu8VYFVedUQ8j.jpg"
          }
        />
      </div>
      <footer className={`mt-1 footer`}>
        <Location className="d-inline-block" />
        <a className="mx-4" href="tel:4057012929">
          (405) 701-2929
        </a>
      </footer>
    </>
  );
}
