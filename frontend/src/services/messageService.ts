import { messageApi } from "../api/messageApi";

export const messageService = {
  getConversation: async (userId: string, receiverId: string) => {
    return await messageApi.getHistory(userId, receiverId);
  },
};
