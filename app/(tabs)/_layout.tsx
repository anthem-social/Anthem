import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const iconSize = 30;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          paddingTop: 10,
          paddingBottom: 16,
          height: 84
        }
      }}>
      <Tabs.Screen
        name="search"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "search" : "search-outline"} color={color} size={iconSize} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "albums" : "albums-outline"} color={color} size={iconSize} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"} color={color} size={iconSize} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "person" : "person-outline"} color={color} size={iconSize} />
          ),
        }}
      />
    </Tabs>
  );
}
