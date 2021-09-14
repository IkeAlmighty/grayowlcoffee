import LoginLogout from "../components/Login";
import Navigation from "../components/Navigation";

export default function login() {
  return (
    <div className="text-center">
      <Navigation />
      <LoginLogout />
    </div>
  );
}
