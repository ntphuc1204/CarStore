import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";
import ProductPagination from "./Products/ProductPagination";

export default function ProductClient() {
  return (
    <>
      <Header></Header>
      <ProductPagination></ProductPagination>
      <Footer></Footer>
    </>
  );
}
