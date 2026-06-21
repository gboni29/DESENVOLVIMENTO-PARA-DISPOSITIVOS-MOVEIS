// Services: centraliza todas as chamadas HTTP ao backend.
// As páginas e componentes importam funções daqui — nunca fazem fetch diretamente.

const BASE_URL = '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${path}`);
  return response.json() as Promise<T>;
}

// --- Filmes ---
import type { Avaliacao, Filme, Usuario, WatchlistItem } from '../types';

export const filmesService = {
  listarTodos: () => request<Filme[]>('/filmes'),
  buscarPorId: (id: string) => request<Filme>(`/filmes/${id}`),
  criar: (filme: Omit<Filme, 'id'>) =>
    request<Filme>('/filmes', { method: 'POST', body: JSON.stringify(filme) }),
  atualizar: (id: string, filme: Partial<Filme>) =>
    request<Filme>(`/filmes/${id}`, { method: 'PUT', body: JSON.stringify(filme) }),
  deletar: (id: string) =>
    request<void>(`/filmes/${id}`, { method: 'DELETE' }),
};

// --- Usuários ---
export const usuariosService = {
  listarTodos: () => request<Usuario[]>('/usuarios'),
  buscarPorId: (id: string) => request<Usuario>(`/usuarios/${id}`),
  criar: (usuario: Omit<Usuario, 'id' | 'criadoEm'>) =>
    request<Usuario>('/usuarios', { method: 'POST', body: JSON.stringify(usuario) }),
  atualizar: (id: string, usuario: Partial<Usuario>) =>
    request<Usuario>(`/usuarios/${id}`, { method: 'PUT', body: JSON.stringify(usuario) }),
  deletar: (id: string) =>
    request<void>(`/usuarios/${id}`, { method: 'DELETE' }),
};

// --- Watchlist ---
export const watchlistService = {
  listarPorUsuario: (usuarioId: string) =>
    request<WatchlistItem[]>(`/watchlist/usuario/${usuarioId}`),
  adicionar: (item: Omit<WatchlistItem, 'id' | 'adicionadoEm'>) =>
    request<WatchlistItem>('/watchlist', { method: 'POST', body: JSON.stringify(item) }),
  remover: (id: string) =>
    request<void>(`/watchlist/${id}`, { method: 'DELETE' }),
};

// --- Avaliações ---
export const avaliacoesService = {
  listarPorFilme: (filmeId: string) =>
    request<Avaliacao[]>(`/avaliacoes/filme/${filmeId}`),
  listarPorUsuario: (usuarioId: string) =>
    request<Avaliacao[]>(`/avaliacoes/usuario/${usuarioId}`),
  criar: (avaliacao: Omit<Avaliacao, 'id' | 'criadaEm'>) =>
    request<Avaliacao>('/avaliacoes', { method: 'POST', body: JSON.stringify(avaliacao) }),
  deletar: (id: string) =>
    request<void>(`/avaliacoes/${id}`, { method: 'DELETE' }),
};
