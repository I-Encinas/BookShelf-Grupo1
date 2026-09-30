import { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { BottomNav, ErrorBanner, Field, Header } from '../components';
import { gradients, useTheme } from '../styles/styles';
import { crashlytics, isExpoGo } from '../services/crashlytics';
import { useAuthStore } from '../store/authStore';
import { useBookStore } from '../store/bookStore';
import { useUiStore } from '../store/uiStore';

export function ProfileScreen() {
  const { s, c } = useTheme();
  const { user, updateName, logout, error, clearError } = useAuthStore();
  const books = useBookStore((st) => st.books);
  const { theme, setTheme } = useUiStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? '');
  const dark = theme === 'dark';

  const save = async () => {
    if (name.trim()) await updateName(name);
    setEditing(false);
  };

  // Para la demo del proyecto: genera un error no fatal y un cierre forzado en Crashlytics.
  const testCrashlytics = () => {
    if (!crashlytics.isAvailable()) {
      Alert.alert(
        'Crashlytics no disponible',
        isExpoGo
          ? 'Expo Go no incluye código nativo de Firebase. Usa el development build (APK) para reportar errores.'
          : 'No se pudo inicializar Crashlytics.',
      );
      return;
    }
    crashlytics.recordError(new Error('Error de prueba (no fatal) desde BookShelf'), 'demo:test-error');
    Alert.alert('Crashlytics', 'Se registró un error no fatal. ¿Forzar también un cierre inesperado?', [
      { text: 'No', style: 'cancel' },
      { text: 'Forzar cierre', style: 'destructive', onPress: () => crashlytics.testCrash() },
    ]);
  };

  return (
    <View style={s.root}>
      <Header title="Mi perfil" />
      <ErrorBanner message={error} onClose={clearError} />
      <ScrollView style={s.screen} contentContainerStyle={s.screenContent} keyboardShouldPersistTaps="handled">
        <View style={s.profileHero}>
          <LinearGradient colors={gradients.avatar} style={s.avatar}>
            <Text style={s.avatarText}>{(user?.name || 'U').slice(0, 2).toUpperCase()}</Text>
          </LinearGradient>

          {editing ? (
            <View style={s.profileEdit}>
              <Field label="Nombre" value={name} onChangeText={setName} />
              <View style={s.editActions}>
                <Pressable style={s.secondaryButton} onPress={() => setEditing(false)}>
                  <Text style={s.secondaryButtonText}>Cancelar</Text>
                </Pressable>
                <Pressable style={[s.primaryButton, s.flex1]} onPress={save}>
                  <Text style={s.primaryButtonText}>Guardar cambios</Text>
                </Pressable>
              </View>
            </View>
          ) : (
            <>
              <Text style={s.profileName}>{user?.name}</Text>
              <Text style={s.profileEmail}>{user?.email}</Text>
              <Pressable style={s.editButton} onPress={() => { setName(user?.name ?? ''); setEditing(true); }}>
                <Feather name="edit-2" size={13} color={c.wine} />
                <Text style={s.editButtonText}>Editar perfil</Text>
              </Pressable>
            </>
          )}
        </View>

        <View style={s.stats}>
          <View style={s.stat}>
            <Text style={s.statValue}>{books.length}</Text>
            <Text style={s.statLabel}>Libros</Text>
          </View>
          <View style={[s.stat, s.statDivider]}>
            <Text style={s.statValue}>{books.filter((b) => b.read).length}</Text>
            <Text style={s.statLabel}>Leídos</Text>
          </View>
          <View style={[s.stat, s.statDivider]}>
            <Text style={s.statValue}>{books.filter((b) => b.favorite).length}</Text>
            <Text style={s.statLabel}>Favoritos</Text>
          </View>
        </View>

        <View style={s.settingsList}>
          <View style={s.settingRow}>
            <View style={s.settingIcon}><Feather name="moon" size={18} color={c.wine} /></View>
            <View style={s.settingText}>
              <Text style={s.settingTitle}>Modo oscuro</Text>
              <Text style={s.settingSub}>Cambia la apariencia de la app</Text>
            </View>
            <Pressable
              style={[s.switchTrack, dark && s.switchTrackOn]}
              onPress={() => setTheme(dark ? 'light' : 'dark')}
              accessibilityRole="switch"
              accessibilityState={{ checked: dark }}
            >
              <View style={[s.switchThumb, dark && s.switchThumbOn]} />
            </Pressable>
          </View>

          <View style={s.settingRow}>
            <View style={s.settingIcon}><Feather name="activity" size={18} color={c.wine} /></View>
            <View style={s.settingText}>
              <Text style={s.settingTitle}>Probar Crashlytics</Text>
              <Text style={s.settingSub}>Envía un error de prueba a Firebase</Text>
            </View>
            <Pressable onPress={testCrashlytics}>
              <Text style={s.editButtonText}>Probar</Text>
            </Pressable>
          </View>

          <View style={s.settingRow}>
            <View style={s.settingIcon}><Feather name="log-out" size={18} color={c.wine} /></View>
            <View style={s.settingText}>
              <Text style={s.settingTitle}>Cerrar sesión</Text>
              <Text style={s.settingSub}>Salir de tu cuenta de BookShelf</Text>
            </View>
            <Pressable onPress={logout}>
              <Text style={s.logoutText}>Salir</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <BottomNav active="profile" />
    </View>
  );
}
