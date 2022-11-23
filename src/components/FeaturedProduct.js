import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { getError } from "../utils";
import { toast } from "react-toastify";
import "../styles/orderdetails.css";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, order: action.payload, error: "" };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };

    case "DELIVER_REQUEST":
      return { ...state, loadingDeliver: true };
    case "DELIVER_SUCCESS":
      return { ...state, loadingDeliver: false, successDeliver: true };
    case "DELIVER_FAIL":
      return { ...state, loadingDeliver: false };
    case "DELIVER_RESET":
      return {
        ...state,
        loadingDeliver: false,
        successDeliver: false,
      };
    default:
      return state;
  }
}
export default function OrderScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;
  const navigate = useNavigate();

  const [
    {
      loading,
      error,
      order,
      successPay,
      loadingPay,
      loadingDeliver,
      successDeliver,
    },
    dispatch,
  ] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
    successPay: false,
    loadingPay: false,
  });

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `https://lukescommerce.onrender.com/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
        toast.success("Order is paid");
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }
  function onError(err) {
    toast.error(getError(err));
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `https://lukescommerce.onrender.com/api/orders/${orderId}`,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate("/login");
    }
    if (
      !order._id ||
      successPay ||
      successDeliver ||
      (order._id && order._id !== orderId)
    ) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
      }
      if (successDeliver) {
        dispatch({ type: "DELIVER_RESET" });
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get(
          "https://lukescommerce.onrender.com/api/keys/paypal",
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [
    order,
    userInfo,
    orderId,
    navigate,
    paypalDispatch,
    successPay,
    successDeliver,
  ]);

  async function deliverOrderHandler() {
    try {
      dispatch({ type: "DELIVER_REQUEST" });
      const { data } = await axios.put(
        `https://lukescommerce.onrender.com/api/orders/${order._id}/deliver`,
        {},
        {
          headers: { authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: "DELIVER_SUCCESS", payload: data });
      toast.success("Order is delivered");
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "DELIVER_FAIL" });
    }
  }

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="order-details-container">
      <div className="order-details-row">
        <div className="order-details-col">
          <h2 className="order-details-title">Your Order</h2>
          <h4 className="order-details-subtitle">Order ID: {orderId}</h4>
        </div>
      </div>
      <div className="order-row">
        <div className="order-row">
          <div className="order-shipping">
            <h4 className="order-shipping-title">Shipping:</h4>
            <p>
              <strong>Name:</strong> {order.shippingAddress.fullName} <br />
              <strong>Address: </strong> {order.shippingAddress.address},
              {order.shippingAddress.city}, {order.shippingAddress.postalCode},
              {order.shippingAddress.country}
              &nbsp;
              {order.shippingAddress.location &&
                order.shippingAddress.location.lat && (
                  <a
                    target="_new"
                    href={`https://maps.google.com?q=${order.shippingAddress.location.lat},${order.shippingAddress.location.lng}`}
                  >
                    Show On Map
                  </a>
                )}
            </p>
            {order.isDelivered ? (
              <MessageBox variant="success">
                Delivered at {order.deliveredAt}
              </MessageBox>
            ) : (
              <MessageBox variant="danger">Not Delivered</MessageBox>
            )}
          </div>
          <div className="order-payment">
            <h4>Payment:</h4>
            <Card.Text>
              <strong>Method:</strong> {order.paymentMethod}
            </Card.Text>
            {order.isPaid ? (
              <MessageBox variant="success">Paid at {order.paidAt}</MessageBox>
            ) : order.paymentMethod == "Cash" ? (
              <span>
                Cash Not Paid <br />
                <span className="after">* You will pay after delivery</span>
              </span>
            ) : (
              <MessageBox variant="danger">Not Paid</MessageBox>
            )}
          </div>

          <div className="order-items">
            <h4 className="order-items-title">Items:</h4>
            <div className="order-cards">
              {order.orderItems.map((item) => (
                <div className="order-card">
                  <div className="order-card-body">
                    <img src={item.image} alt={item.name} />
                    <Link to={`/product/${item.slug}`}>{item.name}</Link>
                  </div>
                  <div className="order-card-footer">
                    <span>{item.quantity}</span>
                    <span>${item.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="order-col">
          <Card className="mb-3">
            <Card.Body>
              <h2 className="order-summary">Order Summary</h2>
              <ListGroup variant="flush">
                <div className="order-summary-info">
                  <h4>Items</h4>
                  <span>${order.itemsPrice.toFixed(2)}</span>
                </div>
                <div className="order-summary-info">
                  <h4>Shipping</h4>
                  <span>${order.shippingPrice.toFixed(2)}</span>
                </div>
                <div className="order-summary-info">
                  <h4>Tax</h4>
                  <span>${order.taxPrice.toFixed(2)}</span>
                </div>
                <div className="order-summary-info">
                  <h3>Total</h3>
                  <span>${order.totalPrice.toFixed(2)}</span>
                </div>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {isPending ? (
                      <LoadingBox />
                    ) : (
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    )}
                    {loadingPay && <LoadingBox></LoadingBox>}
                  </ListGroup.Item>
                )}
                {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListGroup.Item>
                    {loadingDeliver && <LoadingBox></LoadingBox>}
                    <div className="d-grid">
                      <button type="button" onClick={deliverOrderHandler}>
                        Deliver Order
                      </button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

/*


  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox>{error}</MessageBox>
  ) : (
    <>
      <Navbar />
      <div className="order-details-container">
        <div className="order-details-row">
          <div className="order-details-col">
            <h2 className="order-details-title">Your Order</h2>
            <h4 className="order-details-subtitle">Order ID: {orderId}</h4>
          </div>
        </div>
        <div className="order-row">
          <div className="order-col">
            <div className="order-shipping">
              <h4 className="order-shipping-title">Shipping:</h4>
              <p className="order-shipping-info">
                {order.shippingAddress.fullName},{" "}
                {order.shippingAddress.address},{" "}
                {order.shippingAddress.postalCode}, {order.shippingAddress.city}
                , {order.shippingAddress.country}
              </p>
              {order.isPaid ? (
                <span> Paid at {order.deliveredAt} </span>
              ) : (
                <span>Not Delivery</span>
              )}
            </div>
            <div className="order-payment">
              <h4>Payment:</h4>
              <span>{order.paymentMethod} - </span>
              {order.isPaid ? (
                <span> Paid at {order.paidAt} </span>
              ) : (
                <span>
                  Not Paid <br />
                  <span className="after">* You will pay after delivery</span>
                </span>
              )}
            </div>
            <div className="order-items">
              <h4 className="order-items-title">Items:</h4>
              <div className="order-cards">
                {order.orderItems.map((item) => (
                  <div className="order-card">
                    <div className="order-card-body">
                      <img src={item.image} alt={item.name} />
                      <Link to={`/product/${item.slug}`}>{item.name}</Link>
                    </div>
                    <div className="order-card-footer">
                      <span>{item.quantity}</span>
                      <span>${item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="order-col">
            <h2 className="order-summary">Order Summary</h2>
            <div className="order-summary-info">
              <h4>Items</h4>
              <span>${order.itemsPrice.toFixed(2)}</span>
            </div>
            <div className="order-summary-info">
              <h4>Shipping</h4>
              <span>${order.shippingPrice.toFixed(2)}</span>
            </div>
            <div className="order-summary-info">
              <h4>Tax</h4>
              <span>${order.taxPrice.toFixed(2)}</span>
            </div>
            <div className="order-summary-info">
              <h3>Total</h3>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetails;
*/
