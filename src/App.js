import axios from "axios";
import React, { useEffect, useState } from "react";
import TrackedCityList from "./TrackedCityList";

import { OpenMeteo } from "./OpenMeteo";

export const App = () => {
  const [srcCity, setSrcCity] = useState("");
  const [cityList, setCityList] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const baseGeoNameUrl = "http://api.geonames.org";
  const userApi = "renattagaev";
  const numberOfRowsFromGeoName = "3";

  async function getCityInfo(query) {
    const endPoint = `${baseGeoNameUrl}/searchJSON?q=${query}&maxRows=${numberOfRowsFromGeoName}&lang=ru&username=${userApi}`;
    try {
      const response = await axios.get(endPoint);
      if (response.status === 200 && response.data) {
        setCityList(response.data.geonames);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const { trackedCity, addTrackedCity, deleteTrackedCity } = TrackedCityList();

  useEffect(() => {
    localStorage.setItem("trackedCityList", JSON.stringify(trackedCity));
  }, [trackedCity]);

  const handleClickCity = (city) => {
    const { name, latitude, longitude } = city;
    setSelectedCity({ name, latitude, longitude });
  };

  return (
    <div className="mainDiv">
      <h1>Погода сегодня</h1>
      <p>Узнайте погоду в вашем городе</p>
      {/* инпут для поиска города */}
      <input
        type="text"
        placeholder="Введите название города"
        value={srcCity}
        onChange={(e) => {
          getCityInfo(srcCity);
          setSrcCity(e.target.value);
          getCityInfo(e.target.value);
        }}
      />
      {srcCity && cityList.length > 0 && (
        <ul className="inputCityList">
          {cityList.map((city) => (
            <li
              className="liElementOfInputCityList"
              onClick={(e) => addTrackedCity(city)}
              key={city.geonameId}
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
      <p>Избранные города:</p>
      {/* список отслеживаемых городов */}
      <ul className="trackedCityList">
        {trackedCity.map((city) => (
          <li
            className="liElementOfTrackedCityList"
            key={city.name}
            onClick={(e) => handleClickCity(city)}
          >
            {city.name}
            <input
              type="button"
              value="Удалить"
              className="deletedButtonOfTrackedCityList"
              onClick={(e) => deleteTrackedCity(city.name)}
            />
          </li>
        ))}
        <OpenMeteo city={selectedCity} />
      </ul>
    </div>
  );
};
