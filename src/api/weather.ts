import type {
  City,
  DailyForecast,
  DayForecastItem,
  TemperatureUnit,
  WeatherMeta,
  WeatherResponse,
} from "../types";

export const CITIES: City[] = [
  {
    id: "ha-noi",
    name: "Hà Nội",
    latitude: 21.0285,
    longitude: 105.8542,
    region: "Miền Bắc",
    aliases: ["hanoi", "hn", "thu do"],
  },
  {
    id: "hai-phong",
    name: "Hải Phòng",
    latitude: 20.8449,
    longitude: 106.6881,
    region: "Miền Bắc",
    aliases: ["haiphong", "hp", "dat cang"],
  },
  {
    id: "hue",
    name: "Huế",
    latitude: 16.4637,
    longitude: 107.5909,
    region: "Miền Trung",
    aliases: ["hue", "thua thien hue", "co do"],
  },
  {
    id: "da-nang",
    name: "Đà Nẵng",
    latitude: 16.0544,
    longitude: 108.2022,
    region: "Miền Trung",
    aliases: ["danang", "dn"],
  },
  {
    id: "nha-trang",
    name: "Nha Trang",
    latitude: 12.2388,
    longitude: 109.1967,
    region: "Nam Trung Bộ",
    aliases: ["nhatrang", "khanh hoa"],
  },
  {
    id: "da-lat",
    name: "Đà Lạt",
    latitude: 11.9404,
    longitude: 108.4583,
    region: "Tây Nguyên",
    aliases: ["dalat", "lam dong", "thanh pho ngan hoa"],
  },
  {
    id: "tp-ho-chi-minh",
    name: "TP. Hồ Chí Minh",
    latitude: 10.8231,
    longitude: 106.6297,
    region: "Miền Nam",
    aliases: ["ho chi minh", "tp hcm", "tphcm", "sai gon", "saigon", "hcm"],
  },
  {
    id: "can-tho",
    name: "Cần Thơ",
    latitude: 10.0452,
    longitude: 105.7469,
    region: "Tây Nam Bộ",
    aliases: ["cantho", "ct", "tay do"],
  },
];

const API_BASE_URL = "https://api.open-meteo.com/v1/forecast";

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `Gọi API thất bại (mã ${res.status}). Vui lòng kiểm tra lại kết nối mạng.`,
    );
  }
  return res.json();
}

export async function fetchWeatherData(
  latitude: number,
  longitude: number,
): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current:
      "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "Asia/Bangkok",
  });

  return getJson<WeatherResponse>(`${API_BASE_URL}?${params.toString()}`);
}

export function getWeatherMeta(code: number): WeatherMeta {
  switch (code) {
    case 0:
      return {
        description: "Trời quang đãng",
        icon: "☀️",
        type: "clear",
      };
    case 1:
      return {
        description: "Chủ yếu quang đãng",
        icon: "🌤️",
        type: "clear",
      };
    case 2:
      return {
        description: "Mây rải rác",
        icon: "⛅",
        type: "cloudy",
      };
    case 3:
      return {
        description: "Nhiều mây / u ám",
        icon: "☁️",
        type: "cloudy",
      };
    case 45:
    case 48:
      return {
        description: "Sương mù",
        icon: "🌫️",
        type: "fog",
      };
    case 51:
      return {
        description: "Mưa phùn nhẹ",
        icon: "🌦️",
        type: "rain",
      };
    case 53:
      return {
        description: "Mưa phùn vừa",
        icon: "🌧️",
        type: "rain",
      };
    case 55:
      return {
        description: "Mưa phùn dày hạt",
        icon: "🌧️",
        type: "rain",
      };
    case 56:
    case 57:
      return {
        description: "Mưa phùn buốt giá",
        icon: "🌧️",
        type: "rain",
      };
    case 61:
      return {
        description: "Mưa nhỏ",
        icon: "🌧️",
        type: "rain",
      };
    case 63:
      return {
        description: "Mưa vừa",
        icon: "🌧️",
        type: "rain",
      };
    case 65:
      return {
        description: "Mưa to diện rộng",
        icon: "🌧️",
        type: "rain",
      };
    case 66:
    case 67:
      return {
        description: "Mưa đá lạnh buốt",
        icon: "🌧️",
        type: "rain",
      };
    case 71:
    case 73:
    case 75:
    case 77:
      return {
        description: "Tuyết rơi",
        icon: "🌨️",
        type: "snow",
      };
    case 80:
      return {
        description: "Mưa rào nhẹ",
        icon: "🌦️",
        type: "rain",
      };
    case 81:
      return {
        description: "Mưa rào vừa",
        icon: "🌧️",
        type: "rain",
      };
    case 82:
      return {
        description: "Mưa rào dữ dội",
        icon: "⛈️",
        type: "rain",
      };
    case 85:
    case 86:
      return {
        description: "Mưa tuyết rào",
        icon: "🌨️",
        type: "snow",
      };
    case 95:
      return {
        description: "Dông kèm sấm sét",
        icon: "⛈️",
        type: "thunderstorm",
      };
    case 96:
    case 99:
      return {
        description: "Dông kèm mưa đá",
        icon: "⛈️",
        type: "thunderstorm",
      };
    default:
      return {
        description: "Thời tiết thay đổi",
        icon: "🌤️",
        type: "clear",
      };
  }
}

export function celsiusToFahrenheit(c: number): number {
  return (c * 9) / 5 + 32;
}

export function formatTemp(celsius: number, unit: TemperatureUnit): string {
  const val = unit === "C" ? celsius : celsiusToFahrenheit(celsius);
  return `${Math.round(val * 10) / 10}°${unit}`;
}

export function formatDateTime(isoString: string): string {
  if (!isoString) return "";
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    const parts = isoString.split("T");
    if (parts.length === 2) {
      const [y, m, d] = parts[0].split("-");
      return `${parts[1]}, ${d}/${m}/${y}`;
    }
    return isoString;
  }
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${hours}:${minutes}, ${day}/${month}/${year}`;
}

const VIETNAMESE_DAYS = [
  "Chủ Nhật",
  "Thứ Hai",
  "Thứ Ba",
  "Thứ Tư",
  "Thứ Năm",
  "Thứ Sáu",
  "Thứ Bảy",
];

export function formatDailyForecast(daily: DailyForecast): DayForecastItem[] {
  const result: DayForecastItem[] = [];
  const length = Math.min(
    daily.time.length,
    daily.weather_code.length,
    daily.temperature_2m_max.length,
    daily.temperature_2m_min.length,
  );

  for (let i = 0; i < length; i++) {
    const rawDate = daily.time[i];
    const [y, m, d] = rawDate.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    const dayOfWeek =
      i === 0
        ? `Hôm nay (${VIETNAMESE_DAYS[dateObj.getDay()]})`
        : VIETNAMESE_DAYS[dateObj.getDay()];
    const formattedDate = `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}`;

    result.push({
      date: rawDate,
      dayOfWeek,
      formattedDate,
      weatherCode: daily.weather_code[i],
      tempMax: daily.temperature_2m_max[i],
      tempMin: daily.temperature_2m_min[i],
    });
  }

  return result;
}

export function removeDiacritics(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

