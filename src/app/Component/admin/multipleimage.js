import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaTrash } from "react-icons/fa";

const ImageUpload = ({ onChange, initialFiles }) => {
  const [files, setFiles] = useState(initialFiles || []);
  useEffect(() => {
    if (initialFiles) {
      setFiles(initialFiles);
    }
  }, [initialFiles]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    multiple: true,
    onDrop: (acceptedFiles) => {
      const newFiles = [...files, ...acceptedFiles];
      setFiles(newFiles);
      onChange(newFiles); 
    },
  });

  const removeFile = (fileName) => {
    const newFiles = files.filter((file) => (file.name || file) !== fileName);  
    setFiles(newFiles);
    onChange(newFiles); 
  };

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #ccc",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <input {...getInputProps()} />
        <p>{isDragActive ? "Drop your images here..." : "Drag & drop some images, or click to select files"}</p>
      </div>

      <div>
        <h4>Selected Images:</h4>
        <ul>
          {files.map((file, index) => (
            <li key={file.name ? file.name : `${index}`}>  {/* Using name + index as key */}
              {file.name ? file.name : file} {/* Display file name or URL */}
              <button
                onClick={() => removeFile(file.name || file)}
                style={{
                  marginLeft: "10px",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                <FaTrash style={{ color: "red" }} />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default ImageUpload;
