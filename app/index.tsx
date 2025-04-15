import { Button } from "@/components/button";
import { router } from "expo-router";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";

export default function Screen() {
  const handleLogin = () => {
    router.navigate("./login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.h1}>CompiLanche</Text>
      <Text style={styles.h2}>
        A primeira hamburgueria virtual que você faz o pedido online e come o
        burger através do computador.
      </Text>

      <Image
        source={require("../assets/images/heroBurger.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Button title="Faça seu Login" onPress={handleLogin} />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  logo: {
    marginTop: 30,
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  h1: {
    fontSize: 44,
    fontWeight: "bold",
    color: "#FFFFFF",
    fontFamily: "calistoga",
    marginBottom: 10,
  },
  h2: {
    fontSize: 20,
    fontFamily: "Montserrat",
    color: "#FFFFFF",
    marginBottom: 0,
  },
});
