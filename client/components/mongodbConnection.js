import mongoose from "mongoose";
const client = null;
const uri =
  "mongodb+srv://satyanarayana481994:p9wzG9uka9mys8Tw@cluster0.uhfqp.mongodb.net/tech_knights_ai_challenge?retryWrites=true&w=majority&appName=Cluster0";
async function connect() {
  try {
    await mongoose
      .connect(uri)
      .catch((err) => console.log("error in the connection", err));
  } catch (error) {
    console.log(error);
  }
}

export { connect };
