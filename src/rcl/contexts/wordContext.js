import { createContext } from "react";

const WordContext = createContext({
  word: {},
  setWord: () => {},
});

export default WordContext;
