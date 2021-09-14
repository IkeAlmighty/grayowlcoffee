import Authorized from "../../components/Authorized";
import Navigation from "../../components/Navigation";

export default function Schedule() {
  return (
    <div>
      <Navigation />

      <Authorized>
        <a className="text-button" href="/schedule/edit">
          Edit Shedule
        </a>
        <a className="text-button" href="/schedule/read">
          Read Schedule
        </a>
      </Authorized>
    </div>
  );
}
