import { Stack } from "expo-router/stack";
import { useEffect } from "react";
import { useNavigation } from "expo-router";

export default function NestedTabLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
