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
} from "react-native";

export default function CadastroCliente() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleCadastro = () => {
    if (!nome || !telefone || !senha || !confirmarSenha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
    if (!/^\d{10,11}$/.test(telefone)) {
      Alert.alert("Erro", "Digite um telefone válido com DDD.");
      return;
    }
    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }
    if (senha.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    router.navigate("./login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <H1>CompLanche</H1>
        <H2>Crie sua conta</H2>
        <Text style={styles.h3}>
          Olá, adicione suas informações para fazermos seu primeiro pedido!
        </Text>

        <View style={styles.field}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            placeholderTextColor="#aaa"
            value={nome}
            onChangeText={setNome}
          />
        </View>

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

        <View style={styles.field}>
          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={confirmarSenha}
            onChangeText={setConfirmarSenha}
          />
        </View>

        <Button title="Criar Conta" onPress={handleCadastro} />
        <Text style={styles.h31}>Já possui cadastro?</Text>
        <View style={{ alignItems: "center" }}>
          <Link href={"/(auth)/login"}>
            <Text style={styles.h32}>Acesse sua conta. </Text>
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
    fontSize: 13,
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
