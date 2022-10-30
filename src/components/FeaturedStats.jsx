import React from "react";
import { Card } from "primereact/card";
import "./featuredStats.css";

const FeaturedStats = () => {
  const stats = [
    {
      title: "Leading foreign exchange currency ",
      value: "USD",
    },
    {
      title: "USD share of global currency reserves",
      value: "58.88%",
    },
    {
      title: "Value of reserve assets of the European Central Bank",
      value: "77.91bn EUR",
    },
    {
      title: "Daily turnover in global foreign exchange market",
      value: "6.6tr USD ",
    },
    {
      title: "Leading foreign exchange trading service",
      value: "J.P. Morgan",
    },
  ];

  return (
    <div>
      <Card>
        <h2 className="stat-header">Key figures</h2>
        <ul className="featured-stats">
          {stats.map((stat, index) => {
            return (
              <>
                <li key={index}>
                  <div>{stat.title}</div>{" "}
                  <div className="stat-value">{stat.value}</div>
                </li>
              </>
            );
          })}
        </ul>
      </Card>
    </div>
  );
};

export default FeaturedStats;
