import { createContext, useContext, useState } from "react";

export const ModeContext = createContext();

import React from "react";

export const DarkLightModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");
  ///////////////////////////////////////

  const modeHandler = () => {
    if (mode === "dark") {
      setMode("light");
    } else {
      setMode("dark");
    }
    console.log(mode);
  };
  /////////////////////////////
  const value = { mode, modeHandler };

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};

export const ModeViewContext = () => {
  return useContext(ModeContext);
};
