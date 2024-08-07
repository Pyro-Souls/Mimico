
import { Stack } from 'expo-router';

const SettingsLayout = () => {
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
      <Stack.Screen 
        name="micuenta" 
        options={{ headerTitle: 'General Settings' }} 
      />
      <Stack.Screen 
        name="personalizacion" 
        options={{ headerTitle: 'Account Settings' }} 
      />
      <Stack.Screen 
        name="conexiones" 
        options={{ headerTitle: 'Privacy Settings' }} 
      />
    </Stack>
  );
}

export default SettingsLayout;
