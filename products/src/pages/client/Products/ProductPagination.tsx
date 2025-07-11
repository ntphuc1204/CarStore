// src/views/product/ProductPagination.tsx
import { Link } from "react-router-dom";
import { useProductPaginationViewModel } from "../../../viewmodels/productclient/productPaginationViewModel";

export default function ProductPagination() {
  const {
    products,
    pagination,
    nextPage,
    previousPage,
    goToPage,
  } = useProductPaginationViewModel();

  return (
    <section className="container mt-5 mb-5">
      <div className="row g-4">
        <h1 className="text-center mb-3 fw-semibold">Tất cả các sản phẩm</h1>
        {products.map((item : any) => (
          <div className="col-md-4" key={item.id}>
            <Link to={`/ProductDetail/${item.id}`} className="text-decoration-none">
              <div className="card vehicle-card position-relative">
                <span className="badge badge-custom text-black">
                  {item.categoryName}
                </span>
                <img
                  src={`https://localhost:7204/uploads/${item.img}`}
                  className="card-img-top"
                  alt={item.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                    ${item.price.toLocaleString("de-DE")}
                    <small className="text-muted">* Starting MSRP</small>
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center align-items-center flex-wrap gap-4 mt-5">
        <nav>
          <ul className="pagination mb-0 gap-2">
            <li className="page-item">
              <button
                className="page-link"
                disabled={pagination?.currentPage === 1}
                onClick={previousPage}
              >
                «
              </button>
            </li>
            {Array.from({ length: pagination?.totalPages ?? 0 }, (_, index) => (
              <li
                key={index}
                className={`page-item ${pagination?.currentPage === index + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => goToPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                disabled={pagination?.currentPage === pagination?.totalPages}
                onClick={nextPage}
              >
                »
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </section>
  );
}
