import { SuggestionData, ViolationData } from "../types";
import Violation from "./Violation";

interface ComplianceReviewProps {
  paragraph: string;
  violations: Array<ViolationData>;
  onViolationClick: (violation: ViolationData) => void;
  suggestions: SuggestionData
}

const ComplianceReview = ({
  paragraph,
  violations,
  onViolationClick,
  suggestions
}: ComplianceReviewProps) => {

  const renderTextWithViolations = () => {
    let lastIndex = 0
    const elements = []

    violations.forEach((violation, index) => {
      if(violation.start > lastIndex) {
        const item = paragraph.slice(lastIndex, violation.start)
        elements.push(item)
      }

      elements.push(
        <Violation key={index} violation={violation} onClick={onViolationClick} suggestions={suggestions} />
      )

      lastIndex = violation.end
    })

    if (lastIndex < paragraph.length){
      const item = paragraph.slice(lastIndex)
      elements.push(item)
    }

    return elements
  }


  return (
    <>
      <p>{renderTextWithViolations()}</p>
    </>
  );
};

export default ComplianceReview;
