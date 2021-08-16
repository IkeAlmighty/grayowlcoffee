import { signIn, signOut, useSession } from "next-auth/client";
import styles from "./Navigation.module.css";

export default function Navigation() {
  const [session, loading] = useSession();

  return (
    <div>
      {!loading && !session && (
        <div className={styles.navContainer}>
          <button>hello!</button>
          <button onClick={() => signIn()}>
            Click To Login Gray Owl's test website.
          </button>
        </div>
      )}

      {!loading && session && (
        <div className={styles.navContainer}>
          <div>hello, {session.user.name.split(" ")[0]}</div>
          <div>
            <button onClick={() => signOut()}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}
