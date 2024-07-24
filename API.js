// api.js
import axios from 'axios';

const API_KEY = '0f4172fa3bdd1272fcb56142e410f51a'; 
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId, 
        language: 'pt-BR' 
      }
    });
    return response.data.results; 
  } catch (error) {
    console.error('Erro ao buscar filmes:', error);
    throw error;
  }
};

// Função para obter IDs dos gêneros
export const fetchGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
      params: {
        api_key: API_KEY,
        language: 'pt-BR'
      }
    });
    return response.data.genres; 
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error);
    throw error;
  }
};
