import axios from "axios";
import { Movie } from "../models/movieModel";

const apiKey = process.env.THEMOVIEDB_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";

export const getPopularMovies = async (): Promise<Movie[] | null> => {
  try {
    const url = `${baseUrl}/movie/popular?api_key=${apiKey}`;
    const response = await axios.get(url);
    const movies: Movie[] = response.data.results.map((movie: any) => ({
      adult: movie.adult,
      backdrop_path: movie.backdrop_path,
      genre_ids: movie.genre_ids,
      id: movie.id,
      original_language: movie.original_language,
      original_title: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      title: movie.title,
      video: movie.video,
      vote_average: movie.vote_average,
      vote_count: movie.vote_count,
    }));
    return movies;
  } catch (error) {
    console.error("Failed to fetch popular movies:", error.message);
    return null;
  }
};

export const getMovieById = async (movieId: number): Promise<Movie | null> => {
  try {
    const url = `${baseUrl}/movie/${movieId}?api_key=${apiKey}`;
    const response = await axios.get(url);
    const movie: Movie = {
      adult: response.data.adult,
      backdrop_path: response.data.backdrop_path,
      genre_ids: response.data.genre_ids,
      id: response.data.id,
      original_language: response.data.original_language,
      original_title: response.data.original_title,
      overview: response.data.overview,
      popularity: response.data.popularity,
      poster_path: response.data.poster_path,
      release_date: response.data.release_date,
      title: response.data.title,
      video: response.data.video,
      vote_average: response.data.vote_average,
      vote_count: response.data.vote_count,
    };
    return movie;
  } catch (error) {
    console.error("Failed to fetch movie:", error.message);
    return null;
  }
};
