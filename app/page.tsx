import WeatherSearch from "../components/WeatherSearch";
import WeatherInfo from "../components/WeatherInfo";
import { Particles } from "@/components/Particles";

export default function Home({
  searchParams,
}: {
  searchParams: { location?: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 relative overflow-hidden">
      {/* Darker overlay for better particle visibility */}
      <div className="absolute inset-0 bg-black/80 z-0" />
      
      <Particles 
        className="absolute inset-0 z-10 animate-fade-in" 
        quantity={600} 
        color="255, 255, 255" 
        />      
      <h1 className="text-4xl font-bold text-white mb-8 relative z-20">Weather App</h1>
      <div className="bg-white/90 rounded-lg shadow-lg p-6 w-full max-w-md relative z-20">
        <WeatherSearch />
        <WeatherInfo searchParams={searchParams} />
      </div>
    </main>
  );
}