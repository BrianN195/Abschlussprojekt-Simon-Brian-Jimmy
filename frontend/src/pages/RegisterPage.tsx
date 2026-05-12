import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import "../styles/register.css";

function RegisterPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState(""); // Format: YYYY-MM-DD

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await authService.register(email, password, username, gender, birthDate);
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
      <h1 className="register-title">Registration</h1>

      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="register-username">Username</label>
        <input
          id="register-username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Required field"
          required
        />

        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Required field"
          required
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Required field"
          required
          minLength={6}
        />
        <label htmlFor="register-confirm-password">Confirm Password</label>
        <input id="register-confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Required field"
          minLength={6}
          required
        />

        <label htmlFor="register-gender">Gender</label>
        <select
          id="register-gender"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <option value="">Optional</option>
          <option value="female">Woman</option>
          <option value="male">Man</option>
          <option value="other">Others</option>
        </select>

        <label htmlFor="register-birthDate">Birth Date</label>
        <input
          id="register-birthDate"
          type="date"
          value={birthDate}
          onChange={(event) => setBirthDate(event.target.value)}
          placeholder="Optional"
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

