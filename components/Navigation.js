import { useSession, signOut } from "next-auth/client";
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
    <div className="header">
      <img src="/headerimg.png" alt="/!\" className={styles.leftImg} />
      <span className={styles.headerWords}>Gray Owl Coffee</span>
      <img src="/headerimg.png" alt="/!\" className={styles.rightImg} />
    </div>
  );
}
