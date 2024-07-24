import express from "express";
import dotenv from "dotenv";
dotenv.config();
import moviesRoutes from "./routes/moviesRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());
app.use("/api/movies", moviesRoutes);

// Use the error handling middleware
app.use(errorHandler);

export default app;
