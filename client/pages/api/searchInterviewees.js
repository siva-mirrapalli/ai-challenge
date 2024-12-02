import { IntervieweeDetails } from "../../db-models/interview-details";
import { connect } from "../../components/mongodbConnection";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { query } = req.query;

    try {
      await connect();

      // Search for items matching the query in their name or description
      const profiles = await IntervieweeDetails.find({
        $or: [
          { gmail: { $regex: query, $options: "i" } },
          {
            overall_techstack: { $elemMatch: { $regex: query, $options: "i" } },
          },
          {
            "contact_details.languages": {
              $elemMatch: { $regex: query, $options: "i" },
            },
          },
          { "experience.project_domain": { $regex: query, $options: "i" } },
          {
            "experience.teckstack": {
              $elemMatch: { $regex: query, $options: "i" },
            },
          },
          { summary_of_resume: { $regex: query, $options: "i" } },
          { date: { $regex: query, $options: "i" } },
        ],
      });

      if (profiles.length === 0) {
        return res.status(404).json({ message: "No results found" });
      }

      res.status(200).json({ profiles });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching data", error: error.message });
    }
  }
}
