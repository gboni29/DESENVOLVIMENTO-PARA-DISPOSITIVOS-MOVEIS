import { useState } from 'react';
import {
  KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { loginApi } from '../services/api';
import { useAuth } from '../context/AuthContext';


export default function LoginScreen() {
  const { salvarSessao } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  function validar() {
    if (!email.trim()) return 'Informe seu e-mail.';
    if (!email.includes('@')) return 'E-mail inválido.';
    if (!senha) return 'Informe sua senha.';
    if (senha.length < 6) return 'Senha deve ter ao menos 6 caracteres.';
    return '';
  }

  async function entrar() {
    const msg = validar();
    if (msg) { setErro(msg); return; }
    setErro('');
    setCarregando(true);
    try {
      const usuario = await loginApi({ email: email.trim(), senha });
      await salvarSessao(usuario);
      router.replace('/(tabs)/home');
    } catch (e: any) {
      setErro(e.message ?? 'Erro ao conectar com o servidor.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

        {/* Logo / título */}
        <View style={styles.logoArea}>
          <View style={styles.logoIcon}>
            <Ionicons name="film" size={32} color="#c9973a" />
          </View>
          <Text style={styles.logoText}>Cinetrack</Text>
          <Text style={styles.logoSub}>Seu diário de cinema.</Text>
        </View>

        {/* Card do formulário */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Entrar</Text>

          {/* E-mail */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>E-mail</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="mail-outline" size={17} color="#4f4a6a" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                placeholderTextColor="#3d3857"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(t) => { setEmail(t); setErro(''); }}
              />
            </View>
          </View>

          {/* Senha */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="lock-closed-outline" size={17} color="#4f4a6a" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#3d3857"
                secureTextEntry={!senhaVisivel}
                value={senha}
                onChangeText={(t) => { setSenha(t); setErro(''); }}
              />
              <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)} style={styles.eyeBtn}>
                <Ionicons name={senhaVisivel ? 'eye-off-outline' : 'eye-outline'} size={18} color="#4f4a6a" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Erro */}
          {erro !== '' && (
            <View style={styles.erroBox}>
              <Ionicons name="alert-circle-outline" size={14} color="#7a2020" />
              <Text style={styles.erroText}>{erro}</Text>
            </View>
          )}

          {/* Esqueci a senha */}
          <TouchableOpacity style={styles.esqueciBtn}>
            <Text style={styles.esqueciText}>Esqueci minha senha</Text>
          </TouchableOpacity>

          {/* Botão entrar */}
          <TouchableOpacity
            style={[styles.btnPrimario, carregando && styles.btnPrimarioDisabled]}
            onPress={entrar}
            disabled={carregando}
          >
            {carregando
              ? <Text style={styles.btnPrimarioText}>Entrando...</Text>
              : <Text style={styles.btnPrimarioText}>Entrar</Text>
            }
          </TouchableOpacity>
        </View>

        {/* Rodapé — ir para cadastro */}
        <View style={styles.rodape}>
          <Text style={styles.rodapeText}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => router.push('/cadastro')}>
            <Text style={styles.rodapeLink}>Criar conta</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#0d0d14' },
  container: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 48 },

  // Logo
  logoArea: { alignItems: 'center', marginBottom: 36 },
  logoIcon: {
    width: 68, height: 68, borderRadius: 20,
    backgroundColor: '#1c1a2e', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#2e2b45', marginBottom: 14,
  },
  logoText: { fontSize: 30, fontWeight: '800', color: '#f0eaff', letterSpacing: 0.5 },
  logoSub: { fontSize: 14, color: '#4f4a6a', marginTop: 4 },

  // Card
  card: {
    backgroundColor: '#12101f', borderRadius: 18,
    padding: 24, borderWidth: 1, borderColor: '#1e1b30',
    marginBottom: 24,
  },
  cardTitle: { fontSize: 20, fontWeight: '800', color: '#f0eaff', marginBottom: 24 },

  // Campos
  fieldGroup: { marginBottom: 16 },
  label: { fontSize: 12, fontWeight: '700', color: '#6b6585', letterSpacing: 0.5, marginBottom: 8 },
  inputWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1c1a2e', borderRadius: 10,
    borderWidth: 1, borderColor: '#2e2b45', paddingHorizontal: 12,
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, color: '#d4cfe8', fontSize: 15, paddingVertical: 13 },
  eyeBtn: { padding: 4 },

  // Erro
  erroBox: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#150f0f', borderRadius: 8, padding: 10,
    borderWidth: 1, borderColor: '#2e1a1a', marginBottom: 12,
  },
  erroText: { fontSize: 13, color: '#7a2020', flex: 1 },

  // Esqueci
  esqueciBtn: { alignSelf: 'flex-end', marginBottom: 20 },
  esqueciText: { fontSize: 12, color: '#4f4a6a' },

  // Botão
  btnPrimario: {
    backgroundColor: '#c9973a', borderRadius: 12,
    paddingVertical: 15, alignItems: 'center',
  },
  btnPrimarioDisabled: { opacity: 0.6 },
  btnPrimarioText: { fontSize: 16, fontWeight: '800', color: '#0d0d14' },

  // Rodapé
  rodape: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  rodapeText: { fontSize: 14, color: '#4f4a6a' },
  rodapeLink: { fontSize: 14, color: '#c9973a', fontWeight: '700' },
});
