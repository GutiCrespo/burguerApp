import { Burguer } from "@/types/burguer";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

export default function Menu() {
  const [burguers, setBurguers] = useState<Burguer[]>([]);

  const getBurguers = async () => {
    try {
      const response = await fetch("http://192.168.1.14:3004/burguers"); // o React Native não aceita o localhost direto tem que ser o indereço do IP
      const json = await response.json();
      if (Array.isArray(json)) {
        setBurguers(json);
      } else if (json.burguers) {
        setBurguers(json.burguers);
      } else {
        console.warn("Resposta inesperada da API:", json);
      }
    } catch (error) {
      console.error("Erro ao buscar burguers:", error);
    }
  };

  useEffect(() => {
    getBurguers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>CompiLanche</Text>
      <Text style={styles.h2}>
        Sistema autenticado, agora é só debugar a fome e rodar seu combo
        favorito!
      </Text>

      <ScrollView>
        {burguers.map((burguer) => (
          <View key={burguer.id} style={styles.burguerItem}>
            <Image source={{ uri: burguer.photo }} style={styles.photo} />
            <Text style={styles.name}>{burguer.name}</Text>
            <Text style={styles.info}>{burguer.information}</Text>
            <Text style={styles.price}>R$ {burguer.price.toFixed(2)}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212", // fundo dark
    justifyContent: "center",
  },
  h1: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "calistoga",
    marginBottom: 10,
    justifyContent: "center",
    textAlign: "center",
  },
  h2: {
    fontSize: 16,
    fontFamily: "Montserrat",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },

  burguerItem: {
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
