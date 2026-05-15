import { Link } from "react-router-dom";

function GuestButton() {
  return (
    <Link className="auth-button" to="/main">
      Guest
    </Link>
  );
}

export default GuestButton;