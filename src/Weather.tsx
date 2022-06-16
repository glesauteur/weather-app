import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  selectedCity: string
}

interface Weather {
  temp_min: number,
  temp_max: number,
  description: string
}

const Weather: React.FC<Props> = ({selectedCity}) => {
  const [weather, setWeather] = useState<Weather>({
    temp_min: 0,
    temp_max: 0,
    description: ""
  });

  useEffect(() => {
    if (selectedCity !== "") {
      const findWeather = async function () {
        const response = await fetch(`/api/weather/${selectedCity}`);
        const data = await response.json();

        setWeather({
          temp_min: data.data.main.temp_min,
          temp_max: data.data.main.temp_max,
          description: data.data.weather[0].description
        });
      };
      findWeather();
    }
  }, [selectedCity]);

  if (!weather) {
    return <div></div>;
  }
  console.log(weather);

  let averageTemp = Math.round(
    (weather.temp_min + weather.temp_max) / 2
  );

  return (
    <WeatherList>
      <div>
        <strong>Temp °C:</strong> {averageTemp} °C
      </div>
      <div>
        <strong>Weather:</strong> {weather.description}
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
