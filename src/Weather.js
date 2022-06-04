import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Weather = ({ selectedCity }) => {
  const [weather, setWeather] = useState("");

  useEffect(() => {
    if (selectedCity !== "") {
      const findWeather = async function () {
        const response = await fetch(`/api/weather/${selectedCity}`);
        const data = await response.json();
        setWeather(data.data);
      };
      findWeather();
    }
  }, [selectedCity]);

  if (!weather) {
    return <div></div>;
  }
  console.log(weather);

  let averageTemp = Math.round(
    (weather.main.temp_min + weather.main.temp_max) / 2
  );
  let weatherDescription = weather.weather[0].description;

  return (
    <WeatherList>
      <div>
        <strong>Temp °C:</strong> {averageTemp} °C
      </div>
      <div>
        <strong>Weather:</strong> {weatherDescription}
      </div>
    </WeatherList>
  );
};

const WeatherList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default Weather;
