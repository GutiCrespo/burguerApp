import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-xl text-blue-600 border border-blue-400 p-2 rounded">
        Cardápio
      </Text>
    </View>
  );
}
