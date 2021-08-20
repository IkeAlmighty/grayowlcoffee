import Navigation from "../lib/components/Navigation";
import { signIn, signOut, useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import PersonSelector from "../lib/components/schedule/PersonSelector";
import ShiftSelector from "../lib/components/schedule/ShiftSelector";
import RoleEditor from "../lib/components/schedule/RoleEditor";
export default function Schedule() {
  const [session, loading] = useSession();

  if (!loading && !session)
    return (
      <div>
        Not Authorized to view this page.{" "}
        <span className="text-button" onClick={() => signIn()}>
          Login
        </span>{" "}
        to view.
      </div>
    );

  return (
    <div>
      <Navigation />
      <div>
        <PersonSelector />
      </div>
    </div>
  );
}
