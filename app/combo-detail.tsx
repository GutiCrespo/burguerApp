import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "@/components/button";

export default function ComboDetail() {
  const router = useRouter();
  const {
    burguerName,
    burguerPhoto,
    drinkName,
    drinkPhoto,
    batataName,
    batataPhoto,
    totalPrice,
  } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Combo Selecionado</Text>

      <Image source={{ uri: burguerPhoto as string }} style={styles.image} />
      <Text style={styles.itemText}>{burguerName}</Text>

      <Image source={{ uri: batataPhoto as string }} style={styles.image} />
      <Text style={styles.itemText}>{batataName}</Text>

      <Image source={{ uri: drinkPhoto as string }} style={styles.image} />
      <Text style={styles.itemText}>{drinkName}</Text>

      <Text style={styles.price}>Total: R$ {totalPrice} (15% OFF)</Text>

      <Button title="Comprar" onPress={() => alert("Produto comprado!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 16,
    marginTop: 16,
  },
  backText: {
    color: "#F9881F",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  itemText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 4,
    marginBottom: 12,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F9881F",
    marginVertical: 20,
  },
  image: {
    width: 120,
    height: 100,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#F9881F",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  buttonText: {
    color: "#121212",
    fontSize: 16,
    fontWeight: "bold",
  },
});
