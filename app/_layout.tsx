import { Stack } from 'expo-router';
import { AppProvider } from '../context/AppContext';
import '../global.css';

export default function RootLayout() {
  return (
    <AppProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#000000' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="filter" />
        <Stack.Screen name="spectator" />
      </Stack>
    </AppProvider>
  );
}
