import React, { useState } from "react";

const RenderTrackedCitiesList = (props) => {
  const [selectedCity, setSelectedCity] = useState("");

  const handleClickCity = (city) => {
    const { name, latitude, longitude } = city;
    setSelectedCity({ name, latitude, longitude });
  };

  return (
    <div className="trackedCityListDiv">
      <ul className="trackedCitiesList">
        {props.trackedCities.map((city) => (
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
              onClick={(e) => props.handleDeleteTrackedCityClick(city.name)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default RenderTrackedCitiesList;
