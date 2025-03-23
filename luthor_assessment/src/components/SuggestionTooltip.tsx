import { Box, Popover } from "@mui/material";
import { SuggestionData, ViolationData } from "../types";
import { useMemo, useState } from "react";

interface SuggestionTooltipProps { 
    tooltipOpen: boolean
    selectedViolationData: ViolationData | null
    suggestions: SuggestionData | null
}


const SuggestionTooltip = ({selectedViolationData, suggestions, tooltipOpen}: SuggestionTooltipProps) => {
    

    const relevantViolations = useMemo(() => selectedViolationData && suggestions ? suggestions[selectedViolationData?.id]: [], [selectedViolationData, suggestions])
  
    return (
    <Popover 
    open={tooltipOpen}
    title={"Violation"}>
      <Box>Test text</Box>
    </Popover>
  )
}

export default SuggestionTooltip