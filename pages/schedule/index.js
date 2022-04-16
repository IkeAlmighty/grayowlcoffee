import Link from "next/link";
import Authorized from "../../components/Authorized";
import Navigation from "../../components/Navigation";

export default function Schedule() {
  return (
    <div>
      <Navigation />

      <Authorized>
        <Link href="/schedule/edit">
          <a className="text-button">Edit Shedule</a>
        </Link>
        <Link href="/schedule/read">
          <a className="text-button">Read Schedule</a>
        </Link>
      </Authorized>
    </div>
  );
}
