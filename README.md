# BookShelf — React Native + TypeScript + Firebase (Grupo 1)

Biblioteca personal de libros. Auth (Firebase Authentication), datos en tiempo real (Cloud Firestore),
datos por usuario, CRUD, estado pendiente/leído, sesión persistente y monitoreo (Crashlytics).

## Estructura

```
App.tsx                      raíz: fuentes, sesión, navegación por estado
src/
  config/firebase.ts         init Firebase JS SDK (Auth con AsyncStorage + Firestore)
  models/Book.ts             BookModel(id, title, genre, read, createdAt) + extras
  services/
    authService.ts           registro / login / logout / perfil
    bookRepository.ts        acceso a Firestore: books/{uid}/items/{bookId}
    crashlytics.ts           wrapper seguro (no-op en Expo Go)
  store/                     zustand: authStore, bookStore (onSnapshot), uiStore (tema/tabs)
  styles/styles.ts           ÚNICA hoja de estilos (paleta, fuentes, degradados, StyleSheet)
  components/                BookCover, Header, BottomNav, Field, StatusBadge, ErrorBanner
  screens/                   Login, Home, Favorites, Detail, Profile, BookFormModal
firestore.rules              reglas de seguridad por UID
```

## 1. Firebase 

1. Se creó un proyecto en https://console.firebase.google.com de la siguiente manera:
2. **Authentication → Sign-in method → Correo/contraseña → Habilitar**
3. **Firestore Database → Crear base de datos**, se definieron las reglas en la pestaña *Reglas*  y se seleccionó Publicar
4. **Configuración del proyecto → Tus apps → Web (`</>`)**: copia el `firebaseConfig`
5. Copia `.env.example` a `.env` y se completó los 6 valores provenientes del proyecto (`EXPO_PUBLIC_FIREBASE_*`)
6. Firebase → Configuración → Tus apps → **Agregar app Android**, paquete `com.univalle.bookshelf_grupo1`
7. Se descargó y añadió el archivo `google-services.json` al proyecto.

## 2. PASOS PARA EJECUTAR en Expo Go

```bash
npm install
npx expo start -c
```
Escanear el QR con la app **Expo Go**.

En Expo Go funciona todo exceptuando **excepto Crashlytics**.

## 3. Crashlytics (development build)

3. Firebase → **Crashlytics → Habilitar**.
4. Hacer correr en local con Android Studio: `npx expo prebuild --platform android` y `npx expo run:android`:
5. Abre el APK → `npx expo start --dev-client`.
6. En la app: **Perfil → Probar Crashlytics** se visualizará una prueba con crashlythics, al reabrir la app; el reporte aparece en la consola.
