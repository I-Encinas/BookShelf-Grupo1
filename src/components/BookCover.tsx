import { Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import type { Book } from '../models/Book';
import { gradients, useTheme } from '../styles/styles';

type Props = { book: Book; small?: boolean; fill?: boolean };

export function BookCover({ book, small = false, fill = false }: Props) {
  const { s } = useTheme();
  return (
    <LinearGradient
      colors={gradients.covers[book.color] ?? gradients.covers.coral}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[s.cover, small && s.coverSmall, fill && s.favoriteCover]}
    >
      <Text style={[s.coverLetter, small && s.coverLetterSmall]}>{book.title.charAt(0).toUpperCase()}</Text>
      <Feather name="book-open" size={small ? 15 : 23} color="#fff" />
    </LinearGradient>
  );
}
