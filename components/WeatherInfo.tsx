import { getWeatherData } from "../lib/weather"

export default async function WeatherInfo({
  searchParams,
}: {
  searchParams: { location?: string }
}) {
  const location = searchParams.location

  if (!location) {
    return <p className="text-gray-500 mt-4">Enter a location to see weather information.</p>
  }

  try {
    const weatherData = await getWeatherData(location)

    if (!weatherData) {
      throw new Error("Unable to fetch weather data")
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
    )
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return <p className="text-red-500 mt-4">Unable to fetch weather data. Please try again.</p>
  }
}