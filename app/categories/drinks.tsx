import { Drink } from "@/types/drink"; // Crie esse tipo se ainda não existir
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

export default function Drinks() {
  const [drinks, setDrinks] = useState<Drink[]>([]);

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
      <H1>Drinks</H1>
      <H2>Escolha a bebida perfeita para acompanhar o seu combo tech!</H2>

      <ScrollView>
        {drinks.map((drink) => (
          <View key={drink.id} style={styles.drinkItem}>
            <Image source={{ uri: drink.photo }} style={styles.photo} />
            <Text style={styles.name}>{drink.name}</Text>
            <Text style={styles.info}>{drink.description}</Text>
            <Text style={styles.price}>R$ {drink.price.toFixed(2)}</Text>
          </View>
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
  drinkItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
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
