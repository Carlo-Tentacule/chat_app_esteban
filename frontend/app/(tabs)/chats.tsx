import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { useTheme } from "@/src/theme/ThemeContext";
import { userService } from "@/src/services/userService";
import { useState, useEffect } from "react";
import { User } from "../../src/types/User";

const fakeUsers = [
  { id: "1", name: "Luna the Cat", status: "Online" },
  { id: "2", name: "Leo the Lionheart", status: "Online" },
  { id: "3", name: "Shadow", status: "Online" },
  { id: "4", name: "Ginger", status: "Online" },
  { id: "5", name: "Luna the Cat", status: "Online" },
  { id: "6", name: "Leo the Lionheart", status: "Online" },
  { id: "7", name: "Shadow", status: "Online" },
  { id: "8", name: "Ginger", status: "Online" },
  { id: "9", name: "Luna the Cat", status: "Online" },
  { id: "10", name: "Leo the Lionheart", status: "Online" },
  { id: "11", name: "Shadow", status: "Online" },
  { id: "12", name: "Ginger", status: "Online" },
];

export default function ChatsListScreen() {
  const { theme, mode, toggleTheme } = useTheme();
  const styles = themedStyles(theme);

  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<"all" | "online" | "offline">("all");

  const getUsersByStatus = async (status: boolean | null, filterType: "all" | "online" | "offline") => {
    const usersList = await userService.getUsers(status);
    if (usersList) {
      setUsers(usersList);
      setFilter(filterType);
    }
  };

  useEffect(() => {
    getUsersByStatus(null, "all");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats disponibles</Text>
      <ScrollView contentContainerStyle={styles.listContent}>
        <View style={styles.filterContainer}>
          <Pressable
            style={[styles.filterButton, filter === "all" && styles.filterActive]}
            onPress={() => getUsersByStatus(null, "all")}
          >
            <Text style={filter === "all" ? styles.filterTextActive : styles.filterText}>
              Tous
            </Text>
          </Pressable>
          <Pressable
            style={[styles.filterButton, filter === "online" && styles.filterActive]}
            onPress={() => getUsersByStatus(true, "online")}
          >
            <Text style={filter === "online" ? styles.filterTextActive : styles.filterText}>
              En ligne
            </Text>
          </Pressable>
          <Pressable
            style={[styles.filterButton, filter === "offline" && styles.filterActive]}
            onPress={() => getUsersByStatus(false, "offline")}
          >
            <Text style={filter === "offline" ? styles.filterTextActive : styles.filterText}>
              Hors ligne
            </Text>
          </Pressable>
        </View>
        {users.map((user) => (
          <Pressable
            key={user._id}
            style={styles.item}
            onPress={() => router.push(`/chat/${user._id}`)}
          >
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {user.username.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.name}>{user.username}</Text>
              <View style={styles.statusRow}>
                <View style={styles.statusDot} />
                <Text style={styles.status}>
                    {user.isOnline ? "Online" : "Offline"}
                  </Text>              
                </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const themedStyles = (theme : any) =>
  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingTop: 25,
    paddingHorizontal: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  filterButton: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: theme.card,
    alignItems: "center",
    justifyContent: "center",
    elevation: 1,
  },
  filterActive: {
    backgroundColor: theme.primary,
  },
  filterText: {
    color: theme.secondary,
    fontSize: 14,
    fontWeight: "500",
  },
  filterTextActive: {
    color: theme.buttonText,
    fontSize: 14,
    fontWeight: "700",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: theme.text,
    marginBottom: 20,
  },
  listContent: {
    paddingBottom: 40,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.input,
    padding: 14,
    borderRadius: 16,
    marginBottom: 16,
  },
  avatarPlaceholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    backgroundColor: theme.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarText: {
    color: theme.text,
    fontWeight: "700",
    fontSize: 20,
  },
  info: {
    flex: 1,
  },
  name: {
    color: theme.text,
    fontSize: 18,
    fontWeight: "600",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: theme.success,
    marginRight: 6,
  },
  status: {
    color: theme.inputText,
    fontSize: 14,
  },
});

