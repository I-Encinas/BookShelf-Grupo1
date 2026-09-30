import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { auth } from '../config/firebase';

export type AppUser = { uid: string; name: string; email: string };

export const toAppUser = (u: User): AppUser => ({
  uid: u.uid,
  email: u.email ?? '',
  name: u.displayName || (u.email ?? 'Lector').split('@')[0],
});

export const authService = {
  onChange: (cb: (user: AppUser | null) => void) =>
    onAuthStateChanged(auth, (u) => cb(u ? toAppUser(u) : null)),

  async register(name: string, email: string, password: string) {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
    await updateProfile(cred.user, { displayName: name.trim() });
    return toAppUser(cred.user);
  },

  async login(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
    return toAppUser(cred.user);
  },

  logout: () => signOut(auth),

  async updateName(name: string) {
    if (!auth.currentUser) throw new Error('Sin sesión activa');
    await updateProfile(auth.currentUser, { displayName: name.trim() });
    return toAppUser(auth.currentUser);
  },
};
