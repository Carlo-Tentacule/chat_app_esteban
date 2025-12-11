// import { API_URL } from "./config";
const API_BASE = "http://192.168.56.1:3000";

export const messageApi = {
  getHistory: async (senderId: string, receiverId: string) => {
    const res = await fetch(`${API_BASE}/messages/${senderId}/${receiverId}`);
    return res.json();
  },

  getConversations: async (userId: string) => {
    const res = await fetch(`${API_BASE}/messages/conversations/${userId}`);
    return res.json();
  },
};
