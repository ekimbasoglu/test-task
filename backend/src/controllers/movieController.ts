import { Request, Response } from "express";

export const getAllMovies = (req: Request, res: Response) => {
  res.send("Get all movies");
};

export const getMovie = (req: Request, res: Response) => {
  res.send("Get a movie");
};
