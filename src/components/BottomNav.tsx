import { Pressable, Text, View } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../styles/styles';
import { useUiStore, type Tab } from '../store/uiStore';

const ITEMS: { tab: Tab; label: string; icon: keyof typeof Ionicons.glyphMap; iconActive: keyof typeof Ionicons.glyphMap }[] = [
  { tab: 'home', label: 'Inicio', icon: 'home-outline', iconActive: 'home' },
  { tab: 'favorites', label: 'Favoritos', icon: 'heart-outline', iconActive: 'heart' },
  { tab: 'profile', label: 'Perfil', icon: 'person-outline', iconActive: 'person' },
];

export function BottomNav({ active }: { active: Tab }) {
  const { s, c } = useTheme();
  const insets = useSafeAreaInsets();
  const { setActiveTab, openAddForm } = useUiStore();

  const renderItem = (i: (typeof ITEMS)[number]) => {
    const on = active === i.tab;
    return (
      <Pressable key={i.tab} style={s.navItem} onPress={() => setActiveTab(i.tab)}>
        <Ionicons name={on ? i.iconActive : i.icon} size={22} color={on ? c.wine : c.muted} />
        <Text style={[s.navLabel, on && s.navLabelActive]}>{i.label}</Text>
      </Pressable>
    );
  };

  return (
    <View style={[s.bottomNav, { paddingBottom: Math.max(insets.bottom, 10) }]}>
      {renderItem(ITEMS[0])}
      {renderItem(ITEMS[1])}
      <Pressable style={s.addButton} onPress={openAddForm} accessibilityLabel="Añadir libro">
        <Feather name="plus" size={24} color="#fff" />
      </Pressable>
      {renderItem(ITEMS[2])}
    </View>
  );
}
