import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../styles/styles';

export function StatusBadge({ read }: { read: boolean }) {
  const { s, c } = useTheme();
  return (
    <View style={s.statusBadge}>
      {read ? <Feather name="check" size={12} color={c.success} /> : <View style={s.statusDot} />}
      <Text style={read ? s.statusRead : s.statusPending}>{read ? 'Leído' : 'Pendiente'}</Text>
    </View>
  );
}
