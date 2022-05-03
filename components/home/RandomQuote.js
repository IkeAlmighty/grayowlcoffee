import { useState, useEffect } from "react";

export default function QuoteOfDay({ className }) {
  const [quote, setQuote] = useState("");

  async function getQuote() {
    let res = await fetch(`/api/db/mongodb?collection=quotes`);
    let json = await res.json();

    return json[Math.floor(Math.random() * json.length)];
  }

  useEffect(() => {
    async function fetchAndSetQuote() {
      setQuote(await getQuote());
    }

    fetchAndSetQuote();
  }, []);

  return (
    <span className={`${className}`}>
      {quote ? `${quote.quote}${quote.credit ? " - " + quote.credit : ""}` : ""}
    </span>
  );
}
