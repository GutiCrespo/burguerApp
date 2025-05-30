import { Button } from "@/components/button";
import { Link, router } from "expo-router";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import { Text, View, StyleSheet, SafeAreaView, Image } from "react-native";

import { useFonts } from '@expo-google-fonts/rubik-glitch/useFonts';
import { RubikGlitch_400Regular } from '@expo-google-fonts/rubik-glitch/400Regular';


export default function Screen() {

    let [fontsLoaded] = useFonts({
      RubikGlitch_400Regular
    });

  const handleLogin = () => {
    router.push("/(auth)/login");
  };
  if (!fontsLoaded) {
      return null;
    } else {
    return (
    <SafeAreaView style={styles.container}>

      <Image
        source={require("../assets/images/logo.svg")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={styles.body}>

        <View className="Header" style={styles.header}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <H1>De um <span style={styles.span}>fix</span> na sua fome</H1>
          </View>
          <H2>
            A primeira hamburgueria virtual que você faz o pedido online e come o
            burger através do computador.
          </H2>
          <Button title="Faça seu Login" onPress={handleLogin} />
        </View>

        <Image
          source={require("../assets/images/heroBurger.png")}
          style={styles.heroBurger}
          resizeMode="contain"
        />


        <Link href={"/(auth)/signup"}>
          <Text style={styles.h3}> cadastre-se aqui </Text>
        </Link>
      </View>
    </SafeAreaView>
  )};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  header: {
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    marginVertical: 24,
  },
  heroBurger: {
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
  body: {
    paddingHorizontal: 22,
    paddingVertical: 18,
  },
  span: {
    color: '#F9881F',
    fontFamily: "RubikGlitch_400Regular"
  }
});

