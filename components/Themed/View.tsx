import { View as ReactNativeView, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

type Props = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function View({ style, lightColor, darkColor, ...otherProps }: Props) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <ReactNativeView style={[{ backgroundColor }, style]} {...otherProps} />;
}
