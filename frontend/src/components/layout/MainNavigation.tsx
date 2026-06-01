import { useState } from "react";
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

          <div className="nav-search">
            <SearchBar />
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

      {mobileMenuOpen ? (
        <nav className="nav-mobile-menu">
          <div className="nav-mobile-language">
            <LanguageSwitcher compact />
          </div>
          <NavLinks mobile onLinkClick={closeMobileMenu} />
          <div className="nav-search-mobile"><SearchBar /></div>
          <AuthControls mobile onAction={closeMobileMenu} />
        </nav>
      ) : null}
    </header>
  );
}

export default MainNavigation;
