import { useTranslation } from "react-i18next";
import { useRef, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import "../styles/register.css";

function RegisterPage() {
  const { t } = useTranslation();
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
      setErrorMessage(t('register.passwordTooShort'));
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage(t('register.passwordMismatch'));
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
        error instanceof Error ? error.message : t('register.failed');

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
        {`<< ${t('common.back')}`}
      </button>

      <h1 className="register-title">{t('register.title')}</h1>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="register-username">{t('register.username')}</label>

          <input
            id="register-username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder={t('register.requiredField')}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="register-email">{t('register.email')}</label>

          <input
            id="register-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={t('register.requiredField')}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="register-password">{t('register.password')}</label>

          <input
            id="register-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder={t('register.requiredField')}
            required
            minLength={6}
          />
        </div>

        <div className="form-field">
          <label htmlFor="register-confirm-password">
            {t('register.confirmPassword')}
          </label>

          <input
            id="register-confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
            placeholder={t('register.requiredField')}
            minLength={6}
            required
          />
        </div>

        <div className="form-field">
          <div className="gender-label-wrapper">
            <label htmlFor="register-gender">{t('register.gender')}</label>

            <div className="info-tooltip">
              <span className="info-icon">i</span>

              <div className="tooltip-text">
                {t('register.genderInfo')}
              </div>
            </div>
          </div>

          <select
            id="register-gender"
            className="glass-dropdown"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          >
            <option value="">{t('register.optional')}</option>
            <option value="female">{t('register.woman')}</option>
            <option value="male">{t('register.man')}</option>
            <option value="others">{t('register.others')}</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="register-birthDate">
            {t('register.birthDate')}
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
            placeholder={t('register.optional')}
          />
        </div>

        <div className="register-actions">
          <button
            className="register-action-button"
            type="button"
            onClick={() => navigate("/")}
          >
            {t('common.cancel')}
          </button>

          <button
            className="register-action-button"
            type="submit"
            disabled={loading}
          >
            {loading ? t('register.loading') : t('register.createAccount')}
          </button>
        </div>
      </form>

      {errorMessage ? (
        <p className="auth-error">{errorMessage}</p>
      ) : null}

      <p>
        {t('register.alreadyRegistered')} {" "}
        <Link to="/login">{t('register.goToLogin')}</Link>
      </p>
    </main>
  );
}

export default RegisterPage;