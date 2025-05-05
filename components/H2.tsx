import { Text, TextProps } from "react-native";

export default function H2({ style, ...props }: TextProps) {
  return (
    <Text
      style={[
        {
          fontSize: 16,
          fontFamily: "Montserrat",
          color: "#FFFFFF",
          marginBottom: 20,
          textAlign: "center",
        },
        style,
      ]}
      {...props}
    />
  );
}
