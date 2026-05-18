import { useRef, useState, type FormEvent } from "react";
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
  const [birthDate, setBirthDate] = useState("");
  const [birthDateInputType, setBirthDateInputType] = useState<"text" | "date">("text");
  const birthDateInputRef = useRef<HTMLInputElement>(null);

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
      await authService.register(
        email,
        password,
        username,
        gender,
        birthDate
      );

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
      <button
        type="button"
        className="back-button"
        onClick={() => navigate("/")}
      >
        {`<< Back`}
      </button>

      <h1 className="register-title">Registration</h1>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="register-username">Username</label>

          <input
            id="register-username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Required field"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="register-email">Email</label>

          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Required field"
            required
          />
        </div>

        <div className="form-field">
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
        </div>

        <div className="form-field">
          <label htmlFor="register-confirm-password">
            Confirm Password
          </label>

          <input
            id="register-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
            placeholder="Required field"
            minLength={6}
            required
          />
        </div>

        <div className="form-field">
          <div className="gender-label-wrapper">
            <label htmlFor="register-gender">Gender</label>

            <div className="info-tooltip">
              <span className="info-icon">i</span>

              <div className="tooltip-text">
                Optional information such as gender and birth date can be updated later in your
                profile settings.
              </div>
            </div>
          </div>

          <select
            id="register-gender"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          >
            <option value="">Optional</option>
            <option value="female">Woman</option>
            <option value="male">Man</option>
            <option value="others">Others</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="register-birthDate">
            Birth Date
          </label>

          <input
            ref={birthDateInputRef}
            id="register-birthDate"
            type={birthDateInputType}
            value={birthDate}
            onFocus={() => {
              setBirthDateInputType("date");

              setTimeout(() => {
                birthDateInputRef.current?.showPicker?.();
              }, 0);
            }}
            onBlur={() => {
              if (!birthDate) {
                setBirthDateInputType("text");
              }
            }}
            onChange={(event) => setBirthDate(event.target.value)}
            placeholder="Optional"
          />
        </div>

        <div className="register-actions">
          <button
            className="register-action-button"
            type="button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>

          <button
            className="register-action-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Registering..." : "Create account"}
          </button>
        </div>
      </form>

      {errorMessage ? (
        <p className="auth-error">{errorMessage}</p>
      ) : null}

      <p>
        Already registered?{" "}
        <Link to="/login">Go to login</Link>
      </p>
    </main>
  );
}

export default RegisterPage;