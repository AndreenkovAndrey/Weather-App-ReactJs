import axios from "axios";
import React, { useEffect, useState } from "react";
import TrackedCityList from "./TrackedCityList";
import SearchCityData from "./SearchCityData";

import WeatherForecastAPI from "./WeatherForecastAPI";
import ConvertForecastData from "./ConvertForecastData";
import ForecastDataUpload from "./ForecastDataUpload";

export const App = () => {
  const [userCity, setUserCity] = useState("");

  const [selectedCity, setSelectedCity] = useState("");

  const { cityList, getCityInfo } = SearchCityData();

  // openmeteo api try
  const { meteoInfo, getOpenMeteoInfo } = WeatherForecastAPI();
  const { currentWeather, getCurrentWeather } = ConvertForecastData();
  const [weatherData, setWeatherData] = useState([]);
  const [meteoData, setMeteoData] = useState([]);

  async function loadWeatherData(city) {
    const meteoInfo = await getOpenMeteoInfo(city);
    setMeteoData(meteoInfo);
    console.log(meteoData);
    if (meteoInfo) {
      const currentWeatherInfo = getCurrentWeather(meteoInfo);
      setWeatherData(currentWeatherInfo);
    } else {
      console.log("Error here");
    }
  }

  useEffect(() => {
    if (selectedCity) loadWeatherData(selectedCity);
  }, [selectedCity]);

  const { trackedCity, addTrackedCity, deleteTrackedCity } = TrackedCityList();

  const handleClickCity = (city) => {
    const { name, latitude, longitude } = city;
    setSelectedCity({ name, latitude, longitude });
  };

  const handleChangeInput = (e) => {
    getCityInfo(userCity);
    setUserCity(e.target.value);
    // getCityInfo(e.target.value);
  };

  const handleClickOnInputCityList = (city) => {
    addTrackedCity(city);
    setUserCity("");
  };

  return (
    <div className="mainDiv">
      <h1>Погода </h1>
      <p>Узнайте погоду в вашем городе</p>
      {/* инпут для поиска города */}
      <input
        type="text"
        placeholder="Введите название города..."
        value={userCity}
        onChange={handleChangeInput}
      />
      {userCity && cityList.length > 0 && (
        <ul className="inputCityList">
          {cityList.map((city) => (
            <li
              className="liElementOfInputCityList"
              onClick={(e) => handleClickOnInputCityList(city)}
              key={city.geonameId}
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
      <p>Избранные города:</p>
      {/* список отслеживаемых городов */}
      <ul className="trackedCityList">
        {trackedCity.map((city) => (
          <li
            className="liElementOfTrackedCityList"
            key={city.name}
            onClick={(e) => handleClickCity(city)}
          >
            {city.name}
            <input
              type="button"
              value="Х"
              className="deletedButtonOfTrackedCityList"
              onClick={(e) => deleteTrackedCity(city.name)}
            />
            {meteoInfo && (
              <div>
                <ForecastDataUpload />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
