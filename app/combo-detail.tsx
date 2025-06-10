import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Button } from "@/components/button";
import { Ionicons } from "@expo/vector-icons";

export default function ComboDetail() {
  const {
    burguerName,
    burguerPhoto,
    batataName,
    drinkName,
    drinkPhoto,
    totalPrice,
  } = useLocalSearchParams();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#F9881F" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <Image source={{ uri: burguerPhoto as string }} style={styles.image} />

      <Text style={styles.title}>
        {burguerName} + {drinkName}
      </Text>
      <Text style={styles.subtitle}>+ {batataName}</Text>

      <Text style={styles.description}>
        Um combo turbinado para manter seu sistema rodando liso!
      </Text>

      <Text style={styles.price}>R$ {Number(totalPrice).toFixed(2)}</Text>

      <Button title="Comprar Combo" onPress={() => alert("Combo comprado!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#121212",
    alignItems: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 15,
    marginBottom: 16,
  },
  backText: {
    color: "#F9881F",
    fontSize: 16,
    marginLeft: 8,
  },
  image: {
    width: 250,
    height: 180,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#ccc",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#ccc",
    marginBottom: 12,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "#F9881F",
    fontWeight: "bold",
    marginBottom: 24,
  },
});
