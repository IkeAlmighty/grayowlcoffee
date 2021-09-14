import { useSession, signIn, signOut } from "next-auth/client";
import FlexButton from "./FlexButton";
export default function Login() {
  const [session, loading] = useSession();

  return (
    <div>
      {/* {!loading && session && <FlexButton text="Logout" onClick={signOut} />} */}
      {!loading && !session && <FlexButton text="Login" onClick={signIn} />}
    </div>
  );
}
