function LoginPage() {
  return (
    <main className="login-page">
      <section className="login-card">
        <h1>Login</h1>

        <form>
          <label htmlFor="username">
            Username:
          </label>

          <input
            type="text"
            id="username"
            name="username"
            required
          />

          <label htmlFor="password">
            Password:
          </label>

          <input
            type="password"
            id="password"
            name="password"
            required
          />

          <button type="submit">
            Login
          </button>
        </form>

        <div className="login-options">
          <button type="button">
            Username vergessen
          </button>

          <button type="button">
            Passwort vergessen
          </button>
        </div>
      </section>
    </main>
  );
}

export default LoginPage;

