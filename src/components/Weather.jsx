import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'

const Weather = () => {

  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": "/images/sun.png",
    "01n": "/images/sun.png",
    "02d": "/images/cloudy.png",
    "02n": "/images/cloudy.png",
    "03d": "/images/storm.png",
    "03n": "/images/storm.png",
    "04d": "/images/cloudy.png",
    "04n": "/images/cloudy.png",
    "09d": "/images/rainy-day.png",
    "09n": "/images/rainy-day.png",
    "10d": "/images/rainy-day.png",
    "10n": "/images/rainy-day.png",
    "13d": "/images/snow.png",
    "13n": "/images/snow.png",
  };
  
  const search = async (city) => {
    if(city == ""){
      alert("Enter City Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      
      const response = await fetch(url);
      const data = await response.json();

      if(!response.ok){
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon] || "/images/sun.png";
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });

    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data");
    }
  };
  
  useEffect(() => {
    search("jabalpur");
  }, []);

  return (
    <div className="weather">
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='search'/>
            <img src="/images/search-icon.jpg" alt="" onClick={()=>search(inputRef.current.value)} />
        </div>
        <img src={weatherData.icon} alt="" className="weather-icon"/>
        <p className="temperature">{weatherData.temperature}°C</p>
        <p className="location">{weatherData.location}</p>
        <div className='weather-data'>
          <div className='col'>
            <img src="/images/humidity-icon.jpg" alt="" className='humidity-icon'/>
            <div>
              <p>{weatherData.humidity} %</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className='col'>
            <img src="/images/wind-icon.jpg" alt="" className='wind-icon'/>
            <div>
              <p>{weatherData.windSpeed} km/hr</p>
              <span>Wind Speed</span>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Weather;