"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getWeatherData } from "../lib/weather";

type WeatherData = {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
};

export default function WeatherDisplay() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (location) {
      getWeatherData(location)
        .then((data) => setWeatherData(data))
        .catch((err) => setError(err));
    }
  }, [location]);

  if (!location) {
    return (
      <p className="text-gray-500 mt-4">
        Enter a location to see weather information.
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 mt-4">
        Unable to fetch weather data. Please try again.
      </p>
    );
  }

  if (!weatherData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-semibold mb-2">{weatherData.location}</h2>
      <p className="text-4xl font-bold mb-2">{weatherData.temperature}°C</p>
      <p className="text-lg">{weatherData.description}</p>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">Humidity</p>
          <p>{weatherData.humidity}%</p>
        </div>
        <div>
          <p className="font-semibold">Wind Speed</p>
          <p>{weatherData.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
}
