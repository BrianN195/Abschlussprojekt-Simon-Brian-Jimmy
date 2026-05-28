import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AuthContainer from "../components/auth/AuthContainer";
import LanguageSwitcher from "../components/layout/LanguageSwitcher";
import { authService } from "../services/authService";
import "../styles/landing.css";

function LandingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    // Wenn ein gültiges Token lokal liegt, direkt zur MainPage weiterleiten.
    if (authService.isAuthenticated()) {
      navigate("/main");
    }
  }, [navigate]);

  return (
    <main className="landing-page">
      <section className="landing-content">
        <div className="landing-language-row">
          <LanguageSwitcher compact />
        </div>

        <p className="landing-greeting">{t('landing.welcome')}</p>

        <h1 className="country">{t('landing.title')}</h1>

        <span className="landing-fauna">{t('landing.subtitleTitle')}</span>

        <p className="landing-subtitle">{t('landing.subtitle')}</p>

        <AuthContainer />
      </section>
    </main>
  );
}

export default LandingPage;