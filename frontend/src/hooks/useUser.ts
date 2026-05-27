import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { authService } from "../services/authService";

function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = authService.getToken();

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
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return { user, loading };
}

export default useUser;