import { Typography } from "@mui/material";
import { SuggestionData } from "../types";

interface SuggestionHolderProps {
  suggestions: Array<string>;
}

const SuggestionHolder = ({ suggestions }: SuggestionHolderProps) => {
    console.log(`the suggestions are: ${suggestions}. lenggth: ${suggestions.length}`)
    return (
    <Typography sx={{ p: 2 }}>
      Suggested Changes:
      <ul>
      {suggestions.map((suggestion) => (
        <li>{suggestion}</li>
      ))}
      </ul>
    </Typography>
  );
};

export default SuggestionHolder;
