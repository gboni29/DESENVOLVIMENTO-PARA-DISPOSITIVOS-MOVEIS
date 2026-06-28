import { useMemo, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFilmes } from '../../context/FilmesContext';

type Ordem = 'recentes' | 'nota';
const GENEROS = ['Todos', 'Ficção Científica', 'Ação', 'Terror', 'Drama', 'Animação', 'Comédia', 'Thriller'];

function Estrelas({ total }: { total: number }) {
  const cheias = Math.round(total / 2);
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Ionicons key={n} name={n <= cheias ? 'star' : 'star-outline'} size={11} color={n <= cheias ? '#c9973a' : '#2e2b45'} />
      ))}
    </View>
  );
}

export default function AssistidosScreen() {
  const router = useRouter();
  const { assistidos, removerDosAssistidos } = useFilmes();
  const [ordem, setOrdem] = useState<Ordem>('recentes');
  const [busca, setBusca] = useState('');
  const [generoAtivo, setGeneroAtivo] = useState('Todos');

  const lista = useMemo(() => {
    return [...assistidos]
      .filter((f) => {
        const bateBusca  = f.titulo.toLowerCase().includes(busca.toLowerCase());
        const bateGenero = generoAtivo === 'Todos' || f.genero === generoAtivo;
        return bateBusca && bateGenero;
      })
      .sort((a, b) => ordem === 'nota' ? b.nota - a.nota : 0);
  }, [assistidos, busca, generoAtivo, ordem]);

  const notaMedia = assistidos.length > 0
    ? (assistidos.reduce((acc, f) => acc + f.nota, 0) / assistidos.length).toFixed(1)
    : '—';

  const header = (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Assistidos</Text>
        <View style={styles.headerStats}>
          <View style={styles.statChip}>
            <Ionicons name="film-outline" size={13} color="#c9973a" />
            <Text style={styles.statChipText}>{assistidos.length} filmes</Text>
          </View>
          <View style={styles.statChip}>
            <Ionicons name="star" size={13} color="#c9973a" />
            <Text style={styles.statChipText}>Média {notaMedia}</Text>
          </View>
        </View>
      </View>

      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={17} color="#4f4a6a" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar nos assistidos..."
          placeholderTextColor="#3d3857"
          value={busca}
          onChangeText={setBusca}
        />
        {busca.length > 0 && (
          <TouchableOpacity onPress={() => setBusca('')}>
            <Ionicons name="close-circle" size={17} color="#4f4a6a" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtrosContainer} style={styles.filtrosList}>
        {GENEROS.map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.filtroChip, generoAtivo === g && styles.filtroChipAtivo]}
            onPress={() => setGeneroAtivo(g)}
          >
            <Text style={[styles.filtroText, generoAtivo === g && styles.filtroTextAtivo]}>{g}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.ordemRow}>
        <Text style={styles.ordemLabel}>Ordenar por</Text>
        {(['recentes', 'nota'] as Ordem[]).map((o) => (
          <TouchableOpacity
            key={o}
            style={[styles.ordemBtn, ordem === o && styles.ordemBtnAtivo]}
            onPress={() => setOrdem(o)}
          >
            <Text style={[styles.ordemText, ordem === o && styles.ordemTextAtivo]}>
              {o === 'recentes' ? 'Recentes' : 'Nota'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={lista}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={header}
      contentContainerStyle={styles.listaContainer}
      ItemSeparatorComponent={() => <View style={styles.separador} />}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={
        <View style={styles.vazia}>
          <Ionicons name={assistidos.length === 0 ? 'checkmark-circle-outline' : 'search-outline'} size={52} color="#2e2b45" />
          <Text style={styles.vaziaTitle}>
            {assistidos.length === 0 ? 'Nenhum filme assistido ainda.' : 'Nenhum resultado.'}
          </Text>
          <Text style={styles.vaziaText}>
            {assistidos.length === 0 ? 'Marque filmes na Watchlist como vistos.' : 'Tente outro termo ou filtro.'}
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.8}
          onPress={() => router.push(`/filme/${item.id}`)}
        >
          {item.poster ? (
            <Image source={item.poster} style={styles.poster} resizeMode="cover" />
          ) : (
            <View style={styles.posterPlaceholder}>
              <Text style={styles.posterLetra}>{item.titulo[0]}</Text>
            </View>
          )}
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitulo} numberOfLines={2}>{item.titulo}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{item.ano}</Text>
              <Text style={styles.metaSep}>·</Text>
              <Text style={styles.metaText}>{item.duracao}</Text>
            </View>
            <Text style={styles.genero} numberOfLines={1}>{item.genero}</Text>
            <View style={styles.notaRow}>
              <Estrelas total={item.nota} />
              <Text style={styles.notaNumero}>{item.nota.toFixed(1)}</Text>
            </View>
          </View>
          <View style={styles.acoes}>
            <View style={styles.assistidoBadge}>
              <Ionicons name="checkmark-circle" size={22} color="#c9973a" />
            </View>
            <TouchableOpacity style={styles.removeBtn} onPress={() => removerDosAssistidos(item.id)}>
              <Ionicons name="trash-outline" size={18} color="#3d3857" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d14' },

  header: { paddingTop: 56, paddingBottom: 14, paddingHorizontal: 22 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#f0eaff', letterSpacing: 0.5, marginBottom: 10 },
  headerStats: { flexDirection: 'row', gap: 10 },
  statChip: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: '#1c1a2e', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5,
    borderWidth: 1, borderColor: '#2e2b45',
  },
  statChipText: { fontSize: 12, color: '#b8b0d0', fontWeight: '600' },

  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1c1a2e', borderRadius: 12,
    marginHorizontal: 22, marginBottom: 12,
    paddingHorizontal: 14, paddingVertical: 2,
    borderWidth: 1, borderColor: '#2e2b45',
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: '#d4cfe8', fontSize: 15, paddingVertical: 11 },

  filtrosList: { marginBottom: 12 },
  filtrosContainer: { paddingHorizontal: 22, gap: 8 },
  filtroChip: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
    backgroundColor: '#1c1a2e', borderWidth: 1, borderColor: '#2e2b45',
  },
  filtroChipAtivo: { backgroundColor: '#1e1a0e', borderColor: '#c9973a' },
  filtroText: { fontSize: 13, color: '#6b6585', fontWeight: '600' },
  filtroTextAtivo: { color: '#c9973a' },

  ordemRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 22, marginBottom: 8 },
  ordemLabel: { fontSize: 12, color: '#4f4a6a', marginRight: 4 },
  ordemBtn: {
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20,
    backgroundColor: '#1c1a2e', borderWidth: 1, borderColor: '#2e2b45',
  },
  ordemBtnAtivo: { backgroundColor: '#231e10', borderColor: '#c9973a' },
  ordemText: { fontSize: 12, color: '#6b6585', fontWeight: '600' },
  ordemTextAtivo: { color: '#c9973a' },

  listaContainer: { paddingBottom: 40 },
  separador: { height: 1, backgroundColor: '#1a1728', marginVertical: 2, marginHorizontal: 22 },

  card: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 22, gap: 14 },
  poster: { width: 60, height: 90, borderRadius: 6 },
  posterPlaceholder: {
    width: 60, height: 90, borderRadius: 6,
    backgroundColor: '#1c1a2e', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#2e2b45',
  },
  posterLetra: { color: '#c9973a', fontSize: 22, fontWeight: '800' },

  cardInfo: { flex: 1 },
  cardTitulo: { fontSize: 15, fontWeight: '700', color: '#f0eaff', marginBottom: 4, lineHeight: 20 },
  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  metaText: { fontSize: 12, color: '#4f4a6a' },
  metaSep: { color: '#2e2b45', marginHorizontal: 5, fontSize: 12 },
  genero: { fontSize: 12, color: '#4f4a6a', marginBottom: 8 },
  notaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  notaNumero: { fontSize: 12, color: '#c9973a', fontWeight: '700', marginLeft: 2 },

  acoes: { alignItems: 'center', gap: 12 },
  assistidoBadge: { padding: 4 },
  removeBtn: { padding: 4 },

  vazia: { alignItems: 'center', marginTop: 60, gap: 10 },
  vaziaTitle: { fontSize: 17, fontWeight: '700', color: '#3d3857' },
  vaziaText: { fontSize: 14, color: '#2e2b45', textAlign: 'center', paddingHorizontal: 40 },
});
