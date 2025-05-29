import { View, Text, StyleSheet } from "react-native";

export default function Bebidas() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🥤 Página de Bebidas em construção!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});
