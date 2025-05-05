import { Text, TextProps } from "react-native";

export default function H1({ style, ...props }: TextProps) {
  return (
    <Text
      style={[
        {
          fontSize: 44,
          fontWeight: "bold",
          color: "#FFFFFF",
          fontFamily: "calistoga",
          marginBottom: 10,
          textAlign: "center",
        },
        style,
      ]}
      {...props}
    />
  );
}
