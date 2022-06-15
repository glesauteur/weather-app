import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Weather from "./Weather";

function App() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [province, setProvince] = useState("");

  useEffect(() => {
    if (province !== "") {
      const findCities = async function () {
        const response = await fetch(`/api/cities/${province}`);
        const data = await response.json();
        setCities(data.data);
      };
      findCities();
    }
  }, [province]);

  const handleProvinceSelection = (e) => {
    setProvince(e.target.value);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const citiesList = cities.map((city) => {
    return <option value={city}>{city}</option>;
  });

  return (
    <Container>
      <Wrapper>
        {selectedCity.length > 0 && province.length > 0 ? (
          <City>
            {selectedCity}, {province}
          </City>
        ) : (
          <City>Please select a province and a city.</City>
        )}

        <DropdownWrapper>
          <Dropdown province={province} onChange={handleProvinceSelection}>
            <option value="">Select your province</option>
            <option value="Alberta">Alberta</option>
            <option value="British Columbia">British Columbia</option>
            <option value="Manitoba">Manitoba</option>
            <option value="New Brunswick">New Brunswick</option>
            <option value="Newfoundland and Labrador">
              Newfoundland and Labrador
            </option>
            <option value="Northwest Territories">Northwest Territories</option>
            <option value="Nova ScotiaNS">Nova Scotia</option>
            <option value="Nunavut">Nunavut</option>
            <option value="Ontario">Ontario</option>
            <option value="Prince Edward Island">Prince Edward Island</option>
            <option value="Quebec">Quebec</option>
            <option value="Saskatchewan">Saskatchewan</option>
            <option value="Yukon Territory">Yukon Territory</option>
          </Dropdown>
          <Dropdown selectedCity={selectedCity} onChange={handleCityChange}>
            <option value="">Select your city</option>
            {citiesList}
          </Dropdown>
        </DropdownWrapper>
        <Weather selectedCity={selectedCity} />
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  height: 100vh;
`;

const Wrapper = styled.div``;

const DropdownWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const Dropdown = styled.select`
  height: 26px;
  padding: 0px 5px;
  margin-bottom: 10px;
  border-radius: 10px;
  width: 200px;
  height: 35px;
  cursor: pointer;
  border-width: 2px;
  border-color: ${(props) =>
    props.province === "" || props.selectedCity === "" ? "black" : "#BC80F7"};
`;

const City = styled.h1`
  text-align: center;
`;

export default App;
