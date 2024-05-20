import React, { useState } from "react";
import CityCard from "./CityCard";

const RenderTrackedCitiesList = (props) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [isCityCardOpen, setIsCityCardOpen] = useState(false);

  const handleClickCity = (city) => {
    const { name, latitude, longitude } = city;
    setSelectedCity({ name, latitude, longitude });
    setIsCityCardOpen(true);
  };

  const handleCloseCityCard = () => {
    setSelectedCity(null);
    setIsCityCardOpen(false);
  };

  return (
    <div className="trackedCityListDiv">
      {isCityCardOpen && selectedCity && (
        <CityCard
          cityToOpen={selectedCity}
          handleCloseCityCard={handleCloseCityCard}
        />
      )}

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
