import { Movie } from "../models/movieModel";
import axios from "axios";
import dotenv from "dotenv";

const apiKey = process.env.THEMOVIEDB_API_KEY;
const baseUrl = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  try {
    const url = `${baseUrl}/movie/popular?api_key=${apiKey}`;
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch popular movies");
    return null;
  }
};
