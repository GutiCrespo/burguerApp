import { router } from "expo-router";
import { Text, View, Pressable } from "react-native";

export default function Screen() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-xl text-blue-600">Pagina Home</Text>

      <Pressable
        onPress={() => router.navigate("/(auth)/login")}
        className="px-4 py-2 bg-red-500 rounded"
      >
        <Text className="text-white text-center "> Login</Text>
      </Pressable>

      <Pressable
        onPress={() => router.navigate("/(auth)/signup")}
        className="px-4 py-2 bg-green-500 rounded m-3"
      >
        <Text className="text-white text-center "> Signup</Text>
      </Pressable>
      <Pressable
        onPress={() => router.navigate("/about")}
        className="px-4 py-2 bg-yellow-500 rounded"
      >
        <Text className="text-white text-center "> About</Text>
      </Pressable>
    </View>
  );
}
