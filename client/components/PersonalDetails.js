export const PersonalDetails = ({ personalInfo }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        padding: "12px",
      }}
    >
      <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>Gmail:</span>
        <span span>{personalInfo?.gmail}</span>
        <span style={{ borderTop: "1px solid #775e5e" }}></span>
      </div>
      <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>
          Mobile Number:
        </span>
        <span>{personalInfo?.mobile_number}</span>
        <span style={{ borderTop: "1px solid #775e5e" }}></span>
      </div>
      <div style={{ display: "flex", gap: "8px", flexDirection: "column" }}>
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>
          Languages Known:
        </span>
        {["English"]?.map((lang) => {
          return <span>{lang}</span>;
        })}
        <span style={{ borderTop: "1px solid #775e5e" }}></span>
      </div>
    </div>
  );
};
