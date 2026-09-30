const MESSAGES: Record<string, string> = {
  'auth/invalid-email': 'El correo electrónico no es válido.',
  'auth/missing-password': 'Escribe tu contraseña.',
  'auth/user-not-found': 'No existe una cuenta con ese correo.',
  'auth/wrong-password': 'La contraseña es incorrecta.',
  'auth/invalid-credential': 'Correo o contraseña incorrectos.',
  'auth/email-already-in-use': 'Ya existe una cuenta con ese correo.',
  'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
  'auth/too-many-requests': 'Demasiados intentos. Espera un momento e inténtalo de nuevo.',
  'auth/network-request-failed': 'Sin conexión a internet. Revisa tu red e inténtalo otra vez.',
  'auth/user-disabled': 'Esta cuenta fue deshabilitada.',
  'auth/operation-not-allowed': 'El acceso con correo no está habilitado en Firebase.',
  'permission-denied': 'No tienes permiso para realizar esta acción.',
  unavailable: 'No se pudo conectar con la nube. Tus cambios se sincronizarán al volver la conexión.',
  'deadline-exceeded': 'La conexión tardó demasiado. Inténtalo de nuevo.',
  unauthenticated: 'Tu sesión expiró. Inicia sesión nuevamente.',
};

export function getErrorCode(error: unknown): string {
  const code = (error as { code?: string })?.code ?? '';
  return code.replace(/^firestore\//, '');
}

export function getErrorMessage(error: unknown, fallback = 'Ocurrió un error inesperado.'): string {
  return MESSAGES[getErrorCode(error)] ?? fallback;
}
