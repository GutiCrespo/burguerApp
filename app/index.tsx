import { Button } from "@/app/(components)/button";
import { Link, router } from "expo-router";
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
      <View style={{ width: "100%", alignItems: "center" }}>
        <Text style={styles.h2}>CompiLanche</Text>
      </View>
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

      <Link href={"/(auth)/signup"}>
        <Text style={styles.h3}> cadastre aqui </Text>
      </Link>
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
    textAlign: "center",
    alignSelf: "center",
  },
  h2: {
    fontSize: 16,
    fontFamily: "Montserrat",
    color: "#FFFFFF",
    marginBottom: 0,
    textAlign: "center",
  },

  h3: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: "Montserrat",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
