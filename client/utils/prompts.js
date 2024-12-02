export const getQuestionsPrompt = (technology) => {
  return `Provide interview questions for the technology "${technology}" in the following JSON format:
  {
    "beginner": ["question1", "question2", ..., "question10"],
    "intermediate": ["question1", "question2", ..., "question10"],
    "expert": ["question1", "question2", ..., "question10"]
  }
  Ensure there are exactly 10 questions for each level: beginner, intermediate, and expert.
  Don't rely on any code`;
};

export const addInterviewQuestionsPrompt = (resumeText) => {
  const prompt = `
      Based on the following resume text, please give output in json format following
      1)experience -> array of objects { project domain, project months, project teckstack}
      2)overall_techstack -> array of str
      3)gmail->string
      4)contact_details -> object {gmail,mobile number,languages}
      6)date->currentdate
      7)summary_of_resume-> overall summary of the resume
 
      **Resume Text:**
      ${resumeText}
    `;

  return prompt;
};
