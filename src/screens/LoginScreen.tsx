import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ErrorBanner, Field } from '../components';
import { useTheme } from '../styles/styles';
import { useAuthStore } from '../store/authStore';

export function LoginScreen() {
  const { s } = useTheme();
  const insets = useSafeAreaInsets();
  const { login, register, loading, error, clearError } = useAuthStore();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const submit = () => {
    if (!email.trim() || !password || (isRegister && !name.trim())) {
      setLocalError('Completa todos los campos para continuar.');
      return;
    }
    if (isRegister && password.length < 6) {
      setLocalError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    setLocalError('');
    isRegister ? register(name, email, password) : login(email, password);
  };

  const toggle = () => {
    setIsRegister(!isRegister);
    setLocalError('');
    clearError();
  };

  return (
    <KeyboardAvoidingView style={s.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        contentContainerStyle={[s.authScreen, { paddingTop: 36 + insets.top, paddingBottom: 36 + insets.bottom }]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={s.authLogo}>
          <Text style={s.authLogoText}>BS</Text>
        </View>
        <Text style={s.eyebrow}>BOOKSHELF</Text>
        <Text style={s.authTitle}>{isRegister ? 'Crea tu biblioteca.' : 'Vuelve a tus historias.'}</Text>
        <Text style={s.authCopy}>Organiza tus lecturas, guarda tus favoritos y descubre qué leer después.</Text>

        {isRegister && <Field label="Nombre" value={name} onChangeText={setName} placeholder="Tu nombre" />}
        <Field
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          placeholder="tu@email.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Field
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          placeholder="Mínimo 6 caracteres"
          secureTextEntry
          autoCapitalize="none"
        />

        {localError ? <Text style={s.formError}>{localError}</Text> : null}
        {/* Errores de Firebase Auth (credenciales, red, etc.) */}
        <View style={{ marginHorizontal: -22 }}>
          <ErrorBanner message={error} onClose={clearError} />
        </View>

        <Pressable style={[s.primaryButton, loading && s.disabled]} onPress={submit} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={s.primaryButtonText}>{isRegister ? 'Crear cuenta' : 'Iniciar sesión'}</Text>
          )}
        </Pressable>
        <Pressable style={s.textButton} onPress={toggle}>
          <Text style={s.textButtonText}>{isRegister ? 'Ya tengo una cuenta' : 'Crear una cuenta nueva'}</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
