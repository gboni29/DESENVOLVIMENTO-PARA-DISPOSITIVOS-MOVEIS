import { createContext, useContext, useState, ReactNode } from 'react';

export interface FilmeSalvo {
  id: string;
  titulo: string;
  ano: string;
  genero: string;
  duracao: string;
  nota: number;
  poster?: any;
}

interface FilmesContextType {
  watchlist: FilmeSalvo[];
  assistidos: FilmeSalvo[];
  moverParaAssistidos: (id: string) => void;
  removerDaWatchlist: (id: string) => void;
  removerDosAssistidos: (id: string) => void;
}

const FilmesContext = createContext<FilmesContextType | null>(null);

const WATCHLIST_INICIAL: FilmeSalvo[] = [
  { id: '5',  titulo: 'Project Hail Mary', ano: '2026', genero: 'Ficção Científica',        duracao: '2h 30min', nota: 9.0, poster: require('../../assets/images/project-hail-mary.jpg') },
  { id: '12', titulo: 'Brilho Eterno de Uma Mente sem Lembranças', ano: '2004', genero: 'Drama / Romance', duracao: '1h 48min', nota: 8.3, poster: require('../../assets/images/eternal-sunshine.jpg') },
  { id: '21', titulo: 'Blade Runner 2049',  ano: '2017', genero: 'Ficção Científica',        duracao: '2h 44min', nota: 8.0, poster: require('../../assets/images/blade-runner-2049.jpg') },
  { id: '3',  titulo: 'Backrooms',          ano: '2026', genero: 'Terror',                   duracao: '1h 45min', nota: 7.8, poster: require('../../assets/images/Backroons.jpg') },
];

const ASSISTIDOS_INICIAL: FilmeSalvo[] = [
  { id: '10', titulo: 'Interstellar',  ano: '2014', genero: 'Ficção Científica',      duracao: '2h 49min', nota: 8.7, poster: require('../../assets/images/interstellar.jpg') },
  { id: '26', titulo: 'Inception',     ano: '2010', genero: 'Ficção Científica / Ação', duracao: '2h 28min', nota: 8.8, poster: require('../../assets/images/inception.jpg') },
  { id: '14', titulo: 'A Substância', ano: '2024', genero: 'Terror / Body Horror',   duracao: '2h 21min', nota: 7.4, poster: require('../../assets/images/the-substance.jpg') },
];

export function FilmesProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<FilmeSalvo[]>(WATCHLIST_INICIAL);
  const [assistidos, setAssistidos] = useState<FilmeSalvo[]>(ASSISTIDOS_INICIAL);

  function moverParaAssistidos(id: string) {
    const filme = watchlist.find((f) => f.id === id);
    if (!filme) return;
    setWatchlist((prev) => prev.filter((f) => f.id !== id));
    setAssistidos((prev) => (prev.find((f) => f.id === id) ? prev : [filme, ...prev]));
  }

  function removerDaWatchlist(id: string) {
    setWatchlist((prev) => prev.filter((f) => f.id !== id));
  }

  function removerDosAssistidos(id: string) {
    setAssistidos((prev) => prev.filter((f) => f.id !== id));
  }

  return (
    <FilmesContext.Provider value={{ watchlist, assistidos, moverParaAssistidos, removerDaWatchlist, removerDosAssistidos }}>
      {children}
    </FilmesContext.Provider>
  );
}

export function useFilmes() {
  const ctx = useContext(FilmesContext);
  if (!ctx) throw new Error('useFilmes precisa estar dentro de FilmesProvider');
  return ctx;
}
