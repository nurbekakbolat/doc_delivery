import { createContext } from "react";

const authContext = createContext({
  authenticated: 0,
  setAuthenticated: (auth) => {},
});

export default authContext;
