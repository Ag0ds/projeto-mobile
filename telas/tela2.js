import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

export default function Tela2() {
  const route = useRoute(); // Obtém os parâmetros da rota
  const { validCredentials } = route.params || {};
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="user-circle" size={60} color="black" />
        <Text style={styles.nome}>{validCredentials} AMor foda</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Cor de fundo da tela
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20, // Ajuste a margem superior conforme necessário
    marginLeft: 10, // Adiciona um espaço à esquerda do ícone
  },
  nome: {
    marginLeft: 10, // Espaço entre o ícone e o nome
    fontSize: 20,
    fontWeight: 'bold',
    color:'black',
  },
});
