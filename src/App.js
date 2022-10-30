import { useEffect } from "react";
import axios from "axios";
import "./App.css";
import ExchangeRateDashboard from "./components/ExchangeRateDashboard";
import { SignInForm } from "./components/SignInForm";
import { useCurrency } from "./context/currencyContext";

function App() {
  const {
    state: { submit, currency, seconds, formData, minutes },
    dispatch,
  } = useCurrency();

  useEffect(() => {
    window.localStorage.setItem("submit", submit);
    window.localStorage.setItem("seconds", seconds);
    window.localStorage.setItem("seconds", minutes);
    window.localStorage.setItem("currency", JSON.stringify(currency));
    window.localStorage.setItem("formData", JSON.stringify(formData));
  }, [currency, submit, formData, seconds, minutes]);

  useEffect(() => {
    fetchData(currency);
  }, [currency]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "SET_SECONDS" });

      if (seconds === 59) {
        dispatch({ type: "SET_MINUTES" });
        dispatch({ type: "SECONDS_RESET" });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, submit]);

  const fetchData = async (currency) => {
    const response = await axios.get(
      `https://api.exchangerate.host/latest?base=${currency}`
    );
    const { rates } = response.data;
    const rateList = [];
    for (const [symbol, rate] of Object.entries(rates)) {
      rateList.push({ symbol, rate });
    }
    dispatch({ type: "FETCH_DATA", payload: rateList });
  };
  return (
    <>
      <h1>XChange - Rates</h1>

      {submit ? (
        <div className="page-container">
          <ExchangeRateDashboard />
        </div>
      ) : (
        <SignInForm />
      )}
    </>
  );
}

export default App;
