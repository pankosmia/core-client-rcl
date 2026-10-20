import { createContext } from "react";

const BetaContext = createContext({ debug: false, setBeta: () => {} });

export default BetaContext;
