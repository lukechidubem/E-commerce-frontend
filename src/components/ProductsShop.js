import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState, useReducer } from "react";
import { category } from "../db.js"; //but for now -> is not good
import "../styles/productsshop.css";
import logger from "use-reducer-logger";
import ProductShop from "./ProductShop";
import ReactPaginate from "react-paginate";
import LoadingBox from "./LoadingBox.js";
import MessageBox from "./MessageBox.js";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const ProductsShop = () => {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });

  //for filter category and all products
  const [data, setData] = useState(products);

  //for category
  // const [category, setCategory] = useState([]);

  //for paginate
  const [pageNumber, setPageNumber] = useState(0);

  const productPerPage = 3;

  const pagesVisited = pageNumber * productPerPage;

  const displayProducts = data
    .slice(pagesVisited, pagesVisited + productPerPage)
    .map((item) => <ProductShop item={item} key={item._id} />);

  const pageCount = Math.ceil(data.length / productPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected); //if i click page number 2 than selected is number 2
  };

  //filter and all products
  const filterResult = (catItem) => {
    const result = products.filter((curDate) => {
      return curDate.category === catItem;
    });
    setData(result);
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(
          "https://lukescommerce.onrender.com/api/products"
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        setData(result.data);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
      //   //setProducts(result.data);
    };
    fetchData();
  }, []);

  //for show all category
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        "https://lukescommerce.onrender.com/api/category"
      );
      // console.log(result.data);
      // setCategory(result.data);
    };
    fetchData();
  }, []);

  return (
    <div className="shop-container">
      <div className="shop-row">
        <div className="shop-col">
          <h2>Catgeory</h2>

          <button className="shop-btn" onClick={() => setData(products)}>
            All <FontAwesomeIcon icon={faChevronRight} />
          </button>
          {/* show all category if exists */}
          {/* {category.map((item) => ( */}

          {category.map((item) => (
            <button
              className="shop-btn"
              onClick={() => filterResult(item.title)}
            >
              {item.title} <FontAwesomeIcon icon={faChevronRight} />
            </button>
          ))}
        </div>
        <div className="shop-col">
          <div className="shop-products">
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox>{error}</MessageBox>
            ) : (
              displayProducts
            )}
          </div>
          <div className="shop-pagination">
            <ReactPaginate
              previousLabel={"<<"} //for previous
              nextLabel={">>"} //for next
              pageCount={pageCount} //for page number
              onPageChange={changePage} //for selected page, current page
              containerClassName={"paginationBttns"} //class for style
              previousLinkClassName={"previousBttn"} //class for style
              nextLinkClassName={"nextBttn"} //class for style
              disabledClassName={"paginationDisabled"} //class for style
              activeClassName={"paginationActive"} //class for style
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsShop;
