import { useTranslation } from "react-i18next";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import "../styles/login.css";

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [rememberUsername, setRememberUsername] = useState(false);
  const [rememberPassword, setRememberPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem(
      "rememberedUsername"
    );

    const storedPassword = localStorage.getItem(
      "rememberedPassword"
    );

    if (storedUsername) {
      setUsername(storedUsername);
      setRememberUsername(true);
    }

    if (storedPassword) {
      setPassword(storedPassword);
      setRememberPassword(true);
    }
  }, []);

  function handleRememberLoginData() {
    if (rememberUsername) {
      localStorage.setItem(
        "rememberedUsername",
        username
      );
    } else {
      localStorage.removeItem("rememberedUsername");
      setUsername("");
    }

    if (rememberPassword) {
      localStorage.setItem(
        "rememberedPassword",
        password
      );
    } else {
      localStorage.removeItem("rememberedPassword");
      setPassword("");
    }
  }

  function handleCancel() {
    handleRememberLoginData();
    navigate("/");
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setErrorMessage("");
    setLoading(true);

    try {
      await authService.login(username, password);

      handleRememberLoginData();

      navigate("/main");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : t('login.failed');

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <button
        className="back-button"
        type="button"
        onClick={handleCancel}
      >
        {`<< ${t('common.back')}`}
      </button>

      <h1 className="login-title">{t('login.title')}</h1>

      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <div className="form-field">
          <label htmlFor="login-username">
            {t('login.username')}
          </label>

          <input
            id="login-username"
            type="text"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            required
            placeholder={t('login.usernamePlaceholder')}
          />

          <label className="remember-login">
            <span>{t('login.rememberUsername')}</span>

            <input
              type="checkbox"
              checked={rememberUsername}
              onChange={(event) =>
                setRememberUsername(
                  event.target.checked
                )
              }
            />
          </label>
        </div>

        <div className="form-field">
          <label htmlFor="login-password">
            {t('login.password')}
          </label>

          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
            placeholder={t('login.passwordPlaceholder')}
          />

          <label className="remember-login">
            <span>{t('login.rememberPassword')}</span>

            <input
              type="checkbox"
              checked={rememberPassword}
              onChange={(event) =>
                setRememberPassword(
                  event.target.checked
                )
              }
            />
          </label>
        </div>

        <div className="login-actions">
          <button
            className="login-action-button"
            type="button"
            onClick={handleCancel}
          >
            {t('common.cancel')}
          </button>

          <button
            className="login-action-button"
            type="submit"
            disabled={loading}
          >
            {loading ? t('login.loading') : t('login.login')}
          </button>
        </div>
      </form>

      {errorMessage ? (
        <p className="auth-error">
          {errorMessage}
        </p>
      ) : null}

      <p>
        {t('login.noAccount')} {" "}
        <Link to="/register">
          {t('login.createOne')}
        </Link>
      </p>
    </main>
  );
}

export default LoginPage;