import React, { useEffect } from "react";
import { LogBox } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { useColorScheme } from "@/components/useColorScheme";
import { useThemeColor } from "@/components/Themed";
import { FavoriteProvider } from '@/contexts/FavoriteContext';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// 強力攔截特定的警告訊息 (支援 終端機 + 瀏覽器 F12)
const ignoredWarns = [
  "props.pointerEvents is deprecated",
  "useLayoutEffect does nothing on the server",
  "TouchableWithoutFeedback is deprecated",
];

const warn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && ignoredWarns.some(msg => args[0].includes(msg))) return;
  warn(...args);
};

const error = console.error;
console.error = (...args) => {
  if (typeof args[0] === 'string' && ignoredWarns.some(msg => args[0].includes(msg))) return;
  error(...args);
};

LogBox.ignoreLogs(ignoredWarns);

export default function RootLayout() {
  if (typeof document === "undefined") {
    React.useLayoutEffect = React.useEffect;
  }
  const [loaded, error] = useFonts({
    "TheanoDidot-Regular": require("../assets/fonts/TheanoDidot-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <FavoriteProvider>
          <Stack
            screenOptions={{
              headerShadowVisible: false,
              headerTitleStyle: {
                fontFamily: "TheanoDidot-Regular",
                fontWeight: "500",
              },
              headerStyle: { backgroundColor: useThemeColor({}, "primary200") },
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="category/[categoryID]/index"
              options={{
                title: "",
              }}
            />
            <Stack.Screen
              name="recipeDetail/[recipeID]"
              options={{
                title: "",
              }}
            />
            <Stack.Screen name="modal" options={{ presentation: "modal" }} />
          </Stack>
        </FavoriteProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
