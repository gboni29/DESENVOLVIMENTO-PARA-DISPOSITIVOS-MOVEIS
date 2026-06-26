import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Como estamos sem backend por enquanto, vamos apenas navegar direto!
    console.log("Login mockado para:", email);
    // router.replace('/home'); // Descomentaremos isso quando a tela Home existir
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Text style={styles.logo}>●●● cineList</Text>
        <Text style={styles.subtitle}>Entrar na rede social</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            placeholderTextColor="#667a8a"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>SENHA</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#667a8a"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14181c', // Cor de fundo base do cineList
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#9ab0c1',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: '#9ab0c1',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#24303c',
    color: '#ffffff',
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#00e054', // O verde de destaque
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#14181c',
    fontSize: 16,
    fontWeight: 'bold',
  },
});