import React, { useState } from "react";
import Modal from "./components/Modal";
import axios from "axios";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pdfData, setPdfData] = useState<string | null>(null);

  const fetchPopularMoviesPdf = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_LOCAL_ENDPOINT, {
        responseType: "blob",
      });
      const pdfUrl = URL.createObjectURL(response.data);
      setPdfData(pdfUrl);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching popular movies PDF:", error);
      alert("Server is not working!");
    }
  };

  const fetchFromXano = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_XANO_ENDPOINT);

      // Assuming response.data contains the base64 encoded string and metadata
      const base64String = response.data.response;
      const pdfBlob = base64ToBlob(
        base64String,
        response.data.meta["content-type"]
      );
      // Validate the blob creation
      if (pdfBlob) {
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setPdfData(pdfUrl);
        setIsModalOpen(true);
      } else {
        console.error("Failed to create Blob from base64 string.");
        alert("Failed to create Blob from base64 string.");
      }
    } catch (error) {
      console.error("Error fetching popular movies PDF:", error);
      alert("Server is not working!");
    }
  };

  // Function to convert base64 to Blob
  const base64ToBlob = (base64: string, contentType: string): Blob | null => {
    try {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      return new Blob([byteArray], { type: contentType });
    } catch (error) {
      console.error("Error converting base64 to Blob:", error);
      return null;
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

      <button
        onClick={fetchFromXano}
        className="mt-5 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        fetch from Xano!
      </button>

      {pdfData && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <embed
            src={pdfData}
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
