import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function CriarConta({ route, navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Recebendo validCredentials e setValidCredentials da tela de login
  const { validCredentials, setValidCredentials } = route.params || {};

  const handleCreateAccount = () => {
    if (!validCredentials || !setValidCredentials) {
      Alert.alert('Erro', 'Dados de login não disponíveis.');
      return;
    }

    if (email in validCredentials) {
      Alert.alert('Erro', 'O e-mail já está em uso.');
      return;
    }
    if (email === '' || password === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    setValidCredentials({ ...validCredentials, [email]: password });
    Alert.alert('Sucesso', 'Conta criada com sucesso!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="login"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Criar Conta" onPress={handleCreateAccount} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
