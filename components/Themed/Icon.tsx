import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import { useThemeColor } from '@/hooks/useThemeColor';

type Props = {
  style?: any;
  name: string;
  family: string;
  size: number;
  onPress?: () => void;
  lightColor?: string;
  darkColor?: string;
};

export function Icon({ lightColor, darkColor, ...rest }: Props) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  
  let Icon;
  switch (rest.family) {
    case 'Ionicons':
      Icon = Ionicon;
      break;
    case 'MaterialCommunityIcons':
      Icon = MaterialCommunityIcon;
      break;
    case 'MaterialIcons':
      Icon = MaterialIcon;
      break;
    case 'Octicons':
      Icon = Octicons;
      break;
    default:
      Icon = Ionicon;
      break;
  }

  return (
    <Icon color={color} {...rest} />
  );
}
