import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";

function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      await authService.register(email, password, username);
      // Falls Register bereits Token liefert, ist man ggf. schon eingeloggt.
      // Für sauberen Flow trotzdem auf Login weiterleiten:
      navigate("/login");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Registration failed";
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="register-page">
      <h1 className="register-title">Register</h1>

      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="register-username">Username</label>
        <input
          id="register-username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />

        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Create account"}
        </button>
      </form>

      {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}

      <p>
        Already registered? <Link to="/login">Go to login</Link>
      </p>
    </main>
  );
}

export default RegisterPage;

