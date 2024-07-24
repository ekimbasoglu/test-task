import { Movie } from "../models/movieModel";

const movies: Movie[] = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Doe", email: "jane@example.com" },
];

export const getMovies = (): Movie[] => {
  return movies;
};
