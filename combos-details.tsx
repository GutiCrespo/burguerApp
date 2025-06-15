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
import { useCart } from "./context/CartContext";

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
    addToCart(combo!); // '!' para afirmar que combo não é nulo aqui
    Alert.alert("Sucesso", `${combo!.name} adicionado ao carrinho!`);
    router.push("/cart");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#F9881F" />
        <Text style={styles.backText}>Voltar para Combos</Text>
      </TouchableOpacity>

      <H1>{combo.name}</H1>
      <H2>Aproveite esta combinação perfeita!</H2>

      {/* Imagem Principal (Hambúrguer) */}
      <View style={styles.mainImageContainer}>
        <Image source={{ uri: combo.burguer.photo }} style={styles.mainImage} />
      </View>

      {/* Nome e Informação Principal (Hambúrguer) */}
      <View style={styles.textBlock}>
        <Text style={styles.productName}>{combo.burguer.name}</Text>
        <Text style={styles.productInfo}>{combo.burguer.information}</Text>
      </View>

      {/* Seção de Acompanhamentos */}
      <View style={styles.subItemContainer}>
        <Text style={styles.subItemTitle}>Acompanhamentos do Combo:</Text>

        {/* Batata */}
        <View style={styles.subItem}>
          <Image
            source={{ uri: combo.batata.photo }}
            style={styles.subItemImage}
          />
          <View style={styles.subItemTextContent}>
            <Text style={styles.subItemName}>{combo.batata.name}</Text>
            <Text style={styles.subItemInfo}>{combo.batata.information}</Text>
          </View>
        </View>

        {/* Bebida */}
        <View style={styles.subItem}>
          <Image
            source={{ uri: combo.drink.photo }}
            style={styles.subItemImage}
          />
          <View style={styles.subItemTextContent}>
            <Text style={styles.subItemName}>{combo.drink.name}</Text>
            <Text style={styles.subItemInfo}>{combo.drink.information}</Text>
          </View>
        </View>
      </View>

      {/* Preço e Botão Adicionar ao Carrinho */}
      <View style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.labelPrice}>Preço do Combo:</Text>
          <Text style={styles.totalPrice}>
            R$ {combo.totalPrice.toFixed(2)}
          </Text>
          <Text style={styles.discountText}>(15% de desconto)</Text>
        </View>

        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Ionicons name="cart-outline" size={24} color="#FFFFFF" />
          <Text style={styles.addToCartButtonText}>Adicionar ao Carrinho</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 50 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#121212",
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
  mainImageContainer: {
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#1e1e1e", // Cor de fundo para a seção da imagem principal
    borderRadius: 10,
    padding: 15,
  },
  mainImage: {
    width: "100%", // Ajusta a largura para preencher o container
    height: 200,
    borderRadius: 10,
    resizeMode: "cover", // Garante que a imagem preencha a área
  },
  textBlock: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    alignItems: "center", // Centraliza o texto
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    textAlign: "center",
  },
  productInfo: {
    fontSize: 16,
    color: "#ccc",
    textAlign: "center",
  },
  subItemContainer: {
    marginTop: 10, // Menos margem para se aproximar mais do conteúdo acima
    padding: 15,
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    marginBottom: 20,
  },
  subItemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
  },
  subItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#2a2a2a", // Um fundo ligeiramente diferente para cada item do combo
    borderRadius: 8,
    padding: 10,
  },
  subItemImage: {
    width: 80, // Aumenta um pouco o tamanho das imagens dos sub-itens
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: "cover",
  },
  subItemTextContent: {
    flex: 1, // Permite que o texto ocupe o espaço restante
  },
  subItemName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },
  subItemInfo: {
    fontSize: 14,
    color: "#ccc",
    marginTop: 4,
  },
  bottomContainer: {
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-end", // Alinha os itens na parte inferior
    marginBottom: 20,
  },
  labelPrice: {
    fontSize: 18,
    color: "#ccc",
    marginRight: 10,
  },
  totalPrice: {
    fontSize: 32, // Tamanho maior para o preço
    fontWeight: "bold",
    color: "#F9881F",
  },
  discountText: {
    fontSize: 14,
    color: "#8ac926", // Verde para o desconto
    marginLeft: 10,
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "#F9881F",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    flexDirection: "row", // Para alinhar ícone e texto
    alignItems: "center",
    justifyContent: "center",
    width: "100%", // Ocupa a largura total do container
  },
  addToCartButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10, // Espaçamento entre o ícone e o texto
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
