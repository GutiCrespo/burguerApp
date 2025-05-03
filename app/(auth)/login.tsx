import { Button } from "@/app/(components)/button";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";

export default function CadastroCliente() {
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (!telefone || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    router.navigate("/(tabs)/home");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.h1}>Bem vindo de volta!</Text>
        <Text style={styles.h2}>
          Acesse a sua conta para escolher a sua janta de hoje.
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu telefone"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite sua senha"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <Button title="Acessar conta" onPress={handleLogin} />
        <Text style={styles.h31}>Não possui conta ainda?</Text>
        <Link href={"/(auth)/signup"}>
          <Text style={styles.h32}>Faça seu cadastro </Text>
        </Link>
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
    marginBottom: 20,
  },

  h3: {
    fontSize: 10,
    fontFamily: "Montserrat",
    color: "#FFFFFF",
    marginBottom: 20,
    marginTop: 5,
  },
  h31: {
    fontSize: 13,
    fontFamily: "Montserrat",
    color: "#FFFFFF",
    marginBottom: 5,
    marginTop: 5,
    textAlign: "center",
  },
  h32: {
    fontSize: 13,
    fontFamily: "Montserrat",
    color: "#f9881f",
    marginBottom: 20,
    textDecorationLine: "underline",
    textAlign: "center",
  },
  field: {
    marginBottom: 25,
  },
  label: {
    color: "#fff",
    fontSize: 9,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#2c2c2c",
    color: "#fff",
    padding: 12,
    borderRadius: 8,
  },
});
