import PDFDocument from "pdfkit";
import { Movie } from "../models/movieModel";
import axios from "axios";

const apiKey = process.env.THEMOVIEDB_API_KEY;

export const generateMoviesPDF = (movies: Movie[]): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers: Buffer[] = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    doc.on("error", reject);

    doc.fontSize(20).text("Popular Movies", { align: "center" });

    movies.forEach((movie) => {
      doc
        .fontSize(12)
        .text(`Title: ${movie.title}`, {
          link: `http://localhost:3000/api/movies/${movie.id}`,
          underline: true,
        })
        .moveDown()
        .text(`Release Date: ${movie.release_date}`)
        .text(`Vote Average: ${movie.vote_average}`)
        .moveDown();
    });

    doc.end();
  });
};

export const generateMoviePDF = async (movie: Movie): Promise<Buffer> => {
  return new Promise(async (resolve, reject) => {
    const doc = new PDFDocument();
    let buffers: Buffer[] = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    doc.on("error", reject);

    doc.fontSize(20).text(movie.title, { align: "center" });
    doc.fontSize(16).text(`Release Date: ${movie.release_date}`);
    doc.fontSize(16).text(`Vote Average: ${movie.vote_average}`);

    if (movie.poster_path) {
      const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      try {
        const response = await axios.get(posterUrl, {
          responseType: "arraybuffer",
        });
        const img = Buffer.from(response.data, "binary");
        doc.image(img, {
          fit: [250, 400],
          align: "center",
          valign: "center",
        });
      } catch (error) {
        console.error("Failed to fetch poster image:", error.message);
      }
    }

    doc.end();
  });
};
