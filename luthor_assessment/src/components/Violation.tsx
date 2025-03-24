import { Box, Button, Popover, TextField, Typography } from "@mui/material";
import { SuggestionData, ViolationData } from "../types";
import { FormEvent, useEffect, useState } from "react";
import SuggestionHolder from "./SuggestionHolder";

interface ViolationProps {
  violation: ViolationData;
  suggestions: SuggestionData;
  handleApplySuggestion: (violationId: string, newText: string) => void;
  handleDismissViolation: (violationId: string) => void;
}

const Violation = ({
  violation,
  suggestions,
  handleApplySuggestion,
  handleDismissViolation,
}: ViolationProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [relevantSuggestions, setRelevantSuggestions] = useState<Array<string>>(
    []
  );
  const [newText, setNewText] = useState<string>("");

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setNewText("");
  };

  useEffect(() => {
    if (suggestions) {
      setRelevantSuggestions(suggestions[violation.id]);
    }
  }, [suggestions, violation]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewTextSubmission = (e: FormEvent) => {
    e.preventDefault();
    handleApplySuggestion(violation.id, newText);
    handleClose();
  };

  return (
    <>
      <span
        className={`violation ${violation.severity}-severity`}
        onClick={handleClick}
      >
        {violation.text}
      </span>
      <Popover open={open} anchorEl={anchorEl} onClose={handleClose}>
        <Typography component={"div"} sx={{ p: 2 }}>
          <p className="bold">
            Violation: "
            <span className="violation-text">{violation.text}"</span>
          </p>
          <p>
            {" "}
            Below, please choose one of the suggestions, enter your own text, or
            if appropriate dismiss this violation.{" "}
          </p>
          <SuggestionHolder
            suggestions={relevantSuggestions}
            handleApplySuggestion={handleApplySuggestion}
            violation={violation}
            handleClose={handleClose}
          />
          <Box>
            <h4>Add new text:</h4>
            <form onSubmit={handleNewTextSubmission}>
              <div className="new-text-row">
                <TextField
                  className="new-text-field"
                  id="outlined-basic"
                  variant="outlined"
                  placeholder="Add new text"
                  value={newText}
                  required
                  onChange={(e) => setNewText(e.target.value)}
                />
                <Button variant="contained" type="submit">
                  Submit new text
                </Button>
              </div>
            </form>
          </Box>
          <Button
            sx={{ marginTop: "20px", backgroundColor: "red" }}
            variant="contained"
            onClick={() => {
              handleClose();
              handleDismissViolation(violation.id);
            }}
          >
            Dismiss Violation
          </Button>
        </Typography>
      </Popover>
    </>
  );
};

export default Violation;
