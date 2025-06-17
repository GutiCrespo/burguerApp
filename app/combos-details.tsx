import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/button";

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

export default function ComboDetail() {
  const router = useRouter();
  const { addToCart } = useCart();
  const params = useLocalSearchParams();
  const { combo: comboString } = params;

  let combo: Combo | null = null;
  if (typeof comboString === "string") {
    try {
      combo = JSON.parse(comboString);
    } catch (e) {
      console.error("Erro ao fazer parse do combo:", e);
      router.back();
      Alert.alert("Erro", "Não foi possível carregar os detalhes do combo.");
      return null;
    }
  }

  if (!combo) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>Combo não encontrado.</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#F9881F" />
          <Text style={styles.backText}>Voltar para Combos</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart(combo!);
    Alert.alert("Sucesso", `${combo!.name} adicionado ao carrinho!`);
    router.push("/cart");
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#F9881F" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

      <H1>Detalhes do Combo</H1>
      <H2>Sua combinação perfeita está aqui!</H2>

      <View style={styles.detailCard}>
        <Text style={styles.comboTitle}>{combo.name}</Text>
        <View style={styles.imagesRow}>
          <Image source={{ uri: combo.burguer.photo }} style={styles.image} />
          <Image source={{ uri: combo.batata.photo }} style={styles.image} />
          <Image source={{ uri: combo.drink.photo }} style={styles.image} />
        </View>
        <Text style={styles.price}>
          R$ {combo.totalPrice.toFixed(2)} (15% OFF)
        </Text>
      </View>

      <Button title="Adicionar ao Carrinho" onPress={handleAddToCart} />
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    padding: 20,
    backgroundColor: "#121212",
    paddingBottom: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 16,
    marginBottom: 16,
  },
  backText: {
    color: "#F9881F",
    fontSize: 16,
    marginLeft: 8,
  },
  detailCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    alignItems: "center",
  },
  comboTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
  },
  imagesRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 15,
    justifyContent: "center",
  },
  image: {
    width: 110,
    height: 90,
    borderRadius: 8,
    resizeMode: "cover",
  },
  price: {
    fontWeight: "bold",
    color: "#F9881F",
    fontSize: 30,
    marginTop: 10,
  },
  addToCartButtonMargin: {
    marginBottom: 20,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  emptyText: {
    color: "#ccc",
    fontSize: 16,
    marginBottom: 20,
  },
});
