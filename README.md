<<<<<<< HEAD
# Compliance Copy Review Assistant

## Description
A tool that accepts text provided by the client, sends it to the API, and presents the text with a list of validations and suggestions to ensure that the text is ready for compliance review. 

## Installation
```sh
git clone https://github.com/adamawalters/luthor_assessment.git
cd luthor_assessment
cd luthor_assessment
npm install
npm run dev
```

## Features and key considerations
- The text in the editable text box is hardcoded, so that it remains aligned with the violations start and end points and the suggestions
- The mock API for validations and suggestions is present in `utils/mock_api.ts`. This includes the text positions (start, end, length) of the violations in the paragraph. 
- The main components are located in `components`. The overall flow is App -> Compliance Review -> SuggestionHolder -> Suggestion
- Context is used to pass some event handlers and state to lower components from the App component

## Known limitations
- After the user makes a free text update to a violation, ideally in a real project it would submit the new paragraph to the API to check for new violations rather than simply removing the violation
- The editable text box wouldn't be hardcoded and the user could submit new text to the paragraph


=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
>>>>>>> b689c3f (removed unnecessary folder)
