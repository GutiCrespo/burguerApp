import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sobre o CompLanche</Text>

      <Text style={styles.text}>
        O <Text style={styles.highlight}>CompLanche</Text> é um aplicativo
        desenvolvido com o objetivo de unir tecnologia e sabor, permitindo que
        os usuários explorem e escolham hambúrgueres de forma simples e
        interativa.
      </Text>

      <Text style={styles.text}>
        Este projeto foi idealizado por{" "}
        <Text style={styles.highlight}>Leontino Madruga</Text> e{" "}
        <Text style={styles.highlight}>Gustavo Crespo</Text>, como parte de uma
        atividade acadêmica do curso de Análise e Desenvolvimento de Sistemas da{" "}
        <Text style={styles.highlight}>Faculdade UniSenac</Text>.
      </Text>

      <Text style={styles.text}>
        Inspirado por interfaces modernas e com foco na experiência do usuário,
        o CompLanche foi desenvolvido com React Native e segue boas práticas de
        design e usabilidade.
      </Text>

      <Text style={styles.footer}>© 2025 CompLanche • UniSenac</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#F9881F",
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#e0e0e0",
    marginBottom: 16,
    lineHeight: 24,
  },
  highlight: {
    color: "#F9881F",
    fontWeight: "600",
  },
  footer: {
    marginTop: 40,
    textAlign: "center",
    color: "#888",
    fontSize: 14,
  },
});
