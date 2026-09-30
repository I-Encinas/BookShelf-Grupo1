
import { StyleSheet } from 'react-native';
import { useUiStore } from '../store/uiStore';
import type { CoverColor } from '../models/Book';

const light = {
  ink: '#232126',
  muted: '#8b858d',
  paper: '#f8f7f5',
  card: '#ffffff',
  line: '#ebe7e3',
  wine: '#a73b5c',
  wineDark: '#812945',
  gold: '#e3af66',
  success: '#4a9a75',
  pending: '#c18b47',
  danger: '#bd5e5e',
  heartIdle: '#b9b1b3',
  backdrop: 'rgba(36,26,29,0.5)',
  onWine: '#ffffff',
};
export type Palette = typeof light;

const dark: Palette = {
  ...light,
  ink: '#f4eff0',
  muted: '#aaa2a6',
  paper: '#211d20',
  card: '#2c272a',
  line: '#453d41',
  wine: '#d56b87',
  wineDark: '#b94d6c',
};

export const palettes = { light, dark };

export const fonts = {
  body: 'DMSans_400Regular',
  medium: 'DMSans_500Medium',
  semibold: 'DMSans_600SemiBold',
  bold: 'DMSans_700Bold',
  display: 'PlayfairDisplay_700Bold',
} as const;

type Gradient = readonly [string, string];
export const gradients = {
  welcome: ['#a83c5b', '#752d49'] as Gradient,
  avatar: ['#c8798f', '#812945'] as Gradient,
  covers: {
    coral: ['#db755e', '#b44954'],
    yellow: ['#e2b554', '#bd7737'],
    blue: ['#6499ae', '#406a84'],
    purple: ['#8d759b', '#604a78'],
  } as Record<CoverColor, Gradient>,
};

