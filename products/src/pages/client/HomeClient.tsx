import Banner from "../../components/client/Banner";
import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";
import ProductList from "../../components/client/ProductList";

export default function HomeClient() {
  return (
    <>
      <Header></Header>
      <Banner></Banner>
      <ProductList></ProductList>
      <Footer></Footer>
    </>
  );
}
