export const Experience = ({ experience }) => {
  console.log(experience);
  return (
    <div
      style={{
        display: "flex",
        gap: "18px",
        flexDirection: "column",
        padding: "12px",
      }}
    >
      {experience?.map((item) => {
        return (
          <div
            style={{
              display: "flex",
              gap: "18px",
              flexDirection: "column",
              padding: "12px",
              borderBottom: "1px solid grey",
            }}
          >
            <div
              style={{ display: "flex", gap: "8px", flexDirection: "column" }}
            >
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Project Domain:
              </span>
              <span>{item?.project_domain}</span>
            </div>
            <div
              style={{ display: "flex", gap: "8px", flexDirection: "column" }}
            >
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Number of months:
              </span>
              <span>{item?.project_months}</span>
            </div>
            <div
              style={{ display: "flex", gap: "8px", flexDirection: "column" }}
            >
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                Tech stack for project:
              </span>
              <div>
                {item?.techstack?.map((stack) => {
                  return <span>{stack}</span>;
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
