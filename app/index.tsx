import { Button } from "@/components/button";
import { Link, router } from "expo-router";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import { Text, View, StyleSheet, SafeAreaView, Image } from "react-native";

export default function Screen() {
  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%", alignItems: "center" }}>
        <H1>CompiLanche</H1>
      </View>
      <H2 style={styles.h2}>
        A primeira hamburgueria virtual que você faz o pedido online e come o
        burger através do computador.
      </H2>

      <Image
        source={require("../assets/images/heroBurger.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Button title="Faça seu Login" onPress={handleLogin} />

      {/* <Link href={"/(auth)/signup"}>
        <Text style={styles.h3}> cadastre aqui </Text>
      </Link> */}

      <Button title="Cadastre aqui" variant="letters" onPress={() => router.push("/(auth)/signup")} />

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
  h3: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: "Montserrat",
    color: "#FFFFFF",
    textAlign: "center",
  },
  h2: {
    width: '80%'
  }
});
