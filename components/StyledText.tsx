import { Text, TextProps } from "./Themed";

export function DidotText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "TheanoDidot-Regular" }]}
    />
  );
}
