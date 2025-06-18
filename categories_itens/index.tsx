import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native"; // Importe Alert para mensagens
import { useRouter } from "expo-router";
import H1 from "@/components/H1";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importe AsyncStorage
import { Stack } from "expo-router"; // Importe Stack para configurar o header

export default function Categories() {
  const router = useRouter();

  // Função para lidar com o logout
  const handleLogout = async () => {
    Alert.alert(
      "Deslogar",
      "Tem certeza que deseja sair da sua conta?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("userToken"); // Remove o token de autenticação
              router.replace("/(auth)/login"); // Redireciona para a tela de login
            } catch (e) {
              console.error("Erro ao deslogar:", e);
              Alert.alert(
                "Erro",
                "Não foi possível deslogar. Tente novamente."
              );
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {/* Configuração do Header com o botão de logout */}
      <Stack.Screen
        options={{
          title: "Categorias", // Título da tela no header
          headerRight: () => (
            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}
            >
              <Text style={styles.logoutButtonText}>Sair</Text>
            </TouchableOpacity>
          ),
          headerShown: true, // Garante que o header esteja visível
          headerStyle: {
            backgroundColor: "#1f1f1f", // Cor de fundo do header
          },
          headerTintColor: "#fff", // Cor do texto do título do header
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <H1>Categorias</H1>

      <TouchableOpacity
        style={styles.categoryButton} // Renomeado de 'button' para 'categoryButton' para clareza
        onPress={() => router.push("/categories/burguers")}
      >
        <Text style={styles.buttonText}>Burguers</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.categoryButton} // Renomeado
        onPress={() => router.push("/categories/drinks")}
      >
        <Text style={styles.buttonText}>Bebidas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.categoryButton} // Renomeado
        onPress={() => router.push("/categories/combos")}
      >
        <Text style={styles.buttonText}>Combos</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60, // Adicione um padding superior para o conteúdo não ficar sob o header
  },
  title: {
    // Este estilo pode ser removido se H1 já estiver sendo usado para o título
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  categoryButton: {
    // Renomeado para evitar conflito com 'logoutButton'
    backgroundColor: "#F9881F",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  logoutButton: {
    // Estilo para o botão "Sair"
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: "transparent", // Botão de texto, sem fundo
  },
  logoutButtonText: {
    color: "#fff", // Cor do texto do botão "Sair"
    fontSize: 16,
    fontWeight: "600",
  },
});
