"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getWeather } from "../lib/weather";
import ShareButton from "./ShareButton";
import { WeatherData } from "@/types/alltypes";

export default function WeatherDisplay() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (location) {
      getWeather(location)
        .then((data) => setWeatherData(data))
        .catch((err) => setError(err));
    }
  }, [location]);

  if (!location) {
    return (
      <p className="text-gray-500 mt-4 text-center">
        Enter a location to see weather information.
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-red-500 mt-4 text-center">
        Unable to fetch weather data. Please check the spelling of your input or the location provided may not be covered.
      </p>
    );
  }

  if (!weatherData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-4">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-semibold mb-2">{weatherData.location}</h2>
        <ShareButton />
      </div>
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
