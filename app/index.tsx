import { useEffect, useState } from 'react';
import { router, useNavigation } from 'expo-router';
import { Button, TextInput, Text, View, ActivityIndicator, StyleSheet } from 'react-native';

export default function Login() {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   navigation.setOptions({ headerShown: false });
  // }, [navigation]);

  const handleLogin = async () => {
    // setIsLoading(true);
    // setError('');

    // // Simulate login logic - replace with actual authentication call
    // try {
    //   // Example: await authenticate(username, password);
    //   setTimeout(() => {
    //     setIsLoading(false);
    //     // On successful login
    //     if (username === 'user' && password === 'pass') {
    //       router.push("home");
    //     } else {
    //       setError('Invalid username or password');
    //     }
    //   }, 1000);
    // } catch (error) {
    //   setIsLoading(false);
    //   setError('Login failed. Please try again later.');
    // }

    if (router.canDismiss()) router.dismissAll();
        router.push('home');
  };

  return (
    <View style={styles.container}>
      <Text>This is the Login Page</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Button title="Login" onPress={handleLogin} />
          <Button title="Register" onPress={() => router.push('register')} />
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