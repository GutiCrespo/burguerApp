import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import H1 from "@/components/H1";

export default function Categories() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <H1>Categorias</H1>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/categories/burguers")}
      >
        <Text style={styles.buttonText}>Burguers</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/categories/drinks")}
      >
        <Text style={styles.buttonText}>Bebidas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/categories/combos")}
      >
        <Text style={styles.buttonText}>Combos</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#F9881F",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
