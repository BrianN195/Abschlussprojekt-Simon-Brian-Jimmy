import AuthContainer from "../components/auth/AuthContainer";

function LandingPage() {
  return (
    <main className="landing-page">
        <section className="landing-content">
            <p className="landing-greeting">Welcome to</p>

            <h1 className="country">Maldives</h1>

            <span className="landing-fauna">marine fauna</span>

            <p className="landing-subtitle">discover, enjoy and protect</p>

            <AuthContainer />
        </section>
    </main>
  );
}

export default LandingPage;