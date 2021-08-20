import { signIn, signOut, useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const [session, loading] = useSession();
  const [phrase, setPhrase] = useState("");
  const phrases = [
    "Coffee is like the wind. Always in my mouth.",
    "I think you look great today. Like a fresh latte.",
    "Crem",
    "... Someone, let me out of this computer.",
    "",
  ];
  useEffect(() => {
    setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
  }, []);

  return (
    <div>
      {!loading && !session && (
        <div className={styles.navContainer}>
          <div>{phrase}</div>
          <div className="text-button" onClick={() => signIn()}>
            Click To Login Gray Owl's test website.
          </div>
        </div>
      )}

      {!loading && session && (
        <div className={styles.navContainer}>
          <div>
            {/* Hello {session.user.name.split(" ")[0]} */}
            <a href="/schedule" className="text-button">
              Schedule
            </a>
          </div>

          <div className="text-button text-right" onClick={() => signOut()}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
}
