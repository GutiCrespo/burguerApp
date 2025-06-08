import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import { Button } from "@/components/button";

export default function ProductDetail() {
  const { name, photo, price } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Image source={{ uri: photo as string }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>R$ {Number(price).toFixed(2)}</Text>
      <Button title="Comprar" onPress={() => alert("Compra realizada!")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color: "#FFF",
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: "#F9881F",
    marginBottom: 20,
  },
});
