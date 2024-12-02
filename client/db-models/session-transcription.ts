import mongoose, { Schema, models } from "mongoose";

const transcriptionSchema = new Schema({
  identifier: {
    type: String,
    required: true,
  },
  transcription: {
    type: Object,
    required: true,
  },
});

export const SessionTranscription = mongoose.model(
  "session-transcription",
  transcriptionSchema,
);
