import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Field } from '../components';
import { GENRES } from '../models/Book';
import { useTheme } from '../styles/styles';
import { useBookStore } from '../store/bookStore';
import { useUiStore } from '../store/uiStore';

export function BookFormModal() {
  const { formOpen, editingBookId, closeForm } = useUiStore();
  return formOpen ? <Form key={editingBookId ?? 'new'} bookId={editingBookId} onClose={closeForm} /> : null;
}

function Form({ bookId, onClose }: { bookId: string | null; onClose: () => void }) {
  const { s, c } = useTheme();
  const { books, add, update } = useBookStore();
  const book = bookId ? books.find((b) => b.id === bookId) : undefined;

  const [title, setTitle] = useState(book?.title ?? '');
  const [author, setAuthor] = useState(book?.author ?? '');
  const [genre, setGenre] = useState(book?.genre ?? GENRES[0]);
  const [description, setDescription] = useState(book?.description ?? '');

  const valid = title.trim().length > 0 && author.trim().length > 0;

  const submit = () => {
    if (!valid) return;
    const data = { title: title.trim(), author: author.trim(), genre, description: description.trim() };
    if (book) update(book.id, data);
    else add(data);
    onClose();
  };

  return (
    <Modal visible transparent animationType="slide" onRequestClose={onClose} statusBarTranslucent>
      <KeyboardAvoidingView style={s.backdrop} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Pressable style={s.flex1} onPress={onClose} />
        <View style={s.modal}>
          <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            <View style={s.modalHeading}>
              <View>
                <Text style={s.eyebrow}>{book ? 'EDITAR REGISTRO' : 'NUEVO REGISTRO'}</Text>
                <Text style={s.modalTitle}>{book ? 'Editar libro' : 'Añadir un libro'}</Text>
              </View>
              <Pressable style={s.iconButton} onPress={onClose} accessibilityLabel="Cerrar">
                <Feather name="x" size={20} color={c.muted} />
              </Pressable>
            </View>

            <Field label="Título" value={title} onChangeText={setTitle} placeholder="Cien años de soledad" />
            <Field label="Autor" value={author} onChangeText={setAuthor} placeholder="Gabriel García Márquez" />

            <View style={s.field}>
              <Text style={s.label}>Género</Text>
              <View style={s.chips}>
                {GENRES.map((g) => (
                  <Pressable key={g} style={[s.chip, genre === g && s.chipActive]} onPress={() => setGenre(g)}>
                    <Text style={[s.chipText, genre === g && s.chipTextActive]}>{g}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <Field label="Descripción" value={description} onChangeText={setDescription} multiline />

            <Pressable style={[s.primaryButton, !valid && s.disabled]} disabled={!valid} onPress={submit}>
              <Text style={s.primaryButtonText}>{book ? 'Guardar cambios' : 'Añadir a mi biblioteca'}</Text>
            </Pressable>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
