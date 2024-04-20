import React, { useState } from "react";

const TrackedCityList = () => {
  const getLocalStorageCity = () => {
    let trackedCityList = localStorage.getItem("trackedCityList");
    if (trackedCityList) {
      return JSON.parse(localStorage.getItem("trackedCityList"));
    } else {
      return [];
    }
  };

  const [trackedCity, setTrackedCity] = useState(getLocalStorageCity);

  const addTrackedCity = (city) => {
    const newTrackedCity = {
      name: city.name,
      id: city.geonameId,
      longitude: city.lng,
      latitude: city.lat,
    };
    setTrackedCity([...trackedCity, newTrackedCity]);
  };

  const deleteTrackedCity = (name) => {
    setTrackedCity(
      trackedCity.filter((trackedCity) => trackedCity.name !== name)
    );
  };

  return { trackedCity, addTrackedCity, deleteTrackedCity };
};

export default TrackedCityList;
