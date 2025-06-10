import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

type Item = {
  id: number;
  name: string;
  price: number;
  photo: string;
  information: string;
};

type Combo = {
  burguer: Item;
  batata: Item;
  drink: Item;
  totalPrice: number;
};

export default function Combos() {
  const [burguers, setBurguers] = useState<Item[]>([]);
  const [drinks, setDrinks] = useState<Item[]>([]);
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const burguersResponse = await fetch(
          "https://burguer-app-api.vercel.app/burguers"
        );
        const burguersData: Item[] = await burguersResponse.json();

        const drinksResponse = await fetch(
          "https://burguer-app-api.vercel.app/drinks"
        );
        const drinksData: Item[] = await drinksResponse.json();

        const batata = burguersData.find((item) => item.name === "Byte Fries");
        const burguersFiltered = burguersData.filter(
          (item) => item.name !== "Byte Fries"
        );

        if (!batata) {
          console.warn("Batata não encontrada!");
          setLoading(false);
          return;
        }

        const newCombos: Combo[] = [];
        for (const burguer of burguersFiltered) {
          for (const drink of drinksData) {
            newCombos.push({
              burguer,
              batata,
              drink,
              totalPrice: (burguer.price + batata.price + drink.price) * 0.85,
            });
          }
        }

        setCombos(newCombos);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#F9881F" />
        <Text style={styles.loadingText}>Carregando combos...</Text>
      </View>
    );
  }

  if (combos.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>
          Nenhum combo disponível no momento.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#F9881F" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Combos</Text>
      <Text style={styles.subtitle}>
        A combinação perfeita para seu pedido!
      </Text>

      {combos.map((combo, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.comboTitle}>
            {combo.burguer.name} + {combo.batata.name} + {combo.drink.name}
          </Text>
          <View style={styles.imagesRow}>
            <Image source={{ uri: combo.burguer.photo }} style={styles.image} />
            <Image source={{ uri: combo.batata.photo }} style={styles.image} />
            <Image source={{ uri: combo.drink.photo }} style={styles.image} />
          </View>
          <Text style={styles.price}>
            R$ {combo.totalPrice.toFixed(2)} (15% OFF)
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#bbb",
    marginBottom: 20,
  },
  backText: {
    color: "#F9881F",
    fontSize: 16,
    marginLeft: 8,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 15,
    marginBottom: 16,
  },
  burguerItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
  },
  card: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  comboTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },
  imagesRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  image: {
    width: 90,
    height: 70,
    borderRadius: 8,
  },
  price: {
    fontWeight: "bold",
    color: "#F9881F",
    fontSize: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  loadingText: {
    marginTop: 10,
    color: "#bbb",
  },
  emptyText: {
    color: "#ccc",
    fontSize: 16,
  },
});
