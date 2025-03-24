import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import { useViolationContext } from "../utils/context";
import { ViolationData } from "../utils/types";

interface SuggestionHolderProps {
  handleClose: () => void;
  violation: ViolationData;
}

const SuggestionHolder = ({
  handleClose,
  violation,
}: SuggestionHolderProps) => {
  const { suggestions, handleApplySuggestion } = useViolationContext();

  return (
    <>
      <h4>Suggested Changes (click to select change):</h4>
      <TableContainer component={Paper} sx={{ mt: 1, maxWidth: 600 }}>
        <Table size="small">
          <TableBody>
            {suggestions[violation.id].map((suggestion, index) => (
              <TableRow
                key={index}
                hover
                onClick={() => {
                  handleApplySuggestion(violation.id, suggestion);
                  handleClose();
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
