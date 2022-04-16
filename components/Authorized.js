// This component should be used for content that is strictly admin only.
// Example use:
// <Authorized>
//      <div> This is a secret admin dashboard </div>
// </Authorized>
import { useClientSideAuth } from "../lib/auth";
export default function Authorized({ children }) {
  const [isAdmin, loading] = useClientSideAuth();

  if (loading) return <span>Loading...</span>;
  else if (isAdmin) return <>{children}</>;
  else return <div>You are not authorized to view this page.</div>;
}
