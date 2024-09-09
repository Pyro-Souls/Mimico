import { useEffect, useState } from "react";
import { router, useNavigation } from "expo-router";
import {
  Button,
  TextInput,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from "react-native";
import { onAuthStateChanged } from "firebase/auth";

import {
  logIn,
  logInWithGoogle,
  resetPassword,
} from "../services/Auth.service";
import { auth } from "../services/firebase";
import useStore from "../providers/store";
import { getUserById } from "../services/User.service";

// Existing Login component
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { setUser } = useStore();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("User logged in (AuthState):", user.uid);
        const u = await getUserById(user.uid);
        setUser(u);
        router.push("home");
      } else {
        console.log("No user logged in");
      }
    });
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const login = await logIn(email, password);
      if (login) {
        setLoading(false);
        if (router.canDismiss()) router.dismissAll();
        router.push("home");
      } else {
        setError("Invalid email or password");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError("Login failed. Please try again later.");
    }
  };

  const handleResetPassword = async () => {
    const result = await resetPassword(email);
    if (result.success) {
      Alert.alert("Success", result.message);
    } else {
      Alert.alert("Error", result.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>This is the Login Page</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Button title="Login" onPress={handleLogin} />
          <Button title="Register" onPress={() => router.push("register")} />
          <Button title="Forgot Password?" onPress={handleResetPassword} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});
