import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { Feather } from '@expo/vector-icons';
import { useColorScheme } from "react-native";
import { COLORS } from "../../src/theme/colors";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = COLORS[colorScheme ?? "light"];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.text,
        tabBarInactiveTintColor: theme.inputText,
        tabBarShowLabel: false,      
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: theme.card,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
      }}>
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chat',
          tabBarIcon: ({ focused, size  }) => (
            <Feather name="message-circle" size={size} color={focused ? theme.text : theme.inputText} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Paramètre',
          tabBarIcon: ({ focused, size }) => (
            <Feather name="settings" size={size} color={focused ? theme.text : theme.inputText} />
          ),
        }}
      />
    </Tabs>
  );
}
