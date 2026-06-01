import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import useUser from '../../hooks/useUser';

type NavLinksProps = {
  onLinkClick?: () => void;
  mobile?: boolean;
};

function NavLinks({ onLinkClick, mobile = false }: NavLinksProps) {
  const { user } = useUser();
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
      {user?.role === "admin" && (
    <>
      <Link to="/create-animal" className={linkClassName}>Create Animal</Link>
      <Link to="/create-location" className={linkClassName}>Create Location</Link>
      <Link to="/connect" className={linkClassName}>Connecting</Link>
      <Link to="/makeAdmin" className={linkClassName}>Make Admin</Link>
    </>
  )}
    </>
  );
}

export default NavLinks;