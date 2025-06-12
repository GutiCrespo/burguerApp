import { Stack } from "expo-router";
import { CartProvider } from "../context/CartContext";
import "../global.css";

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="index" options={{ title: "Início" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)/login"
          options={{ title: "Logar", headerShown: false }}
        />
        <Stack.Screen
          name="(auth)/signup"
          options={{ title: "Cadastro", headerShown: false }}
        />
      </Stack>
    </CartProvider>
  );
}
