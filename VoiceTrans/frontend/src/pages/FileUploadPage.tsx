import { ChangeEvent, useRef, useState } from "react";
import axios from "axios";

function FileUploadPage() {
  const [file, setFile] = useState<File>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    // 👇 We redirect the click event onto the hidden input element
    inputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];
    setFile(file);

    // 🚩 do the file upload here normally...
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/upload_audio",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        console.log("File uploaded successfully");
        console.log("Transcript:", response);
      } else {
        console.log("Failed to upload file");
      }
    } catch (error) {
      console.error("An error occurred while uploading the file:", error);
    }
  };

  return (
    <div>
      {/* 👇 Our custom button to select and upload a file */}
      <button onClick={handleUploadClick}>
        {file ? `${file.name}` : "Upload a file"}
      </button>

      {/* 👇 Notice the `display: hidden` on the input */}
      <input
        type="file"
        accept="video/*"
        ref={inputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default FileUploadPage;
