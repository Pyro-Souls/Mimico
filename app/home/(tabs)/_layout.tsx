import { useEffect } from "react";
import { useFont } from "../../../core/hooks";
import { SplashScreen, Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import DefaultTheme from "../../../core/theme/defaultTheme";

export default function TabsLayout() {
  const { loaded, error } = useFont();

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) return null;

  return (
    <DefaultTheme>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "blue",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="home" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="user" color={color} />
            ),
          }}
        />
      </Tabs>
    </DefaultTheme>
  );
}
