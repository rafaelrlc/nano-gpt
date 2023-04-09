import React, { useState } from "react";
import { useContext } from "react";
const SettingsContext = React.createContext({
  temperature: 0,
  tokens: 0,
  apiKey: "",
  setTemperature: () => {},
  setTokens: () => {},
  setApiKey: () => {},
});

const SettingsContextProvider = (props) => {
  const [temperature, setTemperature] = useState(0);
  const [tokens, setTokens] = useState(0);
  const [apiKey, setApiKey] = useState("");

  const contextValue = {
    temperature: temperature,
    tokens: tokens,
    apiKey: apiKey,
    setTemperature,
    setTokens,
    setApiKey: setApiKey,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {props.children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
export const useSettings = () => useContext(SettingsContext);
