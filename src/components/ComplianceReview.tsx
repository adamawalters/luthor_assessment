import { Typography } from "@mui/material";
import { ViolationData } from "../utils/types";
import Violation from "./Violation";

interface ComplianceReviewProps {
  paragraph: string;
  violations: Array<ViolationData>;
}

const ComplianceReview = ({ paragraph, violations }: ComplianceReviewProps) => {
  const renderTextWithViolations = () => {
    let lastIndex = 0;
    const elements = [];

    violations.forEach((violation, index) => {
      if (violation.start > lastIndex) {
        const item = paragraph.slice(lastIndex, violation.start);
        elements.push(item);
      }

      elements.push(<Violation key={index} violation={violation} />);

      lastIndex = violation.end;
    });

    if (lastIndex < paragraph.length) {
      const item = paragraph.slice(lastIndex);
      elements.push(item);
    }

    return elements;
  };

  return (
    <div className="violation-container">
      <Typography>{renderTextWithViolations()}</Typography>
    </div>
  );
};

export default ComplianceReview;
