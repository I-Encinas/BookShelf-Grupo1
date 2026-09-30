import { Pressable, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../styles/styles';

export function ErrorBanner({ message, onClose }: { message: string | null; onClose: () => void }) {
  const { s, c } = useTheme();
  if (!message) return null;
  return (
    <View style={s.banner} accessibilityRole="alert">
      <Feather name="alert-circle" size={18} color={c.danger} />
      <Text style={s.bannerText}>{message}</Text>
      <Pressable onPress={onClose} hitSlop={10} accessibilityLabel="Cerrar aviso">
        <Feather name="x" size={16} color={c.danger} />
      </Pressable>
    </View>
  );
}
