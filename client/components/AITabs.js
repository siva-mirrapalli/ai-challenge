import React, { useState } from "react";
import Button from "@mui/material/Button";

const CustomTabPanel = (props) => {
  const { children, value, index } = props;
  return <>{value === index && <>{children}</>}</>;
};

export const AITabs = ({ tabsList }) => {
  const [value, setValue] = useState(0);

  const handleNext = () => {
    setValue((prevValue) => (prevValue + 1) % tabsList.length);
  };

  const handlePrevious = () => {
    setValue((prevValue) =>
      prevValue === 0 ? tabsList.length - 1 : prevValue - 1,
    );
  };

  return (
    <React.Fragment>
      <div
        style={{
          cursor: "pointer",
          fontSize: "12px",
          fontWeight: "400",
          lineHeight: "16.34px",
          border: "0",
          backgroundColor: "#f4f4f4", // Light gray background
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Center align the buttons and tab
          position: "sticky",
          top: "0",
        }}
      >
        {/* Left Arrow */}
        <Button
          onClick={handlePrevious}
          style={{
            color: "#feaa2c",
            fontSize: "24px",
            fontWeight: "bold",
            marginRight: "10px",
          }}
        >
          {"<"}
        </Button>

        {/* Currently Selected Tab */}
        <div
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            color: "#333",
            padding: "10px",
            border: "1px solid #feaa2c",
            borderRadius: "8px",
            minWidth: "150px",
            textAlign: "center",
          }}
        >
          {tabsList[value]?.label}
        </div>

        {/* Right Arrow */}
        <Button
          onClick={handleNext}
          style={{
            color: "#feaa2c",
            fontSize: "24px",
            fontWeight: "bold",
            marginLeft: "10px",
          }}
        >
          {">"}
        </Button>
      </div>

      {/* Tab Panels */}
      {tabsList.map((tab, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {tab.component}
        </CustomTabPanel>
      ))}
    </React.Fragment>
  );
};
