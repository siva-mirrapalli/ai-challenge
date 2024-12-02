import { connect } from "../../components/mongodbConnection";
import { IntervieweeDetails } from "../../db-models/interview-details";

export default async function handler(req, res) {
  try {
    console.log("Request Body:", req.body);

    if (req.method !== "GET") {
      return res.status(405).json({ message: "Method not allowed" });
    }
    const { rag } = req.query;
    await connect();
    let result = await IntervieweeDetails.find({});

    if (rag) {
      result = result.map((user) => ({
        _id: user?._id,
        gmail: user?.gmail,
        mobile_number: user?.contact_details.mobile_number,
        "Project or domains that user have experience in": user?.experience.map(
          (exp) => ({
            "project domain": exp?.project_domain,
            "number of months": exp?.project_months,
            "technologies used in this project": exp?.teckstack,
          }),
        ),
        "Technologies that user have experience in": user?.overall_techstack,
      }));
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
