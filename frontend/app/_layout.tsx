import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const user = await AsyncStorage.getItem("user");

      if (user) router.replace("/(tabs)");
      else router.replace("/login");
    };

    checkUser();
  }, []);

  return <Stack screenOptions={{ headerShown: false }} />;
}
