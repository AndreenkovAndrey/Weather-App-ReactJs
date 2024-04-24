import { useEffect, useState } from "react";

const TrackedCityList = () => {
  const getLocalStorageCity = () => {
    return JSON.parse(localStorage.getItem("trackedCityList")) || [];
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

  useEffect(() => {
    localStorage.setItem("trackedCityList", JSON.stringify(trackedCity));
  }, [trackedCity]);

  return { trackedCity, addTrackedCity, deleteTrackedCity };
};

export default TrackedCityList;
