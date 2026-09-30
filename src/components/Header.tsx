import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../styles/styles';

type Props = { title: string; onBack?: () => void };

export function Header({ title, onBack }: Props) {
  const { s, c } = useTheme();
  const insets = useSafeAreaInsets();
  return (
    <View style={[s.topbar, { height: 76 + insets.top, paddingTop: insets.top }]}>
      {onBack ? (
        <Pressable style={s.iconButton} onPress={onBack} accessibilityLabel="Volver">
          <Feather name="chevron-left" size={22} color={c.muted} />
        </Pressable>
      ) : (
        <View style={s.brandMark}>
          <Feather name="book-open" size={19} color="#fff" />
        </View>
      )}
      <Text style={s.topbarTitle}>{title}</Text>
      {/* espacio para mantener el título centrado */}
      <View style={{ width: 34 }} />
    </View>
  );
}
