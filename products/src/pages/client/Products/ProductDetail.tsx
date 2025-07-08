import { useEffect, useRef, useState } from "react";
import Footer from "../../../components/client/Footer";
import Header from "../../../components/client/Header";
import { getById, type Product } from "../../../services/productService";
import { useNavigate, useParams } from "react-router-dom";
import {
  getByProductId,
  type PromotionDto,
} from "../../../services/promotionService";
import { format } from "date-fns";

export default function ProductDetail() {
  const { id } = useParams();
  const [productDetail, setProcductDetail] = useState<Product>();
  const [quantity, setQuantity] = useState<number>(1);
  const navigate = useNavigate();
  const [promotions, setPromotion] = useState<PromotionDto[]>([]);
  const [selectedPromotionId, setSelectedPromotionId] = useState<number | null>(
    null
  );
  const token = useRef(localStorage.getItem("accessToken"));
  useEffect(() => {
    (async () => {
      if (id) {
        const data = await getById(Number(id));
        const dataPromotion = await getByProductId(Number(id));
        setPromotion(dataPromotion);
        setProcductDetail(data);
      }
    })();
  }, [id]);

  const onSubmit = () => {
    if (!token) {
      navigate("/login");
      return;
    }
    // Lưu thông tin product + quantity tạm vào localStorage
    localStorage.setItem(
      "booking",
      JSON.stringify({
        product: productDetail,
        quantity: quantity,
        promotion: selectedPromotionId,
      })
    );
    navigate("/booking");
  };
  return (
    <>
      <Header></Header>
      <section className="container mt-5 mb-5">
        <div className="row ">
          {productDetail ? (
            <div className="col-12">
              <div className="card vehicle-card position-relative">
                <span className="badge badge-custom">
                  {productDetail.categoryName}
                </span>
                <img
                  src={`https://localhost:7204/uploads/${productDetail.img}`}
                  className="card-img-top orderImg"
                  alt="Corolla Cross"
                />
                <div className="card-body d-flex justify-content-between">
                  <div className="">
                    <h2 className="card-title">{productDetail.name}</h2>
                    <div className="d-flex"></div>
                    <h5 className="card-text">
                      ${productDetail.price.toLocaleString("de-DE")}
                      <small className="text-muted">* Starting MSRP</small>
                    </h5>
                    <div className="mt-1">
                      <select
                        id="promotionSelect"
                        className="form-select"
                        value={selectedPromotionId ?? ""}
                        onChange={(e) =>
                          setSelectedPromotionId(
                            e.target.value ? Number(e.target.value) : null
                          )
                        }
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
                  <div className="d-flex justify-content-center align-items-center gap-3">
                    <div className=" d-flex align-items-center">
                      <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="form-control"
                        style={{ width: "100px" }}
                      />
                    </div>
                    <div className="">
                      {" "}
                      <button
                        type="button"
                        className="btn btn-primary order"
                        onClick={onSubmit}
                      >
                        Đặt xe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p>Đang tải dữ liệu sản phẩm...</p>
          )}
        </div>
      </section>
      <Footer></Footer>
    </>
  );
}
