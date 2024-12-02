import { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

// Fetch function to get interviewee data by search term
const fetchIntervieweeData = async (searchTerm) => {
  const res = await fetch(`/api/searchInterviewees?query=${searchTerm}`);
  if (res.ok) {
    return await res.json();
  } else {
    throw new Error("No results found");
  }
};

// Function to highlight matched text
const highlightText = (text, query) => {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, index) =>
    regex.test(part) ? (
      <HighlightedText key={index} className="highlight">
        {part}
      </HighlightedText>
    ) : (
      part
    ),
  );
};

// Styled components
const SearchButton = styled(Button)({
  backgroundColor: "#6c63ff",
  color: "#fff",
  borderRadius: "8px",
  padding: "10px 20px",
  "&:hover": {
    backgroundColor: "#5a52e5",
  },
  "&:disabled": {
    backgroundColor: "#cccccc",
  },
});

const SearchBar = styled(TextField)({
  backgroundColor: "#fff",
  borderRadius: "4px",
  boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "#ddd",
    },
    "&:hover fieldset": {
      borderColor: "#6c63ff",
    },
  },
});

const HighlightedText = styled("span")({
  backgroundColor: "#fff200", // Bright Yellow
});

// Main Component
const IntervieweeSearch = () => {
  const [searchTerm, setSearchTerm] = useState(""); // Store the search input
  const [results, setResults] = useState([]); // Store search results
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track errors

  const handleSearch = async () => {
    if (!searchTerm) {
      setError("Please enter a search term");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchIntervieweeData(searchTerm);
      setResults(data.profiles);
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(); // Trigger search when Enter is pressed
    }
  };

  return (
    <div className="interviewee-search">
      {/* Search Bar and Button */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginBottom: "20px" }}
      >
        <Grid item xs={12} sm={8} md={6}>
          <SearchBar
            label="Search in All Columns"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress} // Trigger search on Enter key press
            fullWidth
          />
        </Grid>
        <Grid item>
          <SearchButton
            variant="contained"
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "Loading..." : "Search"}
          </SearchButton>
        </Grid>
      </Grid>

      {/* Error Handling */}
      {error && (
        <Typography
          variant="body2"
          color="error"
          align="center"
          gutterBottom
          sx={{ marginTop: 2 }}
        >
          {error}
        </Typography>
      )}

      {/* Display Results in Table */}
      {results.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>
                  <strong>Interviewee ID</strong>
                </TableCell>
                <TableCell>
                  <strong>Email</strong>
                </TableCell>
                <TableCell>
                  <strong>Overall Techstack</strong>
                </TableCell>
                <TableCell>
                  <strong>Experience</strong>
                </TableCell>
                <TableCell>
                  <strong>Languages</strong>
                </TableCell>
                <TableCell>
                  <strong>Contact Number</strong>
                </TableCell>
                <TableCell>
                  <strong>Summary</strong>
                </TableCell>
                <TableCell>
                  <strong>Resume Date</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results.map((item) => (
                <TableRow
                  key={item._id}
                  sx={{ "&:nth-of-type(odd)": { backgroundColor: "#fafafa" } }}
                >
                  <TableCell>{highlightText(item._id, searchTerm)}</TableCell>
                  <TableCell>{highlightText(item.gmail, searchTerm)}</TableCell>
                  <TableCell>
                    {item.overall_techstack && item.overall_techstack.length > 0
                      ? item.overall_techstack.map((tech, idx) => (
                          <Typography key={idx} variant="body2">
                            {highlightText(tech, searchTerm)}
                          </Typography>
                        ))
                      : "No techstack available"}
                  </TableCell>
                  <TableCell>
                    {item.experience && item.experience.length > 0
                      ? item.experience.map((exp, idx) => (
                          <div key={idx}>
                            <Typography variant="body2">
                              Project Domain:{" "}
                              {highlightText(exp.project_domain, searchTerm)}
                            </Typography>
                            <Typography variant="body2">
                              Project Duration:{" "}
                              {highlightText(exp.project_months, searchTerm)}{" "}
                              months
                            </Typography>
                            <Typography variant="body2">
                              Techstack: {exp.teckstack.join(", ")}
                            </Typography>
                          </div>
                        ))
                      : "No experience available"}
                  </TableCell>
                  <TableCell>
                    {item.contact_details?.languages
                      ? item.contact_details.languages.map((language, idx) => (
                          <Typography key={idx} variant="body2">
                            {highlightText(language, searchTerm)}
                          </Typography>
                        ))
                      : "No languages provided"}
                  </TableCell>
                  <TableCell>
                    {highlightText(
                      item.contact_details?.mobile_number,
                      searchTerm,
                    ) || "Not provided"}
                  </TableCell>
                  <TableCell>
                    {highlightText(item.summary_of_resume, searchTerm) ||
                      "Not provided"}
                  </TableCell>
                  <TableCell>
                    {highlightText(item.date, searchTerm) || "Not provided"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default IntervieweeSearch;
