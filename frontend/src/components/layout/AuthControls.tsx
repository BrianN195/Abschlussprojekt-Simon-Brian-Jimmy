import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

type AuthControlsProps = {
  mobile?: boolean;
  onAction?: () => void;
};

function AuthControls({ mobile = false, onAction }: AuthControlsProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isLoggedIn = authService.isAuthenticated();
  const user = authService.getUser();

  function handleLogout() {
    authService.logout();
    onAction?.();
    navigate("/");
  }

  const initials = (user?.username || user?.email || "")
    .split(/\s+/)
    .filter(Boolean)
    .map((s) => s[0].toUpperCase())
    .slice(0, 2)
    .join("");

  const avatarContent = user?.profileImage ? (
    <img src={user.profileImage} alt={t('profile.avatarLabel')} className="nav-user-avatar" />
  ) : (
    <span className="nav-user-avatar-fallback">{initials || "G"}</span>
  );

  return (
    <>
      <span className={mobile ? "nav-mobile-user" : "nav-user"}>
        {avatarContent}
        <span className="nav-user-greet">
          {t('nav.greeting', {
            name: isLoggedIn ? user?.username || user?.email : t('auth.guest'),
          })}
        </span>
      </span>

      {isLoggedIn ? (
        <>
          <Link
            to="/profile"
            className={mobile ? "nav-mobile-link" : "nav-link"}
            onClick={onAction}
          >
            {t('nav.profile')}
          </Link>
          <button
            className={mobile ? "nav-mobile-logout" : "nav-logout-btn"}
            onClick={handleLogout}
          >
            {t('auth.logout')}
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className={mobile ? "nav-mobile-link" : "nav-link"}
            onClick={onAction}
          >
            {t('auth.login')}
          </Link>
          <Link
            to="/register"
            className={mobile ? "nav-mobile-link nav-register" : "nav-link nav-register"}
            onClick={onAction}
          >
            {t('auth.register')}
          </Link>
        </>
      )}
    </>
  );
}

export default AuthControls;