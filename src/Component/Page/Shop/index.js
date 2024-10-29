import { ThemeProvider } from "@emotion/react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Box, Button, Checkbox, FormControlLabel, Typography } from "@mui/material"; // Thêm các thành phần MUI cần thiết
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { productThunk } from "../../../services/redux/thunks/thunk";
import PICTURE from "../../Assests/PICTURE";
import "../Shop/Shop.scss";
import Shop_Fake from "./Shop_Fake";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4CAF50", // Xanh lá
    },
    secondary: {
      main: "#FFC107", // Vàng cho các ngôi sao
    },
    background: {
      default: "#000000", // Đen
      paper: "#1C1C1C", // Đen nhạt hơn cho các phần tử Paper
    },
    text: {
      primary: "#FFFFFF", // Trắng cho text chính
      secondary: "#B0B0B0", // Xám nhạt cho text phụ
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1.2rem",
    },
    body2: {
      fontSize: "1.1rem",
    },
  },
});

function Shop() {
  const [inputValue, setInputValue] = useState("");
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
  });

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.product.isLoading);

  useEffect(() => {
    dispatch(productThunk.getAllProduct());
  }, [dispatch]);

  //Handle Category checkbox
  const handleCategoryChange = (category) => {
    setCategoryFilters((prevFilters) => ({
      ...prevFilters,
      [category]: !prevFilters[category],
    }));
  };

  const handleClickButton = () => {
    setSearchItem(inputValue);
  };

  const handleFocus = () => {
    setPlaceholder('');
  };

  const handleBlur = () => {
    if (inputValue === '') {
      setPlaceholder('Example: Geforce RTX');
    }
  };

  const handleResetFilters = () => {
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
    <ThemeProvider theme={theme}>
      <>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Shop GeForce Graphics Cards, Laptops, and Systems</title>
        {isLoading ? (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: 'black',
            zIndex: 9999
          }}>
            <CircularProgress size={60} thickness={4} color="primary" />
            <Typography variant="h6" sx={{ mt: 2, color: '#4CAF50' }}>
              PLEASE WAIT...
            </Typography>
          </Box>
        ) : (
          <div className="Shop">
            <div className="row">
              <div id="content">
                <div className="grid wide">
                  <Typography variant="h1" className="shop-header">
                    Shop GeForce Graphics Cards, Laptops, and Systems
                  </Typography>
                  <div className="container">
                    <form className="column grid__column-3 content-product">
                      <div className="Reset-Filters">
                        <Button
                          variant="outlined"
                          onClick={handleResetFilters}
                          sx={{ color: 'gray' }}
                        >
                          Reset Filters
                        </Button>
                      </div>
                      <ul className="Filter-list">
                        <fieldset className="filter-item">
                          <legend className="filter-title">
                            Product Category
                          </legend>
                          <div className="filter-content">
                            <ul className="filter-values">
                              <li className="filter-value">
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={categoryFilters.laptop}
                                      onChange={() => handleCategoryChange("laptop")}
                                    />
                                  }
                                  label="Laptop"
                                />
                              </li>
                              <li className="filter-value">
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={categoryFilters.gpu}
                                      onChange={() => handleCategoryChange("gpu")}
                                    />
                                  }
                                  label="GPU"
                                />
                              </li>
                            </ul>
                          </div>
                        </fieldset>
                        <fieldset className="filter-item">
                          <legend className="filter-title">GPU</legend>
                          <div className="filter-content">
                            <ul className="filter-values">
                              {["RTX4090", "RTX4080", "RTX4070", "RTX4050"].map((gpu) => (
                                <li className="filter-value" key={gpu}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={categoryFilters[gpu]}
                                        onChange={() => handleCategoryChange(gpu)}
                                      />
                                    }
                                    label={gpu}
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </fieldset>
                        <fieldset className="filter-item">
                          <legend className="filter-title">Manufacturer</legend>
                          <div className="filter-content">
                            <ul className="filter-values">
                              {["NVIDIA", "ACER", "ASUS"].map((manufacturer) => (
                                <li className="filter-value" key={manufacturer}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={categoryFilters[manufacturer]}
                                        onChange={() => handleCategoryChange(manufacturer)}
                                      />
                                    }
                                    label={manufacturer}
                                  />
                                </li>
                              ))}
                            </ul>
                          </div>
                        </fieldset>
                        <fieldset className="filter-item">
                          <legend className="filter-title">Price</legend>
                          <div className="filter-content">
                            <ul className="filter-values">
                              {["$500", "$1000", "$2000"].map((price) => (
                                <li className="filter-value" key={price}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={categoryFilters[price]}
                                        onChange={() => handleCategoryChange(price)}
                                      />
                                    }
                                    label={`Above ${price}`}
                                  />
                                </li>
                              ))}
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
                              placeholder={placeholder}
                              spellCheck="false"
                              value={inputValue}
                              onChange={(e) => setInputValue(e.target.value)}
                              onFocus={handleFocus}
                              onBlur={handleBlur}
                            />
                            <Button
                              variant="contained"
                              onClick={handleClickButton}
                              sx={{ marginLeft: 1 }}
                            >
                              <i className="fa fa-search" aria-hidden="true" />
                            </Button>
                          </div>
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
                                <Typography variant="h2" className="product-name">
                                  NVIDIA GeForce RTX 4080
                                </Typography>
                                <div className="specs-contain">
                                  <ul>
                                    <li>
                                      <div className="specs p-medium">
                                        Cooling System: Fan
                                      </div>
                                    </li>
                                    <li>
                                      <div className="specs p-medium">
                                        Boost Clock Speed: 2.52GHz
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
                                  <Button className="buy-from-partner featured-buy-link no-brand">
                                    Detail Product
                                  </Button>
                                </div>
                              
                              </div>
                            </div>
                          </div>

                          <Shop_Fake
                            isGridView={isGridView}
                            searchItem={searchItem}
                            categoryFilters={categoryFilters}
                            isLoading={isLoading}
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
                    </div>
                  </footer>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </ThemeProvider>
  );
}

export default Shop;