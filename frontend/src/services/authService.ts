// frontend/src/services/authService.ts

const API_URL = "/api/v1/auth";

export type AuthUser = {
  id: string | number;
  email: string;
  username: string;
  profileImage?: string | null;
  bio?: string | null;
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
  login: async (username: string, password: string) => {
    
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
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

  getAuthHeader: (): HeadersInit | undefined => {
    let token = localStorage.getItem("authToken");
    if (!token) return undefined;
    // strip accidental surrounding quotes
    if (token.startsWith('"') && token.endsWith('"')) {
      token = token.slice(1, -1);
    }
    return { Authorization: `Bearer ${token}` };
  },
  // Fetch profile from backend (/me)
  fetchProfile: async (): Promise<AuthUser | null> => {
    const authHeader = authService.getAuthHeader();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(authHeader ? (authHeader as Record<string, string>) : {}),
    };

    const response = await fetch(`${API_URL}/me`, {
      method: "GET",
      headers,
    });

    const data = await parseJsonSafe(response);

    if (!response.ok) {
      throw new Error(data.error || data.message || "Failed to fetch profile");
    }

    if (data && (data as any).id) {
      // persist minimal user
      localStorage.setItem("user", JSON.stringify(data));
      return data as AuthUser;
    }

    return null;
  },
  updateProfile: async (payload: FormData): Promise<AuthUser> => {
    const headers = authService.getAuthHeader();
    if (!headers) {
      throw new Error("Not authenticated: missing token");
    }

    // Do not set Content-Type; browser will set multipart boundary for FormData
    const response = await fetch(`${API_URL}/me`, {
      method: "PUT",
      headers,
      body: payload,
    });

    const data = await parseJsonSafe(response);

    if (!response.ok) {
      throw new Error(data.error || data.message || "Failed to update profile");
    }

    if (data && (data as any).id) {
      localStorage.setItem("user", JSON.stringify(data));
      return data as AuthUser;
    }

    throw new Error("Invalid profile response");
  },
};