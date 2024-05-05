import React from "react";

const SearchCityInput = ({
  citySearchQuery,
  handleChangeInput,
  handleResetInput,
  cityListForDropdown,
  handleClickOnInputCityList,
}) => {
  return (
    <>
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Введите название города..."
          value={citySearchQuery}
          onChange={handleChangeInput}
        />

        <button className="inputResetButton" onClick={handleResetInput}>
          Сбросить
        </button>
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
