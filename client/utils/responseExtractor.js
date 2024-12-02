export const getResponseExtractor = (extractedText) => {
  return extractedText.replace(/^```json\s*/i, "").replace(/```/, "");
};
