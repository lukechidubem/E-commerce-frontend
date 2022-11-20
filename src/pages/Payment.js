import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Store } from "../Store";
import "../styles/payment.css";

const Payment = () => {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethod] = useState(
    paymentMethod || "Cash"
  );

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };

  return (
    <>
      <Navbar />
      <div className="payment-container">
        <div className="payment-row">
          <div className="payment-col">
            <h2 className="payment-title">Payment Method</h2>
          </div>
          <div className="payment-col">
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
          </div>
        </div>
        <div className="payment-row">
          <div className="payment-col">
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="cash">Cash</label>
                <input
                  type="radio"
                  value="Cash"
                  checked={paymentMethodName === "Cash"}
                  className="radio"
                  name=""
                  id="cash"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="PayPal">PayPal</label>
                <input
                  type="radio"
                  value="PayPal"
                  checked={paymentMethodName === "PayPal"}
                  className="radio"
                  name=""
                  id="PayPal"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="Stripe">Stripe</label>
                <input
                  type="radio"
                  value="Stripe"
                  checked={paymentMethodName === "Stripe"}
                  className="radio"
                  name=""
                  id="Stripe"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </div>
              <div className="form-group">
                <button
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    borderRadius: "6px",
                  }}
                  type="submit"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
