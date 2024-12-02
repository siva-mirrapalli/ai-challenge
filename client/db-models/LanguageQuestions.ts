import mongoose, { Schema, models } from "mongoose";

const languageQuestionsSchema = new Schema({
  languages: {
    type: Object,
    required: false,
  },
});

export const LanguageQuestions = mongoose.model(
  "language_questions",
  languageQuestionsSchema,
);
