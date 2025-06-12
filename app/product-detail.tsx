import { Button } from "@/components/button";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";

type ProductItem = {
  id: number;
  name: string;
  price: number;
  photo: string;
  information?: string;
  description?: string;
};

export default function ProductDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const [mainItem, setMainItem] = useState<ProductItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.item && typeof params.item === "string" && params.type) {
      try {
        const item: ProductItem = JSON.parse(params.item);
        setMainItem(item);
      } catch (error) {
        console.error("Erro ao fazer parse do item:", error);
        Alert.alert(
          "Erro",
          "Não foi possível carregar os detalhes do produto."
        );
      }
    } else {
      console.warn("Parâmetros de item e/ou tipo ausentes ou inválidos.");
      Alert.alert(
        "Erro",
        "Produto não encontrado. Volte e selecione um produto."
      );
      router.back();
    }
    setLoading(false);
  }, [params]);

  const handleAddToCart = () => {
    if (!mainItem) {
      Alert.alert("Erro", "Item principal não selecionado.");
      return;
    }

    let newCombo;
    let comboName = "";
    let comboId = "";
    let totalPrice = mainItem.price;

    if (params.type === "burguer") {
      comboId = `single-burguer-${mainItem.id}`;
      comboName = mainItem.name;

      newCombo = {
        id: comboId,
        name: comboName,
        burguer: mainItem, // Apenas o hambúrguer está presente
        totalPrice: totalPrice,
      };
    } else if (params.type === "drink") {
      comboId = `single-drink-${mainItem.id}`;
      comboName = mainItem.name;

      newCombo = {
        id: comboId,
        name: comboName,
        drink: mainItem,
        totalPrice: totalPrice,
      };
    } else {
      Alert.alert(
        "Erro",
        "Tipo de item desconhecido para adicionar ao carrinho."
      );
      return;
    }

    addToCart(newCombo);
    Alert.alert("Sucesso", `${comboName} adicionado ao carrinho!`);
    router.push("/cart");
  };

  if (loading || !mainItem) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#F9881F" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#F9881F" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Image
          source={{ uri: mainItem.photo }}
          style={styles.mainPhoto}
          onError={(e) =>
            console.log(
              "Erro ao carregar imagem principal:",
              e.nativeEvent.error
            )
          }
        />
        <Text style={styles.mainName}>{mainItem.name}</Text>
        <Text style={styles.mainPrice}>R$ {mainItem.price.toFixed(2)}</Text>
        <Text style={styles.mainInfo}>
          {mainItem.information || mainItem.description || "Sem descrição."}
        </Text>
      </View>
      <Button title="Adicionar ao Carrinho" onPress={handleAddToCart} />
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
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
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  mainPhoto: {
    width: 340,
    height: 280,
    borderRadius: 10,
    resizeMode: "cover",
  },
  mainName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 15,
    textAlign: "center",
  },
  mainPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#F9881F",
    marginTop: 10,
  },
  mainInfo: {
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },
  selectionSection: {
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 15,
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  selectedOption: {
    backgroundColor: "#2a2a2a",
    borderRadius: 8,
  },
  optionPhoto: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 15,
    resizeMode: "cover",
  },
  optionTextContainer: {
    flex: 1,
  },
  optionName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  optionPrice: {
    fontSize: 16,
    color: "#F9881F",
    marginTop: 4,
  },
  addToCartButton: {
    backgroundColor: "#F9881F",
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  addToCartButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
