import { ActivityIndicator, View } from "react-native";

type Props = {
  color?: string;
  size?: "small" | "large";
  style?: object;
}

export function Loading(props: Props) {
  const color: string = props.color ? props.color : "white";
  const size: "small" | "large" = props.size ? props.size : "small";

  return (
    <View style={props.style}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
}
