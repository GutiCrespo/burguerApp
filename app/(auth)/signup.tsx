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
  ActivityIndicator,
} from "react-native";
import { API_BASE_URL } from "@env";

export default function CadastroCliente() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento

  const API_REGISTER_URL = `${API_BASE_URL}/clientes`;

  const handleSubmit = async () => {
    if (!nome || !telefone || !senha || !confirmarSenha) {
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

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (senha.length < 8) {
      Alert.alert("Erro", "A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nome,
          phone: telefoneFormatado,
          senha: senha,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert(
          "Sucesso",
          "Cadastro realizado com sucesso! Agora você pode fazer login."
        );
        router.navigate("./login"); // Navega para a tela de login
      } else {
        const errorMessage =
          data.erro || "Ocorreu um erro no cadastro. Tente novamente.";
        Alert.alert("Erro no Cadastro", errorMessage);
      }
    } catch (error) {
      console.error("Erro na requisição de cadastro:", error);
      Alert.alert(
        "Erro",
        "Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde."
      );
    } finally {
      setLoading(false); // Desativa o indicador de carregamento sempre
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <H1>CompiLanche</H1>
        <H2>
          Configure seu perfil e instale o apetite. O CompLanche vai compilar
          seu lanche ideal!
        </H2>

        <View style={styles.field}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            placeholderTextColor=""
            value={nome}
            onChangeText={setNome}
            editable={!loading}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder=""
            placeholderTextColor=""
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
            placeholderTextColor=""
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            editable={!loading}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            placeholderTextColor=""
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            editable={!loading}
          />
        </View>

        <Button
          title={loading ? "Cadastrando..." : "Criar Conta"}
          onPress={handleSubmit}
          disabled={loading}
        />

        {loading && (
          <ActivityIndicator
            size="small"
            color="#F9881F"
            style={styles.loadingIndicator}
          />
        )}

        <Text style={styles.h31}>Já possui cadastro?</Text>
        <View style={{ alignItems: "center" }}>
          <Link href={"/(auth)/login"}>
            <Text style={styles.h32}>Acesse sua conta.</Text>
          </Link>
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
  h3: {
    fontSize: 13,
    // fontFamily: "Montserrat",
    color: "#FFFFFF",
    marginBottom: 20,
    marginTop: 5,
  },
  h31: {
    fontSize: 13,
    // fontFamily: "Montserrat",
    color: "#FFFFFF",
    marginBottom: 5,
    marginTop: 5,
    textAlign: "center",
  },
  h32: {
    fontSize: 13,
    // fontFamily: "Montserrat",
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
