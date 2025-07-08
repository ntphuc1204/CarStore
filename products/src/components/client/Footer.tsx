import MessageModal from "./MessageModal";

export default function Footer() {
  return (
    <>
      <MessageModal></MessageModal>
      <footer className="bg-dark text-white pt-5 pb-3">
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h5 className="fw-bold">STORE</h5>
              <p className="small">
                Specializing in providing high-quality cars, <br />
                genuine brands, and top-tier after-sales services.
              </p>

              <div className="d-flex gap-3">
                <a href="#" className="text-white">
                  <i className="bi bi-facebook fs-4"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="bi bi-instagram fs-4"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="bi bi-youtube fs-4"></i>
                </a>
              </div>
            </div>

            <div className="col-md-2 mb-4">
              <h6 className="fw-semibold">About Us</h6>
              <ul className="list-unstyled small">
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Introduction
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    News
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-4">
              <h6 className="fw-semibold">Customer Support</h6>
              <ul className="list-unstyled small">
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Warranty Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Purchase Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-3 mb-4">
              <h6 className="fw-semibold">Contact</h6>
              <p className="small mb-1 text-white">
                <i className="bi bi-geo-alt me-2"></i>123 Auto Street, Ha Noi
                City
              </p>
              <p className="small mb-1 text-white">
                <i className="bi bi-telephone me-2"></i>+84 901 234 567
              </p>
              <p className="small text-white">
                <i className="bi bi-envelope me-2"></i> contact@autostore.vn
              </p>
            </div>
          </div>

          <div className="text-center mt-4 border-top pt-3 small">
            &copy; 2025 AutoStore. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
