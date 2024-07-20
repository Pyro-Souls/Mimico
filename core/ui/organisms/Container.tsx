import { ReactNode } from "react";
import { GlobalSheet } from "../GlobalSheet";
import { ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const Container = ({children}: { children: ReactNode }) => {
  const image = require("../../../assets/mimico_background.png");

  return (
    <SafeAreaView style={GlobalSheet.container}>
      <ImageBackground style={GlobalSheet.image} source={image}>
        {children}
      </ImageBackground>
    </SafeAreaView>
  );
};
