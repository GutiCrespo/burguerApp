import React, { useState } from "react";
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

export default function ResetPassword() {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleResetarSenha = () => {
    if (!novaSenha || !confirmarSenha) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    if (novaSenha.length < 6) {
      Alert.alert("Erro", "A nova senha deve ter no mínimo 6 caracteres.");
      return;
    }

    if (novaSenha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    // Aqui você pode chamar a API para redefinir a senha
    Alert.alert("Sucesso", "Senha redefinida com sucesso!");
    router.navigate("/(auth)/login"); // Redireciona para login
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <H1>Redefinir Senha</H1>
        <H2>Digite sua nova senha para acessar sua conta.</H2>

        <View style={styles.field}>
          <Text style={styles.label}>Nova Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a nova senha"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={novaSenha}
            onChangeText={setNovaSenha}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Confirmar Nova Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme a nova senha"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
        </View>

        <Button title="Redefinir Senha" onPress={handleResetarSenha} />
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
