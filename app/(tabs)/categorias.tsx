import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import H1 from "@/components/H1";
import { Button } from "@/components/button";

export default function Categories() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <H1>Categorias</H1>

      <Button
        title="Burguers"
        onPress={() => router.push("/categories/burguers")}
      />

      <Button
        title="Bebidas"
        onPress={() => router.push("/categories/drinks")}
      />

      <Button
        title="Combos"
        onPress={() => router.push("/categories/combos")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    gap: 16,
  },
});
