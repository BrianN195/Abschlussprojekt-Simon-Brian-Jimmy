import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

function GuestButton() {
  const { t } = useTranslation();
  return (
    <Link className="auth-button" to="/main">
      {t('auth.guest')}
    </Link>
  );
}

export default GuestButton;