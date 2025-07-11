import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductViewModel } from "../../viewmodels/productViewModel";

export default function ProductList() {
  const { products } = ProductViewModel();
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e: React.MouseEvent, quantity: number) => {
    if (quantity === 0) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  return (
    <>
      <section className="container mt-5 mb-5">
        <div className="row g-4">
          <h1 className="text-center mb-3 fw-semibold">
            Sản phẩm mới nhất của store
          </h1>
          {products.slice(0, 6).map((item: any) => (
            <div className="col-md-4" key={item.id}>
              <Link
                to={`/ProductDetail/${item.id}`}
                className="text-decoration-none"
                onClick={(e) => handleClick(e, item.quantity)}
              >
                <div className="card vehicle-card position-relative">
                  <span className="badge badge-custom text-black">
                    {item.categoryName}
                  </span>

                  {item.quantity === 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: 9,
                        right: 5,
                        backgroundColor: "red",
                        color: "white",
                        padding: "4px 5px",
                        fontSize: "0.8rem",
                        borderRadius: "5px",
                        zIndex: 1,
                      }}
                    >
                      Hết hàng
                    </span>
                  )}

                  <img
                    src={`https://localhost:7204/uploads/${item.img}`}
                    className="card-img-top"
                    alt={item.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">
                      ${item.price.toLocaleString("de-DE")}
                      <small className="text-muted"> * Starting MSRP</small>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              backgroundColor: "#fff",
              padding: "20px 30px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "400px",
              textAlign: "center",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h4 style={{ marginBottom: "10px" }}>Thông báo</h4>
            <p>Sản phẩm đã hết hàng. Vui lòng chọn sản phẩm khác.</p>
            <button
              style={{
                padding: "6px 12px",
                backgroundColor: "#333",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              onClick={() => setShowModal(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
}
