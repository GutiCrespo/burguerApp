import { Burguer } from "@/types/burguer";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Menu() {
  const [burguers, setBurguers] = useState<Burguer[]>([]);

  const getBurguers = async () => {
    const response = await fetch("http://localhost:3004/burguers");
    const json = await response.json();
    if (json.burguers) {
      setBurguers(json.burguers);
    }
  };

  useEffect(() => {
    getBurguers();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Cardápio de Hambúrgueres</Text>
      <Text> {burguers.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  h1: {
    fontSize: 30,
    margin: 20,
    textAlign: "center",
  },
});
