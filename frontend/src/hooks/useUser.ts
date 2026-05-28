import { useEffect, useState } from "react";
import { authService, type AuthUser } from "../services/authService";

function useUser() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setLoading(false);
      return;
    }

    fetch("http://localhost:5000/api/v1/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.id) {
          const normalizedUser: AuthUser = {
            ...data,
            profileImage: data.profileImage ?? null,
          };

          localStorage.setItem("user", JSON.stringify(normalizedUser));
          setUser(normalizedUser);
        } else {
          setUser(null);
        }

        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return { user, loading };
}

export default useUser;