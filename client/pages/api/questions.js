import { connect } from "../../components/mongodbConnection";
import { LanguageQuestions } from "../../db-models/LanguageQuestions";
import { getQuestionsPrompt } from "../../utils/prompts";
import { getGeminiResponse } from "../../utils/api";
import { getResponseExtractor } from "../../utils/responseExtractor";

export default async function handler(req, res) {
  try {
    console.log("Request Body:", req.body);

    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const reqBody = JSON.parse(JSON.stringify(req.body));
    const technology = reqBody.technology;
    await connect();
    try {
      const queryPath = `languages.${technology}`;
      const result = await LanguageQuestions.findOne({}, queryPath).lean();
      if (Object.keys(result?.languages).length) {
        const questions = result.languages[technology];
        res.status(200).json(questions);
      } else {
        const questionPrompt = getQuestionsPrompt(technology);
        let questions = getResponseExtractor(
          await getGeminiResponse(questionPrompt),
        );
        questions = JSON.parse(questions);
        console.log(questions);
        res.status(200).json(questions);
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      res.status(500).json({ message: "Internal server error" });
      throw error;
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
