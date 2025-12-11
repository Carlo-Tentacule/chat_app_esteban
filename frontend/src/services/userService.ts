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

  logout: async () => {
    const saved = await AsyncStorage.getItem("user");
    if (!saved) return;

    const user = JSON.parse(saved);

    await userApi.logout(user._id);

    await AsyncStorage.removeItem("user");

    return true;
  },

  updateUsername: async (newUsername: string) => {
    const saved = await AsyncStorage.getItem("user");
    if (!saved) return null;

    const user = JSON.parse(saved);

    const updated = await userApi.update(user._id, newUsername);

    await AsyncStorage.setItem("user", JSON.stringify(updated));

    return updated;
  },

  getSavedUser: async () => {
    const data = await AsyncStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  },

  getUsers: async (status: boolean | null) => {
    let users: User[] = await userApi.getUsers();

    if (status === null) {
      return users;
    }

    const filtered = users.filter((user) => user.isOnline === status);

    return filtered;
  },

  getUserById: async (id: string) => {
    let users: User[] = await userApi.getUsers();

    const user = users.find((user) => user._id === id);

    return user;
  },
};
