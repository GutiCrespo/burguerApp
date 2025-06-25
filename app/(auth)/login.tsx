import { Button } from "@/components/button";
import H1 from "@/components/H1";
import H2 from "@/components/H2";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { API_BASE_URL } from "@env";

export const options = {
  headerShown: false,
};

export default function Login() {
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const API_LOGIN_URL = `${API_BASE_URL}/clientes/login`;

  const handleLogin = async () => {
    if (!telefone || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const telefoneFormatado = telefone.replace(/\D/g, "");
    if (!/^\d{10,11}$/.test(telefoneFormatado)) {
      Alert.alert(
        "Erro",
        "Digite um telefone válido com 10 ou 11 dígitos (incluindo DDD)."
      );
      return;
    }

    if (senha.length < 8) {
      Alert.alert("Erro", "A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: telefoneFormatado,
          senha: senha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.navigate("/(tabs)/home");
      } else {
        const errorMessage =
          data.erro || "Telefone ou senha inválidos. Tente novamente.";
        Alert.alert("Erro no Login", errorMessage);
      }
    } catch (error) {
      console.error("Erro na requisição de login:", error);
      Alert.alert(
        "Erro",
        "Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#121212" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={{ flex: 1, backgroundColor: "#121212" }}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <SafeAreaView style={styles.container}>
          <View style={styles.form}>
            <H1>Bem vindo de volta!</H1>
            <H2>
              Hora de logar no universo dos lanches! Adicione seus dados e faça
              o deploy do seu pedido
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
                editable={!loading}
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
                editable={!loading}
              />

              <Button
                title="Esqueceu sua senha"
                variant="letters"
                onPress={() => router.push("/(auth)/forgotPassword")}
                textStyle={{
                  fontSize: 13,
                  fontFamily: "Montserrat",
                  color: "#f9881f",
                  marginBottom: 20,
                  textDecorationLine: "underline",
                  textAlign: "center",
                }}
              />
            </View>

            <Button
              title={loading ? "Acessando..." : "Acessar conta"}
              onPress={handleLogin}
              disabled={loading}
            />

            {loading && (
              <ActivityIndicator
                size="small"
                color="#F9881F"
                style={styles.loadingIndicator}
              />
            )}

            <Text style={styles.h31}>Não possui conta ainda?</Text>
            <View style={{ alignItems: "center" }}>
              <Link href={"/(auth)/signup"}>
                <Text style={styles.h32}>Faça seu cadastro</Text>
              </Link>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
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
  loadingIndicator: {
    marginTop: 10,
    marginBottom: 10,
  },
});
