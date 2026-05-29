import { useTranslation } from 'react-i18next';
import {Link} from "react-router-dom";

function RegisterButton() {
    const { t } = useTranslation();
    return (
        <Link className="auth-button auth-button-register" to="/register">
            {t('auth.register')}
        </Link>
    );
}

export default RegisterButton;