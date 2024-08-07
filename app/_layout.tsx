import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        }}>
        {/* Optionally configure static options outside the route.*/}
        <Stack.Screen name="index" options={{/*headerShown: false*/
            headerTitle: 'Login',
        }} />
        <Stack.Screen name="register" options={{/*headerShown: false*/
            headerTitle: 'Register'
        }} />
        <Stack.Screen name="home" options={{headerShown: false}} />
        
    </Stack>
  );
}

export default RootLayout;