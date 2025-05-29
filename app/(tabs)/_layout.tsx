import { Tabs } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#121212",
          borderTopColor: "#121212",
        },
        tabBarActiveTintColor: "#F9881F",
        tabBarInactiveTintColor: "#ccc",
        headerShown: false,
      }}
    >
      {/* 1º: Home */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" size={28} color={color} />
          ),
        }}
      />

      {/* 2º: Categorias */}
      <Tabs.Screen
        name="categories"
        options={{
          title: "Categorias",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="cutlery" size={24} color={color} />
          ),
        }}
      />

      {/* 3º: Sobre */}
      <Tabs.Screen
        name="about"
        options={{
          title: "Sobre",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="info-circle" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
