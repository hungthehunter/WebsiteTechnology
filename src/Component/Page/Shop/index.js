import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import PICTURE from "../../Assests/PICTURE";
import "../Shop/Shop.scss";
import Shop_Fake from "./Shop_Fake";
function Shop() {
  const [inputValue,setInputValue]= useState("");
  const [isGridView, setGridView] = useState(true);
  const [placeholder, setPlaceholder] = useState('Example: Geforce RTX');
  const [searchItem, setSearchItem] = useState("");
  const [categoryFilters, setCategoryFilters] = useState({
    gpu: false,
    laptop: false,
    RTX4090: false,
    RTX4080: false,
    RTX4070: false,
    RTX4050: false,
    NVIDIA: false,
    ACER: false,
    ASUS: false,
    $500: false,
    $1000: false,
    $2000: false,
    GTX_Titan: false,
  });

  {
  }

  // const handleGridViewClick = () => {
  //   setGridView(true);
  // };

  // const handleListViewClick = () => {
  //   setGridView(false);
  // };

  //Handle Category checkbox
  const handleCategoryChange = (category) => {
    setCategoryFilters((prevFilters) => ({
      ...prevFilters,
      [category]: !prevFilters[category],
    }));
  };

const handleClickButton=()=>{
  setSearchItem(inputValue);
}

const handleFocus = () => {
  setPlaceholder('');
};

const handleBlur = () => {
  if (inputValue === '') {
    setPlaceholder('Example: Geforce RTX');
  }
};


  const handleResetFilters = () => {
    // Implement the logic to reset filters
    setCategoryFilters({
      gpu: false,
      laptop: false,
      RTX4090: false,
      RTX4080: false,
      RTX4070: false,
      RTX4050: false,
      NVIDIA: false,
      ACER: false,
      ASUS: false,
      $500: false,
      $1000: false,
      $2000: false,
    });
  };

  return (
    <>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <title>Shop GeForce Graphics Cards, Laptops, and Systems</title>
      <div className="Shop">
        <div className="row">
          <div id="content">
            <div className="grid wide">
              <h1 className="shop-header">
                Shop GeForce Graphics Cards, Laptops, and Systems
              </h1>
              {/* <div class="container"> */}
              <div className="container">
                <form className="column grid__column-3  content-product">
                  <div className="Reset-Filters">
                    <input
                      type="button"
                      aria-label="Reset-Filters"
                      className="gray-button button"
                      onClick={handleResetFilters}
                      defaultValue="Reset-Filters"
                    />
                  </div>
                  <ul className="Filter-list">
                    <fieldset className="filter-item">
                      <legend htmlFor="" className="filter-title">
                        Product Category
                      </legend>

                      <div className="filter-content">
                        <ul className="filter-values">
                          <li className="filter-value">
                            <div className="c-checkbox">
                              <input
                                type="checkbox"
                                className="small-button"
                                id="laptops"
                                checked={categoryFilters.laptop}
                                onChange={() => handleCategoryChange("laptop")}
                              />
                              <label
                                htmlFor="laptops"
                                className="c-checkbox__label"
                              >
                                <span htmlFor="">Laptop</span>
                              </label>
                            </div>
                          </li>
                          <li className="filter-value">
                            <div className="c-checkbox">
                              <input
                                type="checkbox"
                                className="small-button"
                                id="gpu"
                                checked={categoryFilters.gpu}
                                onChange={() =>
                                  handleCategoryChange("gpu")
                                }
                              />
                              <label
                                htmlFor="gpu"
                                className="c-checkbox__label"
                              >
                                <span htmlFor="">GPU</span>
                              </label>
                            </div>
                          </li>
                       
                        </ul>
                      </div>
                    </fieldset>
                    <fieldset className="filter-item">
                      <legend htmlFor="" className="filter-title">
                        GPU
                      </legend>

                      <div className="filter-content">
                        <ul className="filter-values">
                          <li className="filter-value">
                            <div className="c-checkbox">
                              <input
                                type="checkbox"
                                className="small-button"
                                id="RTX4090"
                                checked={categoryFilters.RTX4090}
                                onChange={() => handleCategoryChange("RTX4090")}
                              />
                              <label htmlFor="" className="c-checkbox__label">
                                <span htmlFor="">RTX 4090</span>
                              </label>
                            </div>
                          </li>
                          <li className="filter-value">
                            <div className="c-checkbox">
                              <input
                                type="checkbox"
                                className="small-button"
                                id="RTX4080"
                                checked={categoryFilters.RTX4080}
                                onChange={() => handleCategoryChange("RTX4080")}
                              />
                              <label htmlFor="" className="c-checkbox__label">
                                <span htmlFor="">RTX 4080</span>
                              </label>
                              {/* <span className="float-right">(22)</span> */}
                            </div>
                          </li>
                          <li className="filter-value">
                            <div className="c-checkbox">
                              <input
                                type="checkbox"
                                className="small-button"
                                id="RTX4070Ti"
                                checked={categoryFilters.GTX4070}
                                onChange={() =>
                                  handleCategoryChange("RTX4070")
                                }
                              />
                              <label htmlFor="" className="c-checkbox__label">
                                <span htmlFor="">RTX 4070</span>
                              </label>
                            </div>
                          </li>
                          
                          <li className="filter-value">
                            <div className="c-checkbox">
                              <input
                                type="checkbox"
                                className="small-button"
                                id="RTX4060"
                                checked={categoryFilters.RTX4050}
                                onChange={() => handleCategoryChange("RTX4050")}
                              />
                              <label htmlFor="" className="c-checkbox__label">
                                <span htmlFor="">RTX 4050</span>
                              </label>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </fieldset>
                    <fieldset className="filter-item">
                      <legend htmlFor="" className="filter-title">
                        Manufacturer
                      </legend>

                      <div className="filter-content">
                        <ul className="filter-values">
                          <li className="filter-value">
                            <div className="c-checkbox">
                              <input
                                type="checkbox"
                                className="small-button"
                                id="NVIDIA"
                                checked={categoryFilters.NVIDIA}
                                onChange={() => handleCategoryChange("NVIDIA")}
                              />
                              <label htmlFor="" className="c-checkbox__label">
                                <span htmlFor="">NVIDIA</span>
                              </label>
                            </div>
                          </li>
                          <li className="filter-value">
                            <div className="c-checkbox">
                              <input
                                type="checkbox"
                                className="small-button"
                                id="ACER"
                                checked={categoryFilters.ACER}
                                onChange={() => handleCategoryChange("ACER")}
                              />
                              <label htmlFor="" className="c-checkbox__label">
                                <span htmlFor="">ACER</span>
                              </label>
                            </div>
                          </li>

                          <li className="filter-value">
                            <div className="c-checkbox">
                              <input
                                type="checkbox"
                                className="small-button"
                                id="ASUS"
                                checked={categoryFilters.ASUS}
                                onChange={() => handleCategoryChange("ASUS")}
                              />
                              <label htmlFor="" className="c-checkbox__label">
                                <span htmlFor="">ASUS</span>
                              </label>
                            </div>
                          </li>

                          <li className="filter-value">
                            {/* <span className="title">Show More</span> */}
                          </li>
                        </ul>
                      </div>
                    </fieldset>
                    <fieldset className="filter-item">
                      <legend htmlFor="" className="filter-title">
                        Price
                      </legend>

                      <div className="filter-content">
                        <ul className="filter-values">
                          <li className="filter-value">
                            <div className="c-checkbox">
                              <input
                                type="checkbox"
                                className="small-button"
                                id="$500"
                                checked={categoryFilters.$500}
                                onChange={() => handleCategoryChange("$500")}
                              />
                              <label htmlFor="" className="c-checkbox__label">
                                <span htmlFor="">Above $500</span>
                              </label>
                            </div>
                          </li>
                          <li className="filter-value">
                            <div className="c-checkbox">
                              <input
                                type="checkbox"
                                className="small-button"
                                id="$1000"
                                checked={categoryFilters.$1000}
                                onChange={() => handleCategoryChange("$1000")}
                              />
                              <label htmlFor="" className="c-checkbox__label">
                                <span htmlFor="">Above $1000</span>
                              </label>
                            </div>
                          </li>
                          <li className="filter-value">
                            <div className="c-checkbox">
                              <input
                                type="checkbox"
                                className="small-button"
                                id="$2000"
                                checked={categoryFilters.$2000}
                                onChange={() =>
                                  handleCategoryChange("$2000")
                                }
                              />
                              <label htmlFor="" className="c-checkbox__label">
                                <span htmlFor="">Above $2000</span>
                              </label>
                            </div>
                          </li>

                          <li className="filter-value">
                            {/* <span className="title">Show More</span> */}
                          </li>
                        </ul>
                      </div>
                    </fieldset>
                  </ul>
                </form>
                <div className="column grid__column-10">
                  <div className="main-container">
                    <div className="form-row">
                      <div className="search-form">
                        <input
                          type="text"
                          className="search-input"
                          placeholder="Example: Geforce RTX"
                          spellCheck="false"
                          value={inputValue}
                          onChange={(e)=> setInputValue(e.target.value)}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                        <button type="submit" className="submit-button" onClick={handleClickButton}>
                          <i className="fa fa-search" aria-hidden="true" />
                        </button>
                      </div>
                      {/* <div className="bounding-box">
                <div className="sort-section">
                  <label htmlFor="" className="sort-label">
                    Sort by:
                  </label>
                  <div className="dropdown">
                    <div className="select-btn">
                      <span className="span-content">Featured Products</span>
                      <span className="span-button">
                        <i />
                      </span>
                    </div>
                  </div>
                </div>
          <GridViewToggleButton
           isGridView={isGridView}
           handleGridViewClick={handleGridViewClick}
           searchItem={searchItem}
          />
              </div> */}
                      <div className="total-product-list">
                        {/* <div className="total-product">221 results found</div> */}
                      </div>
                      <div className="featured-container">
                        <div className="call-out search-label">New Product</div>
                        <div className="product-main-container">
                          <div className="img-col-lg">
                            <div className="img-lg">
                              <img src={PICTURE.GeForce_RTX4080} alt="" />
                            </div>
                          </div>
                          <div className="detail-main-col">
                            <h2 className="product-name">
                              NVIDIA GeForce RTX 4080
                            </h2>
                            <div className="specs-contain">
                              <ul>
                                <li>
                                  <div className="specs p-medium">
                                    Cooling System: Fan
                                  </div>
                                </li>
                                <li>
                                  <div className="specs p-medium">
                                    Boost Clock Speed:2.52GHz
                                  </div>
                                </li>
                                <li>
                                  <div className="specs p-medium">
                                    Cooling System: Fan
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="buy-main-col-lg">
                            <div className="price">
                              $17.899
                              <span className="decimal">00</span>
                            </div>
                            <div className="buy-link">
                              <Link
                                to="/websiteDoAn/Products_gtx_4090"
                                className="link-btn featured-buy-link brand-green"
                              >
                                Add to Cart
                              </Link>
                            </div>
                            <div className="buy-bfp">
                              <button className="buy-from-partner featured-buy-link no-brand">
                                Buy from Partners
                              </button>
                            </div>
                            <div>
                              <button className="featured-buy-link compare link-regular">
                                Compare
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Shop_Fake
                        isGridView={isGridView}
                        searchItem={searchItem}
                        categoryFilters={categoryFilters}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <footer id="footer">
                <div className="footer-wrapper">
                  <div className="left-link">
                    <div className="footer-item country-link">
                      <Link to="">USA - United States</Link>{" "}
                    </div>
                    <div className="footer-item">
                      {" "}
                      <Link to="">Privacy</Link>
                    </div>
                    <div className="footer-item">
                      <Link to="">Legal</Link>
                    </div>
                    <div className="footer-item">
                      <Link to="">Contact</Link>
                    </div>
                  </div>
                  {/* <div className="right-link">
          <button className="compare-btn">Compare 4/4</button>
        </div> */}
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
