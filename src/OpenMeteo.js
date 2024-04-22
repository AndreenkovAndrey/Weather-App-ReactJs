import React, { useState, useEffect } from "react";
import axios from "axios";

export const OpenMeteo = ({ city }) => {
  // INFO
  const [meteoInf, setMeteoInf] = useState(null);
  const forecast_days = 3;

  useEffect(() => {
    if (city) {
      // INFO
      getOpenMeteoInf(city);
    }
  }, [city]);

  // INFO
  // Поменять название функции, непонятно какую инфу получает. Проноз или текущая погода?
  async function getOpenMeteoInf(city) {
    const endPointOpenmeteo = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,weather_code,visibility,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&wind_speed_unit=ms&forecast_days=3`;

    try {
      const response = await axios.get(endPointOpenmeteo);
      if (response.status === 200 && response.data) {
        // INFO
        setMeteoInf(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const [currentWeather, setCurrentWeather] = useState([]);

  function findIndexByCurrentTime(timeArray) {
    const currentTime = new Date().getHours();
    return timeArray.findIndex((time) => time.includes(String(currentTime)));
  }
  // INFO
  function getCurrentWeather(meteoInf) {
    // INFO
    const timeIndex = findIndexByCurrentTime(meteoInf.hourly.time);
    const newCurrentCityWeather = {
      // INFO
      temperature_2m: meteoInf.hourly.temperature_2m[timeIndex],
      // INFO
      relative_humidity_2m: meteoInf.hourly.relative_humidity_2m[timeIndex],
      // INFO
      wind_speed_10m: meteoInf.hourly.wind_speed_10m[timeIndex],
      // INFO
      weathercode: meteoInf.hourly.weather_code[timeIndex],
    };
    setCurrentWeather([...currentWeather, newCurrentCityWeather]);
    console.log(currentWeather);
  }

  const [dailyForecast, setDailyForecast] = useState([]);
  // INFO
  function convertDailyForecast(meteoInf) {
    const newDailyForecast = [];
    // Для чего стартуем с -1?
    for (let i = -1; i < forecast_days - 1; i++) {
      newDailyForecast.push({
        // INFO
        data: meteoInf.daily.time[i + 1],
        // INFO
        weathercode: meteoInf.daily.weather_code[i + 1],
        // INFO
        temperature_2m_max: meteoInf.daily.temperature_2m_max[i + 1],
        // INFO
        temperature_2m_min: meteoInf.daily.temperature_2m_min[i + 1],
      });
    }
    setDailyForecast(newDailyForecast);
    console.log(dailyForecast);
  }
  const [forecastUnits, setForecastUnits] = useState([]);
  // INFO
  function getForecastUnits(meteoInf) {
    const newForecastUnits = {
      // INFO
      temperature: meteoInf.current_units.temperature_2m,
      // INFO
      relative_humidity: meteoInf.current_units.relative_humidity_2m,
      // INFO
      wind_speed: meteoInf.current_units.wind_speed_10m,
    };
    setForecastUnits([...forecastUnits, newForecastUnits]);
  }
  const handleCurrentWeatherClick = () => {
    // INFO
    getCurrentWeather(meteoInf);
    // INFO
    getForecastUnits(meteoInf);
  };

  const handleDailyForecastClick = () => {
    // INFO
    convertDailyForecast(meteoInf);
  };

  return (
    // INFO
    meteoInf && (
      <div>
        <h2 onClick={handleCurrentWeatherClick}>Текущая погода:</h2>
        {currentWeather.length > 0 && (
          <div>
            {/* <h3>Текущая погода:</h3> */}
            <p className="currentWeatherElement">
              Температура: {currentWeather[0].temperature_2m}
              {forecastUnits[0].temperature}
            </p>
            <p className="currentWeatherElement">
              Влажность: {currentWeather[0].relative_humidity_2m}
              {forecastUnits[0].relative_humidity}
            </p>
            <p className="currentWeatherElement">
              Скорость ветра: {currentWeather[0].wind_speed_10m}
              {forecastUnits[0].wind_speed}
            </p>
          </div>
        )}
        {/* <h2 onClick={handleDailyForecastClick}>Прогноз погоды</h2>
        {dailyForecast.length > 0 && (
          <div>
            {dailyForecast.map((day, index) => (
              <div key={index}>
                <h3>Прогноз на {day.data}:</h3>
                <p>Максимальная температура: {day.temperature_2m_max}</p>
                <p>Минимальная температура: {day.temperature_2m_min}</p>
              </div>
            ))}
          </div>
        )} */}
      </div>
    )
  );
};
