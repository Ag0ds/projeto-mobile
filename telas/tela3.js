import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoriteItem = ({ movie, onRemoveFavorite }) => (
  <View style={styles.movieItem}>
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
      style={styles.movieImage}
    />
    <Text style={styles.movieTitle}>{movie.title}</Text>
    <TouchableOpacity 
      style={styles.removeFavoriteButton}
      onPress={() => onRemoveFavorite(movie)}
    >
      <Text style={styles.removeFavoriteButtonText}>Remover</Text>
    </TouchableOpacity>
  </View>
);

export default function TelaFavoritos() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const storedFavorites = await AsyncStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Erro ao carregar favoritos:', error);
      }
    };

    loadFavorites();
  }, []);

  const handleRemoveFavorite = async (movie) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
    setFavorites(updatedFavorites);
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <FavoriteItem movie={item} onRemoveFavorite={handleRemoveFavorite} />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2E4A',
  },
  movieItem: {
    width: '100%',
    height: 150,
    backgroundColor: '#3A7BD5',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
  },
  movieImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  movieTitle: {
    flex: 1,
    textAlign: 'center',
    marginLeft: 10,
    fontSize: 14,
    color: 'white',
  },
  removeFavoriteButton: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: '#FF6347',
    borderRadius: 5,
  },
  removeFavoriteButtonText: {
    color: 'white',
  },
  flatListContent: {
    padding: 10,
  },
});
