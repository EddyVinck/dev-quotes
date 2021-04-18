import React from "react";

const QuoteContext = React.createContext({});

export const QuoteContextProvider: React.FC = ({ children }) => {
  const value = {};
  return (
    <QuoteContext.Provider value={value}>{children}</QuoteContext.Provider>
  );
};
