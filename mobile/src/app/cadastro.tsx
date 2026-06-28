import { useState } from 'react';
import {
  KeyboardAvoidingView, Platform, ScrollView,
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CadastroScreen() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarVisivel, setConfirmarVisivel] = useState(false);
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  function forca(): { nivel: number; cor: string; label: string } {
    if (!senha) return { nivel: 0, cor: '#1e1b30', label: '' };
    if (senha.length < 6) return { nivel: 1, cor: '#7a2020', label: 'Fraca' };
    if (senha.length < 10) return { nivel: 2, cor: '#c9973a', label: 'Média' };
    return { nivel: 3, cor: '#4caf7a', label: 'Forte' };
  }

  function validar() {
    if (!nome.trim()) return 'Informe seu nome.';
    if (!email.trim() || !email.includes('@')) return 'E-mail inválido.';
    if (senha.length < 6) return 'Senha deve ter ao menos 6 caracteres.';
    if (senha !== confirmar) return 'As senhas não coincidem.';
    return '';
  }

  function criar() {
    const msg = validar();
    if (msg) { setErro(msg); return; }
    setErro('');
    setCarregando(true);
    // Simula chamada ao backend — substituir por fetch real
    setTimeout(() => {
      setCarregando(false);
      router.replace('/(tabs)/home');
    }, 900);
  }

  const f = forca();

  return (
    <KeyboardAvoidingView style={styles.wrapper} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">

        {/* Cabeçalho */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#f0eaff" />
          </TouchableOpacity>
          <View style={styles.logoArea}>
            <View style={styles.logoIcon}>
              <Ionicons name="film" size={28} color="#c9973a" />
            </View>
            <Text style={styles.logoText}>Cinetrack</Text>
          </View>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Criar conta</Text>
          <Text style={styles.cardSub}>É rápido e gratuito.</Text>

          {/* Nome */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Nome</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="person-outline" size={17} color="#4f4a6a" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Seu nome"
                placeholderTextColor="#3d3857"
                autoCapitalize="words"
                value={nome}
                onChangeText={(t) => { setNome(t); setErro(''); }}
              />
            </View>
          </View>

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
            {/* Barra de força da senha */}
            {senha.length > 0 && (
              <View style={styles.forcaRow}>
                <View style={styles.forcaBars}>
                  {[1, 2, 3].map((n) => (
                    <View
                      key={n}
                      style={[styles.forcaBar, { backgroundColor: n <= f.nivel ? f.cor : '#1e1b30' }]}
                    />
                  ))}
                </View>
                <Text style={[styles.forcaLabel, { color: f.cor }]}>{f.label}</Text>
              </View>
            )}
          </View>

          {/* Confirmar senha */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Confirmar senha</Text>
            <View style={[
              styles.inputWrap,
              confirmar.length > 0 && {
                borderColor: confirmar === senha ? '#4caf7a' : '#7a2020',
              },
            ]}>
              <Ionicons name="lock-closed-outline" size={17} color="#4f4a6a" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#3d3857"
                secureTextEntry={!confirmarVisivel}
                value={confirmar}
                onChangeText={(t) => { setConfirmar(t); setErro(''); }}
              />
              <TouchableOpacity onPress={() => setConfirmarVisivel(!confirmarVisivel)} style={styles.eyeBtn}>
                <Ionicons name={confirmarVisivel ? 'eye-off-outline' : 'eye-outline'} size={18} color="#4f4a6a" />
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

          {/* Botão criar */}
          <TouchableOpacity
            style={[styles.btnPrimario, carregando && styles.btnPrimarioDisabled]}
            onPress={criar}
            disabled={carregando}
          >
            <Text style={styles.btnPrimarioText}>
              {carregando ? 'Criando conta...' : 'Criar conta'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé — voltar para login */}
        <View style={styles.rodape}>
          <Text style={styles.rodapeText}>Já tem uma conta?</Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.rodapeLink}>Entrar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#0d0d14' },
  container: { flexGrow: 1, paddingHorizontal: 24, paddingVertical: 48 },

  // Cabeçalho
  header: { marginBottom: 32 },
  backBtn: {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: '#1c1a2e', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#2e2b45', marginBottom: 28,
  },
  logoArea: { alignItems: 'center' },
  logoIcon: {
    width: 58, height: 58, borderRadius: 16,
    backgroundColor: '#1c1a2e', justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: '#2e2b45', marginBottom: 10,
  },
  logoText: { fontSize: 26, fontWeight: '800', color: '#f0eaff' },

  // Card
  card: {
    backgroundColor: '#12101f', borderRadius: 18,
    padding: 24, borderWidth: 1, borderColor: '#1e1b30', marginBottom: 24,
  },
  cardTitle: { fontSize: 20, fontWeight: '800', color: '#f0eaff', marginBottom: 4 },
  cardSub: { fontSize: 13, color: '#4f4a6a', marginBottom: 24 },

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

  // Força da senha
  forcaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 8 },
  forcaBars: { flexDirection: 'row', gap: 4, flex: 1 },
  forcaBar: { flex: 1, height: 3, borderRadius: 2 },
  forcaLabel: { fontSize: 11, fontWeight: '700', width: 36 },

  // Erro
  erroBox: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: '#150f0f', borderRadius: 8, padding: 10,
    borderWidth: 1, borderColor: '#2e1a1a', marginBottom: 12,
  },
  erroText: { fontSize: 13, color: '#7a2020', flex: 1 },

  // Botão
  btnPrimario: {
    backgroundColor: '#c9973a', borderRadius: 12,
    paddingVertical: 15, alignItems: 'center', marginTop: 4,
  },
  btnPrimarioDisabled: { opacity: 0.6 },
  btnPrimarioText: { fontSize: 16, fontWeight: '800', color: '#0d0d14' },

  // Rodapé
  rodape: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  rodapeText: { fontSize: 14, color: '#4f4a6a' },
  rodapeLink: { fontSize: 14, color: '#c9973a', fontWeight: '700' },
});
