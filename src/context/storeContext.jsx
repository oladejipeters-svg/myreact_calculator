import { createContext, useState } from "react";
export const storeContext = createContext();
export const StoreProvider = ({ children }) => {
  //define your states/functions/data here
  const [ingredients, setIngregients] = useState("");

  //exporting states/functions/data
  const contextObj = {
    ingredients,
    setIngregients,
  };
  return (
    <storeContext.Provider value={contextObj}>{children}</storeContext.Provider>
  );
};
