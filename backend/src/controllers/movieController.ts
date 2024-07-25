import { Request, Response } from "express";
import { getPopularMovies } from "../services/movieService";
import { generateMoviesPDF } from "../services/pdfService";

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

export const getMovie = (req: Request, res: Response) => {
  res.send("Get a movie");
};
