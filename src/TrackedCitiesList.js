import { useEffect, useState } from "react";

const TrackedCitiesList = () => {
  const getLocalStorageCitiesList = () => {
    return JSON.parse(localStorage.getItem("trackedCitiesList")) || [];
  };

  const [trackedCities, setTrackedCities] = useState(getLocalStorageCitiesList);

  const addTrackedCity = (city) => {
    if (
      !trackedCities.find((trackedCity) => trackedCity.id === city.geonameId)
    ) {
      const newTrackedCity = {
        name: city.name,
        id: city.geonameId,
        longitude: city.lng,
        latitude: city.lat,
      };
      setTrackedCities([...trackedCities, newTrackedCity]);
    } else {
      alert("Этот город уже был добавлен");
    }
  };

  const deleteTrackedCity = (name) => {
    setTrackedCities(
      trackedCities.filter((trackedCities) => trackedCities.name !== name)
    );
  };

  useEffect(() => {
    localStorage.setItem("trackedCitiesList", JSON.stringify(trackedCities));
  }, [trackedCities]);

  return { trackedCities, addTrackedCity, deleteTrackedCity };
};

export default TrackedCitiesList;
