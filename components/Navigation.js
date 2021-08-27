import { signIn, signOut, useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import FlexButton from "./FlexButton";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const [session, loading] = useSession();
  const [phrase, setPhrase] = useState("");
  const phrases = [
    "Coffee is like the wind. Always in my mouth.",
    "I think you look great today. Like a fresh latte.",
    "Crem",
    "... Someone, let me out of this computer.",
  ];
  useEffect(() => {
    setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
  }, []);

  return (
    <div>
      {!loading && !session && (
        <div className={styles.navContainer}>
          <FlexButton
            text="Login"
            onClick={() => {
              signIn();
            }}
          />

          <div className="text-right p10px">{phrase}</div>
        </div>
      )}

      {!loading && session && (
        <div className={styles.navContainer}>
          <FlexButton text="Schedule" href="/schedule" />

          <FlexButton
            className="text-right"
            text="Logout"
            onClick={() => {
              signOut();
            }}
          />
        </div>
      )}
    </div>
  );
}
