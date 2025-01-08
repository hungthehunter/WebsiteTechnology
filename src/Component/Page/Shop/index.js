import { ThemeProvider } from "@emotion/react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material"; // Thêm các thành phần MUI cần thiết
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  bannerThunk,
  categoryThunk,
  manufacturerThunk,
  productThunk,
} from "../../../services/redux/thunks/thunk";
import "../Shop/Shop.scss";
import Shop_Fake from "./Shop_Fake";
import Slider from "./Slider/Slider";

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

const BannerDiscountSection = styled(Box)(({ theme }) => ({
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: theme.spacing(8,0),
  color: theme.palette.common.black,
}));

function Shop() {
  const [inputValue, setInputValue] = useState("");
  const [isGridView, setGridView] = useState(true);
  const [placeholder, setPlaceholder] = useState("Example: Geforce RTX");
  const [searchItem, setSearchItem] = useState("");

  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.product.isLoading);

  useEffect(() => {
    dispatch(productThunk.getAllProduct()).unwrap();
    dispatch(categoryThunk.getAllCategories()).unwrap();
    dispatch(manufacturerThunk.getAllManufacturers()).unwrap();
  }, [dispatch]);

  // Take all list of Category and Manufacturer
  const listCategory = useSelector((state) => state.category.listCategory);
  const listManufacturer = useSelector(
    (state) => state.manufacturer.listManufacturer
  );

  const [categoryFilters, setCategoryFilters] = useState({
    prices: {
      under500: false,
      averagePrice: false,
      over1000: false,
      over2000: false,
    },
  });

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
    setPlaceholder("");
  };

  const handleBlur = () => {
    if (inputValue === "") {
      setPlaceholder("Example: Geforce RTX");
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
      under500: false,
      averagePrice: false,
      over1000: false,
      over2000: false,
    });
  };


  {/* SLIDE */}
    const [activeSlide, setActiveSlide] = useState(0);
  
    const handleSlideChange = (newIndex) => {
      setActiveSlide(newIndex);
    };

    const images = useSelector((state) => state.banner.listBanner);

    useEffect(()=>{
    dispatch(bannerThunk.getAllBanners()).unwrap();
    },[dispatch])

  return (
    <ThemeProvider theme={theme}>
      <>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Shop GeForce Graphics Cards, Laptops, and Systems</title>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
              position: "fixed",
              top: 0,
              left: 0,
              backgroundColor: "black",
              zIndex: 9999,
            }}
          >
            <CircularProgress size={60} thickness={4} color="primary" />
            <Typography variant="h6" sx={{ mt: 2, color: "#4CAF50" }}>
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

                  <BannerDiscountSection>
                    <Slider images={images} activeSlide={activeSlide} onChangeSlide={handleSlideChange}  height="300px" />
                  </BannerDiscountSection>
                  <div className="container">
                    <form className="column grid__column-3 content-product">
                      <div className="Reset-Filters">
                        <Button
                          variant="outlined"
                          onClick={handleResetFilters}
                          sx={{ color: "gray" }}
                        >
                          Reset Filters
                        </Button>
                      </div>
                      <ul className="Filter-list">
                        {/* Lọc theo Category */}
                        <fieldset className="filter-item">
                          <legend className="filter-title">
                            Product Category
                          </legend>
                          <div className="filter-content">
                            <ul className="filter-values">
                              {listCategory.map((category) => (
                                <li className="filter-value" key={category.id}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={categoryFilters[category.name]}
                                        onChange={() =>
                                          handleCategoryChange(category.name)
                                        }
                                      />
                                    }
                                    label={category.name}
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
                              {listManufacturer.map((manufacturer) => (
                                <li
                                  className="filter-value"
                                  key={manufacturer.id}
                                >
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={
                                          categoryFilters[manufacturer.name]
                                        }
                                        onChange={() =>
                                          handleCategoryChange(
                                            manufacturer.name
                                          )
                                        }
                                      />
                                    }
                                    label={manufacturer.name}
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
                              {[
                                "under500",
                                "averagePrice",
                                "over1000",
                                "over2000",
                              ].map((price) => (
                                <li className="filter-value" key={price}>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        checked={categoryFilters[price]}
                                        onChange={() =>
                                          handleCategoryChange(price)
                                        }
                                      />
                                    }
                                    label={
                                      price === "under500"
                                        ? "Up to $500"
                                        : price === "averagePrice"
                                        ? "Between $500 and $1000"
                                        : price === "over1000"
                                        ? "Between $1000 and $2000"
                                        : "Above $2000"
                                    }
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
