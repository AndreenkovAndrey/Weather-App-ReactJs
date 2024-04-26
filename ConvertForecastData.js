import { useState } from "react";
import { getCurrentWeatherAndForecastResponse } from "./WeatherForecastAPI";
const FORECAST_DAYS = 3;

export const ConvertForecastData = () => {
  // getCurrentWeatherAndForecastResponse(city);
  // console.log(currentWeatherAndForecastResponse);

  const [currentWeather, setCurrentWeather] = useState([]);
  getCurrentWeatherAndForecastResponse();

  function findIndexByCurrentTime(timeArray) {
    const currentTime = new Date().getHours();
    return timeArray.findIndex((time) => time.includes(String(currentTime)));
  }
  function getCurrentWeather(data) {
    const timeIndex = findIndexByCurrentTime(data.hourly.time);
    const newCurrentCityWeather = {
      temperature_2m: data.hourly.temperature_2m[timeIndex],
      relative_humidity_2m: data.hourly.relative_humidity_2m[timeIndex],
      wind_speed_10m: data.hourly.wind_speed_10m[timeIndex],
      weathercode: data.hourly.weather_code[timeIndex],
    };
    setCurrentWeather([...currentWeather, newCurrentCityWeather]);
    console.log(currentWeather);
  }

  const [dailyForecast, setDailyForecast] = useState([]);
  function convertDailyForecast({ data }) {
    const newDailyForecast = [];
    for (let i = -1; i < FORECAST_DAYS - 1; i++) {
      newDailyForecast.push({
        data: data.daily.time[i + 1],
        weathercode: data.daily.weather_code[i + 1],
        temperature_2m_max: data.daily.temperature_2m_max[i + 1],
        temperature_2m_min: data.daily.temperature_2m_min[i + 1],
      });
    }
    setDailyForecast(newDailyForecast);
    console.log(dailyForecast);
  }
  const [forecastUnits, setForecastUnits] = useState([]);
  function getForecastUnits(data) {
    const newForecastUnits = {
      temperature: data.current_units.temperature_2m,
      relative_humidity: data.current_units.relative_humidity_2m,
      wind_speed: data.current_units.wind_speed_10m,
    };
    setForecastUnits([...forecastUnits, newForecastUnits]);
  }
  return { currentWeather, forecastUnits, getCurrentWeather, getForecastUnits };
};
export default ConvertForecastData;
