import { View, Text, StyleSheet, Image, FlatList, TextInput, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { socket } from "../../src/socket";
import { userService } from "@/src/services/userService";
import { useTheme } from "@/src/theme/ThemeContext";

export default function ChatScreen() {

  const { theme, mode, toggleTheme } = useTheme();
  const styles = themedStyles(theme);

  const { id: friendUserId } = useLocalSearchParams();
  const [currentUserId, setCurrentUserId] = useState("");

  const messages = [
    {
      id: "1",
      text: "Message 1",
      sender: "me",
      time: "10:30 AM",
    },
    {
      id: "2",
      text: "Message 2",
      sender: "other",
      time: "10:31 AM",
    },
  ];

  const renderMessage = ({ item }) => {
    const isMe = item.sender === "me";

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
            {item.text}
          </Text>
        </View>

        <Text style={[styles.timeText, { color: theme.secondary }]}>
          {item.time}
        </Text>
      </View>
    );
  };

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


  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <Pressable onPress={() => router.back()}>
          <Feather name="arrow-left" size={20} color={theme.text} />
        </Pressable>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {/* {user.username.charAt(0).toUpperCase()} */}
            F
          </Text>
        </View>
        <Text style={[styles.headerText, { color: theme.text }]}>Friend</Text>
      </View>
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
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
          style={[
            styles.input,
            { backgroundColor: theme.input, color: theme.inputText }
          ]}
        />
        <Pressable style={[styles.sendButton, { backgroundColor: theme.primary }]}>
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
