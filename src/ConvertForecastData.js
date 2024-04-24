import React from "react";
import { useState } from "react";
import { WeatherForecastAPI } from "./WeatherForecastAPI";
const forecast_days = 3;

export const ConvertForecastData = () => {
  const {
    currentWeatherAndForecastResponse,
    getСurrentWeatherAndForecastResponse,
  } = WeatherForecastAPI();
  const [currentWeather, setCurrentWeather] = useState([]);

  function getCurrentWeather(currentWeatherAndForecastResponse) {
    function findIndexByCurrentTime(timeArray) {
      const currentTime = new Date().getHours();
      return timeArray.findIndex((time) => time.includes(String(currentTime)));
    }
    const timeIndex = findIndexByCurrentTime(
      currentWeatherAndForecastResponse.hourly.time
    );
    const newCurrentCityWeather = {
      temperature_2m:
        currentWeatherAndForecastResponse.hourly.temperature_2m[timeIndex],
      relative_humidity_2m:
        currentWeatherAndForecastResponse.hourly.relative_humidity_2m[
          timeIndex
        ],
      wind_speed_10m:
        currentWeatherAndForecastResponse.hourly.wind_speed_10m[timeIndex],
      weathercode:
        currentWeatherAndForecastResponse.hourly.weather_code[timeIndex],
    };
    setCurrentWeather([...currentWeather, newCurrentCityWeather]);
    console.log(currentWeather);
  }

  const [dailyForecast, setDailyForecast] = useState([]);
  function convertDailyForecast(currentWeatherAndForecastResponse) {
    const newDailyForecast = [];
    for (let i = -1; i < forecast_days - 1; i++) {
      newDailyForecast.push({
        data: currentWeatherAndForecastResponse.daily.time[i + 1],
        weathercode:
          currentWeatherAndForecastResponse.daily.weather_code[i + 1],
        temperature_2m_max:
          currentWeatherAndForecastResponse.daily.temperature_2m_max[i + 1],
        temperature_2m_min:
          currentWeatherAndForecastResponse.daily.temperature_2m_min[i + 1],
      });
    }
    setDailyForecast(newDailyForecast);
    console.log(dailyForecast);
  }
  const [forecastUnits, setForecastUnits] = useState([]);
  function getForecastUnits(currentWeatherAndForecastResponse) {
    const newForecastUnits = {
      temperature:
        currentWeatherAndForecastResponse.current_units.temperature_2m,
      relative_humidity:
        currentWeatherAndForecastResponse.current_units.relative_humidity_2m,
      wind_speed:
        currentWeatherAndForecastResponse.current_units.wind_speed_10m,
    };
    setForecastUnits([...forecastUnits, newForecastUnits]);
  }
  return { currentWeather, forecastUnits, getCurrentWeather };
};
export default ConvertForecastData;
