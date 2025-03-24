import { createContext, useContext } from "react";
import { SuggestionData } from "./types";

interface ViolationContextType {
  suggestions: SuggestionData;
  handleApplySuggestion: (violationId: string, newText: string) => void;
  handleDismissViolation: (violationId: string) => void;
}

export const ViolationContext: React.Context<ViolationContextType | undefined> =
  createContext<ViolationContextType | undefined>(undefined);

export function useViolationContext(): ViolationContextType {
  const context = useContext(ViolationContext);
  if (context === undefined) {
    throw new Error(
      `useViolationCOntext must be used within a ViolationContext.Provider`,
    );
  }
  return context;
}
