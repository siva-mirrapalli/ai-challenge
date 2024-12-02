import { useEffect, useState } from "react";
import { getQuestionsWithTechnology } from "../utils/session-apis";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const OverallTechStack = ({ overall_techstack }) => {
  const [questions, setQuestions] = useState({});
  const [isTechnologySelected, setTechnologySelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTechnologySelected(false);
  }, []);

  const onSkillClick = async (tech) => {
    try {
      setIsLoading(true);
      setQuestions({});
      setTechnologySelected(true);
      const result = await getQuestionsWithTechnology(tech);
      setQuestions(result);
    } catch (err) {
      setQuestions({});
    } finally {
      setIsLoading(false);
    }
  };
  console.log(isLoading);

  return (
    <>
      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            zIndex: 2000,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!isTechnologySelected && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "18px",
            padding: "12px",
          }}
        >
          {[...overall_techstack, "java"]?.map((tech, index) => (
            <div
              onClick={() => onSkillClick(tech)}
              key={index}
              style={{
                backgroundColor: "#d1fbf1",
                fontWeight: "bold",
                padding: "8px",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#aaf0d5")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#d1fbf1")}
            >
              {tech}
            </div>
          ))}
        </div>
      )}
      {isTechnologySelected && (
        <>
          <button
            onClick={() => setTechnologySelected(false)}
            style={{ position: "sticky", top: "20px" }}
          >
            Back to technologies
          </button>
          <QuestionsWrapper>
            {Object.entries(questions)?.map(([heading, quest]) => {
              return (
                <EachTech>
                  <QuestionHeading>{heading}</QuestionHeading>
                  <div
                    style={{
                      display: "flex",
                      gap: "4px",
                      flexDirection: "column",
                    }}
                  >
                    {quest?.map((q, ind) => {
                      return <div>{`${ind + 1}. ${q}`}</div>;
                    })}
                  </div>
                </EachTech>
              );
            })}
          </QuestionsWrapper>
        </>
      )}
    </>
  );
};

const QuestionsWrapper = styled("div")`
  box-sizing: border-box;
  display: flex;
  padding: 12px;
  flex-direction: column;
  gap: 8px;
  overflow: scroll;
  height: 100%;
  ::-webkit-scrollbar {
    width: 7px;
    padding-left: 6px;
    height: 7px;
  }
  ::-webkit-scrollbar-track {
    background: #eeeeee;
    border: 1px solid #eeeeee;
  }
  ::-webkit-scrollbar-thumb {
    background: #949494;
  }
`;

const QuestionHeading = styled("div")`
  font-size: 18px;
  font-weight: 600;
  text-transform: capitalize;
`;

const EachTech = styled("div")`
  display: flex;
  flex-direction: column;
  font-size: 16px;
`;
