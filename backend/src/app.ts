import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import moviesRoutes from "./routes/moviesRoutes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(cors()); // Use cors middleware
app.use(express.json());
app.use("/api/movies", moviesRoutes);

app.use(errorHandler);

export default app;
