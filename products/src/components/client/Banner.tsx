import banner1 from "../../assets/img/Banner1.avif";
import banner2 from "../../assets/img/Banner2.avif";
import banner3 from "../../assets/img/banner3.avif";
export default function Banner() {
  return (
    <>
      <div id="mainCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={banner3} className="d-block w-100" alt="Banner 1" />
            <div className="carousel-caption text-white d-none d-md-block">
              <h1 className="display-4 fw-bold">2026 Corolla Cross</h1>
              <p className="lead">Crossover to the fun side.</p>
              <a href="#" className="btn btn-light btn-lg mt-3">
                Learn More
              </a>
            </div>
          </div>

          <div className="carousel-item">
            <img src={banner1} className="d-block w-100" alt="Banner 2" />
            <div className="carousel-caption text-white d-none d-md-block">
              <h1 className="display-4 fw-bold">Adventure Awaits</h1>
              <p className="lead">Drive beyond expectations.</p>
              <a href="#" className="btn btn-light btn-lg mt-3">
                Learn More
              </a>
            </div>
          </div>

          <div className="carousel-item">
            <img src={banner2} className="d-block w-100" alt="Banner 3" />
            <div className="carousel-caption text-white d-none d-md-block">
              <h1 className="display-4 fw-bold">Style Meets Power</h1>
              <p className="lead">Design that turns heads.</p>
              <a href="#" className="btn btn-light btn-lg mt-3">
                Learn More
              </a>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon bg-dark rounded-circle"></span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#mainCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon bg-dark rounded-circle"></span>
        </button>
      </div>
    </>
  );
}
