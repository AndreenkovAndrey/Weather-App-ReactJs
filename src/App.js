import React from "react";
import SearchCityInput from "./SearchCityInput";

export const App = () => {
  return (
    <div className="mainDiv">
      <h1>Погода</h1>
      <p>Узнайте погоду в вашем городе</p>
      <SearchCityInput />
      <p>Избранные города:</p>
      {/* список отслеживаемых городов */}
    </div>
  );
};
