import { ChangeEvent, useRef, useState } from "react";
import axios from "axios";
import { json } from "react-router-dom";

function FileUploadPage() {
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const [convertMessage, setConvertMessage] = useState("");
  const [showConvertButton, setShowConvertButton] = useState(false);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
    setUploadMessage("");
    setConvertMessage("");
  };

  const handleUploadClick = () => {
    // 👇 We redirect the click event onto the hidden input element
    inputRef.current?.click();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (!e.target.files) {
      console.error("No file selected");
      return;
    }

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/upload_video`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const data = response.data;
      setUploadMessage("✅ Upload successfully!");
      setShowConvertButton(true);
    } catch (error: any) {
      console.error("An error occurred while uploading the file:", error);
      setUploadMessage(`❌ Oops, upload failed...`);
    }
  };

  const handleFileConvert = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/convert_video`
      );

      if (response.status !== 200) {
        throw new Error("Convert failed");
      }

      const data = response.data;
      setConvertMessage(`Converted successfully!`);
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        setConvertMessage(`Error: ${error.response.data}`);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        setConvertMessage(`Error: No response from the server.`);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
        setConvertMessage(`❌ Oops, convert failed...`);
      }
    }
  };

  return (
    <div>
      <input type="file" name="file" onChange={handleFileUpload} />
      <p>{uploadMessage}</p>
      {showConvertButton && (
        <button onClick={handleFileConvert}>Convert</button>
      )}
      <p>{convertMessage}</p>
    </div>
  );
}

export default FileUploadPage;
