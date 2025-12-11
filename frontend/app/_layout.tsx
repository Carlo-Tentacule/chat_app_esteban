import { Stack, useRouter, useRootNavigationState  } from "expo-router";
import { useEffect } from "react";
import { ThemeProvider } from "@/src/theme/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return;

    const checkUser = async () => {
      const user = await AsyncStorage.getItem("user");

      if (user) router.replace("/(tabs)/chats");
      else router.replace("/login");
    };

    checkUser();
  }, [rootNavigationState?.key]);

  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  )
}
