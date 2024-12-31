import ReactNativeIcon from 'react-native-vector-icons/MaterialIcons';

import { useThemeColor } from '@/hooks/useThemeColor';

type Props = {
  style?: any;
  name: string;
  size: number;
  onPress?: () => void;
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function Icon({ lightColor, darkColor, type = 'default', ...rest }: Props) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <ReactNativeIcon
      color={color}
      {...rest}
    />
  );
}
