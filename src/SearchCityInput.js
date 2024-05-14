import React, { useState } from "react";
import getCityInfo from "./SearchCityData";

const SearchCityInput = (props) => {
  const [citySearchQuery, setCitySearchQuery] = useState("");

  const [cityListForDropdown, setCityListForDropdown] = useState([]);
  const getCityListDropdown = async (citySearchQuery) => {
    setCityListForDropdown(await getCityInfo(citySearchQuery));
  };

  const handleChangeInput = async (e) => {
    setCitySearchQuery(e.target.value);
    await getCityListDropdown(citySearchQuery);
  };
  const handleResetInput = () => {
    setCitySearchQuery("");
  };

  const handleClickOnInputCityList = (city) => {
    props.handleAddTrackedCityClick(city);
    setCitySearchQuery("");
  };

  window.addEventListener("click", function (event) {
    const target = event.target;
    if (target !== SearchCityInput) {
      setCitySearchQuery("");
    }
  });

  const mapCityListForDropdown = () => {
    return cityListForDropdown.map((city) => (
      <li
        className="liElementOfInputCityList"
        onClick={(e) => handleClickOnInputCityList(city)}
        key={city.geonameId}
      >
        {city.name}
      </li>
    ));
  };
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
        <ul className="inputCityList">{mapCityListForDropdown()}</ul>
      )}
    </>
  );
};

export default SearchCityInput;
