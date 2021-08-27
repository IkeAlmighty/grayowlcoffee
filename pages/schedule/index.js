import { useSession } from "next-auth/client";
import Navigation from "../../components/Navigation";

export default function Schedule() {
  const [session, loading] = useSession();
  return (
    <div>
      <Navigation />
      {!loading && session && (
        <>
          <a className="text-button" href="/schedule/edit">
            Edit Shedule
          </a>
          <a className="text-button" href="/schedule/read">
            Read Schedule
          </a>
        </>
      )}
    </div>
  );
}
