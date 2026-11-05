import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>Giới thiệu & Hướng dẫn sử dụng</h1>
        <p className="muted">
          Bài tập thực hành 02 (TH02) – Môn Lập trình Web (RIPT1306)
        </p>
      </div>

      <div className="about-grid">
        <section className="about-card">
          <h2>Thông tin bài thực hành</h2>
          <ul className="info-list">
            <li>
              <b>Sinh viên thực hiện:</b> Phùng Hoàng Khoa (Mã SV: <code>B25DCCC112</code>)
            </li>
            
            <li>
              <b>Công nghệ sử dụng:</b> React 19, TypeScript, Vite, React Router
              7
            </li>
            <li>
              <b>Nguồn API:</b> Open-Meteo Weather Forecast API
            </li>
          </ul>
        </section>

        <section className="about-card">
          <h2>Các yêu cầu bắt buộc đã hoàn thành</h2>
          <ul className="checklist">
            <li>
              <span className="check-icon">✓</span>
              <div>
                <b>YC1: Danh sách 8 thành phố</b>
                <p className="muted">
                  Hà Nội, Hải Phòng, Huế, Đà Nẵng, Nha Trang, Đà Lạt, TP. Hồ Chí
                  Minh, Cần Thơ. Thành phố đang được chọn luôn có hiệu ứng làm
                  nổi bật rõ ràng.
                </p>
              </div>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <div>
                <b>YC2: Hiển thị thời tiết hiện tại đầy đủ thông tin</b>
                <p className="muted">
                  Biểu tượng thời tiết, mô tả trạng thái (trời quang, nhiều mây,
                  mưa...), nhiệt độ, độ ẩm (%), tốc độ gió (km/h) và thời điểm
                  cập nhật.
                </p>
              </div>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <div>
                <b>YC3: Dự báo thời tiết 7 ngày</b>
                <p className="muted">
                  Mỗi ngày hiển thị đầy đủ thứ trong tuần, ngày/tháng, biểu
                  tượng trạng thái và nhiệt độ cao nhất / thấp nhất.
                </p>
              </div>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <div>
                <b>YC4: Xử lý 3 trạng thái giao diện</b>
                <p className="muted">
                  Trạng thái <i>chưa chọn thành phố</i>, trạng thái{" "}
                  <i>đang tải</i> (animated spinner) và trạng thái <i>lỗi</i>{" "}
                  (kèm nút <b>"Thử lại"</b> để tải lại dữ liệu).
                </p>
              </div>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <div>
                <b>YC5: Chuyển đổi linh hoạt °C / °F</b>
                <p className="muted">
                  Tính toán chuyển đổi tức thì trên client bằng công thức F = C *
                  9/5 + 32 mà không gửi request gọi lại API.
                </p>
              </div>
            </li>
            <li>
              <span className="check-icon">✓</span>
              <div>
                <b>YC6: Giao diện Responsive</b>
                <p className="muted">
                  Màn hình từ 768px trở lên hiển thị 2 cột (cột danh sách thành
                  phố và cột chi tiết thời tiết); màn hình nhỏ hơn tự động xếp dọc.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <section className="about-card">
          <h2>Các tính năng nâng cao (Điểm cộng)</h2>
          <ul className="checklist">
            <li>
              <span className="check-icon">⭐</span>
              <div>
                <b>Tìm kiếm không phân biệt dấu:</b>
                <p className="muted">
                  Gõ "ha noi", "da nang", "sai gon", "hcm", "can tho" đều lọc
                  ngay lập tức danh sách thành phố tương ứng.
                </p>
              </div>
            </li>
            <li>
              <span className="check-icon">⭐</span>
              <div>
                <b>Lưu thành phố yêu thích vào localStorage:</b>
                <p className="muted">
                  Bấm biểu tượng ngôi sao để thêm hoặc xóa thành phố yêu thích.
                  Có bộ lọc riêng để xem nhanh các thành phố yêu thích.
                </p>
              </div>
            </li>
            <li>
              <span className="check-icon">⭐</span>
              <div>
                <b>Đổi màu nền theo trạng thái thời tiết:</b>
                <p className="muted">
                  Màu nền và phong cách hiển thị tự động biến đổi hài hòa theo
                  thời tiết (quang đãng, mây, mưa, dông lốc, sương mù...).
                </p>
              </div>
            </li>
            <li>
              <span className="check-icon">⭐</span>
              <div>
                <b>Xây dựng hoàn toàn bằng TypeScript:</b>
                <p className="muted">
                  Kiểu dữ liệu chặt chẽ cho toàn bộ API Open-Meteo, các component
                  và utility functions.
                </p>
              </div>
            </li>
          </ul>
        </section>

        <section className="about-card">
          <h2>Truy cập nhanh thời tiết</h2>
          <div className="quick-links">
            <Link to="/thanh-pho/ha-noi" className="quick-chip-link">
              🌤️ Xem thời tiết Hà Nội
            </Link>
            <Link to="/thanh-pho/da-nang" className="quick-chip-link">
              🏖️ Xem thời tiết Đà Nẵng
            </Link>
            <Link to="/thanh-pho/tp-ho-chi-minh" className="quick-chip-link">
              🏙️ Xem thời tiết TP. Hồ Chí Minh
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

