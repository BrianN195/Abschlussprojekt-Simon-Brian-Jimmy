import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

function LoginLogoutButton() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isLoggedIn = authService.isAuthenticated();

  function handleLogout() {
    authService.logout();
    navigate("/");
  }

  if (!isLoggedIn) {
    return (
      <Link className="auth-button" to="/login">
        {t('auth.login')}
      </Link>
    );
  }

  return (
    <button className="auth-button" type="button" onClick={handleLogout}>
      {t('auth.logout')}
    </button>
  );
}

export default LoginLogoutButton;