import React from "react";
import { useState } from "react";
import { WeatherForecastAPI } from "./WeatherForecastAPI";
// FORECAST_DAYS
const forecast_days = 3;

export const ConvertForecastData = () => {
  // Опять некая абстрактная дата, хз что в ней
  const { meteoInfo, getOpenMeteoInfo } = WeatherForecastAPI();
  const [currentWeather, setCurrentWeather] = useState([]);

  function getCurrentWeather(meteoInfo) {
    function findIndexByCurrentTime(timeArray) {
      const currentTime = new Date().getHours();
      return timeArray.findIndex((time) => time.includes(String(currentTime)));
    }
    const timeIndex = findIndexByCurrentTime(meteoInfo.hourly.time);
    const newCurrentCityWeather = {
      temperature_2m: meteoInfo.hourly.temperature_2m[timeIndex],
      relative_humidity_2m: meteoInfo.hourly.relative_humidity_2m[timeIndex],
      wind_speed_10m: meteoInfo.hourly.wind_speed_10m[timeIndex],
      weathercode: meteoInfo.hourly.weather_code[timeIndex],
    };
    setCurrentWeather([...currentWeather, newCurrentCityWeather]);
    console.log(currentWeather);
  }

  const [dailyForecast, setDailyForecast] = useState([]);
  function convertDailyForecast(meteoInfo) {
    const newDailyForecast = [];
    // Зачем начинать цикл с -1, а потом писать ...[i + 1]?
    for (let i = -1; i < forecast_days - 1; i++) {
      newDailyForecast.push({
        data: meteoInfo.daily.time[i + 1],
        weathercode: meteoInfo.daily.weather_code[i + 1],
        temperature_2m_max: meteoInfo.daily.temperature_2m_max[i + 1],
        temperature_2m_min: meteoInfo.daily.temperature_2m_min[i + 1],
      });
    }
    setDailyForecast(newDailyForecast);
    console.log(dailyForecast);
  }
  const [forecastUnits, setForecastUnits] = useState([]);
  function getForecastUnits(meteoInfo) {
    const newForecastUnits = {
      temperature: meteoInfo.current_units.temperature_2m,
      relative_humidity: meteoInfo.current_units.relative_humidity_2m,
      wind_speed: meteoInfo.current_units.wind_speed_10m,
    };
    setForecastUnits([...forecastUnits, newForecastUnits]);
  }
  return { currentWeather, forecastUnits, getCurrentWeather };
};
export default ConvertForecastData;
