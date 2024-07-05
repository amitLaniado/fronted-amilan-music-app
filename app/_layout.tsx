import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import { LoginScreen } from './login';

import { user } from '@/models';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [userId, setUserId] = useState<number>(user.getUserId());

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setUserId(user.getUserId());
    }, 1000); // Check for user ID changes every second

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      {
        // user.getUserId() !== -1 ?
        userId !== -1 ?
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
          :
          <LoginScreen />
      }
    </>
  );
}
