import { useEffect, useState } from "react";
import { messageService } from "../services/messageService";

export const useConversations = (userId: string) => {
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;

    const load = async () => {
      const convs = await messageService.getUserConversations(userId);
      setConversations(convs);
    };

    load();
  }, [userId]);

  return { conversations };
};