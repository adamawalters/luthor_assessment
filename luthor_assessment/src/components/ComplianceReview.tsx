import { ViolationData } from "../types";
import Violation from "./Violation";

interface ComplianceReviewProps {
  paragraph: string;
  violations: Array<ViolationData>;
  onViolationClick: () => void;
}

const ComplianceReview = ({
  paragraph,
  violations,
  onViolationClick,
}: ComplianceReviewProps) => {

  const renderTextWIthViolations = () => {
    let lastIndex = 0
    const elements = []

    violations.forEach((violation, index) => {
      if(violation.start < lastIndex) {
        elements.push(paragraph.slice(lastIndex, violation.start))
      }

      elements.push(
        <Violation key={index} violation={violation} onClick={onViolationClick} />
      )

      lastIndex = violation.end
    })

    if (lastIndex < paragraph.length){
      elements.push(paragraph.slice(lastIndex))
    }

    return elements
  }


  return (
    <>
      <p>{renderTextWIthViolations()}</p>
      <p>{paragraph}</p>
    </>
  );
};

export default ComplianceReview;
