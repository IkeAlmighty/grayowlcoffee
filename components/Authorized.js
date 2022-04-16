// This component should be used for content that is strictly admin only.
// Example use:
// <Authorized>
//      <div> This is a secret admin dashboard </div>
// </Authorized>
import { clientSideAuthorized } from "../lib/auth";
export default function Authorized({ children }) {
  const [isAdmin, loading] = clientSideAuthorized();

  if (loading) return <span>Loading...</span>;
  else if (isAdmin) return <>{children}</>;
  else return <div>You are not authorized to view this page.</div>;
}
