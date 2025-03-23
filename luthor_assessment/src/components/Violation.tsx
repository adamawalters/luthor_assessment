import { ViolationData } from "../types";

interface ViolationProps {
    violation: ViolationData, 
    onClick: (violation: ViolationData) => void
}

const Violation = ({ violation, onClick }: ViolationProps) => {
    return (
      <span
        className="violation"
        onClick={() => onClick(violation)}
        style={{
          backgroundColor: violation.severity === "high" ? "rgba(255, 0, 0, 0.3)" :
                           violation.severity === "medium" ? "rgba(255, 165, 0, 0.3)" :
                           "rgba(255, 255, 0, 0.3)",
          cursor: "pointer",
          padding: "2px 4px",
          borderRadius: "3px"
        }}
      >
        {violation.text}
      </span>
    );
  };
  
  export default Violation;
  