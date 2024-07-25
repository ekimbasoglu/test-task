import PDFDocument from "pdfkit";
import { Movie } from "../models/movieModel";

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
