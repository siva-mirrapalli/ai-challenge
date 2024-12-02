import React, { useState } from "react";

export const TechStackAndQuestions = () => {
  const [activeTab, setActiveTab] = useState("Personal Details"); // Tracks the active tab

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Tabbed Component</h1>
      <div style={{ marginBottom: "20px" }}>
        {[
          "Personal Details",
          "Experience",
          "Key Skills",
          "Profile Questions",
        ].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setSelectedSkill(null); // Reset selected skill when switching tabs
            }}
            style={{
              marginRight: "10px",
              padding: "10px 15px",
              backgroundColor: activeTab === tab ? "blue" : "lightgray",
              color: activeTab === tab ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};
