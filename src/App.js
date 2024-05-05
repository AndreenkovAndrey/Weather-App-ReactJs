import React, { useEffect, useState } from "react";

import SearchCityData from "./SearchCityData";


export const App = () => {
  const [citySearchQuery, setСitySearchQuery] = useState("");

  const [selectedCity, setSelectedCity] = useState("");

  const { cityListForDropdown, getCityInfo } = SearchCityData();


  const handleClickCity = (city) => {
    const { name, latitude, longitude } = city;
    setSelectedCity({ name, latitude, longitude });
  };

  const handleChangeInput = (e) => {
    getCityInfo(citySearchQuery);
    setСitySearchQuery(e.target.value);
  };

  const handleClickOnInputCityList = (city) => {
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
    </div>
  );
};
