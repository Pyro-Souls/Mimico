import { View, Text, StyleSheet } from "react-native";

import { useEffect } from "react";
import { router } from "expo-router";
import { Button } from "../../../core/ui/atoms";

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text>Tab [Home]</Text>
      {/* <Button title="Logout" onPress={handleLogOut}/> */}

      <Button title="Button Test" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
