import React, { useState } from "react";
import SearchCityData from "./SearchCityData";

const SearchCityInput = () => {
  const [citySearchQuery, setСitySearchQuery] = useState("");

  const { cityListForDropdown, getCityInfo } = SearchCityData();

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
    <>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Введите название города..."
          value={citySearchQuery}
          onChange={handleChangeInput}
        />
        {citySearchQuery && (
          <button className="inputResetButton" onClick={handleResetInput}>
            Сбросить
          </button>
        )}
      </div>
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
    </>
  );
};

export default SearchCityInput;
