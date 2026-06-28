import { Redirect } from 'expo-router';

// Ponto de entrada: manda direto para o login
export default function Index() {
  return <Redirect href="/login" />;
}
