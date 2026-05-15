import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

type AuthControlsProps = {
  mobile?: boolean;
  onAction?: () => void;
};

function AuthControls({ mobile = false, onAction }: AuthControlsProps) {
  const navigate = useNavigate();
  const isLoggedIn = authService.isAuthenticated();
  const user = authService.getUser();

  function handleLogout() {
    authService.logout();
    onAction?.();
    navigate("/");
  }

  if (isLoggedIn) {
    const initials = (user?.username || user?.email || "").split(/\s+/).filter(Boolean).map(s=>s[0].toUpperCase()).slice(0,2).join("");

    return (
      <>
        <span className={mobile ? "nav-mobile-user" : "nav-user"}>
          {user?.profileImage ? (
            <img src={user.profileImage} alt="avatar" className="nav-user-avatar" />
          ) : (
            <span className="nav-user-avatar-fallback">{initials || "G"}</span>
          )}

          <span className="nav-user-greet">Hi, {user?.username || user?.email}</span>
        </span>

        <Link
          to="/profile"
          className={mobile ? "nav-mobile-link" : "nav-link"}
          onClick={onAction}
        >
          Profile
        </Link>
        <button
          className={mobile ? "nav-mobile-logout" : "nav-logout-btn"}
          onClick={handleLogout}
        >
          Logout
        </button>
      </>
    );
  }

  return (
    <>
      <Link
        to="/login"
        className={mobile ? "nav-mobile-link" : "nav-link"}
        onClick={onAction}
      >
        Login
      </Link>
      <Link
        to="/register"
        className={mobile ? "nav-mobile-link nav-register" : "nav-link nav-register"}
        onClick={onAction}
      >
        Register
      </Link>
    </>
  );
}

export default AuthControls;