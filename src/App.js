import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import ExchangeRateDashboard from "./components/ExchangeRateDashboard";
import { SignInForm } from "./components/SignInForm";

function App() {
  const [rate, setRate] = useState([]);
  const [currency, setCurrency] = useState("INR");
  const [submit, setSubmit] = useState(false);
  const [formData, setFormData] = useState({});
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  console.log(submit);

  useEffect(() => {
    if (window.localStorage.getItem("currency") === null) {
      console.log("fjdh");
      window.localStorage.setItem("currency", JSON.stringify("INR"));
    }

    setSubmit(JSON.parse(window.localStorage.getItem("submit")));
    setSeconds(JSON.parse(window.localStorage.getItem("seconds")));
    setCurrency(JSON.parse(window.localStorage.getItem("currency")));
    setFormData(JSON.parse(window.localStorage.getItem("formData")));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("submit", submit);
    window.localStorage.setItem("seconds", seconds);
    window.localStorage.setItem("currency", JSON.stringify(currency));
    window.localStorage.setItem("formData", JSON.stringify(formData));
  }, [currency, submit, formData, seconds]);

  useEffect(() => {
    fetchData(currency);
  }, [currency]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
      if (seconds === 59) {
        setMinutes((prev) => prev + 1);
        setSeconds(0);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [submit, seconds]);

  const fetchData = async (currency) => {
    const response = await axios.get(
      `https://api.exchangerate.host/latest?base=${currency}`
    );
    const { rates } = response.data;
    const rateList = [];
    for (const [symbol, rate] of Object.entries(rates)) {
      rateList.push({ symbol, rate });
    }

    setRate(rateList);
  };
  return (
    <>
      <h1>XChange - Rates</h1>

      {submit ? (
        <div className="page-container">
          <ExchangeRateDashboard
            rate={rate}
            setCurrency={setCurrency}
            currency={currency}
            formData={formData}
            minutes={minutes}
            seconds={seconds}
            setSeconds={setSeconds}
            setMinutes={setMinutes}
            setSubmit={setSubmit}
          />
        </div>
      ) : (
        <SignInForm
          setSubmit={setSubmit}
          formData={formData}
          setFormData={setFormData}
          setSeconds={setSeconds}
          setMinutes={setMinutes}
        />
      )}
    </>
  );
}

export default App;
