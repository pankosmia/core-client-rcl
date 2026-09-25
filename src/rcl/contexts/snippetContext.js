import { createContext } from "react";

const SnippetContext = createContext({
  snippet: {},
  setSnippet: () => {},
});

export default SnippetContext;
