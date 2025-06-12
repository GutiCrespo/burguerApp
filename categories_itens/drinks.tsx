import { Burguer } from "@/types/burguer"; // Pode ser renomeado futuramente para um tipo mais genérico
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

export default function DrinksMenu() {
  const [drinks, setDrinks] = useState<Burguer[]>([]);
  const router = useRouter();

  const getDrinks = async () => {
    try {
      const response = await fetch("https://burguer-app-api.vercel.app/drinks");
      const json = await response.json();
      console.log("Resposta da API:", json);

      if (Array.isArray(json)) {
        setDrinks(json);
      } else if (json.drinks) {
        setDrinks(json.drinks);
      } else {
        console.warn("Formato inesperado:", json);
      }
    } catch (error) {
      console.error("Erro ao buscar drinks:", error);
    }
  };

  useEffect(() => {
    getDrinks();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#F9881F" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
      <H1>Drinks</H1>
      <H2>Escolha a bebida perfeita para acompanhar seu pedido!</H2>

      <ScrollView>
        {drinks.map((drink) => (
          <TouchableOpacity
            key={drink.id}
            style={styles.burguerItem}
            onPress={() =>
              router.push({
                pathname: "/product-detail",
                params: {
                  name: drink.name,
                  photo: drink.photo,
                  price: String(drink.price),
                },
              })
            }
          >
            <Image source={{ uri: drink.photo }} style={styles.photo} />
            <Text style={styles.name}>{drink.name}</Text>
            <Text style={styles.info}>{drink.information}</Text>
            <Text style={styles.price}>R$ {drink.price.toFixed(2)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#121212",
    justifyContent: "center",
  },
  burguerItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
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
  name: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
    marginTop: 10,
  },
  info: {
    fontSize: 14,
    color: "#cccccc",
    marginTop: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#F9881F",
    marginTop: 8,
  },
  photo: {
    width: 170,
    height: 130,
    borderRadius: 8,
    textAlign: "center",
  },
});
