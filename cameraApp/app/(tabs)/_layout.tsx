import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  // const colorScheme = useColorScheme();

  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: "blue" }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="details"
        options={{
          title: "Details",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "image" : "image-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="CameraTab"
        options={{
          title: "CameraTab",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "camera" : "camera-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="NewCamera"
        options={{
          title: "CameraTab",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "camera" : "camera-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Gallery"
        options={{
          title: "Gallery",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "image" : "image-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
