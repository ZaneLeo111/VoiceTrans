import React, { useRef, FormEvent } from "react";

const FileUploadPage: React.FC = () => {
  const fileInput = useRef<HTMLInputElement>(null);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();

    // Do something with fileInput.current.files[0]
    // Make sure to check for null values
    if (fileInput.current?.files) {
      console.log(fileInput.current.files[0]);
    }
  };

  return (
    <form onSubmit={submitForm}>
      <input type="file" ref={fileInput} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUploadPage;
