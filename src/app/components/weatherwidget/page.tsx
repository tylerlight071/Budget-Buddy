"use client"

import { useEffect, useState } from "react";

const Weather_Widget = () => {
  const [weather, setWeather] = useState({
    town: "",
    temp: "",
    weather: "",
  });

  useEffect(() => {
    // Coordinates for Sturminster Newton
    const latitude = 50.9225;
    const longitude = -2.3052;
    const apikey = process.env.NEXT_PUBLIC_WEATHER_KEY;
    // Make a request to the OpenWeatherMap API
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        // Set the weather state with the data from the API
        setWeather({
          town: data.name,
          temp: data.main.temp,
          weather: data.weather[0].main,
        });
      })
      .catch(console.error);
  }, []);

  // Function to get the weather emoji
  const getWeatherEmoji = (weather: string) => {
    switch (weather) {
      case "Clear":
        return "☀️";
      case "Clouds":
        return "☁️";
      case "Rain":
        return "🌧️";
      case "Snow":
        return "❄️";
      default:
        return "";
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-[#6D6875]">{weather.town}</h1>
      <h1 className="text-3xl font-extrabold text-[#6D6875] text-right">
        {weather.weather} {getWeatherEmoji(weather.weather)}
      </h1>
      <h1 className="text-3xl font-extrabold text-[#6D6875] text-right">
        {weather.temp}°C
      </h1>
    </div>
  );
};

export default Weather_Widget;
