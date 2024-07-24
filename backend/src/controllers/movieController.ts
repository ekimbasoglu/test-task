import { Request, Response } from "express";
import { getPopularMovies } from "../services/movieService";

export const getAllMovies = async (req: Request, res: Response) => {
  const movies = await getPopularMovies();

  if (!movies || movies.length === 0) {
    return res
      .status(500)
      .json({ message: "Problem with the server, no movies found" });
  }
  

  res.json(movies);
};

export const getMovie = (req: Request, res: Response) => {
  res.send("Get a movie");
};
