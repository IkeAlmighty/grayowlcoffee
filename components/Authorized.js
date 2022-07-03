// This component should be used for content that is strictly admin only.
// Example use:
// <Authorized session={session}>
//      <div> This is a secret admin dashboard </div>
// </Authorized>

// session object should be grabbed and passed to component
// via getServerSideProps

import Link from "next/link";
export default function Authorized({ session, children }) {
  if (session.role === "admin") return <>{children}</>;
  else
    return (
      <div>
        You are not authorized to view this page. If you are a gray owl
        employee, you can &nbsp;
        <Link href="/api/auth/google">
          <a>login here</a>
        </Link>
      </div>
    );
}
