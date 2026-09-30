import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather, Ionicons } from '@expo/vector-icons';
import { BookCover, BottomNav, ErrorBanner, Header, StatusBadge } from '../components';
import { gradients, useTheme } from '../styles/styles';
import { useBookStore } from '../store/bookStore';
import { useUiStore } from '../store/uiStore';

export function HomeScreen() {
  const { s, c } = useTheme();
  const { books, loading, error, toggleFavorite, clearError } = useBookStore();
  const selectBook = useUiStore((st) => st.selectBook);
  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();
  const visible = books.filter((b) => `${b.title} ${b.author} ${b.genre}`.toLowerCase().includes(q));
  const pending = books.filter((b) => !b.read).length;

  return (
    <View style={s.root}>
      <Header title="Mi biblioteca" />
      <ErrorBanner message={error} onClose={clearError} />
      <ScrollView style={s.screen} contentContainerStyle={s.screenContent} keyboardShouldPersistTaps="handled">
        <LinearGradient colors={gradients.welcome} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={s.welcomeCard}>
          <View style={s.welcomeRing} />
          <Text style={s.eyebrowOnWine}>TU BIBLIOTECA</Text>
          <Text style={s.welcomeTitle}>{'Tu próxima gran\nhistoria te espera.'}</Text>
          <Text style={s.welcomeCopy}>
            {pending === 1 ? 'Tienes 1 libro pendiente de lectura.' : `Tienes ${pending} libros pendientes de lectura.`}
          </Text>
          <View style={s.welcomeOrbit}>
            <Ionicons name="sparkles" size={24} color={c.gold} />
          </View>
        </LinearGradient>

        <View style={s.searchWrap}>
          <Feather name="search" size={18} color={c.muted} />
          <TextInput
            style={s.searchInput}
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar en tu biblioteca"
            placeholderTextColor={c.muted}
            accessibilityLabel="Buscar libros"
          />
        </View>

        <View style={s.sectionHeading}>
          <Text style={s.eyebrow}>TU COLECCIÓN</Text>
          <Text style={s.sectionTitle}>
            Todos tus libros <Text style={s.sectionCount}>{books.length}</Text>
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator color={c.wine} style={{ marginTop: 30 }} />
        ) : visible.length === 0 ? (
          <View style={s.emptyState}>
            <Text style={s.emptyText}>
              {books.length === 0
                ? 'Aún no tienes libros.\nToca + para añadir el primero.'
                : 'No encontramos libros con esa búsqueda.'}
            </Text>
          </View>
        ) : (
          <View style={s.bookList}>
            {visible.map((book) => (
              <Pressable key={book.id} style={s.bookRow} onPress={() => selectBook(book.id)}>
                <BookCover book={book} small />
                <View style={s.bookInfo}>
                  <Text style={s.bookTitle} numberOfLines={2}>{book.title}</Text>
                  <Text style={s.bookAuthor} numberOfLines={1}>{book.author}</Text>
                  <View style={s.bookMeta}>
                    <StatusBadge read={book.read} />
                    <Text style={s.metaText}>{book.genre}</Text>
                  </View>
                </View>
                <Pressable style={s.favoriteButton} onPress={() => toggleFavorite(book.id)} accessibilityLabel="Favorito">
                  <Ionicons
                    name={book.favorite ? 'heart' : 'heart-outline'}
                    size={19}
                    color={book.favorite ? c.wine : c.heartIdle}
                  />
                </Pressable>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
      <BottomNav active="home" />
    </View>
  );
}
