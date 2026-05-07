import "./AuthContainer.css";

import GuestButton from "./GuestButton/GuestButton";
import LoginLogoutButton from "./LoginLogouButton/LoginLogoutButton";
import RegisterButton from "./RegisterButton/RegisterButton";

function AuthContainer() {
  const handleGuestClick = () => {
    window.location.assign("/home");
  };

  return (
    <div className="auth-container">
      <GuestButton onClick={handleGuestClick} />
      <LoginLogoutButton />
      <RegisterButton />
    </div>
  );
}

export default AuthContainer;