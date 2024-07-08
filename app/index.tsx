import { useEffect, useState } from 'react';
import { router, useNavigation } from 'expo-router';
import { Button, TextInput, Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { onAuthStateChanged } from "firebase/auth";

import {logIn, logInWithGoogle} from '../services/Auth.service';
import { auth } from '../services/firebase';

export default function Login() {
  //const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // onAuthStateChanged(auth, async user => {
    //   if (user) {
    //     console.log('user', user, ' userId:', user.uid, "User logged");
    //     //Add logic to us userContext maybe
    //     router.push("pages/Home")
    //   } else {
    //     console.log("No user logged");
    //   }
    // })
    // navigation.setOptions({ headerShown: false });
  }, [/*navigation*/]);

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const login = await logIn(email, password)
      if (login) {
        setLoading(false);
        if (router.canDismiss()) router.dismissAll();
        router.push('home');
        } else {
          setError('Invalid email or password');
          setLoading(false);
        }
    } catch (error) {
      setLoading(false);
      setError('Login failed. Please try again later.');
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const googlelogin = logInWithGoogle();
      if (googlelogin != undefined) {
        setLoading(false);
        console.log("User logged in with Google", googlelogin);
        //This clears navigation history and pushes to the home screen so you can't go back to the register/login screen
        if (router.canDismiss()) router.dismissAll();
        router.push('home');
      }
      else {
        setLoading(false);
        console.log("Google login failed");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>This is the Login Page</Text>
      <TextInput
        style={styles.input}
        placeholder="email" //Should be email and username
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
          <Button title="Register" onPress={() => router.push('register')} />
            <Button title="Log in with Google" onPress={handleGoogleLogin} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});