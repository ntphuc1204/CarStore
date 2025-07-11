import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";
import { Link } from "react-router-dom";
import { useCategoryClientViewModel } from "../../viewmodels/categoryViewModel";

export default function CategoryClient() {
  const {
    categories,
    products,
    activeCategoryId,
    handleCategoryClick,
    handleShowAll,
  } = useCategoryClientViewModel();

  return (
    <>
      <Header />
      <div className="container py-5 mb-5">
        <div className="row">
          <div className="col-md-3 mb-4">
            <ul className="list-unstyled">
              <li className="fw-bold mb-2 border-bottom pb-2">Hãng xe</li>
              <li
                className={`mb-3 fw-medium ${
                  activeCategoryId === null ? "text-primary" : ""
                }`}
              >
                <a
                  href="#"
                  className="text-decoration-none text-dark"
                  onClick={handleShowAll}
                >
                  Tất cả
                </a>
              </li>
              {categories.map((item) => (
                <li
                  key={item.id}
                  className={`mb-3 d-flex align-items-center ${
                    activeCategoryId === item.id ? "text-primary" : ""
                  }`}
                >
                  <a
                    href="#"
                    className="text-decoration-none text-dark fw-medium"
                    onClick={() => handleCategoryClick(item.id)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-9">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {products.length === 0 ? (
                <p className="text-center">Không có sản phẩm nào.</p>
              ) : (
                products.map((item) => (
                  <div key={item.id} className="col">
                    <div className="col">
                      <Link
                        to={`/ProductDetail/${item.id}`}
                        className="text-decoration-none"
                      >
                        <div className="card vehicle-card position-relative">
                          <span className="badge badge-custom text-black ">
                            {item.categoryName}
                          </span>
                          <img
                            src={`https://localhost:7204/uploads/${item.img}`}
                            className="card-img-top"
                            alt="Corolla Cross"
                          />
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">
                              ${item.price.toLocaleString("de-DE")}
                              <small className="text-muted">
                                * Starting MSRP
                              </small>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
