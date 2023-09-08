/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const User = createContext();

export const Username = ({ children }) => {
  const [username, setUsername] = useState("grumpy19");

  return (
    <User.Provider value={{ username, setUsername }}>{children}</User.Provider>
  );
};
