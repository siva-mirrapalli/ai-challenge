import { connect } from "../../components/mongodbConnection";
import { IntervieweeDetails } from "../../db-models/interview-details";

export default async function handler(req, res) {
  try {
    console.log("Request Body:", req.body);

    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    await connect();
    const result = await IntervieweeDetails.find({});

    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
