import { Box, Button, Popover, TextField, Typography } from "@mui/material";
import { ViolationData } from "../utils/types";
import { FormEvent, useState } from "react";
import SuggestionHolder from "./SuggestionHolder";
import { useViolationContext } from "../utils/context";

interface ViolationProps {
  violation: ViolationData;
}

const Violation = ({ violation }: ViolationProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const [newText, setNewText] = useState<string>("");

  const { handleApplySuggestion, handleDismissViolation } =
    useViolationContext();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
    setNewText("");
  };

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
          <SuggestionHolder handleClose={handleClose} violation={violation} />
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
