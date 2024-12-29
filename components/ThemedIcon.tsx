import Icon from 'react-native-vector-icons/MaterialIcons';

import { useThemeColor } from '@/hooks/useThemeColor';

type IconProps = {
    style?: any;
    name: string;
    size: number;
    onPress?: () => void;
}

export type ThemedIconProps = IconProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedIcon({
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedIconProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Icon
      color={color}
      {...rest}
    />
  );
}
