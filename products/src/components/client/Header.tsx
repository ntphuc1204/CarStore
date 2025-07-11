import { useEffect, useRef, useState } from "react";
import logoLambo from "../../assets/img/logoLambo.png";
import Search from "../../assets/img/Search.svg";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);

    if (!searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };
  const checkLogin = () => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setLogin(true);
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      try {
        localStorage.clear();
        navigate("/");
        toast.success("Đăng xuất thành công");
      } catch (error) {
        toast.error("Lỗi khi đăng xuất");
        console.error("Logout error", error);
      }
    }
  };

  return (
    <header className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-2">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img src={logoLambo} alt="Lambo Logo" width="50" />
          <strong className="fs-4">STORE</strong>
        </a>

        <div className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav d-flex justify-content-center align-items-center">
            <li className="nav-item dropdown">
              <a className="nav-link fw-semibold" href="/">
                Trang chủ
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link fw-semibold" href="/Products/">
                Sản phẩm
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link fw-semibold" href="/Products/category">
                Hãng xe
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link fw-semibold" href="#">
                Liên hệ
              </a>
            </li>

            <li
              className={`nav-item dropdown search-container position-relative me-1 ms-1 ${
                searchOpen ? "open" : ""
              }`}
            >
              <input
                type="text"
                className="search-input"
                placeholder="Tìm kiếm..."
                ref={searchInputRef}
              />
              <button
                className="btn btn-outline-light border-0 search-icon"
                type="button"
                onClick={toggleSearch}
              >
                <img src={Search} alt="Search Icon" />
              </button>
            </li>

            <li className="nav-item dropdown position-relative">
              <a
                className="nav-link dropdown-toggle fw-semibold"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-person-circle fs-4"></i>
              </a>
              {login ? (
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="/status">
                      <i className="bi bi-bookmark-star me-2"></i>Trạng thái đơn
                      hàng
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/AccountPage">
                      <i className="bi bi-person me-2"></i>Tài khoản
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-in-left me-2"></i>Đăng xuất
                    </a>
                  </li>
                </ul>
              ) : (
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="/login">
                      <i className="bi bi-box-arrow-in-right me-2"></i>Đăng nhập
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/register">
                      <i className="bi bi-person-add me-2"></i>Đăng kí
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
