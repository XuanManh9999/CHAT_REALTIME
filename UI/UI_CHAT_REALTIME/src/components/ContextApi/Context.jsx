import { createContext, useState } from "react";
export const Context = createContext();

function ContextApp({ children }) {
  const [userOnline, setUserOnline] = useState([]);
  return (
    <Context.Provider value={{ userOnline, setUserOnline }}>
      {children}
    </Context.Provider>
  );
}

export default ContextApp;
