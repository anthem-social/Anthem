import { ActivityIndicator, StyleSheet, View } from "react-native";

type Props = {
  color?: string;
  fullScreen?: boolean;
  size?: "small" | "large";
  style?: object;
}

export function Loading(props: Props) {
  const color: string = props.color ? props.color : "white";
  const size: "small" | "large" = props.size ? props.size : "small";

  return (
    <View style={[props.style, props.fullScreen && styles.fullScreen]}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
