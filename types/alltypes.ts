export type WeatherData = {
    location: string;
    temperature: number;
    description: string;
    humidity: number;
    windSpeed: number;
  };

  export interface ParticlesProps extends React.HTMLAttributes<HTMLDivElement> {
    quantity?: number
    staticity?: number
    ease?: number
    refresh?: boolean
    color?: string // Add color prop
  };

  export interface ButtonProps {
    text?: string;
  };