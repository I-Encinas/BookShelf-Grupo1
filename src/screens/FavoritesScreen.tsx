import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BookCover, BottomNav, ErrorBanner, Header } from '../components';
import { useTheme } from '../styles/styles';
import { useBookStore } from '../store/bookStore';
import { useUiStore } from '../store/uiStore';

export function FavoritesScreen() {
  const { s } = useTheme();
  const { books, error, toggleFavorite, clearError } = useBookStore();
  const selectBook = useUiStore((st) => st.selectBook);
  const favorites = books.filter((b) => b.favorite);

  return (
    <View style={s.root}>
      <Header title="Favoritos" />
      <ErrorBanner message={error} onClose={clearError} />
      <ScrollView style={s.screen} contentContainerStyle={s.screenContent}>
        <View style={s.pageIntro}>
          <Text style={s.eyebrow}>TU SELECCIÓN PERSONAL</Text>
          <Text style={s.pageTitle}>{'Libros que quieres\nvolver a visitar.'}</Text>
        </View>

        {favorites.length === 0 ? (
          <View style={s.emptyState}>
            <Text style={s.emptyText}>Todavía no tienes favoritos.{'\n'}Toca el corazón de un libro para guardarlo aquí.</Text>
          </View>
        ) : (
          <View style={s.favoriteGrid}>
            {favorites.map((book) => (
              <Pressable key={book.id} style={s.favoriteCard} onPress={() => selectBook(book.id)}>
                <BookCover book={book} fill />
                <Pressable style={s.cardHeart} onPress={() => toggleFavorite(book.id)} accessibilityLabel="Quitar favorito">
                  <Ionicons name="heart" size={17} color="#fff" />
                </Pressable>
                <Text style={s.bookTitle} numberOfLines={2}>{book.title}</Text>
                <Text style={s.bookAuthor} numberOfLines={1}>{book.author}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
      <BottomNav active="favorites" />
    </View>
  );
}
