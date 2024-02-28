import React, { useEffect, useState }    from "react";
import "./App.css";
import { Item } from "./components/Item/Item";
import axios from "axios";
import { format } from "date-fns";
import { ForecastItem } from "./components/ForecastItem/ForecastItem";
import SummerIcon from '../src/assets/temperature-hot.png'
import WinterIcon from '../src/assets/temperature-cold.png'

function App() {
  const endpoint =
    "https://api.weatherapi.com/v1/forecast.json?key=6e0c8d871e0842dabde234934242002&q=Curitiba&days=7&aqi=no&alerts=yes";
  const [data, setData] = useState<any>();
  const [mainDate, setMainDate] = useState(new Date());
  const [forecast, setForecast] = useState([]);
  console.log("🚀 ~ App ~ data:", forecast);

  useEffect(() => {
    const handleLoadData = async () => {
      try {
        const { data: response } = await axios.get(endpoint);
        setData(response);
        setMainDate(response?.location?.localtime);
        setForecast(response?.forecast.forecastday);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    handleLoadData();
  }, []);

  return (
    <div className="container">
      <div className="container-weather">
        <div className="weather">
          <div className="img-icon">
            <img src={data?.current.condition.icon} alt="Weather Icon" />
          </div>
          <div className="temperature">
            <p className="containerValue">
              <span className="value">{data?.current.temp_c}</span>°{" "}
              <span className="unit-format">C</span>
            </p>
            <p className="weathertext">{data?.current.condition.text}</p>
          </div>
          <div className="date-info">
            <p className="date">{format(new Date(mainDate), "d MMMM yyyy")}</p>
            <p className="time">
              {format(new Date(mainDate), "iiii, hh:mm aa")}
            </p>
            <p className="daystatus">
              {data?.current.is_day ? "Day" : "Night"}
            </p>
          </div>
          <div className="location-info">
            <p className="location">{`${data?.location.name}, ${data?.location.country}`}</p>
          </div>
        </div>
        <div className="info-weather">
          <h3>Today</h3>
          <div className="grid-container">
            <Item
              text="Wind"
              mainText={`${data?.current.wind_kph} KM/h`}
              subtext={data?.current.wind_dir}
            />
            <Item text="Humidity" mainText={`${data?.current.humidity}%`} />
            <Item text="Temperature History">
              <span className="temperature_hist">
              <img className="forecast-icon" alt="Forecast"  src={SummerIcon} /> {data?.forecast.forecastday[0].day.maxtemp_c}
              </span>
              <span className="temperature_hist">
              <img className="forecast-icon" alt="Forecast"  src={WinterIcon} /> {data?.forecast.forecastday[0].day.mintemp_c}
              </span>
            </Item>
          </div>
          <h3>Next Days</h3>
          <div className="forecast">
            {forecast.map((item, key) => (
              <ForecastItem
                key={key}
                text={item.day.condition.text}
                maxTemp={item.day.maxtemp_c}
                minTemp={item.day.mintemp_c}
                img={item.day.condition.icon}
                date={format(new Date(item.date), "d MMMM yyyy")}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
