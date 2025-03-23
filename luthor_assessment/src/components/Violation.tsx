import { Popover, Typography } from "@mui/material";
import { SuggestionData, ViolationData } from "../types";
import { useEffect, useState } from "react";
import SuggestionHolder from "./SuggestionHolder";

interface ViolationProps {
    violation: ViolationData, 
    onClick: (violation: ViolationData) => void, 
    suggestions: SuggestionData
}

const Violation = ({ violation, onClick, suggestions }: ViolationProps) => {
    
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const [relevantSuggestions, setRelevantSuggestions] = useState<Array<string>>([])
  
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
      onClick(violation);
      setAnchorEl(e.currentTarget);
    };


    useEffect(() => {
      if(suggestions){
        setRelevantSuggestions(suggestions[violation.id])
      }  
    }, [suggestions, violation])
    
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const getBackgroundColor = () => {
      switch (violation.severity) {
        case "high":
          return "rgba(255, 0, 0, 0.3)";
        case "medium":
          return "rgba(255, 165, 0, 0.3)";
        default:
          return "rgba(255, 255, 0, 0.3)";
      }
    };
  
    return (
      <>
        <span
          className="violation"
          onClick={handleClick}
          style={{
            backgroundColor: getBackgroundColor(),
            cursor: "pointer",
            padding: "2px 4px",
            borderRadius: "3px",
          }}
        >
          {violation.text}
        </span>
        <Popover open={open} anchorEl={anchorEl} onClose={handleClose}>
          <SuggestionHolder suggestions={relevantSuggestions} />
        </Popover>
      </>
    );
  };

  export default Violation