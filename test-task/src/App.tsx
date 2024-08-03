import React, { useState } from "react";
import Modal from "./components/Modal";
import axios from "axios";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfData, setPdfData] = useState<Blob | null>(null);

  const fetchPopularMoviesPdf = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/movies/", {
        responseType: "blob",
      });
      setPdfData(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching popular movies PDF:", error);
      alert("Server is not working!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">[movie fetcher]</h1>
      <button
        onClick={fetchPopularMoviesPdf}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        fetch!
      </button>

      {pdfData && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <embed
            src={URL.createObjectURL(pdfData)}
            type="application/pdf"
            width="100%"
            height="600px"
          />
        </Modal>
      )}
    </div>
  );
};

export default App;
