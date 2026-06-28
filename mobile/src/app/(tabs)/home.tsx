import { useState, useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Filme {
  id: string;
  titulo: string;
  ano?: string;
  genero: string;
  poster?: any;
}

const TODOS_OS_FILMES: Filme[] = [
  { id: '1',  titulo: 'Toy Story 5',                             ano: '2026', genero: 'Animação',          poster: require('../../../assets/images/toy-story-5.jpg') },
  { id: '2',  titulo: 'Obssesion',                               ano: '2026', genero: 'Thriller',          poster: require('../../../assets/images/Obssesion.jpg') },
  { id: '3',  titulo: 'Backrooms',                               ano: '2026', genero: 'Terror',            poster: require('../../../assets/images/Backroons.jpg') },
  { id: '4',  titulo: 'Michael',                                 ano: '2026', genero: 'Drama',             poster: require('../../../assets/images/michael.jpg') },
  { id: '5',  titulo: 'Project Hail Mary',                       ano: '2026', genero: 'Ficção Científica', poster: require('../../../assets/images/project-hail-mary.jpg') },
  { id: '6',  titulo: 'Todo Mundo em Pânico 6',                  ano: '2026', genero: 'Comédia',           poster: require('../../../assets/images/scary-movie.jpg') },
  { id: '10', titulo: 'Interstellar',                            ano: '2014', genero: 'Ficção Científica', poster: require('../../../assets/images/interstellar.jpg') },
  { id: '11', titulo: 'Tudo em Todo Lugar ao Mesmo Tempo',       ano: '2022', genero: 'Ficção Científica', poster: require('../../../assets/images/everything-everywhere-all-at-once.jpg') },
  { id: '12', titulo: 'Brilho Eterno de Uma Mente sem Lembranças', ano: '2004', genero: 'Drama',           poster: require('../../../assets/images/eternal-sunshine.jpg') },
  { id: '13', titulo: 'Duna',                                    ano: '2021', genero: 'Ficção Científica', poster: require('../../../assets/images/duna.jpg') },
  { id: '14', titulo: 'A Substância',                            ano: '2024', genero: 'Terror',            poster: require('../../../assets/images/the-substance.jpg') },
  { id: '15', titulo: 'Homem-Aranha no Aranhaverso',             ano: '2018', genero: 'Animação',          poster: require('../../../assets/images/spider-man-into-the-spider-verse.jpg') },
  { id: '21', titulo: 'Blade Runner 2049',                       ano: '2017', genero: 'Ficção Científica', poster: require('../../../assets/images/blade-runner-2049.jpg') },
  { id: '22', titulo: 'Tenet',                                   ano: '2020', genero: 'Ação',              poster: require('../../../assets/images/tenet.jpg') },
  { id: '23', titulo: 'Exterminador do Futuro',                  ano: '1984', genero: 'Ação',              poster: require('../../../assets/images/the-terminator.jpg') },
  { id: '24', titulo: 'Mad Max: Estrada da Fúria',               ano: '2015', genero: 'Ação',              poster: require('../../../assets/images/mad-max-fury-road.jpg') },
  { id: '25', titulo: 'Planeta dos Macacos',                     ano: '1968', genero: 'Ficção Científica', poster: require('../../../assets/images/planet-of-the-apes.jpg') },
  { id: '26', titulo: 'Inception',                               ano: '2010', genero: 'Ficção Científica', poster: require('../../../assets/images/inception.jpg') },
];

const GENEROS = ['Todos', 'Ficção Científica', 'Ação', 'Terror', 'Drama', 'Animação', 'Comédia', 'Thriller'];

const POPULARES  = TODOS_OS_FILMES.filter((f) => ['1','2','3','4','5','6'].includes(f.id));
const POR_GENERO = TODOS_OS_FILMES.filter((f) => ['10','11','12','13','14','15'].includes(f.id));
const SIMILARES  = TODOS_OS_FILMES.filter((f) => ['21','22','23','24','25','26'].includes(f.id));

const FilmeCarousel = ({ titulo, data }: { titulo: string; data: Filme[] }) => {
  const router = useRouter();
  if (data.length === 0) return null;
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{titulo}</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carouselContainer}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => router.push(`/filme/${item.id}`)}>
            {item.poster ? (
              <Image source={item.poster} style={styles.poster} />
            ) : (
              <View style={styles.posterPlaceholder}>
                <Text style={styles.posterText}>{item.titulo[0]}</Text>
              </View>
            )}
            <Text style={styles.cardText} numberOfLines={1}>{item.titulo}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const FilmeGrid = ({ data }: { data: Filme[] }) => {
  const router = useRouter();
  if (data.length === 0) {
    return (
      <View style={styles.semResultados}>
        <Ionicons name="search-outline" size={40} color="#2e2b45" />
        <Text style={styles.semResultadosText}>Nenhum filme encontrado.</Text>
      </View>
    );
  }
  return (
    <View style={styles.grid}>
      {data.map((item) => (
        <TouchableOpacity key={item.id} style={styles.gridCard} onPress={() => router.push(`/filme/${item.id}`)}>
          {item.poster ? (
            <Image source={item.poster} style={styles.gridPoster} />
          ) : (
            <View style={[styles.gridPoster, styles.posterPlaceholder]}>
              <Text style={styles.posterText}>{item.titulo[0]}</Text>
            </View>
          )}
          <Text style={styles.gridCardText} numberOfLines={2}>{item.titulo}</Text>
          <Text style={styles.gridCardAno}>{item.ano}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function HomeScreen() {
  const [busca, setBusca] = useState('');
  const [generoAtivo, setGeneroAtivo] = useState('Todos');
  const buscando = busca.trim().length > 0 || generoAtivo !== 'Todos';

  const resultados = useMemo(() => {
    return TODOS_OS_FILMES.filter((f) => {
      const bateGenero = generoAtivo === 'Todos' || f.genero === generoAtivo;
      const bateBusca  = f.titulo.toLowerCase().includes(busca.toLowerCase());
      return bateGenero && bateBusca;
    });
  }, [busca, generoAtivo]);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Cinetrack</Text>
        <Text style={styles.headerSub}>o que assistir hoje?</Text>
      </View>

      {/* Searchbar */}
      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={17} color="#4f4a6a" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar filmes..."
          placeholderTextColor="#3d3857"
          value={busca}
          onChangeText={setBusca}
          returnKeyType="search"
        />
        {busca.length > 0 && (
          <TouchableOpacity onPress={() => setBusca('')}>
            <Ionicons name="close-circle" size={17} color="#4f4a6a" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filtro de gêneros */}
      <FlatList
        horizontal
        data={GENEROS}
        keyExtractor={(g) => g}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtrosContainer}
        style={styles.filtrosList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.filtroChip, generoAtivo === item && styles.filtroChipAtivo]}
            onPress={() => setGeneroAtivo(item)}
          >
            <Text style={[styles.filtroText, generoAtivo === item && styles.filtroTextAtivo]}>
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Conteúdo: grade de busca ou carrosséis normais */}
      {buscando ? (
        <View style={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 }}>
          <Text style={styles.resultadosLabel}>
            {resultados.length} {resultados.length === 1 ? 'resultado' : 'resultados'}
          </Text>
          <FilmeGrid data={resultados} />
        </View>
      ) : (
        <>
          <FilmeCarousel titulo="Populares essa semana"               data={POPULARES} />
          <FilmeCarousel titulo="Porque você ama ficção científica"   data={POR_GENERO} />
          <FilmeCarousel titulo="Fãs de Matrix também curtem"         data={SIMILARES} />
          <View style={{ height: 24 }} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d14' },

  header: { paddingTop: 56, paddingBottom: 16, paddingHorizontal: 20 },
  headerTitle: { fontSize: 28, fontWeight: '800', color: '#f0eaff', letterSpacing: 0.5 },
  headerSub: { fontSize: 13, color: '#6b6585', marginTop: 2 },

  // Searchbar
  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1c1a2e', borderRadius: 12,
    marginHorizontal: 20, marginBottom: 14,
    paddingHorizontal: 14, paddingVertical: 2,
    borderWidth: 1, borderColor: '#2e2b45',
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, color: '#d4cfe8', fontSize: 15, paddingVertical: 11 },

  // Filtros
  filtrosList: { marginBottom: 4 },
  filtrosContainer: { paddingHorizontal: 20, gap: 8, paddingBottom: 8 },
  filtroChip: {
    paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20,
    backgroundColor: '#1c1a2e', borderWidth: 1, borderColor: '#2e2b45',
  },
  filtroChipAtivo: { backgroundColor: '#1e1a0e', borderColor: '#c9973a' },
  filtroText: { fontSize: 13, color: '#6b6585', fontWeight: '600' },
  filtroTextAtivo: { color: '#c9973a' },

  // Resultado label
  resultadosLabel: { fontSize: 12, color: '#4f4a6a', marginBottom: 16 },

  // Grid de resultados
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  gridCard: { width: '30%' },
  gridPoster: { width: '100%', height: 150, borderRadius: 8, marginBottom: 6 },
  gridCardText: { color: '#d4cfe8', fontSize: 12, lineHeight: 16, fontWeight: '600' },
  gridCardAno: { color: '#4f4a6a', fontSize: 11, marginTop: 2 },

  // Carrossel
  sectionContainer: { marginBottom: 32, marginTop: 20 },
  sectionTitle: {
    fontSize: 11, fontWeight: '700', color: '#c9973a',
    marginLeft: 20, marginBottom: 14, letterSpacing: 2.5, textTransform: 'uppercase',
  },
  carouselContainer: { paddingLeft: 20 },
  card: { width: 115, marginRight: 14 },
  posterPlaceholder: {
    width: 115, height: 172, backgroundColor: '#1c1a2e', borderRadius: 6,
    justifyContent: 'center', alignItems: 'center', marginBottom: 8,
    borderWidth: 1, borderColor: '#2e2b45',
  },
  posterText: { color: '#c9973a', fontSize: 38, fontWeight: 'bold' },
  cardText: { color: '#d4cfe8', fontSize: 12, lineHeight: 17 },
  poster: { width: 115, height: 172, borderRadius: 6, marginBottom: 8 },

  // Sem resultados
  semResultados: { alignItems: 'center', paddingTop: 48, gap: 12 },
  semResultadosText: { fontSize: 14, color: '#2e2b45' },
});
