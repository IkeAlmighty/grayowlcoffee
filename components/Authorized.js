import LoginLogout from "./Login";
import { useSession } from "next-auth/client";

// This component should be used for content that is strictly admin only.
// Example use:
// <Authorized>
//      <div> This is a secret admin dashboard </div>
// </Authorized>
export default function Authorized({ isComponent, children }) {
  const [session, loading] = useSession();

  if (loading) return <span>Loading...</span>;
  else {
    if (session && session.isAdmin) return <>{children}</>;
    if (session && !session.isAdmin && !isComponent)
      return (
        <>
          <div className="text-center d-block">
            You are not authorized to view this page.
          </div>
          <div className="text-center d-block">
            Contact Isaac if you are Gray Owl employee and see this message.
          </div>
        </>
      );
    else if (!isComponent) return <LoginLogout />;
    else return <></>;
  }
}
