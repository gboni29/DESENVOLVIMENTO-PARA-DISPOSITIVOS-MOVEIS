import { createContext, useContext, useState, ReactNode } from 'react';
import { Usuario } from '../services/api';

interface AuthContextData {
  usuario: Usuario | null;
  salvarSessao: (u: Usuario) => Promise<void>;
  limparSessao: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  async function salvarSessao(u: Usuario) {
    setUsuario(u);
    // AsyncStorage será adicionado na T6
  }

  async function limparSessao() {
    setUsuario(null);
  }

  return (
    <AuthContext.Provider value={{ usuario, salvarSessao, limparSessao }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}