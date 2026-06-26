import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
interface Filme {
  id: string;
  titulo: string;
  ano?: string; // O '?' significa que é opcional
  poster?: any; // O '?' significa que nem todo filme tem poster
}

// Dados mockados (isso virá do seu backend depois!)
const FILMES_POPULARES = [
  { id: '1', titulo: 'Toy Story 5', ano: '2026',
     poster: require('../../../assets/images/toy-story-5.jpg') },
  { id: '2', titulo: 'Obssesion', ano: '2026',
     poster: require('../../../assets/images/Obssesion.jpg') },
  { id: '3', titulo: 'Backroons', ano: '2026' ,
     poster: require('../../../assets/images/Backroons.jpg') },
  { id: '4', titulo: 'Michael', ano: '2026' ,
     poster: require('../../../assets/images/michael.jpg') },
  { id: '5', titulo: 'Project Hail Mary', ano: '2026' ,
     poster: require('../../../assets/images/project-hail-mary.jpg') },
  { id: '6', titulo: 'Todo mundo em panico 6', ano: '2026' ,
     poster: require('../../../assets/images/scary-movie.jpg') },
];
const FILMES_POR_GENERO = [
    { id: '10', titulo: 'Interstellar', 
      poster: require('../../../assets/images/interstellar.jpg')},
    { id: '11', titulo: 'Tudo em Todo Lugar ao Mesmo Tempo',
      poster: require('../../../assets/images/everything-everywhere-all-at-once.jpg') }, 
    { id: '12', titulo: 'Brilho Eterno de Uma mente sem Lembranças',
      poster: require('../../../assets/images/eternal-sunshine.jpg') },
    { id: '13', titulo: 'Duna',
      poster: require('../../../assets/images/duna.jpg') },
    { id: '14', titulo: 'A Substância',
      poster: require('../../../assets/images/the-substance.jpg') },
    { id: '15', titulo: 'Homem-Aranha no Aranhaverso',
      poster: require('../../../assets/images/spider-man-into-the-spider-verse.jpg') }];
    
const FILMES_SIMILARES = [
     
    { id: '21', titulo: 'Blade Runner 2049' ,
      poster: require('../../../assets/images/blade-runner-2049.jpg') },
    { id: '22', titulo: 'Tenet' ,
      poster: require('../../../assets/images/tenet.jpg') },
    { id: '23', titulo: 'Exterminador do futuro' ,
      poster: require('../../../assets/images/the-terminator.jpg') },
    { id: '24', titulo: 'Mad Max: Estrada da Furia' ,
      poster: require('../../../assets/images/mad-max-fury-road.jpg') },
    { id: '25', titulo: 'Planeta dos Macacos' ,
      poster: require('../../../assets/images/planet-of-the-apes.jpg'), },
    { id: '26', titulo: 'Inception' ,
      poster: require('../../../assets/images/inception.jpg') },];

// Componente de Carrossel reutilizável
const FilmeCarousel = ({ titulo, data }: { titulo: string, data: Filme[] }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{titulo}</Text>
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.carouselContainer}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.card}>
          {/* Lógica: Se o item tiver 'poster', mostra a imagem, senão mostra o placeholder */}
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

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <FilmeCarousel titulo="POPULARES ESSA SEMANA" data={FILMES_POPULARES} />
      <FilmeCarousel titulo="PORQUE VOCÊ AMA FICÇÃO CIENTÍFICA" data={FILMES_POR_GENERO} />
      <FilmeCarousel titulo="FÃS DE MATRIX TAMBÉM CURTEM" data={FILMES_SIMILARES} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#14181c' },
  sectionContainer: { marginBottom: 30, marginTop: 20 },
  sectionTitle: { 
    fontSize: 16, fontWeight: 'bold', color: '#9ab0c1', 
    marginLeft: 20, marginBottom: 15, letterSpacing: 1 
  },
  carouselContainer: { paddingLeft: 20 },
  card: { width: 120, marginRight: 15 },
  posterPlaceholder: { width: 120, height: 180, backgroundColor: '#24303c', borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  posterText: { color: '#00e054', fontSize: 40, fontWeight: 'bold' },
  cardText: { color: '#fff', fontSize: 14 },
  poster: { // Adicione isto aqui!
    width: 120,
    height: 180,
    borderRadius: 8,
    marginBottom: 8,
  },
});