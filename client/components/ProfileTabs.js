import { useEffect, useState } from "react";
import { AITabs } from "./AITabs";
import { PersonalDetails } from "./PersonalDetails";
import { Experience } from "./Experience";
import { OverallTechStack } from "./OverallTechStack";
import { TechStackAndQuestions } from "./Questions";
import { getProfileDetails } from "../utils/session-apis";
import { ResumeSummary } from "./ResumeSummary";

export const ProfileTabs = () => {
  const [value, setValue] = useState(0);
  const [details, setDetails] = useState({});

  const getDetails = async () => {
    const data = await getProfileDetails();
    console.log(data, "profile data");
    setDetails(data);
  };

  useEffect(() => {
    getDetails();
  }, []);

  const tabsList = [
    {
      label: "Contact Details",
      component: (
        <PersonalDetails personalInfo={details?.contact_details || {}} />
      ),
    },
    {
      label: "Experience",
      component: <Experience experience={details?.experience} />,
    },
    {
      label: "Key Skills",
      component: (
        <OverallTechStack overall_techstack={details?.overall_techstack} />
      ),
    },
    {
      label: "Summary",
      component: <ResumeSummary summary={details?.summary_of_resume} />,
    },
  ];

  return (
    <AITabs
      tabsList={tabsList}
      value={value}
      onChange={(newValue) => setValue(newValue)}
    />
  );
};
