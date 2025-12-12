import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { userService } from "@/src/services/userService";
import { useConversations } from "@/src/hooks/useConversations";
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Conversation } from "@/src/types/Conversation";
import { useTheme } from "@/src/theme/ThemeContext";

export default function HistoryScreen() {
  const { theme } = useTheme();
  const styles = themedStyles(theme);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const load = async () => {
      const me = await userService.getSavedUser();
      setUserId(me._id);
    };
    load();
  }, []);

  const { conversations } = useConversations(userId);

  const renderItem = ({ item }: { item: Conversation }) => (
    <Pressable
      style={styles.item}
      onPress={() => router.push(`/chat/${item.userId}`)}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.username?.[0]?.toUpperCase()}
        </Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.timestamp).toLocaleString()}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.headerBack}>
            <Feather name="arrow-left" size={20} color={theme.text} />
          </Text>
        </Pressable>
        <Text style={styles.headerTitle}>Historique</Text>
      </View>
      <FlatList
        data={conversations}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.userId ?? index.toString()}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </View>
  );
}

const themedStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: 25,
      paddingHorizontal: 12,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
    },
    headerBack: {
      color: theme.text,
      fontSize: 28,
      marginRight: 10,
      fontWeight: "600",
    },
    headerTitle: {
      color: theme.text,
      fontSize: 22,
      fontWeight: "700",
    },
    item: {
      backgroundColor: theme.input,
      paddingVertical: 14,
      paddingHorizontal: 16,
      borderRadius: 12,
      marginVertical: 6,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    avatar: {
      width: 42,
      height: 42,
      borderRadius: 50,
      backgroundColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
    },
    avatarText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "700",
    },
    content: {
      flex: 1,
    },
    username: {
      fontSize: 17,
      fontWeight: "600",
      color: theme.text,
    },
    lastMessage: {
      marginTop: 2,
      fontSize: 14,
      color: theme.secondary,
    },
    timestamp: {
      marginTop: 2,
      fontSize: 11,
      color: theme.secondary,
    },
    statusDot: {
      width: 10,
      height: 10,
      borderRadius: 50,
      backgroundColor: theme.success,
    },
  });
