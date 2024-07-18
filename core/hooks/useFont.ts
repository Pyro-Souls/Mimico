import { useFonts } from "expo-font";

export const useFont = () => {
  const [loaded, error] = useFonts({
    // CarterOne Font
    CarterOne: require("../../assets/fonts/carter_one/CarterOne-Regular.ttf"),

    // Outfit Font
    OutfitRegular: require("../../assets/fonts/outfit/Outfit-Regular.ttf"),
    OutfitSemibold: require("../../assets/fonts/outfit/Outfit-SemiBold.ttf"),
    OutfitBold: require("../../assets/fonts/outfit/Outfit-Bold.ttf"),
  });

  return { loaded, error };
};
