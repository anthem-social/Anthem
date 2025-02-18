import { Tabs } from "expo-router";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Icon } from "@/components/Themed/Icon";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const iconSize = 26;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarStyle: {
          paddingTop: 12,
          paddingBottom: 16,
          height: 74
        }
      }}>
      <Tabs.Screen
        name="search"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Icon name={focused ? "search" : "search-outline"} family="Ionicons" size={iconSize} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Icon name={focused ? "home-sharp" : "home-outline"} family="Ionicons" size={iconSize} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Icon name={focused ? "plussquare" : "plussquareo"} family="AntDesign" size={iconSize} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Icon name={focused ? "chatbox-ellipses" : "chatbox-ellipses-outline"} family="Ionicons" size={iconSize} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ focused }) => (
            <Icon name={focused ? "person" : "person-outline"} family="Ionicons" size={iconSize} />
          ),
        }}
      />
    </Tabs>
  );
}
