import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  CITIES,
  fetchWeatherData,
  formatDailyForecast,
  formatDateTime,
  formatTemp,
  getWeatherMeta,
  removeDiacritics,
} from "../api/weather";
import type { City, DayForecastItem, TemperatureUnit, WeatherResponse } from "../types";

const FAVORITES_STORAGE_KEY = "ript_weather_favorites";
const UNIT_STORAGE_KEY = "ript_weather_unit";

export default function Home() {
  const { cityId } = useParams();
  const navigate = useNavigate();

  const selectedCity: City | undefined = useMemo(() => {
    if (!cityId) return undefined;
    return CITIES.find((c) => c.id === cityId);
  }, [cityId]);

  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [unit, setUnit] = useState<TemperatureUnit>(() => {
    const saved = localStorage.getItem(UNIT_STORAGE_KEY);
    return saved === "F" ? "F" : "C";
  });

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [filterMode, setFilterMode] = useState<"all" | "favorites">("all");

  const toggleUnit = (newUnit: TemperatureUnit) => {
    setUnit(newUnit);
    localStorage.setItem(UNIT_STORAGE_KEY, newUnit);
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id];
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const loadWeather = useCallback(async (city: City) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchWeatherData(city.latitude, city.longitude);
      setWeatherData(data);
    } catch (err) {
      setError(
        (err as Error).message ||
          "Không thể tải dữ liệu thời tiết. Vui lòng kiểm tra lại kết nối mạng.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!selectedCity) return;

    let ignore = false;

    async function execute() {
      setLoading(true);
      setError("");
      try {
        const data = await fetchWeatherData(
          selectedCity!.latitude,
          selectedCity!.longitude,
        );
        if (!ignore) {
          setWeatherData(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            (err as Error).message ||
              "Không thể tải dữ liệu thời tiết. Vui lòng kiểm tra lại kết nối mạng.",
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    execute();

    return () => {
      ignore = true;
    };
  }, [selectedCity]);

  const filteredCities = useMemo(() => {
    const queryNorm = removeDiacritics(searchQuery);

    return CITIES.filter((city) => {
      if (filterMode === "favorites" && !favorites.includes(city.id)) {
        return false;
      }

      if (!queryNorm) return true;

      const nameNorm = removeDiacritics(city.name);
      const regionNorm = removeDiacritics(city.region);
      const matchAlias = city.aliases.some((alias) =>
        removeDiacritics(alias).includes(queryNorm),
      );

      return (
        nameNorm.includes(queryNorm) ||
        regionNorm.includes(queryNorm) ||
        matchAlias
      );
    });
  }, [searchQuery, filterMode, favorites]);

  const activeWeather = selectedCity ? weatherData : null;

  const currentWeatherMeta = activeWeather?.current
    ? getWeatherMeta(activeWeather.current.weather_code)
    : null;

  const dailyForecastItems: DayForecastItem[] = activeWeather?.daily
    ? formatDailyForecast(activeWeather.daily)
    : [];

  const themeClass = currentWeatherMeta
    ? `weather-theme-${currentWeatherMeta.type}`
    : "weather-theme-default";

  return (
    <div className="home-container">
      <div className="home-header">
        <div>
          <h1>Thời tiết Việt Nam</h1>
          <p className="muted">
            Theo dõi thời tiết thời gian thực và dự báo 7 ngày cho 8 thành phố
            lớn trên toàn quốc.
          </p>
        </div>

        <div className="unit-switch" role="group" aria-label="Đơn vị nhiệt độ">
          <span className="unit-switch-label">Đơn vị:</span>
          <button
            type="button"
            className={`unit-btn ${unit === "C" ? "active" : ""}`}
            onClick={() => toggleUnit("C")}
            title="Chuyển sang độ C"
          >
            °C
          </button>
          <button
            type="button"
            className={`unit-btn ${unit === "F" ? "active" : ""}`}
            onClick={() => toggleUnit("F")}
            title="Chuyển sang độ F"
          >
            °F
          </button>
        </div>
      </div>

      <div className="weather-layout">
        <aside className="city-panel">
          <div className="city-panel-header">
            <h2>Danh sách thành phố</h2>
            <span className="city-count-badge">
              {filteredCities.length}/{CITIES.length}
            </span>
          </div>

          <div className="search-box">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm thành phố (không dấu)..."
              aria-label="Tìm kiếm thành phố"
              className="search-input"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery("")}
                title="Xóa tìm kiếm"
              >
                ✕
              </button>
            )}
          </div>

          <div className="filter-chips">
            <button
              type="button"
              className={`chip-filter ${filterMode === "all" ? "active" : ""}`}
              onClick={() => setFilterMode("all")}
            >
              Tất cả (8)
            </button>
            <button
              type="button"
              className={`chip-filter ${filterMode === "favorites" ? "active" : ""}`}
              onClick={() => setFilterMode("favorites")}
            >
              ⭐ Yêu thích ({favorites.length})
            </button>
          </div>

          <ul className="city-list">
            {filteredCities.length === 0 ? (
              <li className="city-empty-item">
                <p className="muted">Không tìm thấy thành phố phù hợp.</p>
                {searchQuery && (
                  <button
                    type="button"
                    className="btn-link"
                    onClick={() => setSearchQuery("")}
                  >
                    Xóa từ khóa tìm kiếm
                  </button>
                )}
              </li>
            ) : (
              filteredCities.map((city) => {
                const isSelected = city.id === cityId;
                const isFav = favorites.includes(city.id);

                return (
                  <li key={city.id} className="city-item-wrapper">
                    <Link
                      to={`/thanh-pho/${city.id}`}
                      className={`city-card ${isSelected ? "selected" : ""}`}
                      aria-current={isSelected ? "true" : undefined}
                    >
                      <div className="city-info">
                        <span className="city-name">{city.name}</span>
                        <span className="city-region">{city.region}</span>
                      </div>

                      <div className="city-actions">
                        <button
                          type="button"
                          className={`fav-btn ${isFav ? "active" : ""}`}
                          onClick={(e) => toggleFavorite(city.id, e)}
                          title={
                            isFav
                              ? "Xóa khỏi danh sách yêu thích"
                              : "Thêm vào danh sách yêu thích"
                          }
                          aria-label={`Yêu thích ${city.name}`}
                        >
                          {isFav ? "★" : "☆"}
                        </button>
                        <span className="arrow-indicator">›</span>
                      </div>
                    </Link>
                  </li>
                );
              })
            )}
          </ul>
        </aside>

        <section className={`weather-panel ${themeClass}`}>
          {!cityId && (
            <div className="state-empty">
              <div className="state-empty-icon">📍</div>
              <h3>Chưa chọn thành phố</h3>
              <p className="muted">
                Vui lòng chọn một thành phố từ danh sách bên trái để xem thông
                tin thời tiết hiện tại và dự báo 7 ngày.
              </p>
              <div className="quick-suggestions">
                <span className="muted-label">Gợi ý chọn nhanh:</span>
                <div className="quick-buttons">
                  <button
                    type="button"
                    className="chip-quick"
                    onClick={() => navigate("/thanh-pho/ha-noi")}
                  >
                    Hà Nội
                  </button>
                  <button
                    type="button"
                    className="chip-quick"
                    onClick={() => navigate("/thanh-pho/da-nang")}
                  >
                    Đà Nẵng
                  </button>
                  <button
                    type="button"
                    className="chip-quick"
                    onClick={() => navigate("/thanh-pho/tp-ho-chi-minh")}
                  >
                    TP. Hồ Chí Minh
                  </button>
                </div>
              </div>
            </div>
          )}

          {cityId && !selectedCity && (
            <div className="state-error">
              <div className="state-error-icon">⚠️</div>
              <h3>Không tìm thấy thành phố</h3>
              <p className="muted">
                Thành phố với mã <code>"{cityId}"</code> không nằm trong danh
                sách 8 thành phố của hệ thống.
              </p>
              <button
                type="button"
                className="btn-primary"
                onClick={() => navigate("/")}
              >
                Về trang chủ
              </button>
            </div>
          )}

          {selectedCity && loading && (
            <div className="state-loading">
              <div className="spinner" aria-hidden="true" />
              <h3>Đang tải dữ liệu thời tiết...</h3>
              <p className="muted">
                Đang lấy thông tin mới nhất cho <b>{selectedCity.name}</b> từ
                Open-Meteo.
              </p>
            </div>
          )}

          {selectedCity && !loading && error && (
            <div className="state-error">
              <div className="state-error-icon">❌</div>
              <h3>Đã xảy ra lỗi khi tải dữ liệu</h3>
              <p className="error-text">{error}</p>
              <button
                type="button"
                className="btn-primary btn-retry"
                onClick={() => loadWeather(selectedCity)}
              >
                🔄 Thử lại
              </button>
            </div>
          )}

          {selectedCity && !loading && !error && activeWeather && (
            <div className="weather-content">
              <div className="current-weather-card">
                <div className="current-header">
                  <div>
                    <div className="city-title-row">
                      <h2>{selectedCity.name}</h2>
                      <button
                        type="button"
                        className={`fav-badge ${favorites.includes(selectedCity.id) ? "active" : ""}`}
                        onClick={(e) => toggleFavorite(selectedCity.id, e)}
                        title="Đánh dấu yêu thích"
                      >
                        {favorites.includes(selectedCity.id)
                          ? "★ Yêu thích"
                          : "☆ Lưu vào yêu thích"}
                      </button>
                    </div>
                    <span className="current-region">{selectedCity.region}</span>
                    <span className="bullet">·</span>
                    <span className="muted current-coords">
                      {selectedCity.latitude}°B, {selectedCity.longitude}°Đ
                    </span>
                  </div>

                  <div className="update-time-box">
                    <span className="muted">Cập nhật:</span>
                    <time className="update-time">
                      {formatDateTime(activeWeather.current.time)}
                    </time>
                  </div>
                </div>

                <div className="current-body">
                  <div className="current-temp-block">
                    <span
                      className="weather-hero-icon"
                      role="img"
                      aria-label={currentWeatherMeta?.description}
                    >
                      {currentWeatherMeta?.icon}
                    </span>
                    <div>
                      <div className="current-temp">
                        {formatTemp(activeWeather.current.temperature_2m, unit)}
                      </div>
                      <div className="current-desc">
                        {currentWeatherMeta?.description}
                      </div>
                    </div>
                  </div>

                  <div className="current-metrics">
                    <div className="metric-box">
                      <span className="metric-icon">💧</span>
                      <div className="metric-detail">
                        <span className="metric-label">Độ ẩm</span>
                        <span className="metric-value">
                          {activeWeather.current.relative_humidity_2m}%
                        </span>
                      </div>
                    </div>

                    <div className="metric-box">
                      <span className="metric-icon">💨</span>
                      <div className="metric-detail">
                        <span className="metric-label">Tốc độ gió</span>
                        <span className="metric-value">
                          {activeWeather.current.wind_speed_10m} km/h
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="forecast-section">
                <div className="forecast-header">
                  <h3>Dự báo 7 ngày tới</h3>
                  <span className="muted">
                    Nhiệt độ cao nhất / thấp nhất mỗi ngày
                  </span>
                </div>

                <div className="forecast-grid">
                  {dailyForecastItems.map((item, idx) => {
                    const dayMeta = getWeatherMeta(item.weatherCode);
                    return (
                      <div
                        key={item.date}
                        className={`forecast-card ${idx === 0 ? "today" : ""}`}
                      >
                        <div className="forecast-date-col">
                          <span className="forecast-day-name">{item.dayOfWeek}</span>
                          <span className="forecast-date muted">
                            {item.formattedDate}
                          </span>
                        </div>

                        <div className="forecast-weather-col">
                          <span
                            className="forecast-icon"
                            title={dayMeta.description}
                            role="img"
                            aria-label={dayMeta.description}
                          >
                            {dayMeta.icon}
                          </span>
                          <span className="forecast-desc">
                            {dayMeta.description}
                          </span>
                        </div>

                        <div className="forecast-temps">
                          <span className="temp-max" title="Nhiệt độ cao nhất">
                            {formatTemp(item.tempMax, unit)}
                          </span>
                          <span className="temp-divider">/</span>
                          <span className="temp-min" title="Nhiệt độ thấp nhất">
                            {formatTemp(item.tempMin, unit)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
