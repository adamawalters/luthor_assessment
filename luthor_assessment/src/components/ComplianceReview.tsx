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

  const renderTextWithViolations = () => {
    let lastIndex = 0
    const elements = []

    violations.forEach((violation, index) => {
      if(violation.start > lastIndex) {
        const item = paragraph.slice(lastIndex, violation.start)
        console.log(`last index: ${lastIndex}, violation.start: ${violation.start}`)
        console.log(`pushing item "${item}" to elements`)
        elements.push(item)
      }

      elements.push(
        <Violation key={index} violation={violation} onClick={onViolationClick} />
      )

      lastIndex = violation.end
    })

    if (lastIndex < paragraph.length){
      console.log(`lastindex: ${lastIndex}`)
      console.log(`paragraph.length: ${paragraph.length}`)
      const item = paragraph.slice(lastIndex)
      console.log(`pushing item "${item}" to elements`)
      elements.push(paragraph.slice(lastIndex))
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
