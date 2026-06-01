import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import AuthControls from "./AuthControls";
import LanguageSwitcher from "./LanguageSwitcher";
import "../../styles/MainNavigation.css";
import SearchBar from "./SearchBar";

function MainNavigation() {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [favoriteHintVisible, setFavoriteHintVisible] = useState(false);
  const favoriteHintTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleFavoriteLoginRequired = () => {
      setFavoriteHintVisible(true);

      if (favoriteHintTimeoutRef.current) {
        window.clearTimeout(favoriteHintTimeoutRef.current);
      }

      favoriteHintTimeoutRef.current = window.setTimeout(() => {
        setFavoriteHintVisible(false);
        favoriteHintTimeoutRef.current = null;
      }, 5000);
    };

    window.addEventListener("favorite-login-required", handleFavoriteLoginRequired);

    return () => {
      window.removeEventListener("favorite-login-required", handleFavoriteLoginRequired);

      if (favoriteHintTimeoutRef.current) {
        window.clearTimeout(favoriteHintTimeoutRef.current);
      }
    };
  }, []);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="main-navigation">
      <div className="nav-container">
        <Link to="/main" className="nav-logo">
          <img
            src="/images/logo/logo_für_malediven_website-app_dark.png"
            alt={t('brand.alt')}
          />
        </Link>

        <nav className="nav-menu">
          <NavLinks />
        </nav>

        <div className="nav-right">
          <div className="nav-language">
            <LanguageSwitcher compact />
          </div>

          <div className="nav-search-area">
            <div className="nav-search">
              <SearchBar />
            </div>
          </div>
          <div className="nav-auth">
            <AuthControls />
          </div>

          <button
            className="nav-hamburger"
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label={t('nav.toggleMenu')}
            aria-expanded={mobileMenuOpen}
          >
            ☰
          </button>
        </div>
      </div>

        {favoriteHintVisible ? (
          <div className="nav-favorite-banner">
            <p className="nav-favorite-message" role="alert" aria-live="polite">
              {`!! ${t("favorites.loginRequired", {
                defaultValue:
                  "Um Favoriten auszuwählen, musst du registriert und eingeloggt sein",
              })} !!`}
            </p>
          </div>
        ) : null}

      {mobileMenuOpen ? (
        <nav className="nav-mobile-menu">
          <div className="nav-mobile-language">
            <LanguageSwitcher compact />
          </div>
          <NavLinks mobile onLinkClick={closeMobileMenu} />
          <div className="nav-search-mobile-area">
            <div className="nav-search-mobile"><SearchBar /></div>
          </div>
          <AuthControls mobile onAction={closeMobileMenu} />
        </nav>
      ) : null}
    </header>
  );
}

export default MainNavigation;
