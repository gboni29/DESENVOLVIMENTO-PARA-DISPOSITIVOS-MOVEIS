import { useEffect, useRef, useState } from 'react';
import { Animated, FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Mock — futuramente virá do backend com o usuário logado
const USUARIO = {
  nome: 'Usuário',
  usuario: '@usuario',
  bio: 'Amante de bons filmes e séries.',
  avatar: null, // sem foto por enquanto
  totalAssistidos: 142,
  totalAvaliacoes: 87,
  totalWatchlist: 6,
};

const AVALIACOES_RECENTES = [
  { id: '10', titulo: 'Interstellar',   nota: 5, poster: require('../../../assets/images/interstellar.jpg') },
  { id: '26', titulo: 'Inception',      nota: 4, poster: require('../../../assets/images/inception.jpg') },
  { id: '14', titulo: 'A Substância',   nota: 4, poster: require('../../../assets/images/the-substance.jpg') },
  { id: '15', titulo: 'Aranhaverso',    nota: 5, poster: require('../../../assets/images/spider-man-into-the-spider-verse.jpg') },
  { id: '13', titulo: 'Duna',           nota: 4, poster: require('../../../assets/images/duna.jpg') },
];

const GENEROS_FAVORITOS = [
  { label: 'Ficção Científica', pct: 82 },
  { label: 'Drama',             pct: 58 },
  { label: 'Ação',              pct: 41 },
  { label: 'Terror',            pct: 29 },
  { label: 'Animação',          pct: 17 },
];

const TOP_FILMES = [
  { id: '10', titulo: 'Interstellar',  ano: '2014', poster: require('../../../assets/images/interstellar.jpg') },
  { id: '26', titulo: 'Inception',     ano: '2010', poster: require('../../../assets/images/inception.jpg') },
  { id: '15', titulo: 'Aranhaverso',   ano: '2018', poster: require('../../../assets/images/spider-man-into-the-spider-verse.jpg') },
];

function Estrelas({ nota }: { nota: number }) {
  return (
    <View style={{ flexDirection: 'row', gap: 2, marginTop: 4 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Ionicons
          key={n}
          name={n <= nota ? 'star' : 'star-outline'}
          size={10}
          color={n <= nota ? '#c9973a' : '#2e2b45'}
        />
      ))}
    </View>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const [editando, setEditando] = useState(false);
  const [configAberto, setConfigAberto] = useState(false);
  const [modalVisivel, setModalVisivel] = useState(false);
  const slideAnim = useRef(new Animated.Value(400)).current;
  const fadeAnim  = useRef(new Animated.Value(0)).current;

  function abrirConfig() {
    setModalVisivel(true);
    setConfigAberto(true);
    Animated.parallel([
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, damping: 20, stiffness: 180 }),
      Animated.timing(fadeAnim,  { toValue: 1, duration: 220, useNativeDriver: true }),
    ]).start();
  }

  function fecharConfig() {
    Animated.parallel([
      Animated.timing(slideAnim, { toValue: 400, duration: 260, useNativeDriver: true }),
      Animated.timing(fadeAnim,  { toValue: 0,   duration: 200, useNativeDriver: true }),
    ]).start(() => { setModalVisivel(false); setConfigAberto(false); });
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Modal de configurações */}
      <Modal visible={modalVisivel} transparent statusBarTranslucent onRequestClose={fecharConfig}>
        <Animated.View style={[styles.modalOverlay, { opacity: fadeAnim }]}>
          <Pressable style={{ flex: 1 }} onPress={fecharConfig} />
        </Animated.View>
        <Animated.View style={[styles.modalSheet, { transform: [{ translateY: slideAnim }] }]}>
          <View style={styles.modalHandle} />
          <Text style={styles.modalTitulo}>Configurações</Text>

          <View style={styles.menuContainer}>
            {[
              { icon: 'notifications-outline', label: 'Notificações', sub: 'Gerencie seus alertas' },
              { icon: 'shield-outline',        label: 'Privacidade',  sub: 'Controle seus dados' },
              { icon: 'help-circle-outline',   label: 'Ajuda',        sub: 'Dúvidas e suporte' },
            ].map((item) => (
              <TouchableOpacity key={item.label} style={styles.menuItem}>
                <View style={styles.menuIconWrap}>
                  <Ionicons name={item.icon as any} size={20} color="#c9973a" />
                </View>
                <View style={styles.menuTextos}>
                  <Text style={styles.menuItemText}>{item.label}</Text>
                  <Text style={styles.menuItemSub}>{item.sub}</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color="#2e2b45" />
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.menuItemSair} onPress={() => { fecharConfig(); setTimeout(() => router.replace('/login'), 300); }}>
            <View style={styles.menuIconWrapSair}>
              <Ionicons name="log-out-outline" size={20} color="#7a2020" />
            </View>
            <View style={styles.menuTextos}>
              <Text style={styles.menuItemSairText}>Sair da conta</Text>
              <Text style={styles.menuItemSairSub}>Encerrar sessão atual</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </Modal>

      {/* Header do perfil */}
      <View style={styles.heroContainer}>
        {/* Poster do filme favorito como fundo com gradiente */}
        <Image source={TOP_FILMES[0].poster} style={styles.heroBgImage} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(13,13,20,0.6)', '#0d0d14']}
          locations={[0, 0.5, 1]}
          style={styles.heroGradient}
        />
        <View style={styles.heroContent}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            {USUARIO.avatar ? (
              <Image source={USUARIO.avatar} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarLetra}>{USUARIO.nome[0]}</Text>
              </View>
            )}
            <TouchableOpacity style={styles.avatarEditBtn}>
              <Ionicons name="camera" size={14} color="#f0eaff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.nome}>{USUARIO.nome}</Text>
          <Text style={styles.username}>{USUARIO.usuario}</Text>
          <Text style={styles.bio}>{USUARIO.bio}</Text>

          <TouchableOpacity style={styles.editarPerfilBtn} onPress={() => setEditando(!editando)}>
            <Ionicons name="pencil-outline" size={14} color="#c9973a" />
            <Text style={styles.editarPerfilText}>Editar perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Engrenagem */}
        <TouchableOpacity style={styles.configBtn} onPress={abrirConfig}>
          <Ionicons name="settings-outline" size={20} color="#6b6585" />
        </TouchableOpacity>
      </View>

      {/* Estatísticas */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumero}>{USUARIO.totalAssistidos}</Text>
          <Text style={styles.statLabel}>Assistidos</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumero}>{USUARIO.totalAvaliacoes}</Text>
          <Text style={styles.statLabel}>Avaliações</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumero}>{USUARIO.totalWatchlist}</Text>
          <Text style={styles.statLabel}>Watchlist</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Top 3 filmes */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Filmes Favoritos</Text>
        <View style={styles.topFilmesRow}>
          {TOP_FILMES.map((f, i) => (
            <TouchableOpacity key={f.id} style={styles.topFilmeCard} onPress={() => router.push(`/filme/${f.id}`)}>
              <View style={styles.topFilmeBadge}>
                <Text style={styles.topFilmeBadgeText}>#{i + 1}</Text>
              </View>
              <Image source={f.poster} style={styles.topFilmePoster} resizeMode="cover" />
              <Text style={styles.topFilmeTitulo} numberOfLines={2}>{f.titulo}</Text>
              <Text style={styles.topFilmeAno}>{f.ano}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.divider} />

      {/* Avaliações recentes */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Avaliações Recentes</Text>
          <TouchableOpacity>
            <Text style={styles.verTodas}>Ver todas</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={AVALIACOES_RECENTES}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push(`/filme/${item.id}`)}>
              <Image source={item.poster} style={styles.avaliacaoPoster} resizeMode="cover" />
              <Estrelas nota={item.nota} />
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.divider} />

      {/* Gêneros favoritos */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Gêneros Favoritos</Text>
        <View style={styles.generosGrid}>
          {GENEROS_FAVORITOS.map((g, i) => (
            <View key={g.label} style={styles.generoChip}>
              <View style={styles.generoChipInner}>
                <Text style={styles.generoChipLabel}>{g.label}</Text>
                <Text style={styles.generoChipPct}>{g.pct}%</Text>
              </View>
              <View style={styles.generoBg}>
                <View style={[styles.generoFill, { width: `${g.pct}%` as any }, i === 0 && styles.generoFillTop]} />
              </View>
            </View>
          ))}
        </View>
      </View>


      <View style={{ height: 56 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d14' },

  // Hero
  heroContainer: { alignItems: 'center', paddingTop: 56, paddingBottom: 28, paddingHorizontal: 22, overflow: 'hidden' },
  heroBgImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%', opacity: 0.35 },
  heroGradient: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  heroContent: { alignItems: 'center' },

  avatarContainer: { position: 'relative', marginBottom: 14 },
  avatar: { width: 84, height: 84, borderRadius: 42 },
  avatarPlaceholder: {
    width: 84, height: 84, borderRadius: 42,
    backgroundColor: '#1c1a2e', justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: '#c9973a',
  },
  avatarLetra: { fontSize: 36, fontWeight: '800', color: '#c9973a' },
  avatarEditBtn: {
    position: 'absolute', bottom: 0, right: 0,
    backgroundColor: '#c9973a', borderRadius: 12, padding: 5,
    borderWidth: 2, borderColor: '#0d0d14',
  },

  nome: { fontSize: 22, fontWeight: '800', color: '#f0eaff', marginBottom: 2 },
  username: { fontSize: 13, color: '#4f4a6a', marginBottom: 10 },
  bio: { fontSize: 14, color: '#8b82a8', textAlign: 'center', lineHeight: 21, marginBottom: 16, paddingHorizontal: 12 },
  editarPerfilBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    borderWidth: 1, borderColor: '#c9973a', borderRadius: 20,
    paddingHorizontal: 16, paddingVertical: 7,
  },
  editarPerfilText: { fontSize: 13, color: '#c9973a', fontWeight: '600' },

  // Stats
  statsRow: {
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
    paddingVertical: 20, paddingHorizontal: 22, gap: 0,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNumero: { fontSize: 24, fontWeight: '800', color: '#f0eaff' },
  statLabel: { fontSize: 11, color: '#4f4a6a', marginTop: 2, letterSpacing: 0.5 },
  statDivider: { width: 1, height: 36, backgroundColor: '#1a1728' },

  divider: { height: 1, backgroundColor: '#1a1728', marginHorizontal: 22 },

  // Seções
  section: { paddingHorizontal: 22, paddingVertical: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  sectionLabel: { fontSize: 10, fontWeight: '700', color: '#c9973a', letterSpacing: 2.5, textTransform: 'uppercase' },
  verTodas: { fontSize: 12, color: '#4f4a6a' },

  // Avaliações recentes
  avaliacaoPoster: { width: 72, height: 108, borderRadius: 6 },

  // Gêneros
  generosGrid: { gap: 8 },
  generoChip: {
    backgroundColor: '#12101f', borderRadius: 10,
    padding: 12, borderWidth: 1, borderColor: '#1e1b30',
  },
  generoChipInner: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  generoChipLabel: { fontSize: 13, color: '#d4cfe8', fontWeight: '600' },
  generoChipPct: { fontSize: 13, color: '#c9973a', fontWeight: '700' },
  generoBg: { height: 3, backgroundColor: '#1e1b30', borderRadius: 2 },
  generoFill: { height: 3, backgroundColor: '#3d3857', borderRadius: 2 },
  generoFillTop: { backgroundColor: '#c9973a' },

  // Top filmes
  topFilmesRow: { flexDirection: 'row', gap: 12 },
  topFilmeCard: { flex: 1, alignItems: 'center' },
  topFilmeBadge: {
    position: 'absolute', top: 6, left: 6, zIndex: 1,
    backgroundColor: 'rgba(13,13,20,0.75)', borderRadius: 6,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  topFilmeBadgeText: { fontSize: 11, fontWeight: '800', color: '#c9973a' },
  topFilmePoster: { width: '100%', height: 130, borderRadius: 8, marginBottom: 6 },
  topFilmeTitulo: { fontSize: 12, fontWeight: '700', color: '#d4cfe8', textAlign: 'center', lineHeight: 16 },
  topFilmeAno: { fontSize: 11, color: '#4f4a6a', marginTop: 2 },

  // Engrenagem
  configBtn: {
    position: 'absolute', top: 52, right: 20,
    backgroundColor: 'rgba(13,13,20,0.5)', borderRadius: 20, padding: 8,
    borderWidth: 1, borderColor: '#2e2b45',
  },

  // Modal
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
  modalSheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#12101f', borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 24, paddingBottom: 48,
    borderWidth: 1, borderColor: '#1e1b30',
    shadowColor: '#000', shadowOffset: { width: 0, height: -8 }, shadowOpacity: 0.5, shadowRadius: 20,
  },
  modalHandle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: '#2e2b45',
    alignSelf: 'center', marginBottom: 20,
  },
  modalTitulo: { fontSize: 18, fontWeight: '800', color: '#f0eaff', marginBottom: 20 },

  // Menu conta
  menuContainer: { gap: 10, marginBottom: 12 },
  menuItem: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#1c1a2e', paddingHorizontal: 16, paddingVertical: 18,
    borderRadius: 12, borderWidth: 1, borderColor: '#2e2b45',
  },
  menuIconWrap: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: '#231e10', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#3a2f10',
  },
  menuTextos: { flex: 1 },
  menuItemText: { fontSize: 15, color: '#d4cfe8', fontWeight: '600' },
  menuItemSub: { fontSize: 12, color: '#4f4a6a', marginTop: 2 },

  menuItemSair: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#150f0f', paddingHorizontal: 16, paddingVertical: 18,
    borderRadius: 12, borderWidth: 1, borderColor: '#2e1a1a',
  },
  menuIconWrapSair: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: '#1f0f0f', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#3a1515',
  },
  menuItemSairText: { fontSize: 15, color: '#7a2020', fontWeight: '600' },
  menuItemSairSub: { fontSize: 12, color: '#3d1a1a', marginTop: 2 },
});
