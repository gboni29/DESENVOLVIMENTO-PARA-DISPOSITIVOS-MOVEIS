import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

// Futuramente virão do backend
const TODOS_FILMES: Record<string, {
  titulo: string; ano?: string; sinopse: string; genero: string;
  duracao: string; diretor: string; elenco: string[]; nota: number; poster?: any;
}> = {
  '1':  { titulo: 'Toy Story 5', ano: '2026', sinopse: 'Woody e Buzz retornam em uma nova aventura que desafia os limites da imaginação e da amizade.', genero: 'Animação', duracao: '1h 50min', diretor: 'Andrew Stanton', elenco: ['Tom Hanks', 'Tim Allen', 'Annie Potts'], nota: 8.1, poster: require('../../../assets/images/toy-story-5.jpg') },
  '2':  { titulo: 'Obssesion', ano: '2026', sinopse: 'Um thriller psicológico intenso sobre obsessão, controle e os limites da mente humana.', genero: 'Thriller', duracao: '2h 05min', diretor: 'Desconhecido', elenco: ['A definir'], nota: 7.4, poster: require('../../../assets/images/Obssesion.jpg') },
  '3':  { titulo: 'Backrooms', ano: '2026', sinopse: 'Ao atravessar uma parede errada, um grupo de pessoas é sugado para um labirinto infinito de corredores vazios.', genero: 'Terror', duracao: '1h 45min', diretor: 'Kane Pixels', elenco: ['A definir'], nota: 7.8, poster: require('../../../assets/images/Backroons.jpg') },
  '4':  { titulo: 'Michael', ano: '2026', sinopse: 'O biopic definitivo sobre o Rei do Pop — sua música, seus demônios e sua lenda.', genero: 'Drama / Musical', duracao: '2h 20min', diretor: 'Antoine Fuqua', elenco: ['Jaafar Jackson', 'Nia Long'], nota: 7.2, poster: require('../../../assets/images/michael.jpg') },
  '5':  { titulo: 'Project Hail Mary', ano: '2026', sinopse: 'Um astronauta acorda sozinho em uma nave sem memória da missão. Descobrir o porquê pode salvar a Terra.', genero: 'Ficção Científica', duracao: '2h 30min', diretor: 'Phil Lord', elenco: ['Ryan Gosling'], nota: 9.0, poster: require('../../../assets/images/project-hail-mary.jpg') },
  '6':  { titulo: 'Todo Mundo em Pânico 6', ano: '2026', sinopse: 'A turma mais maluca do cinema está de volta para parodiar tudo que estreou nos últimos anos.', genero: 'Comédia', duracao: '1h 35min', diretor: 'Keenen Ivory Wayans', elenco: ['Marlon Wayans', 'Shawn Wayans'], nota: 5.9, poster: require('../../../assets/images/scary-movie.jpg') },
  '10': { titulo: 'Interstellar', ano: '2014', sinopse: 'Uma equipe de astronautas viaja por um buraco de minhoca em busca de um novo lar para a humanidade.', genero: 'Ficção Científica', duracao: '2h 49min', diretor: 'Christopher Nolan', elenco: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'], nota: 8.7, poster: require('../../../assets/images/interstellar.jpg') },
  '11': { titulo: 'Tudo em Todo Lugar ao Mesmo Tempo', ano: '2022', sinopse: 'Uma lavanderia imigrante precisa conectar universos paralelos para salvar o mundo — e sua família.', genero: 'Ficção Científica / Comédia', duracao: '2h 19min', diretor: 'Daniel Kwan, Daniel Scheinert', elenco: ['Michelle Yeoh', 'Ke Huy Quan', 'Jamie Lee Curtis'], nota: 8.0, poster: require('../../../assets/images/everything-everywhere-all-at-once.jpg') },
  '12': { titulo: 'Brilho Eterno de Uma Mente sem Lembranças', ano: '2004', sinopse: 'Após um término doloroso, um casal apaga as memórias um do outro. Mas será que o amor some junto?', genero: 'Drama / Romance', duracao: '1h 48min', diretor: 'Michel Gondry', elenco: ['Jim Carrey', 'Kate Winslet'], nota: 8.3, poster: require('../../../assets/images/eternal-sunshine.jpg') },
  '13': { titulo: 'Duna', ano: '2021', sinopse: 'O jovem Paul Atreides chega ao planeta mais perigoso do universo para cumprir seu destino.', genero: 'Ficção Científica', duracao: '2h 35min', diretor: 'Denis Villeneuve', elenco: ['Timothée Chalamet', 'Zendaya', 'Oscar Isaac'], nota: 8.0, poster: require('../../../assets/images/duna.jpg') },
  '14': { titulo: 'A Substância', ano: '2024', sinopse: 'Uma celebridade descobre uma droga que cria uma versão mais jovem de si mesma — com consequências horríveis.', genero: 'Terror / Body Horror', duracao: '2h 21min', diretor: 'Coralie Fargeat', elenco: ['Demi Moore', 'Margaret Qualley'], nota: 7.4, poster: require('../../../assets/images/the-substance.jpg') },
  '15': { titulo: 'Homem-Aranha no Aranhaverso', ano: '2018', sinopse: 'Miles Morales encontra outros Homens-Aranha de universos paralelos em uma aventura multidimensional.', genero: 'Animação / Ação', duracao: '1h 57min', diretor: 'Bob Persichetti, Peter Ramsey', elenco: ['Shameik Moore', 'Hailee Steinfeld'], nota: 8.4, poster: require('../../../assets/images/spider-man-into-the-spider-verse.jpg') },
  '21': { titulo: 'Blade Runner 2049', ano: '2017', sinopse: 'Um blade runner descobre um segredo que pode mudar o que resta da sociedade para sempre.', genero: 'Ficção Científica', duracao: '2h 44min', diretor: 'Denis Villeneuve', elenco: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas'], nota: 8.0, poster: require('../../../assets/images/blade-runner-2049.jpg') },
  '22': { titulo: 'Tenet', ano: '2020', sinopse: 'Um agente secreto aprende a manipular o fluxo do tempo para evitar a Terceira Guerra Mundial.', genero: 'Ação / Ficção Científica', duracao: '2h 30min', diretor: 'Christopher Nolan', elenco: ['John David Washington', 'Robert Pattinson'], nota: 7.4, poster: require('../../../assets/images/tenet.jpg') },
  '23': { titulo: 'O Exterminador do Futuro', ano: '1984', sinopse: 'Um robô assassino volta do futuro para eliminar a mãe do líder da resistência humana.', genero: 'Ação / Ficção Científica', duracao: '1h 47min', diretor: 'James Cameron', elenco: ['Arnold Schwarzenegger', 'Linda Hamilton'], nota: 8.1, poster: require('../../../assets/images/the-terminator.jpg') },
  '24': { titulo: 'Mad Max: Estrada da Fúria', ano: '2015', sinopse: 'Em um mundo pós-apocalíptico, Max e Furiosa enfrentam um tirano em uma perseguição sem fim pelo deserto.', genero: 'Ação', duracao: '2h', diretor: 'George Miller', elenco: ['Tom Hardy', 'Charlize Theron'], nota: 8.1, poster: require('../../../assets/images/mad-max-fury-road.jpg') },
  '25': { titulo: 'Planeta dos Macacos', ano: '1968', sinopse: 'Um astronauta pousa em um planeta dominado por primatas inteligentes que escravizam humanos.', genero: 'Ficção Científica', duracao: '1h 52min', diretor: 'Franklin J. Schaffner', elenco: ['Charlton Heston'], nota: 7.7, poster: require('../../../assets/images/planet-of-the-apes.jpg') },
  '26': { titulo: 'Inception', ano: '2010', sinopse: 'Um ladrão especialista em roubar segredos do subconsciente recebe a missão impossível de plantar uma ideia.', genero: 'Ficção Científica / Ação', duracao: '2h 28min', diretor: 'Christopher Nolan', elenco: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page'], nota: 8.8, poster: require('../../../assets/images/inception.jpg') },
};

function EstrelasInterativas({ notaInicial }: { notaInicial: number }) {
  const [selecionada, setSelecionada] = useState(0);
  return (
    <View style={styles.estrelasRow}>
      {[1, 2, 3, 4, 5].map((n) => (
        <TouchableOpacity key={n} onPress={() => setSelecionada(n)} style={styles.estrelaBtn}>
          <Ionicons
            name={n <= selecionada ? 'star' : 'star-outline'}
            size={28}
            color={n <= selecionada ? '#c9973a' : '#3d3857'}
          />
        </TouchableOpacity>
      ))}
      {selecionada > 0 && (
        <Text style={styles.notaSelecionada}>{selecionada * 2}/10</Text>
      )}
    </View>
  );
}

interface Comentario {
  id: string;
  autor: string;
  texto: string;
  nota: number;
  tempo: string;
  curtidas: number;
  curtido: boolean;
}

const COMENTARIOS_MOCK: Record<string, Comentario[]> = {
  '10': [
    { id: 'c1', autor: 'Pedro Lima',    nota: 5, texto: 'Uma obra-prima absoluta. A cena do dock me desfez completamente.', tempo: '2h atrás',   curtidas: 14, curtido: false },
    { id: 'c2', autor: 'Julia Ramos',   nota: 4, texto: 'Roteiro brilhante, trilha sonora então... Hans Zimmer no auge.', tempo: '1d atrás',    curtidas: 8,  curtido: false },
    { id: 'c3', autor: 'Carlos Mendes', nota: 5, texto: 'Assisti três vezes e toda vez choro no final. Perfeito.', tempo: '3d atrás',    curtidas: 21, curtido: false },
  ],
  '26': [
    { id: 'c4', autor: 'Ana Costa',     nota: 5, texto: 'A cena do topo continua sendo uma das melhores da história do cinema.', tempo: '5h atrás',   curtidas: 33, curtido: false },
    { id: 'c5', autor: 'Thiago Silva',  nota: 4, texto: 'Nolan conseguiu criar algo que desafia a percepção da realidade.', tempo: '2d atrás',    curtidas: 9,  curtido: false },
  ],
};

function ComentarioCard({
  item, onCurtir,
}: { item: Comentario; onCurtir: (id: string) => void }) {
  const iniciais = item.autor.split(' ').map((p) => p[0]).join('').slice(0, 2);
  return (
    <View style={stylesC.card}>
      <View style={stylesC.avatarRow}>
        <View style={stylesC.avatar}>
          <Text style={stylesC.avatarText}>{iniciais}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={stylesC.autor}>{item.autor}</Text>
          <View style={stylesC.estrelasRow}>
            {[1, 2, 3, 4, 5].map((n) => (
              <Ionicons key={n} name={n <= item.nota ? 'star' : 'star-outline'} size={10} color={n <= item.nota ? '#c9973a' : '#2e2b45'} />
            ))}
          </View>
        </View>
        <Text style={stylesC.tempo}>{item.tempo}</Text>
      </View>
      <Text style={stylesC.texto}>{item.texto}</Text>
      <TouchableOpacity style={stylesC.curtirBtn} onPress={() => onCurtir(item.id)}>
        <Ionicons name={item.curtido ? 'heart' : 'heart-outline'} size={14} color={item.curtido ? '#c9973a' : '#3d3857'} />
        <Text style={[stylesC.curtirText, item.curtido && stylesC.curtidoText]}>{item.curtidas}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function FilmeDetalhes() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const filme = TODOS_FILMES[id];
  const [naWatchlist, setNaWatchlist] = useState(false);
  const [assistido, setAssistido] = useState(false);
  const [likes, setLikes] = useState(128);
  const [curtido, setCurtido] = useState(false);
  const [comentarios, setComentarios] = useState<Comentario[]>(COMENTARIOS_MOCK[id] ?? []);
  const [novoComentario, setNovoComentario] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  function curtir(cid: string) {
    setComentarios((prev) =>
      prev.map((c) =>
        c.id === cid ? { ...c, curtido: !c.curtido, curtidas: c.curtido ? c.curtidas - 1 : c.curtidas + 1 } : c
      )
    );
  }

  function publicar() {
    const texto = novoComentario.trim();
    if (!texto) return;
    const novo: Comentario = {
      id: `c${Date.now()}`,
      autor: 'Usuário',
      nota: 0,
      texto,
      tempo: 'agora',
      curtidas: 0,
      curtido: false,
    };
    setComentarios((prev) => [novo, ...prev]);
    setNovoComentario('');
  }

  if (!filme) {
    return (
      <View style={styles.container}>
        <Text style={styles.erroText}>Filme não encontrado.</Text>
      </View>
    );
  }

  const notaArredondada = filme.nota.toFixed(1);
  const notaPct = (filme.nota / 10) * 100;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView ref={scrollRef} style={styles.container} bounces={false}>

      {/* Hero: poster com gradiente saindo para o fundo da página */}
      <View style={styles.heroContainer}>
        {filme.poster && (
          <Image source={filme.poster} style={styles.heroBg} resizeMode="cover" />
        )}
        {/* Gradiente: cor original no topo → fundo da página embaixo */}
        <LinearGradient
          colors={['transparent', 'rgba(13,13,20,0.7)', '#0d0d14']}
          locations={[0, 0.55, 1]}
          style={styles.heroGradient}
        />
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#f0eaff" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo sobreposto ao gradiente */}
      <View style={styles.content}>

        {/* Título + meta */}
        <Text style={styles.titulo}>{filme.titulo}</Text>
        <View style={styles.metaRow}>
          {filme.ano && <Text style={styles.metaText}>{filme.ano}</Text>}
          {filme.ano && <Text style={styles.metaSep}>·</Text>}
          <Text style={styles.metaText}>{filme.duracao}</Text>
          <Text style={styles.metaSep}>·</Text>
          <Text style={styles.metaGenero}>{filme.genero}</Text>
        </View>

        {/* Nota + ações rápidas */}
        <View style={styles.actionsRow}>
          {/* Nota */}
          <View style={styles.notaBox}>
            <Text style={styles.notaNumero}>{notaArredondada}</Text>
            <View style={styles.barBg}>
              <View style={[styles.barFill, { width: `${notaPct}%` as any }]} />
            </View>
            <Text style={styles.notaLabel}>nota</Text>
          </View>

          <View style={styles.botoesRow}>
            {/* Watchlist */}
            <TouchableOpacity
              style={[styles.actionBtn, naWatchlist && styles.actionBtnActive]}
              onPress={() => setNaWatchlist(!naWatchlist)}
            >
              <Ionicons name={naWatchlist ? 'bookmark' : 'bookmark-outline'} size={17} color={naWatchlist ? '#c9973a' : '#6b6585'} />
              <Text style={[styles.actionBtnText, naWatchlist && styles.actionBtnTextActive]}>
                {naWatchlist ? 'Salvo' : 'Watchlist'}
              </Text>
            </TouchableOpacity>

            {/* Assistido */}
            <TouchableOpacity
              style={[styles.actionBtn, assistido && styles.actionBtnActive]}
              onPress={() => setAssistido(!assistido)}
            >
              <Ionicons name={assistido ? 'checkmark-circle' : 'checkmark-circle-outline'} size={17} color={assistido ? '#c9973a' : '#6b6585'} />
              <Text style={[styles.actionBtnText, assistido && styles.actionBtnTextActive]}>
                {assistido ? 'Visto' : 'Marcar'}
              </Text>
            </TouchableOpacity>

            {/* Like */}
            <TouchableOpacity
              style={[styles.actionBtn, curtido && styles.actionBtnActive]}
              onPress={() => { setCurtido(!curtido); setLikes((n) => curtido ? n - 1 : n + 1); }}
            >
              <Ionicons name={curtido ? 'heart' : 'heart-outline'} size={17} color={curtido ? '#c9973a' : '#6b6585'} />
              <Text style={[styles.actionBtnText, curtido && styles.actionBtnTextActive]}>{likes}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Sinopse */}
        <Text style={styles.sectionLabel}>Sinopse</Text>
        <Text style={styles.sinopse}>{filme.sinopse}</Text>

        <View style={styles.divider} />

        {/* Ficha técnica */}
        <Text style={styles.sectionLabel}>Ficha Técnica</Text>
        <View style={styles.fichaRow}>
          <Text style={styles.fichaChave}>Direção</Text>
          <Text style={styles.fichaValor}>{filme.diretor}</Text>
        </View>
        <View style={styles.fichaRow}>
          <Text style={styles.fichaChave}>Elenco</Text>
          <Text style={styles.fichaValor}>{filme.elenco.join(', ')}</Text>
        </View>
        <View style={styles.fichaRow}>
          <Text style={styles.fichaChave}>Duração</Text>
          <Text style={styles.fichaValor}>{filme.duracao}</Text>
        </View>
        <View style={styles.fichaRow}>
          <Text style={styles.fichaChave}>Gênero</Text>
          <Text style={styles.fichaValor}>{filme.genero}</Text>
        </View>

        <View style={styles.divider} />

        {/* Avaliação interativa */}
        <Text style={styles.sectionLabel}>Sua Avaliação</Text>
        <Text style={styles.avaliacaoHint}>Toque nas estrelas para avaliar</Text>
        <EstrelasInterativas notaInicial={0} />

        <View style={styles.divider} />

        {/* Compartilhar */}
        <TouchableOpacity style={styles.compartilharBtn}>
          <Ionicons name="share-social-outline" size={18} color="#8b82a8" />
          <Text style={styles.compartilharText}>Compartilhar este filme</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        {/* Comentários */}
        <View style={stylesC.sectionHeader}>
          <Text style={styles.sectionLabel}>Comentários</Text>
          <Text style={stylesC.contador}>{comentarios.length}</Text>
        </View>

        {/* Campo de novo comentário */}
        <View style={stylesC.inputRow}>
          <View style={stylesC.inputAvatar}>
            <Text style={stylesC.inputAvatarText}>U</Text>
          </View>
          <TextInput
            style={stylesC.input}
            placeholder="Escreva um comentário..."
            placeholderTextColor="#3d3857"
            value={novoComentario}
            onChangeText={setNovoComentario}
            multiline
            maxLength={300}
          />
          <TouchableOpacity
            style={[stylesC.enviarBtn, novoComentario.trim().length > 0 && stylesC.enviarBtnAtivo]}
            onPress={publicar}
            disabled={novoComentario.trim().length === 0}
          >
            <Ionicons name="send" size={16} color={novoComentario.trim().length > 0 ? '#c9973a' : '#2e2b45'} />
          </TouchableOpacity>
        </View>

        {/* Lista de comentários */}
        {comentarios.length === 0 ? (
          <View style={stylesC.vazio}>
            <Text style={stylesC.vazioText}>Seja o primeiro a comentar.</Text>
          </View>
        ) : (
          <View style={{ gap: 2 }}>
            {comentarios.map((c) => (
              <ComentarioCard key={c.id} item={c} onCurtir={curtir} />
            ))}
          </View>
        )}

        <View style={{ height: 48 }} />
      </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d0d14' },

  // Hero
  heroContainer: { width: '100%', height: 340, position: 'relative' },
  heroBg: { position: 'absolute', width: '100%', height: '100%' },
  heroGradient: { position: 'absolute', width: '100%', height: '100%' },
  backBtn: {
    position: 'absolute', top: 52, left: 16, zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.45)', borderRadius: 20, padding: 7,
  },

  // Conteúdo
  content: { paddingHorizontal: 22, marginTop: -24 },

  titulo: { fontSize: 26, fontWeight: '800', color: '#f0eaff', marginBottom: 8, lineHeight: 32 },

  metaRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap' },
  metaText: { fontSize: 13, color: '#6b6585' },
  metaSep: { color: '#2e2b45', marginHorizontal: 7, fontSize: 13 },
  metaGenero: { fontSize: 13, color: '#8b82a8' },

  // Ações
  actionsRow: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 24 },
  notaBox: { alignItems: 'center', gap: 4 },
  notaNumero: { fontSize: 30, fontWeight: '800', color: '#c9973a', lineHeight: 34 },
  notaLabel: { fontSize: 9, color: '#4f4a6a', letterSpacing: 1, textTransform: 'uppercase' },
  barBg: { width: 44, height: 3, backgroundColor: '#1e1b30', borderRadius: 2 },
  barFill: { height: 3, backgroundColor: '#c9973a', borderRadius: 2 },

  botoesRow: { flex: 1, flexDirection: 'row', gap: 8 },
  actionBtn: {
    flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5,
    backgroundColor: '#1c1a2e', borderRadius: 8, paddingVertical: 8,
    borderWidth: 1, borderColor: '#2e2b45',
  },
  actionBtnActive: { borderColor: '#c9973a', backgroundColor: '#1e1a0e' },
  actionBtnText: { fontSize: 11, color: '#6b6585', fontWeight: '600' },
  actionBtnTextActive: { color: '#c9973a' },

  divider: { height: 1, backgroundColor: '#1a1728', marginVertical: 22 },

  sectionLabel: {
    fontSize: 10, fontWeight: '700', color: '#c9973a',
    letterSpacing: 2.5, textTransform: 'uppercase', marginBottom: 12,
  },

  sinopse: { fontSize: 15, color: '#b8b0d0', lineHeight: 25 },

  // Ficha técnica
  fichaRow: { flexDirection: 'row', marginBottom: 10, gap: 12 },
  fichaChave: { width: 68, fontSize: 13, color: '#4f4a6a', fontWeight: '600' },
  fichaValor: { flex: 1, fontSize: 13, color: '#b8b0d0', lineHeight: 20 },

  // Estrelas
  avaliacaoHint: { fontSize: 13, color: '#4f4a6a', marginBottom: 14 },
  estrelasRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  estrelaBtn: { padding: 4 },
  notaSelecionada: { fontSize: 15, color: '#c9973a', fontWeight: '700', marginLeft: 10 },

  // Compartilhar
  compartilharBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#1c1a2e', borderRadius: 10, padding: 14,
    borderWidth: 1, borderColor: '#2e2b45',
  },
  compartilharText: { color: '#6b6585', fontSize: 14 },

  erroText: { color: '#6b6585', textAlign: 'center', marginTop: 100, fontSize: 16 },
});

