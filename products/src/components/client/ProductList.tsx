import { useEffect, useState } from "react";
import { getAllProducts, type Product } from "../../services/productService";
import { Link } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const fecthProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };
  useEffect(() => {
    fecthProducts();
  }, []);
  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row g-4">
          <h1 className="text-center mb-3 fw-semibold">
            Sản phẩm mới nhất của store
          </h1>
          {products.slice(0, 6).map((item) => (
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
      </section>
    </>
  );
}
