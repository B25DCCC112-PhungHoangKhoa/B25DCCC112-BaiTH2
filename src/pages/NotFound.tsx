import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-icon">404</div>
      <h1>Không tìm thấy trang</h1>
      <p className="muted">
        Đường dẫn bạn vừa truy cập không tồn tại hoặc đã bị di chuyển.
      </p>
      <div className="notfound-actions">
        <Link to="/" className="btn-primary">
          ← Về trang chủ thời tiết
        </Link>
      </div>
    </div>
  );
}

