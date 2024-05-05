import React, { useState } from "react";
import SearchCityInput from "./SearchCityInput";
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
  const handleResetInput = () => {
    setСitySearchQuery("");
  };

  const handleClickOnInputCityList = (city) => {
    setСitySearchQuery("");
  };

  window.addEventListener("click", function (event) {
    const target = event.target;
    if (target !== SearchCityInput) {
      setСitySearchQuery("");
    }
  });

  return (
    <div className="mainDiv">
      <h1>Погода</h1>
      <p>Узнайте погоду в вашем городе</p>
      <SearchCityInput
        citySearchQuery={citySearchQuery}
        handleChangeInput={handleChangeInput}
        handleResetInput={handleResetInput}
        cityListForDropdown={cityListForDropdown}
        handleClickOnInputCityList={handleClickOnInputCityList}
      />
      <p>Избранные города:</p>
      {/* список отслеживаемых городов */}
    </div>
  );
};
