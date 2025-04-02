import { Text, View } from "react-native";

export default function Menu() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-xl">Cardápio de Hambúrgueres</Text>
    </View>
  );
}
