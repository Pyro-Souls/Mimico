import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { useFont } from "../core/hooks";
import DefaultTheme from "../core/theme/defaultTheme";

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const { loaded, error, themeKey } = useFont();

  useEffect(() => {
    if (loaded || error || themeKey) SplashScreen.hideAsync();
  }, [loaded, error]);

  if ((!loaded && !error) || !themeKey) return null;

  return (
    <DefaultTheme>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            headerTitle: "Welcome",
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
            headerTitle: "Login",
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
            headerTitle: "Register",
          }}
        />
        <Stack.Screen name="home" options={{ headerShown: false }} />
      </Stack>
    </DefaultTheme>
  );
};

export default RootLayout;
