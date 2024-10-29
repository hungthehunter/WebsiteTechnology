import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartThunk, productThunk } from "../../../services/redux/thunks/thunk";
import "../Shop/Shop.scss";

const Shop_Fake = ({ isGridView, searchItem, categoryFilters }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listProduct = useSelector((state) => state.product.listProduct);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of items per page
  const cartItems = useSelector((state) => state.cart.listCartItems);
  const [searchTerm, setSearchTerm] = useState(searchItem);
  const productRefs = {
    item: useRef(null),
    detail: useRef(null),
    buy: useRef(null),
    container: useRef(null),
    picture: useRef(null),
  };

  /*-------- BEGIN: Import data product in Store --------*/
  const [products, setProduct] = useState([]);
  const userCurrentLogged = useSelector((state) => state.user.userCurrentLogged);

  useEffect(() => {
    if (listProduct.length === 0) {
      try {
        dispatch(productThunk.getAllProduct());
      } catch (error) {
        console.error(error);
      }
    }
  }, [dispatch, listProduct.length]);
  

  const handleAddToCart = useCallback((product, userCurrentLogged) => {
    if (product && userCurrentLogged) {
      const existingCartItem = cartItems?.find(
        (item) => item.product?.id === product.id
      );
  
      const updateCartItem = (itemId, cartData) => {
        dispatch(cartThunk.updateCartItem({ id: itemId, cartData }))
          .then(() => {
            dispatch(cartThunk.getUserCart(userCurrentLogged.id));
            toast.success(`Đã tăng số lượng của ${product.productName} trong giỏ hàng!`);
          })
          .catch((error) => {
            console.error("Lỗi khi cập nhật số lượng sản phẩm:", error);
            toast.error("Không thể cập nhật số lượng sản phẩm. Vui lòng thử lại.");
          });
      };
  
      const addNewCartItem = (cartItem) => {
        if (!cartItem.user || !cartItem.user.id) {
          toast.error("Thông tin người dùng không hợp lệ.");
          return;
        }
        if (!cartItem.product || !cartItem.product.id) {
          toast.error("Thông tin sản phẩm không hợp lệ.");
          return;
        }
  
        dispatch(cartThunk.addToCart(cartItem))
          .then(() => {
            dispatch(cartThunk.getUserCart(userCurrentLogged.id));
            toast.success(`${product.productName} đã được thêm vào giỏ hàng!`);
          })
          .catch((error) => {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
            toast.error("Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
          });
      };
  
      if (existingCartItem) {
        // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng
        updateCartItem(existingCartItem.id, {
          quantity: existingCartItem.quantity + 1,
          user: { id: userCurrentLogged.id },
          product: { id: product.id },
        });
      } else {
        // Thêm sản phẩm mới vào giỏ hàng, bao gồm trường hợp giỏ hàng rỗng
        addNewCartItem({
          quantity: 1,
          user: { id: userCurrentLogged.id },
          product: { id: product.id },
        });
      }
    }else if(!userCurrentLogged){
      toast.error("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
      navigate(`/websiteDoAn/Login`);
    }
  }, [dispatch, cartItems]);
  
  

  const handleShow = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      if (response.status === 200) {
        setProduct(response.data);
      } else {
        throw new Error(`Error fetching products: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  /*-------- END: Import data product in Store --------*/

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredItems = listProduct.filter((item) => {
    // Check search term
    const matchesSearch = item.productName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Check category filters
    const matchesFilter = Object.entries(categoryFilters).some(
      ([key, value]) => {
        if (value) {
          // Only check activated filters
          switch (key) {
            // Categorize
            case "laptop":
              return item.productName.toLowerCase().includes("laptop");
            case "gpu":
              return item.productName.toLowerCase().includes("gpu");

            // Price
            case "$500":
              return item.unitPrice >= 500 && item.unitPrice < 1000;
            case "$1000":
              return item.unitPrice >= 1000 && item.unitPrice <= 2000;
            case "$2000":
              return item.unitPrice >= 2000;

            // GPU
            case "RTX4090":
              return item.specification.some(
                (spec) =>
                  spec.specificationName === "Graphics Card" &&
                  spec.specificationData.includes("RTX 4090")
              );
            case "RTX4080":
              return item.specification.some(
                (spec) =>
                  spec.specificationName === "Graphics Card" &&
                  spec.specificationData.includes("RTX 4080")
              );
            case "RTX4070":
              return item.specification.some(
                (spec) =>
                  spec.specificationName === "Graphics Card" &&
                  spec.specificationData.includes("RTX 4070")
              );
            case "RTX4060":
              return item.specification.some(
                (spec) =>
                  spec.specificationName === "Graphics Card" &&
                  spec.specificationData.includes("RTX 4060")
              );
            case "RTX4050":
              return item.specification.some(
                (spec) =>
                  spec.specificationName === "Graphics Card" &&
                  spec.specificationData.includes("RTX 4050")
              );

            // Manufacturer
            case "NVIDIA":
              return item.manufacturer.name.toLowerCase().includes("nvidia");
            case "ACER":
              return item.manufacturer.name.toLowerCase().includes("acer");
            case "ASUS":
              return item.manufacturer.name.toLowerCase().includes("asus");
          }
        }
        return false;
      }
    );

    // Return items that match the search term and at least one filter
    return (
      matchesSearch &&
      (Object.values(categoryFilters).every((filter) => !filter) ||
        matchesFilter)
    );
  });

  const currentItems = filteredItems.slice(startIndex, endIndex);

  useEffect(() => {
    // Update filteredItems when searchItem or categoryFilters change
    setSearchTerm(searchItem);
    setCurrentPage(1); // Reset current page to 1 when search or filters change
  }, [searchItem, categoryFilters]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  const handleProductClick = (productId) => {
    navigate(`/websiteDoAn/ProductDetail/${productId}`);
  };

  return (
    <div>
      {currentItems.map((item) => (
        <div
          key={item.id}
          className={`${
            isGridView ? "load-more-container-column" : "load-more-product"
          }`}
        >
          <div className="call-out search-label">Featured</div>
          <div ref={productRefs.container} className="product-container">
            <div
              className={`${
                isGridView ? "load-more-column" : "product-container"
              }`}
              ref={productRefs.item}
              id="product-item"
            >
              <div className="img-col-lg" ref={productRefs.picture}>
                <img
                  className={`${isGridView ? "load-more-img-lg" : "img-lg"}`}
                  id="product-img"
                  src={`${
                    item.product_image.find((img) => img.mainImage)?.url || ""
                  }`}
                  alt={item.productName}
                />
              </div>
              <div
                className={`${
                  isGridView ? "load-more-column-product" : "detail-col"
                }`}
                ref={productRefs.detail}
                id="product-detail"
              >
                <h2 className="product-name">{item.productName}</h2>
                <div className="specs-contain">
                  <ul>
                    {["CPU", "Screen", "RAM"].map((specName) => {
                      const spec = item.specification.find(
                        (s) => s.specificationName === specName
                      );
                      return spec ? (
                        <li key={specName}>
                          <div className="specs p-medium">
                            {specName}: {spec.specificationData}
                          </div>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              </div>
              <div
                className={`${
                  isGridView ? "load-more-column-buy" : "buy-col-lg"
                }`}
              >
                <div className="price">
                  ${item.unitPrice}
                  <span className="decimal">00</span>
                </div>
                <div className="buy-link">
                  <button className="link-btn featured-buy-link brand-green"
                  onClick={()=>handleAddToCart(item,userCurrentLogged)}
                  >
                    Add to Cart
                  </button>
                </div>
                <div className="buy-bfp">
                  <button
                    onClick={() => handleProductClick(item.id)}
                    className="buy-from-partner featured-buy-link no-brand"
                  >
                    Detail Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <ReactPaginate
        pageCount={Math.ceil(filteredItems.length / itemsPerPage)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageClick}
        containerClassName={"pagination custom-pagination"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        activeClassName={"active"}
        previousClassName={"page-item"}
        previousLinkClassName={"prev-next-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"prev-next-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        forcePage={0}
      />
    </div>
  );
};

export default Shop_Fake;