const stylesC = StyleSheet.create({
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 16 },
  contador: {
    fontSize: 12, fontWeight: '700', color: '#4f4a6a',
    backgroundColor: '#1c1a2e', paddingHorizontal: 8, paddingVertical: 2,
    borderRadius: 10, borderWidth: 1, borderColor: '#2e2b45',
  },

  // Campo de input
  inputRow: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 10,
    backgroundColor: '#1c1a2e', borderRadius: 14, padding: 12,
    borderWidth: 1, borderColor: '#2e2b45', marginBottom: 20,
  },
  inputAvatar: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#231e10', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#c9973a',
  },
  inputAvatarText: { fontSize: 13, fontWeight: '800', color: '#c9973a' },
  input: {
    flex: 1, color: '#d4cfe8', fontSize: 14, lineHeight: 20,
    maxHeight: 100, paddingTop: 6,
  },
  enviarBtn: { padding: 6, borderRadius: 20 },
  enviarBtnAtivo: { backgroundColor: '#231e10' },

  // Card de comentário
  card: {
    backgroundColor: '#1c1a2e', borderRadius: 12,
    padding: 14, marginBottom: 10,
    borderWidth: 1, borderColor: '#2e2b45',
  },
  avatarRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  avatar: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#12101f', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#2e2b45',
  },
  avatarText: { fontSize: 12, fontWeight: '800', color: '#8b82a8' },
  autor: { fontSize: 13, fontWeight: '700', color: '#d4cfe8', marginBottom: 3 },
  estrelasRow: { flexDirection: 'row', gap: 2 },
  tempo: { fontSize: 11, color: '#3d3857' },
  texto: { fontSize: 14, color: '#b8b0d0', lineHeight: 21, marginBottom: 10 },
  curtirBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, alignSelf: 'flex-start' },
  curtirText: { fontSize: 12, color: '#3d3857', fontWeight: '600' },
  curtidoText: { color: '#c9973a' },

  vazio: { paddingVertical: 24, alignItems: 'center' },
  vazioText: { fontSize: 14, color: '#3d3857' },
});
