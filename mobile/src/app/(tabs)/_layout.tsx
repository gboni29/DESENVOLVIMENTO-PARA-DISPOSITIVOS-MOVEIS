import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Biblioteca de ícones que já vem no Expo

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      headerShown: false, // Esconde o cabeçalho padrão
      tabBarStyle: { backgroundColor: '#14181c' }, // Cor escura do cineList
      tabBarActiveTintColor: '#00e054', // Verde destaque
      tabBarInactiveTintColor: '#9ab0c1',
    }}>
      <Tabs.Screen 
        name="home" 
        options={{ 
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> 
        }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ 
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} /> 
        }} 
      />
    </Tabs>
  );
}