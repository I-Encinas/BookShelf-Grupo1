import { Text, TextInput, View, type TextInputProps } from 'react-native';
import { useTheme } from '../styles/styles';

type Props = TextInputProps & { label: string; multiline?: boolean };

export function Field({ label, multiline, style, ...props }: Props) {
  const { s, c } = useTheme();
  return (
    <View style={s.field}>
      <Text style={s.label}>{label}</Text>
      <TextInput
        placeholderTextColor={c.muted}
        multiline={multiline}
        style={[s.input, multiline && s.textarea, style]}
        {...props}
      />
    </View>
  );
}
