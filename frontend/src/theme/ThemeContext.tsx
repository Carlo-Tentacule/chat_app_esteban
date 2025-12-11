import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../theme/colors";

type ThemeType = "light" | "dark";

type ThemeContextType = {
  theme: any;
  mode: ThemeType;
  toggleTheme: (mode: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: COLORS.light,
  mode: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeType>("light");

  useEffect(() => {
    const loadTheme = async () => {
      const saved = await AsyncStorage.getItem("theme");
      if (saved === "dark" || saved === "light") {
        setMode(saved);
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async (newMode: ThemeType) => {
    setMode(newMode);
    await AsyncStorage.setItem("theme", newMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: COLORS[mode],
        mode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
