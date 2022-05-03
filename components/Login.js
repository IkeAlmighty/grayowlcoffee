import { useSession, signIn, signOut } from "next-auth/react";
import FlexButton from "./FlexButton";
export default function Login() {
  const { session, status } = useSession();

  return (
    <div>
      {/* {!loading && session && <FlexButton text="Logout" onClick={signOut} />} */}
      {!loading && !session && <FlexButton text="Login" onClick={signIn} />}
    </div>
  );
}
