import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { BookCover, ErrorBanner, Header } from '../components';
import type { Book } from '../models/Book';
import { useTheme } from '../styles/styles';
import { useBookStore } from '../store/bookStore';
import { useUiStore } from '../store/uiStore';

export function DetailScreen({ book }: { book: Book }) {
  const { s, c } = useTheme();
  const { toggleFavorite, toggleRead, remove, error, clearError } = useBookStore();
  const { selectBook, openEditForm } = useUiStore();

  const confirmDelete = () =>
    Alert.alert('Eliminar libro', `¿Eliminar "${book.title}" de tu biblioteca? Esta acción no se puede deshacer.`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => {
          selectBook(null);
          remove(book.id);
        },
      },
    ]);

  return (
    <View style={s.root}>
      <Header title="Detalle del libro" onBack={() => selectBook(null)} />
      <ErrorBanner message={error} onClose={clearError} />
      <ScrollView style={s.screen} contentContainerStyle={s.screenContent}>
        <View style={s.detailCover}>
          <BookCover book={book} />
        </View>

        <View style={s.detailHeading}>
          <View style={s.detailHeadingText}>
            <Text style={s.eyebrow}>{book.genre.toUpperCase()}</Text>
            <Text style={s.detailTitle}>{book.title}</Text>
            <Text style={s.detailAuthor}>{book.author}</Text>
          </View>
          <Pressable style={s.detailHeart} onPress={() => toggleFavorite(book.id)} accessibilityLabel="Alternar favorito">
            <Ionicons name={book.favorite ? 'heart' : 'heart-outline'} size={22} color={book.favorite ? c.wine : c.heartIdle} />
          </Pressable>
        </View>

        <View style={s.detailStatus}>
          <Text style={book.read ? s.statusRead : s.statusPending}>{book.read ? 'Leído' : 'Pendiente'}</Text>
          <Pressable style={s.detailStatusButton} onPress={() => toggleRead(book.id)}>
            <Text style={s.detailStatusButtonText}>{book.read ? 'Marcar pendiente' : 'Marcar como leído'}</Text>
          </Pressable>
        </View>

        {book.description ? (
          <View>
            <Text style={[s.eyebrow, s.detailSectionLabel]}>SOBRE EL LIBRO</Text>
            <Text style={s.detailBody}>{book.description}</Text>
          </View>
        ) : null}

        <Pressable style={[s.textAction, { marginTop: 25 }]} onPress={() => openEditForm(book.id)}>
          <Feather name="edit-2" size={16} color={c.wine} />
          <Text style={s.editBookText}>Editar libro</Text>
        </Pressable>
        <Pressable style={[s.textAction, { marginTop: 10 }]} onPress={confirmDelete}>
          <Feather name="trash-2" size={17} color={c.danger} />
          <Text style={s.deleteText}>Eliminar de mi biblioteca</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}
