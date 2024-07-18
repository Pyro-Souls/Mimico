import { View, Text, StyleSheet } from "react-native";

import { useEffect } from "react";
import { router } from "expo-router";
import { Button } from "../../../core/ui/atoms";

import useStore from '../../../providers/store';

export default function Tab() {
    const { user } = useStore();

    return (
        <View style={styles.container}>
            <Text>Tab [Home]</Text>
            <Text>Current user logged in:{user.email}{user.username}</Text>
            
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
