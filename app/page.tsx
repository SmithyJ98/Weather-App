import WeatherSearch from "../components/WeatherSearch"
import WeatherInfo from "../components/WeatherInfo"

export default function Home({
  searchParams,
}: {
  searchParams: { location?: string }
}) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Weather App</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <WeatherSearch />
        <WeatherInfo searchParams={searchParams} />
      </div>
    </main>
  )
}