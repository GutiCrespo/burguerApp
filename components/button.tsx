import { Pressable, StyleSheet, Text } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
};

export const Button = ({ title, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F9881F",
    borderRadius: 10,
    paddingHorizontal: 32, // Aumentado para melhor proporção
    paddingVertical: 18, // Mais confortável para toque
    minWidth: 200, // Largura mínima consistente
    minHeight: 56, // Altura mínima acessível
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000", // Sombra sutil para profundidade
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, // Para Android
    marginBottom: 12, // Espaçamento mais generoso
    borderWidth: 1, // Borda sutil para contraste
    borderColor: "rgba(255, 255, 255, 0.1)",
    flexDirection: "row", // Para possíveis ícones
    gap: 8, // Espaço entre ícone e texto
  },
  buttonText: {
    fontSize: 18, // Tamanho mais legível
    color: "#fff",
    fontWeight: "600", // Peso ideal para leitura
    textAlign: "center",
    textTransform: "uppercase", // Estilo mais clean
    letterSpacing: 0.5, // Melhor legibilidade
    includeFontPadding: false, // Alinhamento preciso
  },
});
