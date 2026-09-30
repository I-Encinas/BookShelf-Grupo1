import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  type Unsubscribe,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { COVER_COLORS, type Book, type BookInput } from '../models/Book';


const itemsRef = (uid: string) => collection(db, 'books', uid, 'items');
const itemRef = (uid: string, id: string) => doc(db, 'books', uid, 'items', id);

const pickColor = (title: string) =>
  COVER_COLORS[[...title].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % COVER_COLORS.length];

export const bookRepository = {
  subscribe(uid: string, onData: (books: Book[]) => void, onError: (e: unknown) => void): Unsubscribe {
    return onSnapshot(
      query(itemsRef(uid), orderBy('createdAt', 'desc')),
      (snap) => onData(snap.docs.map((d) => ({ ...(d.data() as Omit<Book, 'id'>), id: d.id }))),
      onError,
    );
  },

  add: (uid: string, input: BookInput) =>
    addDoc(itemsRef(uid), {
      ...input,
      title: input.title.trim(),
      author: input.author.trim(),
      description: input.description.trim(),
      read: false,
      favorite: false,
      color: pickColor(input.title),
      createdAt: Date.now(),
    }),

  update: (uid: string, id: string, patch: Partial<Omit<Book, 'id' | 'createdAt'>>) =>
    updateDoc(itemRef(uid, id), patch),

  remove: (uid: string, id: string) => deleteDoc(itemRef(uid, id)),
};
