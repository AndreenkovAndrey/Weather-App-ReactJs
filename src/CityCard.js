import React, { useEffect, useState } from "react";
import getCurrentWeatherAndForecastResponse from "./WeatherForecastAPI";

const CityCard = ({ cityToOpen, handleCloseCityCard }) => {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData() {
    setIsLoading(true);
    try {
      const response = await getCurrentWeatherAndForecastResponse(cityToOpen);
      setWeather(response);
    } catch (error) {
      console.error("Ошибка при загрузке данных о погоде:", error);
    }
    setIsLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  const renderConvertedCurrentWeather = (weather) => {
    if (weather !== undefined && weather !== null) {
      return (
        <div className="currentWeatherDiv">
          <p className="currentWeatherDivElement">
            Температура: {weather.data.current.temperature_2m}
            {weather.data.current_units.temperature_2m}
          </p>
          <p className="currentWeatherDivElement">
            Скорость ветра: {weather.data.current.wind_speed_10m}
            {weather.data.current_units.wind_speed_10m}
          </p>
          <p className="currentWeatherDivElement">
            Влажность: {weather.data.current.relative_humidity_2m}
            {weather.data.current_units.relative_humidity_2m}
          </p>
        </div>
      );
    } else {
      return (
        <div className="currentWeatherErrorDiv">
          <p className="currentWeatherErrorDivChild">Ошибка</p>
          <p className="currentWeatherErrorDivChild">
            Данные о погоде не загружены.
          </p>
        </div>
      );
    }
  };

  return (
    <div className="cityCard">
      <h2>{cityToOpen.name}</h2>
      {isLoading && <span className="loader"></span>}
      <div className="currentWeather">
        {renderConvertedCurrentWeather(weather)}
      </div>
      <input
        type="button"
        value="Свернуть"
        className="returnButtonOfCityCard"
        onClick={handleCloseCityCard}
      />
    </div>
  );
};

export default CityCard;
