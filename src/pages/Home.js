import React from "react";
import Banners from "../components/Banners";
import CategoryMain from "../components/CategoryMain";
import Footer from "../components/Footer";
import MainNavbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import ProductsHome from "../components/ProductsHome";
import Slider from "../components/Slider";

function Home() {
  return (
    <div>
      <MainNavbar />
      <Slider />
      <Banners />
      <CategoryMain />
      <ProductsHome />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
