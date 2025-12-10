import { View, Text, Pressable, Switch, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { COLORS } from "../../src/theme/colors";
import { userService } from "@/src/services/userService";

export default function SettingsScreen() {
  const scheme = useColorScheme();
  const [appTheme, setAppTheme] = useState(scheme ?? "light");
  const theme = COLORS[appTheme];
  const styles = themedStyles(theme);

  const [username, setUsername] = useState("");

  const switchTheme = (mode : any) => {
    setAppTheme(mode);
  };

  const getUsername = async () => {
    const user = await userService.getSavedUser();
    if (user) setUsername(user.username);
  };

  useEffect(() => {
    getUsername();
  }, []);

  return (
    <View style={styles.screen}>
      
      <View style={styles.profileCard}>
        <View style={styles.profileRow}>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{username}</Text>
            <Text style={styles.profileSub}>Personal Account</Text>
          </View>
        </View>

        <Pressable style={styles.changeNameButton}>
          <Feather name="edit-3" size={18} color={theme.primary} />
          <Text style={styles.changeNameText}>Changement de pseudo</Text>
        </Pressable>
      </View>

      <View style={[styles.card, styles.marginTop]}>
        <Pressable style={styles.listItem}>
          <Text style={styles.listItemText}>Historique</Text>
          <Feather name="chevron-right" size={20} color={theme.inputText} />
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>APPEARANCE</Text>

      <View style={styles.card}>
        <View style={styles.cardRow}>
          <View style={styles.cardLabelRow}>
            <Feather name="sun" size={20} color={theme.primary} />
            <Text style={styles.cardLabelText}>Theme</Text>
          </View>
        </View>

        <View style={styles.themeSelector}>
          <Pressable
            style={[
              styles.themeOption,
              appTheme === "light" && styles.themeOptionActive
            ]}
            onPress={() => switchTheme("light")}
          >
            <Text
              style={
                appTheme === "light"
                  ? styles.themeOptionTextActive
                  : styles.themeOptionText
              }
            >
              Light
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.themeOption,
              appTheme === "dark" && styles.themeOptionActive
            ]}
            onPress={() => switchTheme("dark")}
          >
            <Text
              style={
                appTheme === "dark"
                  ? styles.themeOptionTextActive
                  : styles.themeOptionText
              }
            >
              Dark
            </Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.sectionTitle}>NOTIFICATIONS</Text>

      <View style={styles.card}>
        <View style={styles.cardRow}>
          <View style={styles.cardLabelRow}>
            <Feather name="volume-2" size={20} color={theme.primary} />
            <Text style={styles.cardLabelText}>Notifications</Text>
          </View>

          <Switch
            value={true}
            thumbColor={theme.buttonText}
            trackColor={{ true: theme.input, false: theme.input }}
          />
        </View>

        <View style={styles.cardRow}>
          <View style={styles.cardLabelRow}>
            <Feather name="smartphone" size={20} color={theme.primary} />
            <Text style={styles.cardLabelText}>Vibrations</Text>
          </View>

          <Switch
            value={false}
            trackColor={{ true: theme.input, false: theme.input }}
          />
        </View>
      </View>

      <Pressable style={styles.logoutButton}>
        <Feather name="log-out" size={20} color={theme.danger} />
        <Text style={[styles.logoutText, { marginLeft: 8 }]}>Logout</Text>
      </Pressable>

    </View>
  );
}

const themedStyles = (theme : any) =>
  StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 16,
      paddingTop: 20,
    },
    profileCard: {
      backgroundColor: theme.card,
      borderRadius: 18,
      padding: 16,
      marginVertical: 16,
    },
    profileRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    profileInfo: {
      marginLeft: 6,
    },
    profileName: {
      color: theme.text,
      fontSize: 18,
      fontWeight: "600",
    },
    profileSub: {
      color: theme.inputText,
      fontSize: 13,
    },
    changeNameButton: {
      marginTop: 12,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.input,
      borderRadius: 12,
      padding: 10,
    },
    changeNameText: {
      color: "#FF7A00",
      marginLeft: 6,
      fontWeight: "500",
    },
    sectionTitle: {
      color: theme.inputText,
      marginTop: 20,
      marginBottom: 10,
      fontSize: 14,
      fontWeight: "600",
    },
    card: {
      backgroundColor: theme.card,
      borderRadius: 18,
      padding: 16,
      marginBottom: 16,
    },
    cardRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
    },
    cardLabelRow: {
      flexDirection: "row",
      alignItems: "center",
    },
    cardLabelText: {
      color: theme.text,
      fontSize: 15,
      marginLeft: 10,
    },
    marginTop: {
      marginTop: 20,
    },
    themeSelector: {
      flexDirection: "row",
      backgroundColor: theme.input,
      borderRadius: 20,
      padding: 4,
      marginTop: 14,
    },
    themeOption: {
      flex: 1,
      paddingVertical: 10,
      borderRadius: 16,
      alignItems: "center",
    },
    themeOptionActive: {
      backgroundColor: "#FF7A00",
    },
    themeOptionText: {
      color: theme.inputText,
      fontSize: 14,
    },
    themeOptionTextActive: {
      color: "#fff",
      fontWeight: "600",
    },
    listItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottomColor: theme.input,
      paddingVertical: 14,
    },
    listItemText: {
      color: theme.text,
      fontSize: 15,
    },
    logoutButton: {
      backgroundColor: theme.card,
      borderRadius: 18,
      padding: 16,
      marginTop: 10,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    logoutText: {
      color: "#FF3B3B",
      fontSize: 16,
      fontWeight: "600",
    },
  });
