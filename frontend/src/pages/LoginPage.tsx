import { useState, type FormEvent, } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      await authService.login(email, password);
      navigate("/main");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Login failed";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <h1 className="login-title">Login</h1>

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}

      <p>
        No account yet? <Link to="/register">Create one</Link>
      </p>
    </main>
  );
}

export default LoginPage;
