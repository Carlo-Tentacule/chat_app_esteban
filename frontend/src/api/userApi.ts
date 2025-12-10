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
  }
};