import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { fetchMoviesByGenre, fetchGenres } from '../API'; 

const MovieItem = ({ movie }) => (
  <View style={styles.movieItem}>
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
      style={styles.movieImage}
    />
    <Text style={styles.movieTitle}>{movie.title}</Text>
  </View>
);

const GenreList = ({ genre, genreId }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const movieData = await fetchMoviesByGenre(genreId);
        setMovies(movieData);
      } catch (error) {
        console.error('Erro ao carregar filmes:', error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [genreId]);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.genreContainer}>
      <Text style={styles.genreTitle}>{genre}</Text>
      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieItem movie={item} />}
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

    getGenres();
  }, []);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={genres}
        renderItem={({ item }) => <GenreList genre={item.name} genreId={item.id} />}
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
    backgroundColor: '#f0f0f0',
  },
  genreContainer: {
    marginBottom: 20,
  },
  genreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
  },
  movieItem: {
    width: 100,
    height: 150,
    backgroundColor: '#ccc',
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
  },
  flatListContent: {
    paddingTop: 0,
  },
});
