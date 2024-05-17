import axios from "axios";

export async function getCurrentWeatherAndForecastResponse(city) {
  const FORECAST_DAYS = 3;
  const endPointOpenmeteo = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,weather_code,visibility,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&wind_speed_unit=ms&forecast_days=${FORECAST_DAYS}`;

  try {
    const response = await axios.get(endPointOpenmeteo);
    if (response.status === 200 && response.data) {
      return { data: response.data };
    }
  } catch (error) {
    console.error(error);
  }
}

export default getCurrentWeatherAndForecastResponse;
