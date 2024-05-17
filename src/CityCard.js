import React from "react";
const CityCard = (props) => {
  return (
    <div className="cityCard">
      <h2>{props.cityToOpen.name}</h2>
      <input
        type="button"
        value="Свернуть"
        className="returnButtonOfCityCard"
        onClick={props.handleCloseCityCard}
      />
    </div>
  );
};

export default CityCard;
