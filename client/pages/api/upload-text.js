// pages/api/upload-text.js
import pdfParse from "pdf-parse";
import { getGeminiResponse } from "../../utils/api.js";
import { addInterviewQuestionsPrompt } from "../../utils/prompts.js";

import { addNewIntervieweeToDB } from "../../utils/api.js";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { base64Buffer } = req.body; // Get the Base64-encoded buffer
      if (!base64Buffer) {
        return res.status(400).json({ error: "No buffer data received" });
      }

      // Decode the Base64 string to ArrayBuffer
      const buffer = Buffer.from(base64Buffer, "base64");

      // Process the PDF buffer (e.g., parse it using pdf-parse)
      const pdfData = await pdfParse(buffer);
      const completePrompt = addInterviewQuestionsPrompt(pdfData.text);
      const extractedText = await getGeminiResponse(completePrompt);

      //const extractedText = pdfData.text;

      console.log("Extracted Text from PDF:", extractedText); // Log the extracted text

      const cleanedString = extractedText
        .replace(/^```json\s*/i, "")
        .replace(/```/, "");
      //const cleanedString = extractedText.match(/\{[\s\S]*\}/);
      console.log("Cleaned Text from PDF:"); // Log the extracted text
      await addNewIntervieweeToDB(cleanedString);

      // Send a success response
      res
        .status(200)
        .json({ message: "Text received successfully", extractedText });
    } catch (error) {
      console.error("Error processing text:", error);
      res.status(500).json({ error: "Failed to process text" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
