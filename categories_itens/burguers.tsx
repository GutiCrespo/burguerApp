import { Burguer } from "@/types/burguer";
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

export default function Menu() {
  const [burguers, setBurguers] = useState<Burguer[]>([]);
  const router = useRouter();

  const getBurguers = async () => {
    try {
      const response = await fetch(
        "https://burguer-app-api.vercel.app/burguers"
      );
      const json = await response.json();
      console.log("Resposta da API:", json);

      if (Array.isArray(json)) {
        setBurguers(json);
      } else if (json.burguers) {
        setBurguers(json.burguers);
      } else {
        console.warn("Formato inesperado:", json);
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
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#F9881F" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <H1>Burguers</H1>
      <H2>
        Agora é só rodar o script da fome e escolher seu Burguer favorito.
      </H2>

      <ScrollView>
        {burguers.map((burguer) => (
          <TouchableOpacity
            key={burguer.id}
            style={styles.burguerItem}
            onPress={() =>
              router.push({
                pathname: "/product-detail",
                params: {
                  name: burguer.name,
                  photo: burguer.photo,
                  price: String(burguer.price),
                },
              })
            }
          >
            <Image source={{ uri: burguer.photo }} style={styles.photo} />
            <Text style={styles.name}>{burguer.name}</Text>
            <Text style={styles.info}>{burguer.information}</Text>
            <Text style={styles.price}>R$ {burguer.price.toFixed(2)}</Text>
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
