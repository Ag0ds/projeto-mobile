import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Tela1() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Dicionário de emails e senhas permitidos
  const [validCredentials, setValidCredentials] = useState({
      'a': '1',
  });
  
  const navigation = useNavigation();

  const handleLogin = () => {
    // Aqui você pode adicionar a lógica de autenticação
    if (validCredentials[email] && validCredentials[email] === password) {
      goTabs(email);
    } else {
      Alert.alert('Erro de login', 'Credenciais inválidas, tente novamente.');
    }
  };

  function goTela4() {
    navigation.navigate('Criar conta',{ validCredentials, setValidCredentials });
  }
  function goTabs() {
    navigation.navigate('Perfil',{validCredentials});
  }

  return (
//criando login e botão de acesso
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
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
      <Text></Text>
      <Button title="Entrar" onPress={handleLogin} /> 
      <Text></Text>
      <Button title="Criar nova conta" onPress={goTela4} />
      <Text style= {styles.direitos} >Todos os direitos reservados a Gabriel e Henrique </Text>
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
  direitos:{
    position:'absolute',
    bottom: 20, 
    left: 0,
    right: 0,
    fontSize: 10,
    textAlign: 'center',
  }
});
