import Navigation from "../../lib/components/Navigation";

export default function Schedule() {
  return (
    <>
      <Navigation />

      <a className="text-button" href="/schedule/edit">
        Edit Shedule
      </a>
      <a className="text-button" href="/schedule/read">
        Read Schedule
      </a>
    </>
  );
}
