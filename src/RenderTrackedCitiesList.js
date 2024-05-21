import React, { useState } from "react";
import CityCard from "./CityCard";

const RenderTrackedCitiesList = (props) => {
  const [selectedCity, setSelectedCity] = useState(null);

  const handleClickCity = ({ name, latitude, longitude }) => {
    // Можно сделать так
    // const { name, latitude, longitude } = city;
    setSelectedCity({ name, latitude, longitude });
  };

  const handleCloseCityCard = () => {
    setSelectedCity(null);
  };

  const renderTrackedCitiesList = () => {
    return (
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
              onClick={(e) => {
                e.stopPropagation();
                props.handleDeleteTrackedCityClick(city.name);
              }}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="trackedCityListDiv">
      {selectedCity && (
        <CityCard
          cityToOpen={selectedCity}
          handleCloseCityCard={handleCloseCityCard}
        />
      )}
      {!selectedCity && renderTrackedCitiesList()}
    </div>
  );
};
export default RenderTrackedCitiesList;
