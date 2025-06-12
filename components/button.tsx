import { Pressable, StyleSheet, Text, ViewStyle, TextStyle, StyleProp } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  variant?: string;
  style?: StyleProp<ViewStyle>;     // container (Pressable)
  textStyle?: StyleProp<TextStyle>; // texto (Text)
};

export const Button = ({ title, onPress, variant, style, textStyle }: Props) => {
  const isLetters = variant === "letters";

  return (
    <Pressable
      onPress={onPress}
      style={[isLetters ? styles.textOnly : styles.button, style]}
    >
      <Text style={[isLetters ? styles.textOnlyText : styles.buttonText, textStyle]}>
        {title}
      </Text>
    </Pressable>
  );
};



const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F9881F",
    borderRadius: 10,
    paddingHorizontal: 32,
    paddingVertical: 18,
    minWidth: 200,
    minHeight: 56,
    justifyContent: "center",
    alignItems: "center",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.23)",
    elevation: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    flexDirection: "row",
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    includeFontPadding: false,
  },

  // Estilo "letters"
  textOnly: {
    backgroundColor: "transparent",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  textOnlyText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "Montserrat",
    textAlign: "center",
  },
});
