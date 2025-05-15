import { Button } from "@/components/button";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";

export const options = {
  headerShown: false,
};

export default function ForgotPassword() {
  const [telefone, setTelefone] = useState("");

  const handlePasswordReset = () => {
    if (!telefone) {
      Alert.alert("Erro", "Por favor, preencha o número de telefone.");
      return;
    }

    if (!/^\d{10,11}$/.test(telefone)) {
      Alert.alert("Erro", "Digite um telefone válido com DDD.");
      return;
    }

    // Aqui você pode fazer a chamada à API de recuperação de senha
    Alert.alert(
      "Sucesso",
      "Se o número estiver cadastrado, você receberá instruções para redefinir sua senha."
    );

    // Redireciona de volta ao login
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <H1>Esqueceu sua senha?</H1>
        <H2>
          Insira seu telefone abaixo que iremos te informar um código via SMS.
        </H2>

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

        <Button title="Enviar código" onPress={handlePasswordReset} />
        <Text style={styles.h31}>Lembrou da senha?</Text>
        <View style={{ alignItems: "center" }}>
          <Text
            style={styles.h32}
            onPress={() => router.replace("/(auth)/login")}
          >
            Voltar ao login
          </Text>
        </View>
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
