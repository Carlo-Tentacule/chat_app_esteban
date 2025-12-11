import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ChatScreen() {
  const { id } = useLocalSearchParams();

  return <Text>Chat avec user {id}</Text>;
}
