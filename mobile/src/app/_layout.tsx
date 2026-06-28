import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FilmesProvider } from "../context/FilmesContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}