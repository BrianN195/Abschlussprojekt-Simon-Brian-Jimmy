import AuthContainer from "./components/auth/AuthContainer";

function App() {
  return (
    <main className="landing-page">
      <section className="landing-content">
        <p className="landing-greeting">Welcome to</p>

        <h1 className="country">Maldives</h1>

        <span className="landing-fauna">Marine Fauna</span>

        <p className="landing-subtitle">discover, enjoy and protect</p>

        <AuthContainer />
      </section>
    </main>
  );
}

export default App;