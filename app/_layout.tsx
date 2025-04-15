import { Stack } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen
        name="about"
        options={{ title: "Sobre", headerShown: true }}
      />
      <Stack.Screen
        name="login"
        options={{ title: "Logar", headerShown: true }}
      />
      <Stack.Screen
        name="signup"
        options={{ title: "Cadastro", headerShown: true }}
      />
    </Stack>
  );
}
