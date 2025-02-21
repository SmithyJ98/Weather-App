import { WeatherData } from "@/types/alltypes";

export async function getWeatherData(location: string): Promise<WeatherData> {
  try {
    const geocodingResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        location
      )}&count=1&language=en&format=json`
    );

    if (!geocodingResponse.ok) {
      throw new Error("Geocoding API request failed");
    }

    const geocodingData = await geocodingResponse.json();

    if (!geocodingData.results || geocodingData.results.length === 0) {
      throw new Error("Location not found");
    }

    const { latitude, longitude, name } = geocodingData.results[0];

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
    );

    if (!weatherResponse.ok) {
      throw new Error("Weather API request failed");
    }

    const weatherData = await weatherResponse.json();

    const currentWeather = weatherData.current_weather;
    const currentHourIndex = new Date(currentWeather.time).getHours();

    return {
      location: name,
      temperature: Math.round(currentWeather.temperature),
      description: getWeatherDescription(currentWeather.weathercode),
      humidity: Math.round(
        weatherData.hourly.relativehumidity_2m[currentHourIndex]
      ),
      windSpeed: Math.round(currentWeather.windspeed),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
}

function getWeatherDescription(weatherCode: number): string {
  const weatherDescriptions: { [key: number]: string } = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    56: "Light freezing drizzle",
    57: "Dense freezing drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    66: "Light freezing rain",
    67: "Heavy freezing rain",
    71: "Slight snow fall",
    73: "Moderate snow fall",
    75: "Heavy snow fall",
    77: "Snow grains",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    85: "Slight snow showers",
    86: "Heavy snow showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail",
  };

  return weatherDescriptions[weatherCode] || "Unknown";
}
