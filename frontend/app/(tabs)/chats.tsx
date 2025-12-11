import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { COLORS } from "../../src/theme/colors";

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
  const scheme = useColorScheme();
  const theme = COLORS[scheme ?? "light"];
  const styles = themedStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chats disponibles</Text>

      <ScrollView contentContainerStyle={styles.listContent}>
        {fakeUsers.map((user) => (
          <Pressable
            key={user.id}
            style={styles.item}
            onPress={() => router.push(`/chat/${user.id}`)}
          >
            {/* Avatar placeholder */}
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>

            {/* User info */}
            <View style={styles.info}>
              <Text style={styles.name}>{user.name}</Text>

              <View style={styles.statusRow}>
                <View style={styles.statusDot} />
                <Text style={styles.status}>{user.status}</Text>
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
    backgroundColor: "#444",
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

