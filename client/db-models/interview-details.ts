import mongoose, { Schema, models } from "mongoose";

const intervieweeSchema = new Schema({
  experience: {
    type: [
      {
        project_domain: {
          type: String,
          required: false,
        },
        project_months: {
          type: String,
          required: false,
        },
        teckstack: {
          type: Array<String>,
          required: false,
        },
      },
    ],
    required: false,
  },
  overall_techstack: {
    type: Array<String>,
    required: false,
  },
  gmail: {
    type: String,
    required: true,
  },
  contact_details: {
    gmail: {
      type: String,
      required: true,
    },
    mobile_number: {
      type: String,
      required: true,
    },
    languages: {
      type: Array<String>,
      required: false,
    },
  },
  date: {
    type: String,
    required: false,
  },
  summary_of_resume: {
    type: String,
    required: false,
  },
});

export const IntervieweeDetails = mongoose.model(
  "interviewee-details",
  intervieweeSchema,
);
