import { Burguer } from "@/types/burguer";
import { Drink } from "@/types/drink";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

export default function Menu() {
  const [burguers, setBurguers] = useState<Burguer[]>([]);
  const [drinks, setDrinks] = useState<Drink[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getBurguers = async () => {
    try {
      const response = await fetch(
        "https://burguer-app-api.vercel.app/burguers"
      );
      const json = await response.json();

      if (Array.isArray(json)) {
        setBurguers(json);
      } else if (json.burguers) {
        setBurguers(json.burguers);
      } else {
        console.warn("Formato inesperado para burgers:", json);
      }
    } catch (error) {
      console.error("Erro ao buscar burguers:", error);
    }
  };

  const getDrinks = async () => {
    try {
      const response = await fetch("https://burguer-app-api.vercel.app/drinks");
      const json = await response.json();

      if (Array.isArray(json)) {
        setDrinks(json);
      } else if (json.drinks) {
        setDrinks(json.drinks);
      } else {
        console.warn("Formato inesperado para drinks:", json);
      }
    } catch (error) {
      console.error("Erro ao buscar drinks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.all([getBurguers(), getDrinks()]);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F9881F" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <H1>CompiLanche</H1>
      <H2>
        Sistema autenticado, agora é só debugar a fome e rodar seu combo
        favorito!
      </H2>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Seção de Burgers */}
        <Text style={styles.sectionTitle}>Burgers</Text>
        {burguers.map((burguer) => (
          <TouchableOpacity
            key={`burger-${burguer.id}`}
            style={styles.item}
            onPress={() =>
              router.push({
                pathname: "/product-detail",
                params: {
                  type: "burguer",
                  item: JSON.stringify(burguer),
                },
              })
            }
          >
            <Image
              source={{ uri: burguer.photo }}
              style={styles.photo}
              onError={(e) =>
                console.log("Erro ao carregar imagem:", e.nativeEvent.error)
              }
            />
            <Text style={styles.name}>{burguer.name}</Text>
            <Text style={styles.info}>{burguer.information}</Text>
            <Text style={styles.price}>R$ {burguer.price.toFixed(2)}</Text>
          </TouchableOpacity>
        ))}

        {/* Seção de Drinks */}
        <Text style={styles.sectionTitle}>Bebidas</Text>
        {drinks.map((drink) => (
          <TouchableOpacity
            key={`drink-${drink.id}`}
            style={styles.item}
            onPress={() =>
              router.push({
                pathname: "/product-detail",
                params: {
                  type: "drink",
                  item: JSON.stringify(drink),
                },
              })
            }
          >
            <Image
              source={{ uri: drink.photo }}
              style={styles.photo}
              onError={(e) =>
                console.log("Erro ao carregar imagem:", e.nativeEvent.error)
              }
            />
            <Text style={styles.name}>{drink.name}</Text>
            <Text style={styles.info}>{drink.description}</Text>
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
    padding: 20,
    backgroundColor: "#121212",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    marginBottom: 25,
    padding: 16,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
  },
  photo: {
    width: 170,
    height: 140,
    borderRadius: 8,
    resizeMode: "cover",
    marginBottom: 12,
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
    lineHeight: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F9881F",
    marginTop: 10,
  },
});
