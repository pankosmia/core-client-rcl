import { createContext } from "react";

const ClientInterfacesContext = createContext({
  clientInterfaces: {},
  setClientInterfaces: () => {},
});

export default ClientInterfacesContext;
