// frontend/src/services/authService.ts

const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000/api/v1/auth";

type AuthUser = {
  id: string | number;
  email: string;
  username: string;
  gender?: string | null;
  birthDate?: string | null;
  [key: string]: unknown;
};

type AuthResponse = {
  token?: string;
  user?: AuthUser;
  message?: string;
  error?: string;
  [key: string]: unknown;
};

async function parseJsonSafe(response: Response): Promise<AuthResponse> {
  try {
    return (await response.json()) as AuthResponse;
  } catch {
    return {};
  }
}

function persistAuth(data: AuthResponse) {
  if (data.token) {
    localStorage.setItem("authToken", data.token);
  }
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }
}

export const authService = {
  // Register
  register: async (
    email: string,
    password: string,
    username: string,
    gender?: string | null,
    birthDate?: string | null
  ) => {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        username,
        gender,
        birthDate
      }),
    });

    const data = await parseJsonSafe(response);

    if (!response.ok) {
      throw new Error(data.error || data.message || "Registration failed");
    }

    // Falls Backend beim Register bereits Token/User liefert, direkt speichern
    persistAuth(data);
    return data;
  },

  // Login
  login: async (email: string, password: string) => {
    
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await parseJsonSafe(response);

    if (!response.ok) {
      console.log("response nicht ok")
      throw new Error(data.error || data.message || "Login failed");
    }

    persistAuth(data);
    return data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  // Helpers
  getToken: () => localStorage.getItem("authToken"),

  getUser: (): AuthUser | null => {
    const raw = localStorage.getItem("user");
    if (!raw) return null;

    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  },

  isAuthenticated: () => !!localStorage.getItem("authToken"),

  getAuthHeader: () => {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};