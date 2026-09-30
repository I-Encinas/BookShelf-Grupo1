import Constants, { ExecutionEnvironment } from 'expo-constants';

export const isExpoGo = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

type Native = typeof import('@react-native-firebase/crashlytics');
let native: Native | null = null;
let instance: ReturnType<Native['getCrashlytics']> | null = null;

if (!isExpoGo) {
  try {
    native = require('@react-native-firebase/crashlytics') as Native;
    instance = native.getCrashlytics();
    native.setCrashlyticsCollectionEnabled(instance, true);
  } catch (e) {
    console.warn('[Crashlytics] no disponible:', e);
  }
}

export const crashlytics = {
  isAvailable: () => instance !== null,

  log(message: string) {
    if (native && instance) native.log(instance, message);
  },

  recordError(error: unknown, context?: string) {
    const err = error instanceof Error ? error : new Error(String(error));
    if (context) this.log(context);
    if (native && instance) native.recordError(instance, err);
    else console.warn('[Crashlytics:mock]', context ?? '', err.message);
  },

  setUser(uid: string | null) {
    if (native && instance) void native.setUserId(instance, uid ?? '');
  },

  testCrash() {
    if (native && instance) native.crash(instance);
  },
};
