import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function VerifyEmail() {
  const { token } = useParams();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/auth/verify-email/${token}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setMessage("E-Mail erfolgreich bestätigt!");
      } catch (error) {
        console.error(error);
        setMessage("Bestätigung fehlgeschlagen.");
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  if (loading) {
    return <h2>E-Mail wird bestätigt...</h2>;
  }

  return (
    <main>
      <h1>{message}</h1>
    </main>
  );
}