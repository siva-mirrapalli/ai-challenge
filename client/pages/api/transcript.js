import { connect } from "../../components/mongodbConnection";
import { SessionTranscription } from "../../db-models/session-transcription";

export default async function handler(req, res) {
  try {
    console.log("Request Method:", req.method);
    console.log("Request Body:", req.body);

    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const reqBody = JSON.parse(JSON.stringify(req.body));

    if (!reqBody.roomUrl || !reqBody.transcription) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    await connect();

    const doc = {
      identifier: reqBody.roomUrl,
      transcription: reqBody.transcription,
    };

    await SessionTranscription.updateOne(
      { identifier: doc.identifier },
      { $set: doc },
      { upsert: true },
    );

    res.status(200).json({ message: "Document inserted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
