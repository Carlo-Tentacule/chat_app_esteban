import { View, Text, StyleSheet, Image, FlatList, TextInput, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { userService } from "@/src/services/userService";
import { useTheme } from "@/src/theme/ThemeContext";
import { useChat } from "@/src/hooks/useChat";
import { Message } from "@/src/types/Message";

export default function ChatScreen() {

  const { theme, mode, toggleTheme } = useTheme();
  const styles = themedStyles(theme);

  const { id: friendUserId } = useLocalSearchParams();
  const [currentUserId, setCurrentUserId] = useState("");
  const [friendUserName, setFriendUserName] = useState("");

  const { messages, sendMessage } = useChat(currentUserId, String(friendUserId));
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await userService.getSavedUser();
      if (user) setCurrentUserId(user._id);
    };
    const fetchUserById = async () => {
      const user = await userService.getUserById(String(friendUserId));
      if (user) setFriendUserName(user.username);
    };
    fetchUser();
    fetchUserById();
  }, []);

  const renderMessage = ({ item }: { item: Message }) => {
    const isMe = item.senderId === currentUserId;

    return (
      <View style={[styles.messageContainer, { alignSelf: isMe ? "flex-end" : "flex-start" }]}>
        <View
          style={[
            styles.bubble,
            {
              backgroundColor: isMe ? theme.primary : theme.card,
              borderTopRightRadius: isMe ? 0 : 16,
              borderTopLeftRadius: isMe ? 16 : 0,
            },
          ]}
        >
          <Text style={[styles.messageText, { color: isMe ? "#fff" : theme.text }]}>
            {item.content}
          </Text>
        </View>

        <Text style={[styles.timeText, { color: theme.secondary }]}>
          {new Date(item.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color={theme.text} />
        </Pressable>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {friendUserName.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={[styles.headerText, { color: theme.text }]}>{friendUserName}</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => item._id ?? index.toString()}
        style={styles.list}
        contentContainerStyle={{ padding: 15 }}
      />
      <View style={[styles.inputBar, { backgroundColor: theme.card }]}>
        <View style={styles.leftActions}>
          <Pressable style={styles.iconButton}>
            <Feather name="camera" size={20} color={theme.primary} />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Feather name="mic" size={20} color={theme.primary} />
          </Pressable>
          <Pressable style={styles.iconButton}>
            <Feather name="map-pin" size={20} color={theme.primary} />
          </Pressable>
        </View>
        <TextInput
          placeholder="Meow a message…"
          placeholderTextColor={theme.secondary}
          value={input}
          onChangeText={setInput}
          style={[
            styles.input,
            { backgroundColor: theme.input, color: theme.inputText }
          ]}
          onSubmitEditing={() => {
            sendMessage(input);
            setInput("");
          }}
        />
        <Pressable 
          style={[styles.sendButton, { backgroundColor: theme.primary }]}
          onPress={() => {
            sendMessage(input);
            setInput("");
          }}
        >
          <Ionicons name="paw-outline" size={20} color={theme.buttonText} />
        </Pressable>
      </View>

    </View>
  );
}

const themedStyles = (theme : any) =>
  StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingTop: 25,
    borderBottomWidth: 1,
    borderColor: "#00000020",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 10,
  },
  avatarPlaceholder: {
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: theme.primary,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 14,
  },
  avatarText: {
    color: theme.text,
    fontWeight: "700",
    fontSize: 20,
  },
  list: {
    flex: 1,
  },
  messageContainer: {
    marginBottom: 15,
    maxWidth: "80%",
  },
  bubble: {
    padding: 12,
    borderRadius: 16,
  },
  messageText: {
    fontSize: 15,
  },
  timeText: {
    marginTop: 5,
    fontSize: 11,
    textAlign: "right",
  },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderColor: "#00000020",
  },
  input: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
    fontSize: 15,
    marginRight: 10,
  },
  sendButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  leftActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginRight: 10,
  },
  iconButton: {
    padding: 6,
    borderRadius: 20,
  },
});
