# Compliance Copy Review Assistant

## Description
A tool that accepts text provided by the client, sends it to the API, and presents the text with a list of validations and suggestions to ensure that the text is ready for compliance review. 

## Installation
```sh
git clone https://github.com/adamawalters/luthor_assessment.git
cd luthor_assessment
npm install
npm run dev
```

## Features and key considerations
- The text in the editable text box is hardcoded, so that it remains aligned with the violations start and end points and the suggestions
- The mock API for validations and suggestions is present in `utils/mock_api.ts`. This includes the text positions (start, end, length) of the violations in the paragraph. 
- The main components are located in `components`. The overall flow is App -> Compliance Review -> SuggestionHolder
- Context is used to pass some event handlers and state to lower components from the App component
- Material UI is used for some components such as the Popover

## Known limitations
- After the user makes a free text update to a violation, ideally in a real project it would submit the new paragraph to the API to check for new violations rather than simply removing the violation
- The editable text box wouldn't be hardcoded and the user could submit new text to the paragraph


