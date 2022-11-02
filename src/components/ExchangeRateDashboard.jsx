import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Dropdown } from "primereact/dropdown";
import "primeicons/primeicons.css";
import { Card } from "primereact/card";
import "./exchangeRates.css";
import FeaturedStats from "./FeaturedStats";
import { Button } from "primereact/button";
import { useCurrency } from "../context/currencyContext";

import "primeicons/primeicons.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.css";

const ExchangeRateDashboard = () => {
  const {
    state: { rate, currency, formData, seconds, minutes },
    dispatch,
  } = useCurrency();

  let firstFiveCurrency = rate.slice(0, 5);

  return (
    <>
      <div className="rate-metrics">
        <div className="dropdown-container">
          <Card style={{ maxWidth: "100%" }}>
            <h3>Welcome {formData.name}&nbsp;🎉</h3>
          </Card>

          <Button
            label="Sign out"
            className="p-button-raised p-button-rounded"
            onClick={() => {
              localStorage.removeItem("currency");
              dispatch({ type: "SUBMIT", payload: false });
            }}
          />

          <Dropdown
            style={{ marginBottom: 0 }}
            className="dropdown"
            optionLabel="symbol"
            optionValue="symbol"
            value={currency}
            options={rate}
            onChange={(e) => {
              dispatch({ type: "RESET", payload: "seconds" });
              dispatch({ type: "RESET", payload: "minutes" });
              dispatch({ type: "CURRENCY_UPDATE", payload: e.value });
            }}
          />

          <Card className="currency-rate" style={{ maxWidth: "inherit" }}>
            <ul>
              <h3 style={{ paddingBottom: "2px" }}>
                Symbol <span>Rates</span>
              </h3>
              {firstFiveCurrency.map((currency) => (
                <div className="currency-rate-container" key={currency.symbol}>
                  <strong>{currency.symbol}</strong>
                  <span>{currency.rate}</span>
                </div>
              ))}
            </ul>
          </Card>
        </div>

        <div className="chart">
          <Card style={{ maxWidth: "100%" }}>
            <div style={{ width: "100%" }}>
              <BarChart
                width={400}
                height={300}
                data={firstFiveCurrency}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <XAxis dataKey="symbol" />
                <YAxis />
                <Tooltip />

                <Bar dataKey="rate" fill="#6366f1" />
              </BarChart>
            </div>
          </Card>

          <Card
            className="currency-rate currency-rate-mobile"
            style={{ maxWidth: "inherit", display: "none" }}
          >
            <ul>
              {firstFiveCurrency.map((currency, index) => (
                <li key={index} style={{ paddingBottom: "2px" }}>
                  <strong>{currency.symbol} </strong> : {currency.rate}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              Data refreshed {minutes < 10 ? "0" + minutes : minutes}:
              {seconds < 10 ? "0" + seconds : seconds}
              ... seconds ago
            </p>
          </Card>
        </div>

        <div className="stats">
          <FeaturedStats />
        </div>
      </div>
    </>
  );
};

export default ExchangeRateDashboard;
