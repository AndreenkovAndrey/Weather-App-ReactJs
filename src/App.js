import React from "react";
import SearchCityInput from "./SearchCityInput";
import TrackedCitiesList from "./TrackedCitiesList";
import RenderTrackedCitiesList from "./RenderTrackedCitiesList";

export const App = () => {
  const { trackedCities, addTrackedCity, deleteTrackedCity } =
    TrackedCitiesList();

  return (
    <div className="mainDiv">
      <h1>Погода</h1>

      <p>Узнайте погоду в вашем городе</p>
      <SearchCityInput handleAddTrackedCityClick={addTrackedCity} />
      <p>Избранные города:</p>
      <RenderTrackedCitiesList
        trackedCities={trackedCities}
        handleDeleteTrackedCityClick={deleteTrackedCity}
      />
    </div>
  );
};