export const makeStyles = (c: Palette) =>
  StyleSheet.create({
    root: { flex: 1, backgroundColor: c.paper },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: c.paper },
    screen: { flex: 1 },
    screenContent: { paddingHorizontal: 22, paddingTop: 3, paddingBottom: 120 },
    loadingText: { color: c.muted, fontFamily: fonts.body, fontSize: 13, marginTop: 12 },
    emptyState: { alignItems: 'center', paddingVertical: 40 },
    emptyText: { color: c.muted, fontFamily: fonts.body, fontSize: 13, textAlign: 'center', lineHeight: 20 },

    topbar: {
      height: 76,
      paddingHorizontal: 22,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: c.paper,
    },
    topbarTitle: { color: c.ink, fontFamily: fonts.bold, fontSize: 17, letterSpacing: -0.3 },
    brandMark: {
      width: 34,
      height: 34,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: c.wine,
    },
    iconButton: { padding: 6, alignItems: 'center', justifyContent: 'center' },

    eyebrow: { fontFamily: fonts.bold, fontSize: 10, letterSpacing: 1.4, color: c.muted },
    eyebrowOnWine: { fontFamily: fonts.bold, fontSize: 10, letterSpacing: 1.4, color: 'rgba(255,255,255,0.7)' },

    /* Home: tarjeta de bienvenida */
    welcomeCard: { minHeight: 192, borderRadius: 22, overflow: 'hidden', padding: 24, justifyContent: 'center' },
    welcomeRing: {
      position: 'absolute',
      right: -60,
      top: -62,
      width: 190,
      height: 190,
      borderRadius: 95,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.23)',
    },
    welcomeTitle: { fontFamily: fonts.display, fontSize: 27, lineHeight: 31, color: '#fff', marginTop: 8, marginBottom: 12 },
    welcomeCopy: { fontFamily: fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.78)' },
    welcomeOrbit: { position: 'absolute', right: 30, bottom: 26 },

    /* Buscador */
    searchWrap: {
      height: 47,
      marginTop: 22,
      marginBottom: 29,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      borderWidth: 1,
      borderColor: c.line,
      borderRadius: 13,
      backgroundColor: c.card,
    },
    searchInput: { flex: 1, padding: 0, color: c.ink, fontFamily: fonts.body, fontSize: 13 },

    /* Encabezado de sección */
    sectionHeading: { marginBottom: 13 },
    sectionTitle: { marginTop: 7, color: c.ink, fontFamily: fonts.bold, fontSize: 17, letterSpacing: -0.5 },
    sectionCount: { color: c.muted, fontFamily: fonts.body, fontSize: 13 },

    /* Lista de libros */
    bookList: { gap: 10 },
    bookRow: {
      minHeight: 94,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 13,
      padding: 12,
      backgroundColor: c.card,
      borderWidth: 1,
      borderColor: c.line,
      borderRadius: 16,
    },
    bookInfo: { flex: 1, minWidth: 0 },
    bookTitle: { color: c.ink, fontFamily: fonts.bold, fontSize: 13, lineHeight: 16, marginBottom: 4 },
    bookAuthor: { color: c.muted, fontFamily: fonts.body, fontSize: 11 },
    bookMeta: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 9 },
    metaText: { color: c.muted, fontFamily: fonts.body, fontSize: 10 },
    statusBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    statusRead: { color: c.success, fontFamily: fonts.semibold, fontSize: 10 },
    statusPending: { color: c.pending, fontFamily: fonts.semibold, fontSize: 10 },
    statusDot: { width: 6, height: 6, borderWidth: 1, borderColor: c.pending, borderRadius: 3 },
    favoriteButton: { padding: 6 },

    /* Portada */
    cover: {
      width: 122,
      height: 166,
      padding: 16,
      borderTopLeftRadius: 9,
      borderBottomLeftRadius: 9,
      borderTopRightRadius: 13,
      borderBottomRightRadius: 13,
      justifyContent: 'space-between',
      overflow: 'hidden',
      elevation: 4,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 10,
      shadowOffset: { width: 6, height: 7 },
    },
    coverSmall: {
      width: 51,
      height: 68,
      padding: 8,
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
      borderTopRightRadius: 9,
      borderBottomRightRadius: 9,
    },
    coverFill: { width: '100%', height: 205 },
    coverLetter: { fontFamily: fonts.display, fontSize: 25, color: '#fff', opacity: 0.9 },
    coverLetterSmall: { fontSize: 15 },

    /* Navegación inferior */
    bottomNav: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingTop: 8,
      paddingHorizontal: 14,
      backgroundColor: c.card,
      borderTopWidth: 1,
      borderTopColor: c.line,
    },
    navItem: { minWidth: 64, alignItems: 'center', gap: 4, padding: 5 },
    navLabel: { color: c.muted, fontFamily: fonts.body, fontSize: 9 },
    navLabelActive: { color: c.wine },
    addButton: {
      width: 45,
      height: 45,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: c.wine,
      elevation: 6,
      shadowColor: c.wine,
      shadowOpacity: 0.3,
      shadowRadius: 9,
      shadowOffset: { width: 0, height: 8 },
    },

    /* Favoritos */
    pageIntro: { paddingTop: 22, paddingBottom: 30 },
    pageTitle: { fontFamily: fonts.display, fontSize: 27, lineHeight: 31, color: c.ink, marginTop: 8 },
    favoriteGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 26 },
    favoriteCard: { width: '47.5%' },
    favoriteCover: { width: '100%', height: 205, marginBottom: 12 },
    cardHeart: { position: 'absolute', top: 7, right: 7, padding: 6 },

    /* Perfil */
    profileHero: { alignItems: 'center', paddingTop: 18 },
    avatar: { width: 74, height: 74, borderRadius: 37, alignItems: 'center', justifyContent: 'center', marginBottom: 13, overflow: 'hidden' },
    avatarText: { fontFamily: fonts.display, fontSize: 22, color: '#fff' },
    profileName: { fontFamily: fonts.display, fontSize: 23, color: c.ink, marginBottom: 5 },
    profileEmail: { color: c.muted, fontFamily: fonts.body, fontSize: 12, marginBottom: 15 },
    editButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      paddingVertical: 8,
      paddingHorizontal: 17,
      borderWidth: 1,
      borderColor: c.line,
      borderRadius: 9,
      backgroundColor: c.card,
    },
    editButtonText: { color: c.wine, fontFamily: fonts.bold, fontSize: 11 },
    profileEdit: { alignSelf: 'stretch' },
    editActions: { flexDirection: 'row', gap: 8 },
    stats: {
      flexDirection: 'row',
      marginVertical: 33,
      paddingVertical: 17,
      borderWidth: 1,
      borderColor: c.line,
      borderRadius: 15,
      backgroundColor: c.card,
    },
    stat: { flex: 1, alignItems: 'center' },
    statDivider: { borderLeftWidth: 1, borderLeftColor: c.line },
    statValue: { fontFamily: fonts.display, fontSize: 20, color: c.ink },
    statLabel: { color: c.muted, fontFamily: fonts.body, fontSize: 10, marginTop: 4 },
    settingsList: { borderTopWidth: 1, borderTopColor: c.line },
    settingRow: {
      minHeight: 71,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderBottomWidth: 1,
      borderBottomColor: c.line,
    },
    settingIcon: {
      width: 35,
      height: 35,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: c.wine + '1A',
    },
    settingText: { flex: 1 },
    settingTitle: { color: c.ink, fontFamily: fonts.bold, fontSize: 13, marginBottom: 3 },
    settingSub: { color: c.muted, fontFamily: fonts.body, fontSize: 10 },
    switchTrack: { width: 38, height: 22, padding: 3, borderRadius: 20, backgroundColor: c.line, justifyContent: 'center' },
    switchTrackOn: { backgroundColor: c.wine },
    switchThumb: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#fff' },
    switchThumbOn: { transform: [{ translateX: 16 }] },
    logoutText: { color: c.danger, fontFamily: fonts.bold, fontSize: 11 },

    /* Detalle */
    detailCover: { alignItems: 'center', marginTop: 12, marginBottom: 27 },
    detailHeading: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', gap: 15 },
    detailHeadingText: { flex: 1 },
    detailTitle: { fontFamily: fonts.display, fontSize: 27, lineHeight: 30, color: c.ink, marginTop: 7, marginBottom: 7 },
    detailAuthor: { color: c.muted, fontFamily: fonts.body, fontSize: 13 },
    detailHeart: { padding: 11, borderWidth: 1, borderColor: c.line, borderRadius: 12 },
    detailStatus: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 26,
      marginBottom: 29,
      paddingVertical: 13,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: c.line,
    },
    detailStatusButton: { paddingVertical: 7, paddingHorizontal: 10, borderRadius: 8, backgroundColor: c.wine + '17' },
    detailStatusButtonText: { color: c.wine, fontFamily: fonts.bold, fontSize: 10 },
    detailSectionLabel: { marginBottom: 11 },
    detailBody: { color: c.muted, fontFamily: fonts.body, fontSize: 13, lineHeight: 21 },
    textAction: { flexDirection: 'row', alignItems: 'center', gap: 7, paddingVertical: 10 },
    editBookText: { color: c.wine, fontFamily: fonts.bold, fontSize: 11 },
    deleteText: { color: c.danger, fontFamily: fonts.body, fontSize: 11 },

    /* Modal de formulario */
    backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: c.backdrop },
    modal: {
      padding: 22,
      paddingTop: 24,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      backgroundColor: c.paper,
      maxHeight: '92%',
    },
    modalHeading: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 23 },
    modalTitle: { fontFamily: fonts.display, fontSize: 25, color: c.ink, marginTop: 7 },
    label: { color: c.muted, fontFamily: fonts.semibold, fontSize: 11, marginBottom: 6 },
    field: { marginBottom: 14 },
    input: {
      height: 46,
      paddingHorizontal: 13,
      borderWidth: 1,
      borderColor: c.line,
      borderRadius: 10,
      color: c.ink,
      backgroundColor: c.card,
      fontFamily: fonts.body,
      fontSize: 12,
    },
    textarea: { height: 80, paddingTop: 12, textAlignVertical: 'top' },
    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
    chip: { paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: c.line, borderRadius: 20, backgroundColor: c.card },
    chipActive: { borderColor: c.wine, backgroundColor: c.wine + '1A' },
    chipText: { color: c.muted, fontFamily: fonts.semibold, fontSize: 11 },
    chipTextActive: { color: c.wine },

    /* Botones */
    primaryButton: {
      height: 46,
      marginTop: 8,
      borderRadius: 11,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: c.wine,
    },
    primaryButtonText: { color: c.onWine, fontFamily: fonts.bold, fontSize: 12 },
    disabled: { opacity: 0.45 },
    secondaryButton: {
      flex: 1,
      height: 46,
      marginTop: 8,
      borderWidth: 1,
      borderColor: c.line,
      borderRadius: 11,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: c.card,
    },
    secondaryButtonText: { color: c.wine, fontFamily: fonts.bold, fontSize: 12 },
    flex1: { flex: 1 },
    textButton: { marginTop: 17, alignItems: 'center', padding: 6 },
    textButtonText: { color: c.wine, fontFamily: fonts.bold, fontSize: 12 },

    /* Login / registro */
    authScreen: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 28, paddingVertical: 36 },
    authLogo: { width: 56, height: 56, marginBottom: 22, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: c.wine },
    authLogoText: { color: '#fff', fontFamily: fonts.display, fontSize: 20 },
    authTitle: { fontFamily: fonts.display, fontSize: 34, lineHeight: 37, color: c.ink, marginTop: 10, marginBottom: 12 },
    authCopy: { color: c.muted, fontFamily: fonts.body, fontSize: 13, lineHeight: 20, marginBottom: 28 },

    /* Mensajes de error / aviso */
    formError: { color: c.danger, fontFamily: fonts.body, fontSize: 11, marginBottom: 12 },
    banner: {
      marginHorizontal: 22,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: c.danger + '55',
      backgroundColor: c.danger + '1A',
    },
    bannerText: { flex: 1, color: c.danger, fontFamily: fonts.medium, fontSize: 12, lineHeight: 17 },
    configWarning: { color: c.danger, fontFamily: fonts.body, fontSize: 12, lineHeight: 18, textAlign: 'center', padding: 28 },
  });

export type Styles = ReturnType<typeof makeStyles>;

const cache = {
  light: makeStyles(palettes.light),
  dark: makeStyles(palettes.dark),
};

/** Hook de tema: devuelve estilos (s), colores (c) y si es oscuro. */
export function useTheme() {
  const mode = useUiStore((st) => st.theme);
  return { s: cache[mode], c: palettes[mode], isDark: mode === 'dark' };
}
