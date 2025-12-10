const API_BASE = "http://127.0.0.1:3000";

export const userApi = {
  getUsers: async () => {
    const res = await fetch(`${API_BASE}/users`);
    return res.json();
  },

  login: async (username: string) => {
    const res = await fetch(`${API_BASE}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    return res.json();
  },

  logout: async (userId: number) => {
    const res = await fetch(`${API_BASE}/users/logout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    return res.json();
  },

  update: async (userId: number, newUsername: string) => {
    const res = await fetch(`${API_BASE}/users/update`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, newUsername }),
    });
    return res.json();
  }
};