export interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  region: string;
  aliases: string[];
}

export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: number;
}

export interface DailyForecast {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: CurrentWeather;
  daily: DailyForecast;
}

export interface DayForecastItem {
  date: string;
  dayOfWeek: string;
  formattedDate: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
}

export type TemperatureUnit = "C" | "F";

export type WeatherConditionType =
  | "clear"
  | "cloudy"
  | "rain"
  | "thunderstorm"
  | "fog"
  | "snow";

export interface WeatherMeta {
  description: string;
  icon: string;
  type: WeatherConditionType;
}

