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
      <Link to="/login">
        <button className="login-logout-button">Login</button>
      </Link>
    );
  }

  return (
    <button className="login-logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LoginLogoutButton;