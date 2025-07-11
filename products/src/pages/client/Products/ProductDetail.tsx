import { useState } from "react";
import { format } from "date-fns";
import Footer from "../../../components/client/Footer";
import Header from "../../../components/client/Header";
import { useProductDetailViewModel } from "../../../viewmodels/productclient/productDetailViewModel";

export default function ProductDetail() {
  const {
    productDetail,
    quantity,
    promotions,
    selectedPromotionId,
    handleQuantityChange,
    handlePromotionChange,
    handleSubmit,
  } = useProductDetailViewModel();

  const [showModal, setShowModal] = useState(false);

  const handleOrder = () => {
    if (productDetail && quantity > productDetail.quantity) {
      setShowModal(true);
      return;
    }

    handleSubmit();
  };

  return (
    <>
      <Header />
      <section className="container mt-5 mb-5">
        <div className="row">
          {productDetail ? (
            <div className="col-12">
              <div className="card vehicle-card position-relative">
                <span className="badge badge-custom">
                  {productDetail.categoryName}
                </span>
                <img
                  src={`https://localhost:7204/uploads/${productDetail.img}`}
                  className="card-img-top orderImg"
                  alt={productDetail.name}
                />
                <div className="card-body d-flex justify-content-between">
                  <div>
                    <h2 className="card-title">{productDetail.name}</h2>
                    <h5 className="card-text">
                      ${productDetail.price.toLocaleString("de-DE")}
                      <small className="text-muted"> * Starting MSRP</small>
                    </h5>
                    <div className="mt-1">
                      <select
                        id="promotionSelect"
                        className="form-select"
                        value={selectedPromotionId ?? ""}
                        onChange={(e) => handlePromotionChange(e.target.value)}
                      >
                        <option value="">-- Không áp dụng khuyến mãi --</option>
                        {promotions.map((promo) => (
                          <option key={promo.id} value={promo.id}>
                            {promo.title} giảm {promo.discountPercent}% (đến{" "}
                            {promo.endDate
                              ? format(new Date(promo.endDate), "dd-MM-yyyy")
                              : ""}
                            )
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => handleQuantityChange(e.target.value)}
                      className="form-control"
                      style={{ width: "100px" }}
                    />
                    <button
                      type="button"
                      className="btn btn-primary order"
                      onClick={handleOrder}
                    >
                      Đặt xe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Đang tải dữ liệu sản phẩm...</p>
          )}
        </div>
      </section>
      <Footer />

      {/* Modal tuỳ chỉnh */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: "24px",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "400px",
              textAlign: "center",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            <h5 style={{ marginBottom: "16px", color: "red" }}>
              Số lượng vượt quá!
            </h5>
            <p>
              Số lượng bạn đặt vượt quá số lượng hiện có (
              {productDetail?.quantity}). Vui lòng giảm số lượng hoặc chọn sản
              phẩm khác.
            </p>
            <button
              className="btn btn-danger mt-3"
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
