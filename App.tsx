import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold, DMSans_700Bold } from '@expo-google-fonts/dm-sans';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { isFirebaseConfigured } from './src/config/firebase';
import { BookFormModal, DetailScreen, FavoritesScreen, HomeScreen, LoginScreen, ProfileScreen } from './src/screens';
import { useTheme } from './src/styles/styles';
import { useAuthStore } from './src/store/authStore';
import { useBookStore } from './src/store/bookStore';
import { useUiStore } from './src/store/uiStore';

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular, DMSans_500Medium, DMSans_600SemiBold,  DMSans_700Bold,  PlayfairDisplay_700Bold,
  });

  return (
    <SafeAreaProvider>
      {fontsLoaded ? <Root /> : null}
    </SafeAreaProvider>
  );
}

function Root() {
  const { s, c, isDark } = useTheme();
  const { user, initializing, init } = useAuthStore();
  const { start, stop, books } = useBookStore();
  const { activeTab, selectedBookId, loadTheme, reset } = useUiStore();

  useEffect(() => {
    loadTheme();
    return isFirebaseConfigured ? init() : undefined;
  }, [init, loadTheme]);

  useEffect(() => {
    if (user) start(user.uid);
    else {
      stop();
      reset();
    }
  }, [user?.uid]); 

  let content;
  if (!isFirebaseConfigured) {
    content = (
      <View style={s.center}>
        <Text style={s.configWarning}>
          Falta configurar Firebase.{'\n'}Copia .env.example a .env, completa las claves y reinicia con "npx expo start -c".
        </Text>
      </View>
    );
  } else if (initializing) {
    content = (
      <View style={s.center}>
        <ActivityIndicator color={c.wine} />
        <Text style={s.loadingText}>Cargando tu biblioteca…</Text>
      </View>
    );
  } else if (!user) {
    content = <LoginScreen />;
  } else {
    const selected = books.find((b) => b.id === selectedBookId);
    content = (
      <>
        {selected ? (
          <DetailScreen book={selected} />
        ) : activeTab === 'favorites' ? (
          <FavoritesScreen />
        ) : activeTab === 'profile' ? (
          <ProfileScreen />
        ) : (
          <HomeScreen />
        )}
        <BookFormModal />
      </>
    );
  }

  return (
    <View style={s.root}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {content}
    </View>
  );
}
