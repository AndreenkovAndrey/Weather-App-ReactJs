import React, { useState } from "react";
import SearchCityInput from "./SearchCityInput";
import TrackedCitiesList from "./TrackedCitiesList";

export const App = () => {
  const [selectedCity, setSelectedCity] = useState("");
  const { trackedCities, addTrackedCity, deleteTrackedCity } =
    TrackedCitiesList();

  const handleClickCity = (city) => {
    const { name, latitude, longitude } = city;
    setSelectedCity({ name, latitude, longitude });
  };
  return (
    <div className="mainDiv">
      <h1>Погода</h1>

      <p>Узнайте погоду в вашем городе</p>
      <SearchCityInput handleAddTrackedCityClick={addTrackedCity} />
      <p>Избранные города:</p>
      {/* список отслеживаемых городов */}
      <ul className="trackedCitiesList">
        {trackedCities.map((city) => (
          <li
            className="liElementOfTrackedCityList"
            key={city.name}
            onClick={(e) => handleClickCity(city)}
          >
            {city.name}
            <input
              type="button"
              value="Х"
              className="deletedButtonOfTrackedCitiesList"
              onClick={(e) => deleteTrackedCity(city.name)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
