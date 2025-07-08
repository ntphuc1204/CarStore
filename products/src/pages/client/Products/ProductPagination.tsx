import { useEffect, useState } from "react";
import {
  getProductByPage,
  type Product,
  type ProductByPage,
} from "../../../services/productService";
import { Link } from "react-router-dom";

export default function ProductPagination() {
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<ProductByPage | null>(null);
  const [products, setProduct] = useState<Product[]>([]);

  const nextPage = () => {
    const pageNext = page + 1;
    setPage(pageNext);
  };
  const pageBack = () => {
    const pageNext = page - 1;
    setPage(pageNext);
  };

  useEffect(() => {
    const fetchProductsPage = async () => {
      try {
        const pageSize = 6;
        const data = await getProductByPage(page, pageSize);
        console.log("api", data);
        setProduct(data.data);
        setPagination(data);
      } catch (err) {
        console.error("Lỗi lấy sản phẩm:", err);
      }
    };
    fetchProductsPage();
  }, [page]);
  return (
    <>
      {" "}
      <section className="container mt-5 mb-5">
        <div className="row g-4">
          <h1 className="text-center mb-3 fw-semibold">Tất cả các sản phẩm</h1>
          {products.map((item) => (
            <div className="col-md-4">
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
                      $
                      {/* {item.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                    })} */}
                      {item.price.toLocaleString("de-DE")}
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
                {pagination?.currentPage === 1 ? (
                  <a className="page-link disabled" href="#">
                    «
                  </a>
                ) : (
                  <a className="page-link" href="#" onClick={pageBack}>
                    «
                  </a>
                )}
              </li>

              {Array.from(
                { length: pagination?.totalPages ?? 0 },
                (_, index) => (
                  <li
                    key={index}
                    className={`page-item${
                      pagination?.currentPage === index + 1
                        ? "text-white active"
                        : ""
                    }`}
                  >
                    <a
                      className="page-link"
                      href="#"
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </a>
                  </li>
                )
              )}
              <li className="page-item">
                {pagination?.currentPage === pagination?.totalPages ? (
                  <a className="page-link disabled" href="#">
                    »
                  </a>
                ) : (
                  <a className="page-link" href="#" onClick={nextPage}>
                    »
                  </a>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </>
  );
}
