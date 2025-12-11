import { useState, useEffect } from "react";
import { socket } from "../socket";
import { messageService } from "../services/messageService";

export const useChat = (userId: string, receiverId: string) => {
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        if (!userId || !receiverId) return;

        const loadHistory = async () => {
            const history = await messageService.getConversation(userId, receiverId);
            setMessages(history);
        };
        loadHistory();
    }, [userId, receiverId]);

    useEffect(() => {
        if (!userId || !receiverId) return;

        const roomId = [userId, receiverId].sort().join("_");
        socket.emit("joinRoom", roomId);

    }, [userId, receiverId]);

    useEffect(() => {
        const handler = (msg : string) => {
            setMessages(prev => [...prev, msg]);
        };

        socket.on("receiveMessage", handler);

        return () => {
            socket.off("receiveMessage", handler);
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

        socket.emit("sendMessage", { roomId, message: msg });
    };

    return { messages, sendMessage };
};
