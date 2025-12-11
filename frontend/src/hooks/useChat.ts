import { useState, useEffect } from "react";
import { socket } from "../socket";
import { messageService } from "../services/messageService";

export const useChat = (userId: string, receiverId: string) => {
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        if (!userId) return;
        const loadHistory = async () => {
            const history = await messageService.getConversation(userId, receiverId);
            setMessages(history);
        };
        loadHistory();
    }, [userId, receiverId]);

    useEffect(() => {
        socket.on("receiveMessage", (msg) => {
            setMessages(prev => [...prev, msg]);
        });

        return () => {
        socket.off("receiveMessage");
        };
    }, []);

    const sendMessage = async (content: string) => {
        const msg = {
            senderId: userId,
            receiverId,
            content,
            type: "text",
            timestamp: new Date(),
        };

        const roomId = [userId, receiverId].sort().join("_");

        socket.emit("sendMessage", {
            roomId,
            message: msg
        });

        setMessages((prev) => [...prev, msg]);
    };

    return { messages, sendMessage };
};
