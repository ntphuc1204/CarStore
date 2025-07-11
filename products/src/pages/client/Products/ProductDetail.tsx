// pages/client/product/ProductDetail.tsx
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
                      <small className="text-muted">* Starting MSRP</small>
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
                      onClick={handleSubmit}
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
    </>
  );
}
