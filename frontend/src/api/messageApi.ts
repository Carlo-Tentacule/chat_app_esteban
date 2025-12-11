// import { API_URL } from "./config";
const API_BASE = "http://127.0.0.1:3000";

export const messageApi = {
  getHistory: async (senderId: string, receiverId: string) => {
    const res = await fetch(`${API_BASE}/messages/${senderId}/${receiverId}`);
    return res.json();
  },
};
