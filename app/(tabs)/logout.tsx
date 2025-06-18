import { View, Text, StyleSheet } from "react-native";

export default function LogoutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Redirecionando para sair...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  text: {
    color: "#ccc",
    fontSize: 16,
  },
});
