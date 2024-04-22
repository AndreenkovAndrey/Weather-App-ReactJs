import axios from "axios";
import React, { useEffect, useState } from "react";
import TrackedCityList from "./TrackedCityList";
import SearchCityData from "./SearchCityData";

import WeatherForecastAPI from "./WeatherForecastAPI";
import ConvertForecastData from "./ConvertForecastData";
import ForecastDataUpload from "./ForecastDataUpload";

export const App = () => {
  // Что такое userCity? Это выбранный сейчас город? Если да, тогда надо назвать currentCity или selectedCity
  const [userCity, setUserCity] = useState("");
  // Чем отличается selectedCity от userCity?
  const [selectedCity, setSelectedCity] = useState("");
  // Что такое cityList? Если это выпадающий список, тогда нужно менять название. Например cityListForDropdown
  const { cityList, getCityInfo } = SearchCityData();

  // openmeteo api try
  // Что такое meteoInfo? Это текущая погода или прогноз на 3 дня? Если текущая погода, тогда надо currentWeather, если прогноз, тогда forecast
  const { meteoInfo, getOpenMeteoInfo } = WeatherForecastAPI();
  // Чем отличется currentWeather от meteoInfo?
  const { currentWeather, getCurrentWeather } = ConvertForecastData();
  // Что такое weatherData? У тебя 3 почти одинаковых названия: meteoInfo, currentWeather, weatherData. Я не могу понять, что они отражают и в чём их разница
  const [weatherData, setWeatherData] = useState([]);
  // Уже 4 почти одинаковых названия. Ты же сам даже запутаешься в них
  const [meteoData, setMeteoData] = useState([]);

  // Какую инфу по погоде грузим, прогноз или текущую?
  async function loadWeatherData(city) {
    // Опять размытое имя переменной, что означает meteoInfo?
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

  // handleCitySearchInput
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
