import AuthContainer from "./AuthContainer/AuthContainer";

function Header() {
  return (
    <header>
      <h3>Welcome to </h3>
      <h1>Maldives</h1>
      <h2>Marine Fauna</h2>
      <AuthContainer />
    </header>
  );
}

export default Header;