import { Link } from "react-router-dom";

type NavLinksProps = {
  onLinkClick?: () => void;
  mobile?: boolean;
};

function NavLinks({ onLinkClick, mobile = false }: NavLinksProps) {
  const linkClassName = mobile ? "nav-mobile-link" : "nav-link";

  return (
    <>
      <Link to="/animals" className={linkClassName} onClick={onLinkClick}>
        Animals
      </Link>
      <Link to="/about" className={linkClassName} onClick={onLinkClick}>
        About
      </Link>
    </>
  );
}

export default NavLinks;