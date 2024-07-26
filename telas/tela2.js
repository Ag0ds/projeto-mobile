import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import { fetchMoviesByGenre, fetchGenres, fetchMoviesByName } from '../API';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const MovieItem = ({ movie, onFavoriteToggle, isFavorite }) => (
  <View style={styles.movieItem}>
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
      style={styles.movieImage}
    />
    <Text style={styles.movieTitle}>{movie.title}</Text>
    <TouchableOpacity
      style={styles.favoriteButton}
      onPress={() => onFavoriteToggle(movie)}
    >
      <Text style={styles.favoriteButtonText}>
        {isFavorite ? 'Remover' : 'Adicionar'}
      </Text>
    </TouchableOpacity>
  </View>
);

const GenreList = ({ genre, genreId, searchQuery, favorites, onFavoriteToggle }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        let movieData;
        if (searchQuery) {
          movieData = await fetchMoviesByName(searchQuery);
        } else {
          movieData = await fetchMoviesByGenre(genreId);
        }
        setMovies(movieData);
      } catch (error) {
        console.error('Erro ao carregar filmes:', error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [genreId, searchQuery]);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.genreContainer}>
      <Text style={styles.genreTitle}>{genre}</Text>
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieItem
            movie={item}
            onFavoriteToggle={onFavoriteToggle}
            isFavorite={favorites.some(fav => fav.id === item.id)}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default function Tela2() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const genreData = await fetchGenres();
        setGenres(genreData);
      } catch (error) {
        console.error('Erro ao carregar gêneros:', error);
      } finally {
        setLoading(false);
      }
    };

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

    getGenres();
    loadFavorites();
  }, []);

  const handleFavoriteToggle = async (movie) => {
    let updatedFavorites;
    if (favorites.some(fav => fav.id === movie.id)) {
      updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
    } else {
      updatedFavorites = [...favorites, movie];
    }
    setFavorites(updatedFavorites);
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Erro ao salvar favoritos:', error);
    }
  };

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Pesquise um filme"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={genres}
        renderItem={({ item }) => (
          <GenreList
            genre={item.name}
            genreId={item.id}
            searchQuery={searchQuery}
            favorites={favorites}
            onFavoriteToggle={handleFavoriteToggle}
          />
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
  searchInput: {
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  genreContainer: {
    marginBottom: 20,
  },
  genreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
    color: '#fff'
  },
  movieItem: {
    width: 100,
    height: 150,
    backgroundColor: '#3A7BD5',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 10,
  },
  movieImage: {
    width: '100%',
    height: '80%',
    borderRadius: 10,
  },
  movieTitle: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 12,
    color: 'white'
  },
  flatListContent: {
    paddingTop: 0,
  },
  favoriteButton: {
    position: 'absolute',
    marginTop: 0,
    backgroundColor: '#FF6347',
    borderRadius: 5,
  },
  favoriteButtonText: {
    color: 'white',
  },
});
