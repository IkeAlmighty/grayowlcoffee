import { useEffect, useState } from "react";
import { getSession } from "../../lib/auth";

import Authorized from "../../components/Authorized";
import EventCreator from "../../components/events/EventCreator";

export default function Admin({ session }) {
  return (
    <Authorized session={session}>
      <div className="p-3 max-w-lg mx-auto bg-slate-300">
        <div className="text-lg font-bold text-right">Admin Console</div>
        <div className="text-sm text-right">Gray Owl Collective</div>

        <div className="mt-12">
          <EventCreator />
        </div>
      </div>
    </Authorized>
  );
}

export function getServerSideProps({ req }) {
  const session = getSession({ req });

  if (!session) {
    return { redirect: { destination: "/api/auth/google" } };
  }

  return { props: { session } };
}
