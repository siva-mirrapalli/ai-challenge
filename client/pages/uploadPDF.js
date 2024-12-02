import React, { useState } from "react";

const FileTextExtractor = () => {
  const [fileContent, setFileContent] = useState("");
  const [fileType, setFileType] = useState("");

  // Function to handle file upload and extract text
  const handleFileUpload = (event) => {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader();

    // Handle file reading when it's loaded
    reader.onload = async (e) => {
      const fileType = file.type;
      setFileType(fileType);
      if (fileType === "application/pdf") {
        // Handle PDF files using pdf-parse
        if (!e.target?.result) return;
        if (e.target.result instanceof ArrayBuffer) {
          const pdfData = new Uint8Array(e.target.result);
          const buffer = Buffer.from(pdfData);

          try {
            if (buffer) {
              const base64Buffer = arrayBufferToBase64(e.target.result);
              const result = await sendBufferToBackend(base64Buffer);
              if (result) setFileContent(result.extractedText);
            }
          } catch (err) {
            console.error("Error extracting text from PDF:", err);
          }
        } else {
          console.log("Improper data type");
        }
      }
    };
    reader.readAsArrayBuffer(file); // Read as an array buffer for PDFs
  };

  // Function to convert ArrayBuffer to Base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary); // Base64 encode
  };

  // Function to send the Base64-encoded buffer to the backend
  const sendBufferToBackend = async (base64Buffer) => {
    try {
      const response = await fetch("/api/upload-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ base64Buffer }), // Send Base64 data
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Text sent successfully:", result.message);
        return result;
      } else {
        console.error("Error sending text:", result.error);
        return null;
      }
    } catch (error) {
      console.error("Error communicating with the backend:", error);
      return null;
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Upload Interviewee's Resume</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        style={styles.fileInput}
      />

      {fileContent && (
        <div style={styles.extractedTextContainer}>
          <h3 style={styles.extractedTextHeader}>Extracted Text:</h3>
          <pre style={styles.extractedText}>{fileContent}</pre>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "40px",
    backgroundColor: "#f4f7fc",
    borderRadius: "8px",
    width: "80%",
    maxWidth: "600px",
    margin: "auto",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    color: "#2d3a5e",
    fontSize: "24px",
    marginBottom: "20px",
    fontWeight: "600",
  },
  fileInput: {
    display: "block",
    margin: "0 auto",
    padding: "12px",
    border: "2px solid #e1e5eb",
    borderRadius: "6px",
    backgroundColor: "#fff",
    color: "#4a4a4a",
    fontSize: "16px",
    width: "100%",
    maxWidth: "300px",
    cursor: "pointer",
    transition: "0.3s",
  },
  loader: {
    border: "6px solid #f3f3f3", // Light grey
    borderTop: "6px solid #3498db", // Blue
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 1s linear infinite",
  },
  extractedTextContainer: {
    marginTop: "30px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
    border: "1px solid #e1e5eb",
  },
  extractedTextHeader: {
    fontSize: "20px",
    color: "#2d3a5e",
    marginBottom: "12px",
  },
  extractedText: {
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    color: "#333",
    fontSize: "14px",
    lineHeight: "1.5",
    fontFamily: "Arial, sans-serif",
    border: "none",
    backgroundColor: "#f4f7fc",
    padding: "12px",
    borderRadius: "6px",
    overflow: "auto",
  },
};

export default FileTextExtractor;
