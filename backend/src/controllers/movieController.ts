import { Request, Response } from "express";
import { getPopularMovies, getMovieById } from "../services/movieService";
import { generateMoviesPDF, generateMoviePDF } from "../services/pdfService";
import { Movie } from "../models/movieModel";

export const getAllMovies = async (req: Request, res: Response) => {
  const movies = await getPopularMovies();

  if (!movies || movies.length === 0) {
    return res
      .status(500)
      .json({ message: "Problem with the server, no movies found" });
  }

  try {
    const pdfBuffer = await generateMoviesPDF(movies);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=popular-movies.pdf"
    );
    return res.send(pdfBuffer);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to generate PDF", error: error.message });
  }

  res.json(movies);
};

export const getMovie = async (req: Request, res: Response) => {
  const movieId = parseInt(req.params.id);
  if (!movieId) {
    return res.status(404).json("Id is missing!");
  }

  const movie: Movie | null = await getMovieById(movieId);

  if (!movie) {
    return res.status(404).json({ message: "Movie not found" });
  }
  try {
    const pdfBuffer = await generateMoviePDF(movie);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${movie.title}.pdf`
    );
    return res.send(pdfBuffer);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to generate PDF", error: error.message });
  }
};
