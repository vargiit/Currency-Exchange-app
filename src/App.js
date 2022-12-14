import { useEffect } from "react";
import axios from "axios";
import "./App.css";
import ExchangeRateDashboard from "./components/ExchangeRateDashboard";
import { SignInForm } from "./components/SignInForm";
import { useCurrency } from "./context/currencyContext";
import currencyicon from "./assets/currencyicon.ico";

function App() {
  const {
    state: { submit, currency, seconds, formData, minutes },
    dispatch,
  } = useCurrency();

  useEffect(() => {
    localStorage.setItem("submit", submit);
    localStorage.setItem("seconds", seconds);
    localStorage.setItem("minutes", minutes);
    localStorage.setItem("currency", JSON.stringify(currency));
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [currency, submit, formData, seconds, minutes]);

  useEffect(() => {
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
    fetchData(currency);
  }, [currency, dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: "SET_SECONDS" });

      if (seconds === 59) {
        dispatch({ type: "SET_MINUTES" });
        dispatch({ type: "RESET", payload: "seconds" });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, dispatch]);

  return (
    <>
      <h1>
        <img
          src={currencyicon}
          alt="icon"
          style={{ width: "50px", height: "50px" }}
        />
        <span style={{ marginLeft: "2rem" }}> XChange - Rates</span>
      </h1>

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
