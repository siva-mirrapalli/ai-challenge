export const addTranscriptToDB = async (roomUrl, transcription) => {
  const response = await fetch("/api/transcript", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      roomUrl,
      transcription,
    }),
  });

  if (response.ok) {
    const body = await response.json();
    return body.response;
  }

  throw new Error();
};

export const getProfileDetails = async (
  gmail = "bharathkamatham2000@gmail.com",
) => {
  const response = await fetch("/api/profile", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      gmail,
    }),
  });

  if (response.ok) {
    const body = await response.json();
    return body;
  }

  throw new Error();
};

export const getQuestionsWithTechnology = async (technology) => {
  const response = await fetch("/api/questions", {
    headers: {
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      technology,
    }),
  });

  if (response.ok) {
    const body = await response.json();
    return body;
  }

  throw new Error();
};
