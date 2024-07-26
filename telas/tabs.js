import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebase';

initializeApp(firebaseConfig);

const Tab = createBottomTabNavigator();

import Tela2 from './tela2';
import Tela3 from './tela3';

export default function Tabs() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email);
      } else {
        setEmail('');
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <FontAwesome name="user-circle" size={60} color="black" />
        <Text style={styles.nome}>{email}</Text>
      </View>
      <View style={styles.tabsContainer}>
        <Tab.Navigator>
          <Tab.Screen 
            name="Filmes" 
            component={Tela2} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="film-outline" color={color} size={size} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen 
            name="Favoritos" 
            component={Tela3} 
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="bookmark-outline" color={color} size={size} />
              ),
              headerShown: false,
            }}
          />
        </Tab.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
    width: '100%',
    zIndex: 1,
  },
  nome: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  tabsContainer: {
    flex: 1,
    marginTop: 0,
  },
});
