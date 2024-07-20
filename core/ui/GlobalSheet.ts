import { StyleSheet } from "react-native";

export const GlobalSheet = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  ViewContent: {
    flex: 1,
    gap: 10,
    width: "100%",
    marginVertical: 15,
    alignItems: "center",
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    color: "#34495e",
    fontWeight: "bold",
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
  },
  shadowText: {
    textShadowRadius: 1,
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 2 },
  },
});
