import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import "../Shop/Shop.scss";

const Shop_Fake = ({ isGridView, searchItem, categoryFilters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Number of items per page
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
  
  useEffect(() => {
    handleShow();
  }, []);

  const handleShow = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      if (response.status === 200) {
        setProduct(response.data);
        console.log(response.data);
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

  const filteredItems = products.filter((item) => {
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
            case "gpu":
              return item.category.categoryName === "GPU";
            case "laptop":
              return item.category.categoryName === "Laptop";
            // Price
            case "$500":
              return item.unitPrice >= 500 && item.unitPrice < 1000;
            case "$1000":
              return item.unitPrice >= 1000 && item.unitPrice <= 2000;
            case "$2000":
              return item.unitPrice >= 2000;
            // GPU
            case "RTX4090":
              return item.gpu === "GeForce RTX4090";
            case "RTX4080":
              return item.gpu === "GeForce RTX4080";
            case "RTX4070":
              return item.gpu === "GeForce RTX4070";
            case "RTX4060":
              return item.gpu === "GeForce RTX4060";
            case "RTX4050":
              return item.gpu === "GeForce RTX4050";
            // Manufacturer
            case "NVIDIA":
              return item.manufacturer.manufacturerName === "NVIDIA";
            case "ACER":
              return item.manufacturer.manufacturerName === "ACER";
            case "ASUS":
              return item.manufacturer.manufacturerName === "ASUS";
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
                  src={`${item.product_image.find(img => img.mainImage)?.url || ''}`}
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
                    <li>
                      <div className="specs p-medium">CPU: {item.cpu}</div>
                    </li>
                    <li>
                      <div className="specs p-medium">
                        Screen: {item.screen}
                      </div>
                    </li>
                    <li>
                      <div className="specs p-medium">RAM: {item.ram}</div>
                    </li>
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
                  <Link className="link-btn featured-buy-link brand-green">
                    Add to Cart
                  </Link>
                </div>
                <div className="buy-bfp">
                  <Link
                    to={{
                      pathname: `/websiteDoAn/ProductDetail/${item.id}`,
                    }}
                    className="buy-from-partner featured-buy-link no-brand"
                  >
                    Detail Product
                  </Link>
                </div>
                <div>
                  <button className="featured-buy-link compare link-regular">
                    Compare
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
