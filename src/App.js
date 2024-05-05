import React, { useEffect, useState } from "react";
import TrackedCityList from "./TrackedCityList";
import SearchCityData from "./SearchCityData";

import getCurrentWeatherAndForecastResponse from "./WeatherForecastAPI";
import ConvertForecastData from "./ConvertForecastData";
import ForecastDataUpload from "./ForecastDataUpload";

export const App = () => {
  const [citySearchQuery, setСitySearchQuery] = useState("");

  const [selectedCity, setSelectedCity] = useState("");

  const { cityListForDropdown, getCityInfo } = SearchCityData();

  // openmeteo api try

  const { currentWeather, getCurrentWeather } = ConvertForecastData();

  async function loadWeatherData(city) {
    const data = await getCurrentWeatherAndForecastResponse(city);
    console.log(data);

    if (data) {
      getCurrentWeather(data);
      // console.log(currentWeather);
    } else {
      console.log("Error here");
    }
  }

  // useEffect(() => {
  //   if (selectedCity) loadWeatherData(selectedCity);
  // }, [selectedCity]);

  const { trackedCity, addTrackedCity, deleteTrackedCity } = TrackedCityList();

  const handleClickCity = (city) => {
    const { name, latitude, longitude } = city;
    setSelectedCity({ name, latitude, longitude });
    loadWeatherData(selectedCity);
  };

  const handleChangeInput = (e) => {
    getCityInfo(citySearchQuery);
    setСitySearchQuery(e.target.value);
    // getCityInfo(e.target.value);
  };

  const handleClickOnInputCityList = (city) => {
    addTrackedCity(city);
    setСitySearchQuery("");
  };

  return (
    <div className="mainDiv">
      <h1>Погода </h1>
      <p>Узнайте погоду в вашем городе</p>
      {/* инпут для поиска города */}
      <input
        type="text"
        placeholder="Введите название города..."
        value={citySearchQuery}
        onChange={handleChangeInput}
      />
      {citySearchQuery && cityListForDropdown.length > 0 && (
        <ul className="inputCityList">
          {cityListForDropdown.map((city) => (
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
          </li>
        ))}
      </ul>
    </div>
  );
};
