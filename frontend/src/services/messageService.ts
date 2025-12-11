import { messageApi } from "../api/messageApi";
import { userService } from "./userService";

export const messageService = {
  getConversation: async (userId: string, receiverId: string) => {
    return await messageApi.getHistory(userId, receiverId);
  },

  getUserConversations: async (userId: string) => {
    const conversations = await messageApi.getConversations(userId);

    const result = await Promise.all(
      conversations.map(async (conv: any) => {
        const user = await userService.getUserById(conv._id);
        return {
          userId: conv._id,
          username: user?.username ?? "Utilisateur inconnu",
          lastMessage: conv.lastMessage,
          timestamp: conv.timestamp,
        };
      })
    );

    return result;
  },
};
