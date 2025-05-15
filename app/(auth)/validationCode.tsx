import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import { Button } from "@/components/button";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import { router } from "expo-router";

export default function CodigoVerificacao() {
  const [codigo, setCodigo] = useState(Array(4).fill(""));

  const inputs = Array(4)
    .fill(null)
    .map(() => useRef<TextInput>(null));

  const handleChange = (text: string, index: number) => {
    const newCodigo = [...codigo];
    newCodigo[index] = text;

    setCodigo(newCodigo);

    if (text && index < 5) {
      inputs[index + 1].current?.focus();
    }

    if (newCodigo.every((char) => char !== "")) {
      const codigoCompleto = newCodigo.join("");
      // Valide o código aqui, exemplo:
      if (codigoCompleto === "123456") {
        Alert.alert("Sucesso", "Código correto!");
        router.navigate("/(auth)/resetPassword");
      } else {
        Alert.alert("Erro", "Código incorreto.");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <H1>Verificação</H1>
        <H2>Insira o código de 4 dígitos enviado para seu telefone</H2>

        <View style={styles.codeContainer}>
          {codigo.map((value, index) => (
            <TextInput
              key={index}
              ref={inputs[index]}
              style={styles.codeInput}
              keyboardType="numeric"
              maxLength={1}
              value={value}
              onChangeText={(text) => handleChange(text, index)}
              autoFocus={index === 0}
            />
          ))}
        </View>

        <Button
          title="Verificar código"
          onPress={() => {
            const codigoCompleto = codigo.join("");
            if (codigoCompleto.length < 4) {
              Alert.alert("Erro", "Digite os 4 dígitos.");
              return;
            }
            if (codigoCompleto === "1234") {
              Alert.alert("Sucesso", "Código correto!");
              router.navigate("/(auth)/resetPassword");
            } else {
              Alert.alert("Erro", "Código incorreto.");
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  form: {
    backgroundColor: "#1f1f1f",
    padding: 20,
    borderRadius: 10,
    width: "100%",
  },
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 30,
  },
  codeInput: {
    width: 45,
    height: 55,
    backgroundColor: "#2c2c2c",
    color: "#fff",
    fontSize: 22,
    textAlign: "center",
    borderRadius: 8,
  },
});
