import { useState, useEffect, useCallback } from "react";
import "./App.css";
import defaultText from "./default_text.txt";
import ComplianceReview from "./components/ComplianceReview";
import * as mock_api from "./mock_api";
import { SuggestionData, ViolationData } from "./types";
import { Tooltip } from "@mui/material";
import SuggestionTooltip from "./components/SuggestionTooltip";

function App() {
  const [count, setCount] = useState(0);
  const [paragraph, setParagraph] = useState(defaultText);
  const [violations, setViolations] = useState(Array<ViolationData>);
  const [suggestions, setSuggestions] = useState<null | SuggestionData>(null);
  const [selectedViolationData, setSelectedViolationData] =
    useState<null | ViolationData>(null);
  const [tooltipOpen, setToolTipOpen] = useState<boolean>(false)

  const loadViolations = useCallback(async () => {
    const fetchedViolations = await mock_api.fetchViolations();
    setViolations(fetchedViolations);
  }, []);

  useEffect(() => {
    if (violations.length > 0) {
      const loadSuggestions = async () => {
        const fetchedSuggestions = await mock_api.fetchSuggestions(violations);
        setSuggestions(fetchedSuggestions);
        console.log(`suggestions: ${JSON.stringify(fetchedSuggestions)}`);
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
      } catch (error) {
        console.error(`Error fetching default text: ${error}`);
      }
    };
    loadText();
    loadViolations();
  }, [loadViolations]);

  const onViolationClick = (violation: ViolationData) => {
    console.log("Violation clicked!");
    setSelectedViolationData(violation);
    setToolTipOpen(prev => !prev)
  };

  return (
    <>
    {suggestions && violations ? 
      <ComplianceReview
        paragraph={paragraph}
        onViolationClick={onViolationClick}
        violations={violations}
        suggestions={suggestions}
      /> : null
    }  
    </>
  );
}

export default App;
