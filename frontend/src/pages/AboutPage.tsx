import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "../styles/AboutPage.css";
import { authService } from "../services/authService";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const [isAuth, setIsAuth] = useState<boolean>(authService.isAuthenticated());

  useEffect(() => {
    const onStorage = () => setIsAuth(authService.isAuthenticated());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const ctaTarget = isAuth ? "/profile" : "/register";
  const ctaText = isAuth ? t('about.ctaProfile') : t('about.ctaRegister');

  return (
    <main className="about-page">
      <div className="about-content">
        <section className="about-card about-hero">
          <h1>{t('about.title')}</h1>
          <p>{t('about.intro')}</p>
        </section>

        <section className="about-card about-why">
          <h2>{t('about.whyTitle')}</h2>
          <p>{t('about.whyText')}</p>
        </section>

        <section className="about-card about-target">
          <h2>{t('about.targetTitle')}</h2>
          <ul>
            <li>{t('about.target1')}</li>
            <li>{t('about.target2')}</li>
            <li>{t('about.target3')}</li>
            <li>{t('about.target4')}</li>
          </ul>
        </section>

        <section className="about-card about-features">
          <h2>{t('about.featuresTitle')}</h2>
          <ul>
            <li>{t('about.feature1')}</li>
            <li>{t('about.feature2')}</li>
            <li>{t('about.feature3')}</li>
            <li>{t('about.feature4')}</li>
            <li>{t('about.feature5')}</li>
          </ul>
        </section>

        <section className="about-card about-contribute">
          <h2>{t('about.contributeTitle')}</h2>
          <p>{t('about.contributeText')}</p>
        </section>

        <div className="about-cta">
          <Link to={ctaTarget} className="about-cta-button">{ctaText}</Link>
        </div>

        <section className="about-card about-contact">
          <h2>{t('about.contactTitle')}</h2>
          <p>{t('about.contactText')}</p>
        </section>
      </div>
      </main>
  );
};

export default AboutPage;
