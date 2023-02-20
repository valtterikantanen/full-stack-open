import { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const CountryRow = ({ country, handleShowOneCountry }) => (
  <div>
    <span>{country.name.common}</span>{' '}
    <button onClick={() => handleShowOneCountry(country.cca3)}>show</button>
  </div>
);

const WeatherData = ({ weatherData }) => {
  if (weatherData == null) return null;
  const {
    main: { temp },
    weather,
    wind: { speed: windSpeed }
  } = weatherData;
  return (
    <div>
      <div>Temperature {temp} °C</div>
      <img src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`} alt="" />
      <div>Wind {windSpeed} m/s</div>
    </div>
  );
};

const CountryData = ({
  country: {
    name: { common: name },
    capital,
    area,
    languages,
    flags: { svg: flagUrl }
  }
}) => {
  return (
    <>
      <h1>{name}</h1>
      <div>Capital {capital}</div>
      <div>Area {area} km²</div>
      <h4>Languages:</h4>
      <ul>
        {Object.values(languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={flagUrl}
        width="200"
        style={{ border: '1px solid black' }}
        alt={`The flag of ${name}`}
      />
      <h3>Weather in {capital}</h3>
    </>
  );
};

const Results = ({ countries, handleShowOneCountry, weatherData }) => {
  if (countries == null || countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (countries.length > 1) {
    return (
      <div>
        {countries.map(country => (
          <CountryRow
            key={country.cca3}
            country={country}
            handleShowOneCountry={handleShowOneCountry}
          />
        ))}
      </div>
    );
  }

  if (countries.length === 1) {
    return (
      <div>
        <CountryData country={countries[0]} />
        <WeatherData weatherData={weatherData} />
      </div>
    );
  }

  return <div>No results</div>;
};

const App = () => {
  const [filter, setFilter] = useState('');
  const [countryData, setCountryData] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      setCountryData(response.data);
      setFilteredCountries(response.data);
    });
  }, []);

  useEffect(() => {
    if (filteredCountries?.length !== 1) {
      setWeatherData(null);
      return;
    }

    const [latitude, longitude] = filteredCountries[0].capitalInfo.latlng;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      )
      .then(response => {
        setWeatherData(response.data);
      });
  }, [filteredCountries]);

  const handleFilterChange = e => {
    const filter = e.target.value;
    setFilter(filter);
    setFilteredCountries(
      countryData.filter(country =>
        country.name.common.toLowerCase().includes(filter.toLowerCase())
      )
    );
  };

  const showOnlyOneCountry = countryCode => {
    setFilteredCountries(filteredCountries.filter(country => country.cca3 === countryCode));
  };

  return (
    <div>
      <div>
        Find countries <input value={filter} onChange={handleFilterChange} />
      </div>
      <Results
        countries={filteredCountries}
        handleShowOneCountry={showOnlyOneCountry}
        weatherData={weatherData}
      />
    </div>
  );
};

export default App;
