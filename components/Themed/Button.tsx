import { Button as ReactNativeButton, type ButtonProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

type Props = ButtonProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function Button({ lightColor, darkColor, type = "default", ...rest }: Props) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <ReactNativeButton
      color={color}
      {...rest}
    />
  );
}
