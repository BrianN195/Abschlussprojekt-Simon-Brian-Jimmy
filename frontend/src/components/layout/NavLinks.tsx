import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

type NavLinksProps = {
  onLinkClick?: () => void;
  mobile?: boolean;
};

function NavLinks({ onLinkClick, mobile = false }: NavLinksProps) {
  const { t } = useTranslation();
  const linkClassName = mobile ? "nav-mobile-link" : "nav-link";

  return (
    <>
      <Link to="/animals" className={linkClassName} onClick={onLinkClick}>
        {t('nav.animals')}
      </Link>
      <Link to="/about" className={linkClassName} onClick={onLinkClick}>
        {t('nav.about')}
      </Link>
    </>
  );
}

export default NavLinks;