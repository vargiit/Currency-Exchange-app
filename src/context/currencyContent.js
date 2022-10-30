import { createContext, useContext, useState } from "react";

const currencyContext = createContext({});
const { Provider, Consumer } = currencyContext;

const YourProvider = ({ children, ...props }) => {
  const [state, setState] = useState(null);

  return (
    <Provider value={{ state }} {...props}>
      {children}
    </Provider>
  );
};

const usecurrencyContext = () => {
  const state = useContext(currencyContext);
  if (state === undefined) {
    throw new Error("usecurrencyContext must be called within YourProvider");
  }

  return {
    ...state,
  };
};

export { YourProvider, usecurrencyContext };

export default currencyContext;
