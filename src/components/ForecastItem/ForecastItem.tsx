import React from "react";
import "./ForecastItem.css";
import SummerIcon from '../../assets/temperature-hot.png'
import WinterIcon from '../../assets/temperature-cold.png'

type ForecastItemProps = {
  date: string;
  text: string;
  img: string;
  maxTemp: string;
  minTemp: string;
};

export const ForecastItem: React.FC<ForecastItemProps> = ({
  text,
  date,
  maxTemp,
  minTemp,
  img
}) => {
  return (
    <div className="forecast-item">
    <h3 className="forecast-title">
      {date}
    </h3>
    <img alt="Forecast"  src={img} />
    <h3 className="forecast-title">
      {text}
    </h3>
    <span className="forecast-temp">
    <img className="forecast-icon" alt="Forecast"  src={SummerIcon} /> {maxTemp}°{" "} C
    </span>
    <span className="forecast-temp">
    <img className="forecast-icon" alt="Forecast"  src={WinterIcon} /> {minTemp}°{" "} C
    </span>
  </div>
  );
};
