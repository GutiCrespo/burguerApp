import { View, Text, StyleSheet } from "react-native";

export default function Combos() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Página de Combos em construção!</Text>
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
