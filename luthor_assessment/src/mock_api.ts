import { ViolationData, SuggestionData } from "./types";

export const fetchViolations = (paragraph: string, mockViolations: boolean): Promise<Array<ViolationData>> => {
  
  // If mock_violations is false, return no violations
  if (!mockViolations) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([])
      }, 500);
    })
  }
  
  // Return hardcoded violations
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: "v1",
          text: "guarantees consistent returns of up to 20% annually",
          start: 113,
          end: 164,
          length: 51,
          type: "Guaranteed Returns",
          message: "Avoid implying guaranteed or predictable returns.",
          severity: "high",
        },
        {
          id: "v2",
          text: "beat the market and build generational wealth",
          start: 201,
          end: 246,
          length: 45,
          type: "Promissory Language",
          message: "Avoid promising outperformance or guaranteed success.",
          severity: "medium",
        },
        {
          id: "v3",
          text: "make you our next success story",
          start: 284,
          end: 316,
          length: 32,
          type: "Testimonials",
          message: "Avoid vague success testimonials without disclosures.",
          severity: "low",
        },
      ]);
    }, 500);
  });
};

export const fetchSuggestions = (
  violations: Array<ViolationData>
): Promise<SuggestionData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        "v1": [
         "Has historically delivered returns of up to 20% annually, though past performance is not indicative of future results.",
         "aims to achieve strong annual returns, with some investors seeing gains as high as 20% in certain years.",
         "Leverages advanced modeling to pursue returns that, in past performance, have reached up to 20% annually."
       ],
      "v2": [
         "strive for long-term growth and financial resilience",
         "Help investors pursue their financial goals with confidence",
         "support informed investing strategies aimed at building lasting value"
       ],
       "v3": [
         "Discuss how our approach might align with your financial goals",
         "Explore whether our strategy is a good fit for your needs",
         "See how our methodology could support your investment journey"
       ]
     }
     );
    }, 500);
  });
};
