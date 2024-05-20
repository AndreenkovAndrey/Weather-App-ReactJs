import React, { useEffect, useState } from "react";
import getCurrentWeatherAndForecastResponse from "./WeatherForecastAPI";

const CityCard = ({ cityToOpen, handleCloseCityCard }) => {
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const weather = await getCurrentWeatherAndForecastResponse(cityToOpen);
      setWeather(weather);
      setIsLoading(false);
    }
    fetchData();
  }, [cityToOpen]);

  return (
    <div className="cityCard">
      <h2>{cityToOpen.name}</h2>
      {isLoading && <span className="loader"></span>}
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
