import { Text } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import { socket } from "../../src/socket";
import { userService } from "@/src/services/userService";

export default function ChatScreen() {
  const { id: friendUserId } = useLocalSearchParams();
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await userService.getSavedUser();
      if (user) setCurrentUserId(user._id);
    };
    fetchUser();
  }, []);

  useEffect(() => {

    if (!currentUserId) return;

    const roomId = [currentUserId, friendUserId].join("_");
    console.log("Room ID :", roomId);

    socket.emit("userConnected", currentUserId);

    socket.emit("joinRoom", roomId);

    socket.on("receiveMessage", (msg) => {
      console.log("Message reçu :", msg);
    });

    return () => {
      socket.off("receiveMessage");
    };

  }, [currentUserId]);


  return <Text>Chat avec user {friendUserId}</Text>;
}
