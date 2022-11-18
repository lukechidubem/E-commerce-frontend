import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainNavbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Shop from "./pages/Shop";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Account from "./components/Account";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Wish from "./pages/Wish";
import ProductScreen from "./pages/ProductScreen";
import UserProfile from "./components/UserProfile";
import OrderHistory from "./components/OrderHistory";
import About from "./pages/About";

import "./App.css";
import Payment from "./pages/Payment";
import PlaceOrder from "./pages/PlaceOrder";
import OrderDetails from "./components/OrderDetails";
import Contact from "./pages/Contact";
import DashboardScreen from "./pages/DashboardScreen";
import UserListScreen from "./pages/UserListScreen";
import UserEditScreen from "./pages/UserEditScreen";
import ProductEditScreen from "./pages/ProductEditScreen";
import ProductListScreen from "./pages/ProductListScreen";
import OrderListScreen from "./pages/OrderListScreen";
import Shipping from "./components/Shipping";
import OrderScreen from "./pages/OrderScreen";
import FeaturedProduct from "./components/FeaturedProduct";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";

function App() {
  return (
    <div id="outer-container">
      <div className="sidebar-container">
        <Sidebar
          pageWrapId={"page-wrap"}
          outerContainerId={"outer-container"}
        />
      </div>
      <div id="page-wrap">
        <Router>
          <ToastContainer position="bottom-center" limit={1} />
          <Routes>
            {/* <MainNavbar /> */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/account" element={<Account />} />
            <Route path="/product/:slug" element={<ProductScreen />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/orderhistory" element={<OrderHistory />} />
            <Route path="/shipping" element={<Shipping />} />

            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wish" element={<Wish />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/placeorder" element={<PlaceOrder />} />

            {/* <Route path="/order/:id" element={<OrderDetails />} /> */}
            <Route path="/order/:id" element={<OrderScreen />} />
            {/* <Route path="/order/:id" element={<FeaturedProduct />} /> */}

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route
              path="/admin/dashboard"
              element={<DashboardScreen />}
            ></Route>

            <Route path="/admin/users" element={<UserListScreen />}></Route>

            <Route path="/admin/user/:id" element={<UserEditScreen />}></Route>

            <Route
              path="/admin/products"
              element={<ProductListScreen />}
            ></Route>

            <Route
              path="/admin/product/:id"
              element={<ProductEditScreen />}
            ></Route>

            <Route path="/admin/orders" element={<OrderListScreen />}></Route>
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
