import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Dropdown } from "primereact/dropdown";
import "primeicons/primeicons.css";
import { Card } from "primereact/card";
import "./exchangeRates.css";
import FeaturedStats from "./FeaturedStats";
import { Button } from "primereact/button";

const ExchangeRateDashboard = ({
  rate,
  setCurrency,
  currency,
  formData,
  minutes,
  seconds,
  setSeconds,
  setMinutes,
  setSubmit,
}) => {
  const firstFiveCurrency = rate.slice(0, 5);

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
            onClick={() => setSubmit(false)}
          />

          <Dropdown
            style={{ marginBottom: 0 }}
            className="dropdown"
            optionLabel="symbol"
            optionValue="symbol"
            value={currency}
            options={rate}
            onChange={(e) => {
              setSeconds(0);
              setMinutes(0);
              setCurrency((prev) => (prev = e.value));
            }}
          />

          <Card className="currency-rate" style={{ maxWidth: "inherit" }}>
            <ul>
              {firstFiveCurrency.map((currency) => (
                <li key={currency.symbol} style={{ paddingBottom: "2px" }}>
                  <strong>{currency.symbol} </strong> : {currency.rate}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="chart">
          <Card style={{ maxWidth: "fit-content" }}>
            <BarChart
              width={500}
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

              <Bar dataKey="rate" fill="#8884d8" />
            </BarChart>
          </Card>

          <Card
            className="currency-rate currency-rate-mobile"
            style={{ maxWidth: "inherit", display: "none" }}
          >
            <ul>
              {firstFiveCurrency.map((currency) => (
                <li key={currency.symbol} style={{ paddingBottom: "2px" }}>
                  <strong>{currency.symbol} </strong> : {currency.rate}
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>
              Data refreshed {minutes < 10 ? "0" + minutes : minutes} :
              {seconds < 10 ? "0" + seconds : seconds}
              ... ago
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
