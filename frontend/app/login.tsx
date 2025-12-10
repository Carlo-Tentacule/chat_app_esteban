import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../src/hooks/useAuth";
import { useColorScheme } from "react-native";
import { COLORS } from "../src/theme/colors";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const scheme = useColorScheme();
  const theme = COLORS[scheme ?? "light"];


  const generateCatWord = () => {
    const words = ["Poilus", "Moustache", "Chaton", "Minou", "Griffe", "Tigré", "lghoumi"];
    const random = words[Math.floor(Math.random() * words.length)];
    setUsername(`Chat_${random}`);
  };

  const handleLogin = async () => {
    if (!username.trim()) return;
    setLoading(true);

    await login(username);

    router.replace("/(tabs)");

    setLoading(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      
      <View style={styles.logoWrapper}>
        <Image
          source={require("../assets/images/chat-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={[styles.label, { color: theme.text }]}>Username</Text>

      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Chat_Random"
        placeholderTextColor={theme.inputText + "77"}
        style={[
          styles.input,
          { backgroundColor: theme.input, color: theme.inputText }
        ]}
      />

      <TouchableOpacity
        style={[styles.randomButton, { backgroundColor: theme.card }]}
        onPress={generateCatWord}
      >
        <Text style={[styles.centerText, { color: theme.text }]}>
          Generate random cat_word
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.loginButton, { backgroundColor: theme.button }]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={[styles.centerText, { color: theme.buttonText }]}>
          {loading ? "Loading..." : "Se connecter"}
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
  },

  label: {
    marginBottom: 8,
    fontSize: 16,
  },

  input: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },

  randomButton: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 50,
  },

  centerText: {
    textAlign: "center",
  },

  loginButton: {
    padding: 15,
    borderRadius: 12,
  },

  logoWrapper: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 40,
  },

  logo: {
    width: 100,
    height: 100,
  },
});
