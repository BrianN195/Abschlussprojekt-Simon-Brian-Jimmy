import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

function LoginLogoutButton() {
  const navigate = useNavigate();
  const isLoggedIn = authService.isAuthenticated();

  function handleLogout() {
    authService.logout();
    navigate("/");
  }

  if (!isLoggedIn) {
    return (
      <Link className="auth-button" to="/login">
        Login
      </Link>
    );
  }

  return (
    <button className="auth-button" type="button" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LoginLogoutButton;