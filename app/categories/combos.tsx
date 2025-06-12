import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useCart } from "../../context/CartContext";

type ProductItem = {
  id: number;
  name: string;
  price: number;
  photo: string;
  information: string;
  description?: string;
};

type Combo = {
  id: string;
  name: string;
  burguer: ProductItem;
  batata: ProductItem;
  drink: ProductItem;
  totalPrice: number;
};

export default function Combos() {
  const [combos, setCombos] = useState<Combo[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchData() {
      try {
        const burguersResponse = await fetch(
          "https://burguer-app-api.vercel.app/burguers"
        );
        const burguersData: ProductItem[] = await burguersResponse.json();

        const drinksResponse = await fetch(
          "https://burguer-app-api.vercel.app/drinks"
        );
        const drinksData: ProductItem[] = await drinksResponse.json();

        // Encontra a batata "Byte Fries"
        const batata = burguersData.find((item) => item.name === "Byte Fries");
        const burguersFiltered = burguersData.filter(
          (item) => item.name !== "Byte Fries"
        );

        if (!batata) {
          console.warn("Batata 'Byte Fries' não encontrada!");
          setLoading(false);
          return;
        }

        const newCombos: Combo[] = [];
        for (const burguer of burguersFiltered) {
          for (const drink of drinksData) {
            const comboId = `combo-${burguer.id}-${batata.id}-${drink.id}`;
            const comboName = `${burguer.name} + ${batata.name} + ${drink.name}`;

            newCombos.push({
              id: comboId,
              name: comboName,
              burguer,
              batata,
              drink,
              totalPrice: (burguer.price + batata.price + drink.price) * 0.85, // 15% de desconto
            });
          }
        }

        setCombos(newCombos);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        Alert.alert(
          "Erro",
          "Não foi possível carregar os combos. Tente novamente mais tarde."
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleAddToCart = (combo: Combo) => {
    addToCart(combo);
    Alert.alert("Sucesso", `${combo.name} adicionado ao carrinho!`);
    router.push("/cart");
  };

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
      <H1>Combos</H1>
      <H2>A combinação perfeita para seu pedido!</H2>
      {combos.map((combo) => (
        <TouchableOpacity
          key={combo.id}
          style={styles.card}
          onPress={() => handleAddToCart(combo)}
        >
          <Text style={styles.comboTitle}>{combo.name}</Text>
          <View style={styles.imagesRow}>
            <Image source={{ uri: combo.burguer.photo }} style={styles.image} />
            <Image source={{ uri: combo.batata.photo }} style={styles.image} />
            <Image source={{ uri: combo.drink.photo }} style={styles.image} />
          </View>
          <Text style={styles.price}>
            R$ {combo.totalPrice.toFixed(2)} (15% OFF)
          </Text>
        </TouchableOpacity>
      ))}
      <View style={{ height: 50 }} />{" "}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#121212",
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
    marginTop: 16,
    marginBottom: 16,
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
