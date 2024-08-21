import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { useEffect, useState } from "react";

export const useFont = () => {
  const [themeKey, setThemeKey] = useState<string>();
  const [loaded, error] = useFonts({
    // CarterOne Font
    CarterOne: require("../../assets/fonts/carter_one/CarterOne-Regular.ttf"),

    // Outfit Font
    OutfitRegular: require("../../assets/fonts/outfit/Outfit-Regular.ttf"),
    OutfitSemibold: require("../../assets/fonts/outfit/Outfit-SemiBold.ttf"),
    OutfitBold: require("../../assets/fonts/outfit/Outfit-Bold.ttf"),
  });

  useEffect(() => {
    (async () => {
      const key = await AsyncStorage.getItem("theme") || "light";
      if (key) setThemeKey(key);
    })();
  }, []);

  return { loaded, error, themeKey };
};
