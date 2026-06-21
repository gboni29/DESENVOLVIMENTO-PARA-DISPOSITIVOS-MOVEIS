// Types: interfaces TypeScript que espelham os Models do backend.
// Usadas em todo o frontend para garantir tipagem consistente.

export interface Filme {
  id: string;
  titulo: string;
  diretor: string;
  anoLancamento: number;
  generos: string[];
  sinopse: string;
  posterUrl: string;
  duracaoMinutos: number;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  criadoEm: string;
}

export interface WatchlistItem {
  id: string;
  usuarioId: string;
  filmeId: string;
  adicionadoEm: string;
}

export interface Avaliacao {
  id: string;
  usuarioId: string;
  filmeId: string;
  nota: number;
  comentario: string;
  criadaEm: string;
}
