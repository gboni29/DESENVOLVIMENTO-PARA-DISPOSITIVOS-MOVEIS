// mobile/src/services/api.ts

const BASE_URL = 'http://localhost:8080/api';// Android Emulator usa 10.0.2.2 para acessar o localhost da máquina host.
// Se for rodar no iPhone físico ou Expo Go, troque pelo IP da sua máquina, ex: 'http://192.168.x.x:8080/api'

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  papel: string; // 'ADMIN' | 'USER'
  criadoEm: string;
}

export interface LoginPayload {
  email: string;
  senha: string;
}

export interface CadastroPayload {
  nome: string;
  email: string;
  senha: string;
}

// Faz login: busca usuário pelo e-mail e valida a senha no client (MVP sem JWT)
export async function loginApi(payload: LoginPayload): Promise<Usuario> {
  const res = await fetch(`${BASE_URL}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const erro = await res.text();
    throw new Error(erro || 'E-mail ou senha inválidos.');
  }

  return res.json();
}

// Cria um novo usuário
export async function cadastrarApi(payload: CadastroPayload): Promise<Usuario> {
  const res = await fetch(`${BASE_URL}/usuarios/cadastro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const erro = await res.text();
    throw new Error(erro || 'Erro ao criar conta. Tente outro e-mail.');
  }

  return res.json();
}