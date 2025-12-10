import { useEffect, useState } from "react";
import { User } from "../types/User";
import { userService } from "../services/userService";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    userService.getSavedUser().then((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const login = async (username: string) => {
    const user = await userService.loginOrCreate(username);
    setUser(user);
  };

  return { user, loading, login };
}
