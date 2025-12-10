import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/User";
import { userApi } from "../api/userApi";

export const userService = {
  loginOrCreate: async (username: string) => {
    let users : User[] = await userApi.getUsers();

    let user = users.find((user) => user.username === username) || null;

    if (!user) {
      user = await userApi.login(username);
    }

    await AsyncStorage.setItem("user", JSON.stringify(user));

    return user;
  },

  getSavedUser: async () => {
    const data = await AsyncStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  },
};
