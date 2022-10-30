import { createContext, useContext, useReducer } from "react";
import { currencyReducer, initialState } from "./currencyReducer";

const currencyContext = createContext({});
const { Provider } = currencyContext;

const CurrencyContextProvider = ({ children, ...props }) => {
  const [state, dispatch] = useReducer(currencyReducer, initialState);

  return (
    <Provider value={{ state, dispatch }} {...props}>
      {children}
    </Provider>
  );
};

const useCurrency = () => {
  const state = useContext(currencyContext);
  if (state === undefined) {
    throw new Error("usecurrencyContext must be called within YourProvider");
  }

  return {
    ...state,
  };
};

export { CurrencyContextProvider, useCurrency };

export default currencyContext;
