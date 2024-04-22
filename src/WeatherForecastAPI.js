import React, { useState, useEffect } from "react";
import axios from "axios";
// import ForecastDataUpload from "./ForecastDataUpload";

export const WeatherForecastAPI = (city) => {
  const [meteoInfo, setMeteoInfo] = useState(null);
  const forecast_days = 3;

  useEffect(() => {
    if (city) {
      getOpenMeteoInfo(city);
    }
  }, [city]);

  async function getOpenMeteoInfo(city) {
    const endPointOpenmeteo = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,weather_code,visibility,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&wind_speed_unit=ms&forecast_days=${forecast_days}`;

    try {
      const response = await axios.get(endPointOpenmeteo);
      if (response.status === 200 && response.data) {
        setMeteoInfo(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }
  return { meteoInfo, getOpenMeteoInfo };
};
export default WeatherForecastAPI;
// const [currentWeather, setCurrentWeather] = useState([]);

// function findIndexByCurrentTime(timeArray) {
//   const currentTime = new Date().getHours();
//   return timeArray.findIndex((time) => time.includes(String(currentTime)));
// }
// function getCurrentWeather(meteoInfo) {
//   const timeIndex = findIndexByCurrentTime(meteoInfo.hourly.time);
//   const newCurrentCityWeather = {
//     temperature_2m: meteoInfo.hourly.temperature_2m[timeIndex],
//     relative_humidity_2m: meteoInfo.hourly.relative_humidity_2m[timeIndex],
//     wind_speed_10m: meteoInfo.hourly.wind_speed_10m[timeIndex],
//     weathercode: meteoInfo.hourly.weather_code[timeIndex],
//   };
//   setCurrentWeather([...currentWeather, newCurrentCityWeather]);
//   console.log(currentWeather);
// }

// const [dailyForecast, setDailyForecast] = useState([]);
// function convertDailyForecast(meteoInfo) {
//   const newDailyForecast = [];
//   for (let i = -1; i < forecast_days - 1; i++) {
//     newDailyForecast.push({
//       data: meteoInfo.daily.time[i + 1],
//       weathercode: meteoInfo.daily.weather_code[i + 1],
//       temperature_2m_max: meteoInfo.daily.temperature_2m_max[i + 1],
//       temperature_2m_min: meteoInfo.daily.temperature_2m_min[i + 1],
//     });
//   }
//   setDailyForecast(newDailyForecast);
//   console.log(dailyForecast);
// }
// const [forecastUnits, setForecastUnits] = useState([]);
// function getForecastUnits(meteoInfo) {
//   const newForecastUnits = {
//     temperature: meteoInfo.current_units.temperature_2m,
//     relative_humidity: meteoInfo.current_units.relative_humidity_2m,
//     wind_speed: meteoInfo.current_units.wind_speed_10m,
//   };
//   setForecastUnits([...forecastUnits, newForecastUnits]);
// }
// const handleCurrentWeatherClick = () => {
//   getCurrentWeather(meteoInfo);
//   getForecastUnits(meteoInfo);
// };

// const handleDailyForecastClick = () => {
//   convertDailyForecast(meteoInfo);
// };

// meteoInfo && (
//   <div className="currentWeatherDivEl">
//     <h2 onClick={handleCurrentWeatherClick}>Текущая погода</h2>
//     {
//       currentWeather.length > 0 &&
//         ForecastDataUpload(currentWeather, forecastUnits)
// <div>
//   {/* <h3>Текущая погода:</h3> */}
//   <p className="currentWeatherElement">
//     Температура: {currentWeather[0].temperature_2m}
//     {forecastUnits[0].temperature}
//   </p>
//   <p className="currentWeatherElement">
//     Влажность: {currentWeather[0].relative_humidity_2m}
//     {forecastUnits[0].relative_humidity}
//   </p>
//   <p className="currentWeatherElement">
//     Скорость ветра: {currentWeather[0].wind_speed_10m}
//     {forecastUnits[0].wind_speed}
//   </p>
// </div>

/* <h2 onClick={handleDailyForecastClick}>Прогноз погоды</h2>
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
        )} */
// </div>
