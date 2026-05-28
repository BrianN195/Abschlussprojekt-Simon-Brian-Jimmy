const API_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") ||
  "http://localhost:5000/api/v1/auth";

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

function normalizeUser(raw: any): AuthUser | null {
  if (!raw || typeof raw !== "object") return null;

  return {
    ...raw,
    profileImage: raw.profileImage ?? raw.profilePicture ?? null,
  } as AuthUser;
}

function persistAuth(data: AuthResponse) {
  if (data.token) {
    localStorage.setItem("authToken", data.token);
  }

  if (data.user) {
    const user = normalizeUser(data.user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }
}

export const authService = {
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
        birthDate,
      }),
    });

    const data = await parseJsonSafe(response);

    if (!response.ok) {
      throw new Error(data.error || data.message || "Registration failed");
    }

    persistAuth(data);
    return data;
  },

  login: async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await parseJsonSafe(response);

    if (!response.ok) {
      throw new Error(data.error || data.message || "Login failed");
    }

    persistAuth(data);
    return data;
  },

  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  },

  getToken: () => localStorage.getItem("authToken"),

  getUser: (): AuthUser | null => {
    const raw = localStorage.getItem("user");
    if (!raw) return null;

    try {
      return normalizeUser(JSON.parse(raw));
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  },

  isAuthenticated: () => !!localStorage.getItem("authToken"),

  getAuthHeader: (): HeadersInit | undefined => {
    const token = localStorage.getItem("authToken");
    return token ? { Authorization: `Bearer ${token}` } : undefined;
  },

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
      const user = normalizeUser(data);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      return user;
    }

    return null;
  },

  updateProfile: async (payload: FormData): Promise<AuthUser> => {
    const headers = authService.getAuthHeader();

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
      const user = normalizeUser(data);
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      }
    }

    throw new Error("Invalid profile response");
  },
};