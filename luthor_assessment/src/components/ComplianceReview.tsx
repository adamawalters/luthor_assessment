import { SuggestionData, ViolationData } from "../types";
import Violation from "./Violation";

interface ComplianceReviewProps {
  paragraph: string;
  violations: Array<ViolationData>;
  suggestions: SuggestionData;
  handleApplySuggestion: (violationId: string, newText: string) => void;
  handleDismissViolation: (violationId: string) => void;
}

const ComplianceReview = ({
  paragraph,
  violations,
  suggestions,
  handleApplySuggestion,
  handleDismissViolation,
}: ComplianceReviewProps) => {
  const renderTextWithViolations = () => {
    let lastIndex = 0;
    const elements = [];

    violations.forEach((violation, index) => {
      if (violation.start > lastIndex) {
        const item = paragraph.slice(lastIndex, violation.start);
        elements.push(item);
      }

      elements.push(
        <Violation
          key={index}
          violation={violation}
          suggestions={suggestions}
          handleApplySuggestion={handleApplySuggestion}
          handleDismissViolation={handleDismissViolation}
        />
      );

      lastIndex = violation.end;
    });

    if (lastIndex < paragraph.length) {
      const item = paragraph.slice(lastIndex);
      elements.push(item);
    }

    return elements;
  };

  return (
    <>
      <p>{renderTextWithViolations()}</p>
    </>
  );
};

export default ComplianceReview;
