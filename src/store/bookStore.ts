import { create } from 'zustand';
import type { Unsubscribe } from 'firebase/firestore';
import type { Book, BookInput } from '../models/Book';
import { bookRepository } from '../services/bookRepository';
import { crashlytics } from '../services/crashlytics';
import { getErrorCode, getErrorMessage } from '../utils/errors';

type BookState = {
  books: Book[];
  loading: boolean;
  error: string | null;
  uid: string | null;
  start: (uid: string) => void; 
  stop: () => void; 
  add: (input: BookInput) => void;
  update: (id: string, patch: Partial<Omit<Book, 'id' | 'createdAt'>>) => void;
  remove: (id: string) => void;
  toggleRead: (id: string) => void;
  toggleFavorite: (id: string) => void;
  clearError: () => void;
};

let unsubscribe: Unsubscribe | null = null;

export const useBookStore = create<BookState>((set, get) => {
  const run = (action: string, task: (uid: string) => Promise<unknown>) => {
    const uid = get().uid;
    if (!uid) return;
    task(uid).catch((e) => {
      if (getErrorCode(e) !== 'unavailable') crashlytics.recordError(e, `books:${action}`);
      set({ error: getErrorMessage(e, 'No se pudo guardar el cambio.') });
    });
  };
  const find = (id: string) => get().books.find((b) => b.id === id);

  return {
    books: [],
    loading: false,
    error: null,
    uid: null,

    start: (uid) => {
      unsubscribe?.();
      set({ uid, loading: true, error: null, books: [] });
      unsubscribe = bookRepository.subscribe(
        uid,
        (books) => set({ books, loading: false, error: null }),
        (e) => {
          crashlytics.recordError(e, 'books:subscribe');
          set({ loading: false, error: getErrorMessage(e, 'No se pudieron cargar tus libros.') });
        },
      );
    },

    stop: () => {
      unsubscribe?.();
      unsubscribe = null;
      set({ uid: null, books: [], loading: false, error: null });
    },

    add: (input) => run('add', (uid) => bookRepository.add(uid, input)),
    update: (id, patch) => run('update', (uid) => bookRepository.update(uid, id, patch)),
    remove: (id) => run('remove', (uid) => bookRepository.remove(uid, id)),
    toggleRead: (id) => {
      const b = find(id);
      if (b) run('toggleRead', (uid) => bookRepository.update(uid, id, { read: !b.read }));
    },
    toggleFavorite: (id) => {
      const b = find(id);
      if (b) run('toggleFavorite', (uid) => bookRepository.update(uid, id, { favorite: !b.favorite }));
    },
    clearError: () => set({ error: null }),
  };
});
