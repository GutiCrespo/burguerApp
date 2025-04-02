import { Text, View } from "react-native";

export default function Navbar() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-xl color-blue-600">Agora vai</Text>
    </View>
  );
}
