import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cartThunk, productThunk } from "../../../services/redux/thunks/thunk";
import { productValidation } from "../../../services/yup/Shop/ShopValidation";
import "../Shop/Shop.scss";

const Shop_Fake = ({ isGridView, searchItem, categoryFilters, isLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listProduct = useSelector((state) => state.product.listProduct);
    // Take all list of Category and Manufacturer
    const listCategory = useSelector((state) => state.category.listCategory);
    const listManufacturer = useSelector(
      (state) => state.manufacturer.listManufacturer
    );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const cartItems = useSelector((state) => state.cart.listCartItems);
  const [searchTerm, setSearchTerm] = useState(searchItem);
  const userCurrentLogged = useSelector((state) => state.user.userCurrentLogged);

  useEffect(() => {
    if (listProduct.length === 0) {
      dispatch(productThunk.getAllProduct()).catch((error) => {
        console.error("Lỗi khi tải sản phẩm:", error);
      });
    }
  }, [dispatch, listProduct.length]);

    // Filter and validate products
    const validProducts = listProduct.filter((product) => {
      try {
        productValidation.validateSync(product);
        return true; // Product is valid
      } catch (err) {
        return false; // Product fails validation
      }
    });

  const handleAddToCart = useCallback(
    (product, userCurrentLogged) => {
      if (!userCurrentLogged) {
        toast.error("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
        return navigate(`/websiteDoAn/Login`);
      }

      if (cartItems?.length >= 3) {
        toast.error("Please proceed with checkout before adding more products.");
        return;
      }

      const existingCartItem = cartItems?.find((item) => item.product?.id === product.id);
      const totalPrice = product.unitPrice;

      const cartData = {
        quantity: existingCartItem ? existingCartItem.quantity + 1 : 1, // Tăng số lượng nếu sản phẩm đã có
        user: { id: userCurrentLogged.id },
        product: { id: product.id },
        totalPrice: totalPrice, // Thêm totalPrice vào cartData
      };

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
        updateCartItem(existingCartItem.id, {
          quantity: existingCartItem.quantity + 1,
          user: { id: userCurrentLogged.id },
          product: { id: product.id },
          totalPrice: totalPrice, // Cập nhật totalPrice khi sản phẩm đã có
        });
      } else {
        addNewCartItem(cartData); // Sử dụng cartData đã tạo ở trên
      }
    },
    [dispatch, cartItems, navigate]
);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredItems = listProduct.filter((item) => {
    const matchesSearch = item.productName.toLowerCase().includes(searchItem.toLowerCase());

    // Kiểm tra nếu sản phẩm thuộc một trong các category được chọn
    const matchesCategory = listCategory.some(
      (category) =>
        categoryFilters[category.name] && item.category?.name.toLowerCase() === category.name.toLowerCase()
    );

    // Kiểm tra nếu sản phẩm thuộc một trong các manufacturer được chọn
    const matchesManufacturer = listManufacturer.some(
      (manufacturer) =>
        categoryFilters[manufacturer.name] &&
        item.manufacturer?.name.toLowerCase() === manufacturer.name.toLowerCase()
    );

      // Kiểm tra mức giá theo priceFilter
  const matchesPrice = (priceFilter) => {
    switch (priceFilter) {
      case "under500":
        return item.unitPrice <= 500;
      case "averagePrice":
        return item.unitPrice > 500 && item.unitPrice <= 1000;
      case "over1000":
        return item.unitPrice > 1000 && item.unitPrice <= 2000;
      case "over2000":
        return item.unitPrice >= 2000;
      default:
        return true;
    }
  };

  const matchesPriceFilter = Object.entries(categoryFilters).some(([key, value]) => {
    if (value) {
      if (key === "under500" || key === "averagePrice" || key === "over1000" || key === "over2000") {
        return matchesPrice(key);
      }
    }
    return false;
  });

    // Chỉ trả về những sản phẩm khớp với tìm kiếm và ít nhất một bộ lọc
    return matchesSearch && (matchesCategory || matchesManufacturer || matchesPriceFilter || !Object.values(categoryFilters).includes(true));
  });
  

  const currentItems = filteredItems.slice(startIndex, endIndex);

  useEffect(() => {
    setSearchTerm(searchItem);
    setCurrentPage(1);
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
        <div key={item.id} className={`${isGridView ? "load-more-container-column" : "load-more-product"}`}>
          <div className="call-out search-label">Featured</div>
          <div className="product-container">
            <div className={`${isGridView ? "load-more-column" : "product-container"}`} id="product-item">
              <div className="img-col-lg">
                <img
                  className={`${isGridView ? "load-more-img-lg" : "img-lg"}`}
                  id="product-img"
                  src={`${item.product_image.find((img) => img.mainImage)?.url || ""}`}
                  alt={item.productName}
                />
              </div>
              <div className={`${isGridView ? "load-more-column-product" : "detail-col"}`} id="product-detail">
                <h2 className="product-name">{item.productName}</h2>
                <div className="specs-contain">
                  <ul>
                    {["CPU", "Screen", "RAM"].map((specName) => {
                      const spec = item.specification.find((s) => s.specificationName === specName);
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
              <div className={`${isGridView ? "load-more-column-buy" : "buy-col-lg"}`}>
                <div className="price">
                  ${item.unitPrice}
                  <span className="decimal">00</span>
                </div>
                <div className="buy-link">
                  <button className="link-btn featured-buy-link brand-green" onClick={() => handleAddToCart(item, userCurrentLogged)}>
                    Add to Cart
                  </button>
                </div>
                <div className="buy-bfp">
                  <button onClick={() => handleProductClick(item.id)} className="buy-from-partner featured-buy-link no-brand">
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
