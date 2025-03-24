import { useState, useEffect, useCallback } from "react";
import "./App.css";
import defaultText from "./utils/default_text.txt";
import ComplianceReview from "./components/ComplianceReview";
import * as mock_api from "./utils/mock_api";
import { SuggestionData, ViolationData } from "./utils/types";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { ViolationContext } from "./utils/context";

function App() {
  const [paragraph, setParagraph] = useState(defaultText);
  const [editedParagraph, setEditedParagraph] = useState("");
  const [violations, setViolations] = useState(Array<ViolationData>);
  const [suggestions, setSuggestions] = useState<null | SuggestionData>(null);

  useEffect(() => {
    const loadText = async () => {
      try {
        const response = await fetch(defaultText);
        const text = await response.text();
        setParagraph(text);
        setEditedParagraph(text);
      } catch (error) {
        console.error(`Error fetching default text: ${error}`);
      }
    };
    loadText();
  }, []);

  const loadViolations = useCallback(async (paragraph: string) => {
    const fetchedViolations = await mock_api.fetchViolations(paragraph);
    setViolations(fetchedViolations);
  }, []);

  useEffect(() => {
    if (violations.length > 0) {
      const loadSuggestions = async () => {
        const fetchedSuggestions = await mock_api.fetchSuggestions(violations);
        setSuggestions(fetchedSuggestions);
      };

      loadSuggestions();
    }
  }, [violations]);

  const handleApplySuggestion = (violationId: string, newText: string) => {
    const violation = violations.find((v) => v.id === violationId);
    if (!violation) return;

    const updatedParagraph =
      paragraph.slice(0, violation.start) +
      newText +
      paragraph.slice(violation.end);

    const updatedViolations = violations
      .filter((v) => v.id !== violationId)
      .map((v) => ({
        ...v,
        start:
          v.start > violation.start
            ? v.start + (newText.length - violation.text.length)
            : v.start,
        end:
          v.end > violation.start
            ? v.end + (newText.length - violation.text.length)
            : v.end,
      }));

    setParagraph(updatedParagraph);
    setViolations(updatedViolations);
  };

  const handleDismissViolation = (violationId: string) => {
    const updatedViolations = violations.filter((v) => v.id !== violationId);
    setViolations(updatedViolations);
  };

  const handleSubmit = () => {
    setParagraph(editedParagraph);
    loadViolations(editedParagraph);
  };

  return (
    <main className="app-container">
      <Paper elevation={4} className="text-entry-section">
        <Typography
          variant="h5"
          className="instruction"
          fontWeight="fontWeightMedium"
        >
          Please enter your text below. After you click "Submit", the tool will
          parse it for violations{" "}
        </Typography>
        <div>
          <div className="explanation">
            This text box is read-only for the purposes of this assessment
          </div>
          <TextField
            value={editedParagraph}
            multiline
            fullWidth
            variant="filled"
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
          <Button
            sx={{ marginTop: "10px" }}
            variant="contained"
            onClick={handleSubmit}
            fullWidth
          >
            Submit Text
          </Button>
        </div>
      </Paper>
      {suggestions && violations ? (
        <ViolationContext.Provider
          value={{ suggestions, handleApplySuggestion, handleDismissViolation }}
        >
          <Paper elevation={4} className="violation-section">
            <Typography className="instruction" variant="h5">
              Compliance Review
            </Typography>
            {violations.length ? (
              <Typography>
                We found{" "}
                <span className="bold">{violations.length} violation(s)</span>.
                Please review the highlighted text below and{" "}
                <span className="bold">
                  {" "}
                  edit violations by clicking on them.
                </span>{" "}
                You can choose a suggestion, dismiss the violation, or update
                the text manually.{" "}
              </Typography>
            ) : (
              <Typography>
                {" "}
                We found{" "}
                <span className="bold validation-success">no violations</span>!
                Please send the reviewed text below to compliance for a final
                review.
              </Typography>
            )}
            <ComplianceReview paragraph={paragraph} violations={violations} />
          </Paper>
        </ViolationContext.Provider>
      ) : null}
    </main>
  );
}

export default App;
