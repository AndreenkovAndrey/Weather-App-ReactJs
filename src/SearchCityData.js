import axios from "axios";
import { useState } from "react";

const SearchCityData = () => {
  const BASE_GEONAME_URL = "http://api.geonames.org";
  const USER_API = "renattagaev";
  const NUMBERS_OF_ROWS_FROM_GEONAME = "3";
  const [cityList, setCityList] = useState([]);

  const getCityInfo = async (query) => {
    const endPoint = `${BASE_GEONAME_URL}/searchJSON?q=${query}&maxRows=${NUMBERS_OF_ROWS_FROM_GEONAME}&lang=ru&username=${USER_API}`;
    try {
      const response = await axios.get(endPoint);
      if (response.status === 200 && response.data) {
        setCityList(response.data.geonames);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    cityList,
    getCityInfo,
  };
};

export default SearchCityData;
