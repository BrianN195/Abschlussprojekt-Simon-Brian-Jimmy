import { useEffect, useState } from "react";
import type { User } from "../types/User";
import { authService } from "../services/authService";

function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = authService.getToken();

    if (!token) return;

    fetch("http://localhost:5000/api/v1/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setUser);
  }, []);

  return user;
}
export default useUser