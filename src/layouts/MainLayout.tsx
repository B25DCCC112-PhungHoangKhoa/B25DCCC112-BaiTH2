import { Link, NavLink, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="app-shell">
      <nav className="nav">
        <Link to="/" className="logo">
          🌤️ Dự Báo<span>Thời tiết</span>
        </Link>
        <div className="nav-links">
          <NavLink to="/" end className="nav-link">
            Thời tiết
          </NavLink>
          <NavLink to="/gioi-thieu" className="nav-link">
            Giới thiệu
          </NavLink>
        </div>
      </nav>

      <main className="page">
        <Outlet />
      </main>

      <footer className="credit">
        <p>
          Bài thực hành 02 (TH02) – Thiết kế ứng dụng Web với React + TypeScript + React Router
        </p>
       
      </footer>
    </div>
  );
}

