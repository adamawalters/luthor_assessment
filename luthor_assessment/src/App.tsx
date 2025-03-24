import { useState, useEffect, useCallback } from "react";
import "./App.css";
import defaultText from "./default_text.txt";
import ComplianceReview from "./components/ComplianceReview";
import * as mock_api from "./mock_api";
import { SuggestionData, ViolationData } from "./types";

function App() {
  const [paragraph, setParagraph] = useState(defaultText);
  const [editedParagraph, setEditedParagraph] = useState("");
  const [violations, setViolations] = useState(Array<ViolationData>);
  const [suggestions, setSuggestions] = useState<null | SuggestionData>(null);

  const loadViolations = useCallback(
    async (paragraph: string, mockViolations: boolean) => {
      const fetchedViolations = await mock_api.fetchViolations(
        paragraph,
        mockViolations
      );
      setViolations(fetchedViolations);
    },
    []
  );

  useEffect(() => {
    if (violations.length > 0) {
      const loadSuggestions = async () => {
        const fetchedSuggestions = await mock_api.fetchSuggestions(violations);
        setSuggestions(fetchedSuggestions);
      };

      loadSuggestions();
    }
  }, [violations]);

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

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedParagraph(event.target.value);
  };

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
        start: v.start > violation.start ? v.start + (newText.length - violation.text.length) : v.start,
        end: v.end > violation.start ? v.end + (newText.length - violation.text.length) : v.end,
    }));

    setParagraph(updatedParagraph);
    setEditedParagraph(updatedParagraph);
    setViolations(updatedViolations);
  };

  const handleDismissViolation = (violationId: string) => {
    const updatedViolations = violations.filter(v => v.id !== violationId)
    setViolations(updatedViolations)
  }

  const handleSubmit = () => {
    setParagraph(editedParagraph);
    loadViolations(editedParagraph, true);
  };

  return (
    <>
      <div>
        Please enter your text below. After you click "Submit", the tool will
        parse it for violations.{" "}
      </div>
      <textarea
        value={editedParagraph}
        onChange={handleTextChange}
        rows={6}
        cols={80}
      />
      <button onClick={handleSubmit}>Submit</button>
      {suggestions && violations ? (
        <>
          <div>We found {violations.length} violation(s). Please review the highlighted text by clicking on it. You can choose a suggestion, dismiss the violation, or update the text manually. </div>
          <ComplianceReview
            paragraph={paragraph}
            violations={violations}
            suggestions={suggestions}
            handleApplySuggestion={handleApplySuggestion}
            handleDismissViolation={handleDismissViolation}
          />
        </>
      ) : null}
    </>
  );
}

export default App;
