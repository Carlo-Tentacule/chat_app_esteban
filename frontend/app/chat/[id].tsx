import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { io } from "socket.io-client";

export default function ChatScreen() {
  const { id } = useLocalSearchParams();

  const socket = io("http://localhost:3000", {
    path: "/ws"
  });

  socket.on("connect", () => console.log("OK connecté"));

  return <Text>Chat avec user {id}</Text>;
}
