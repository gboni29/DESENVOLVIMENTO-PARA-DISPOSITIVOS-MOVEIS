// mobile/src/app/_layout.tsx

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FilmesProvider } from "../context/FilmesContext";
import { AuthProvider } from "../context/AuthContext"; // <-- ADD

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>            {/* <-- ADD: envolve tudo */}
        <FilmesProvider>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="login" />
            <Stack.Screen name="cadastro" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="filme/[id]" />
          </Stack>
        </FilmesProvider>
      </AuthProvider>            {/* <-- ADD */}
    </SafeAreaProvider>
  );
}