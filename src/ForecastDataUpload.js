import React from "react";
import ConvertForecastData from "./ConvertForecastData";

export const ForecastDataUpload = () => {
  console.log("я уже тут");
  const { currentWeather, forecastUnits, getCurrentWeather } =
    ConvertForecastData();
  console.log(currentWeather[0]);
  const temperature =
    currentWeather[0].temperature_2m + forecastUnits[0].temperature;
  const humidity =
    currentWeather[0].relative_humidity_2m + forecastUnits[0].relative_humidity;
  const windSpeed =
    currentWeather[0].wind_speed_10m + forecastUnits[0].wind_speed;

  return (
    <div>
      <p className="currentWeatherElement">Температура: {temperature}</p>
      <p className="currentWeatherElement">Влажность: {humidity}</p>
      <p className="currentWeatherElement">Скорость ветра: {windSpeed}</p>
    </div>
  );
};
export default ForecastDataUpload;
