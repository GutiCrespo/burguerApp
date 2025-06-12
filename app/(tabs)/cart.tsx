import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import { Button } from "@/components/button";
import { useCart } from "../../context/CartContext"; // Importa o hook useCart
import { useRouter } from "expo-router";

type ProductItem = {
  id: number;
  name: string;
  price: number;
  photo: string;
  information?: string;
  description?: string;
};

type Combo = {
  id: string;
  name: string;
  burguer?: ProductItem;
  batata?: ProductItem;
  drink?: ProductItem;
  totalPrice: number;
};

type CartItem = Combo & {
  quantity: number;
};

export default function CartScreen() {
  // Desestrutura os valores e funções do CartContext
  const { cartItems, removeFromCart, increaseQuantity, decreaseQuantity } =
    useCart();
  const router = useRouter();

  // Calcula o total geral do carrinho
  const calculateTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.totalPrice * item.quantity,
      0
    );
  };

  // Função para renderizar cada item do carrinho
  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Image
        source={{
          uri:
            item.burguer?.photo ||
            item.drink?.photo ||
            "https://placehold.co/100x80/CCCCCC/000000?text=Item",
        }}
        style={styles.itemImage}
        onError={(e) =>
          console.log(
            "Erro ao carregar imagem do carrinho:",
            e.nativeEvent.error
          )
        }
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>
          R$ {(item.totalPrice * item.quantity).toFixed(2)}
        </Text>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            onPress={() => decreaseQuantity(item.id)}
            style={styles.quantityButton}
          >
            <Ionicons name="remove-circle-outline" size={24} color="#F9881F" />
          </TouchableOpacity>
          <Text style={styles.itemQuantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => increaseQuantity(item.id)}
            style={styles.quantityButton}
          >
            <Ionicons name="add-circle-outline" size={24} color="#F9881F" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                "Remover Item",
                `Tem certeza que deseja remover "${item.name}" do carrinho?`,
                [
                  { text: "Cancelar", style: "cancel" },
                  {
                    text: "Remover",
                    onPress: () => removeFromCart(item.id),
                    style: "destructive",
                  },
                ]
              );
            }}
            style={styles.removeButton}
          >
            <Ionicons name="trash-outline" size={24} color="#FF6347" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <H1>Seu Carrinho</H1>
      <H2>Revise seus itens e finalize seu pedido!</H2>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Ionicons name="cart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyCartText}>Seu carrinho está vazio!</Text>
          <Button
            title="Comece a Comprar"
            onPress={() => router.push("/(tabs)/home")}
          />
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />

          <View style={styles.summaryContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalValue}>
              R$ {calculateTotal().toFixed(2)}
            </Text>
          </View>

          <Button
            title="Finalizar Pedido"
            onPress={() =>
              Alert.alert(
                "Finalizar Pedido",
                "Funcionalidade de checkout ainda não implementada!"
              )
            }
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#121212",
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyCartText: {
    color: "#ccc",
    fontSize: 18,
    marginTop: 10,
  },
  shopNowButton: {
    backgroundColor: "#F9881F",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 20,
  },
  shopNowButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
    resizeMode: "cover",
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    color: "#F9881F",
    fontWeight: "bold",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 10,
  },
  quantityButton: {
    padding: 5,
  },
  itemQuantity: {
    fontSize: 18,
    color: "#FFFFFF",
    minWidth: 25,
    textAlign: "center",
  },
  removeButton: {
    marginLeft: "auto",
    padding: 5,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1e1e1e",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  totalValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#F9881F",
  },
  checkoutButton: {
    backgroundColor: "#F9881F",
    paddingVertical: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  checkoutButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
