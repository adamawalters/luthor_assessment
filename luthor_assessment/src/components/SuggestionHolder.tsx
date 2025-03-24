import { Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper, Button } from "@mui/material";
import { ViolationData } from "../types";

interface SuggestionHolderProps {
  suggestions: Array<string>;
  handleApplySuggestion: (violationId: string, newText: string) => void;
  violation: ViolationData;
  handleClose: () => void;
}

const SuggestionHolder = ({
  suggestions,
  handleApplySuggestion,
  violation,
  handleClose
}: SuggestionHolderProps) => {
  return (
    <>
      <h4>Suggested Changes:</h4>
      <TableContainer component={Paper} sx={{ mt: 1, maxWidth: 600 }}>
        <Table size="small">
          <TableBody>
            {suggestions.map((suggestion, index) => (
              <TableRow
                key={index}
                hover
                onClick={() => {
                    handleApplySuggestion(violation.id, suggestion)
                    handleClose()
                }}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{suggestion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SuggestionHolder;

