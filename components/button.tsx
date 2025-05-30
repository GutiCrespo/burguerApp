import { Pressable, StyleProp, StyleSheet, Text, ViewStyle } from "react-native";

type Props = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>
};

export const Button = ({ title, onPress, style }: Props) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F9881F",
    borderRadius: 10,
    paddingHorizontal: 16,  
    paddingVertical: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontFamily: "Montserrat"
  },
});
