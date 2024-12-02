export const API_HOST = process.env.API_HOST ?? "http://localhost";
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const DAILY_API_KEY = process.env.DAILY_API_KEY;
const { GoogleGenerativeAI } = require("@google/generative-ai");
import { IntervieweeDetails } from "../db-models/interview-details";
import { connect } from "../components/mongodbConnection";

export const addNewIntervieweeToDB = async (detailsJson) => {
  try {
    console.log("before parsing", detailsJson);
    const reqBody = JSON.parse(detailsJson);

    await connect();

    const doc = {
      experience: reqBody.experience || [], // Assuming experience data is available in the request body
      overall_techstack: reqBody.overall_techstack || [],
      gmail: reqBody.gmail,
      contact_details: reqBody.contact_details || {},
      date: reqBody.date || "",
      summary_of_resume: reqBody.summary_of_resume || "",
    };

    await IntervieweeDetails.updateOne(
      { gmail: doc.gmail },
      { $set: doc },
      { upsert: true },
    );
    console.log("added to db");
  } catch (error) {
    console.error("Error:", error);
  }
};

const genAI = new GoogleGenerativeAI("AIzaSyAzH1gwqbR8PyWn7k2OBzRvOVj9oEkdGX0");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const getGeminiResponse = async (prompt) => {
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return result.response.text();
};
