import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  StyleProp,
  ActivityIndicator,
} from "react-native";
import React from "react";

type Props = {
  title: string;
  onPress: () => void;
  variant?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  loading?: boolean;
};

export const Button = ({
  title,
  onPress,
  variant,
  style,
  textStyle,
  disabled = false,
  loading = false,
}: Props) => {
  const isLetters = variant === "letters";
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        isLetters ? styles.textOnly : styles.button,
        style,
        isDisabled && styles.buttonDisabled,
        pressed && !isDisabled && styles.buttonPressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text
          style={[
            isLetters ? styles.textOnlyText : styles.buttonText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      )}
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
    elevation: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    flexDirection: "row",
    gap: 8,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonDisabled: {
    backgroundColor: "#555555",
    opacity: 0.6,
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
