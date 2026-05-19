import { useState } from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import AuthControls from "./AuthControls";
import "../../styles/MainNavigation.css";
import SearchBar from "./SearchBar";

function MainNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <header className="main-navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Maldives Marine
        </Link>

        <nav className="nav-menu">
          <NavLinks />
        </nav>

        <div className="nav-right">
          <div className="nav-search">
            <SearchBar />
          </div>
          <div className="nav-auth">
            <AuthControls />
          </div>

          <button
            className="nav-hamburger"
            onClick={() => setMobileMenuOpen((value) => !value)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            ☰
          </button>
        </div>
      </div>

      {mobileMenuOpen ? (
        <nav className="nav-mobile-menu">
          <NavLinks mobile onLinkClick={closeMobileMenu} />
          <div className="nav-search-mobile"><SearchBar /></div>
          <AuthControls mobile onAction={closeMobileMenu} />
        </nav>
      ) : null}
    </header>
  );
}

export default MainNavigation;
