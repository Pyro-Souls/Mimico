import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const GlobalSheet = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    fontSize: 24,
    color: "#000",
  },
  header: {
    height: 120,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ViewContent: {
    flex: 1,
    gap: 10,
    width: "100%",
    marginVertical: 10,
    alignItems: "center",
    paddingHorizontal: 10,
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
  card: {
    width: width * 0.9,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  addCard: {
    width: width * 0.9,
    height: 120,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#7a1820",
    borderStyle: "dashed",
  },
  list: {
    alignItems: "center",
  },
});
