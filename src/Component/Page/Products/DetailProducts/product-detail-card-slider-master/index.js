
import {
  ArrowBackIos,
  ArrowForwardIos,
  ExpandLess,
  ExpandMore,
  Home,
  ShoppingCart
} from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { motion } from "framer-motion";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clearSelectedProductId } from "../../../../../services/redux/slices/productSlice";
import { cartThunk, productThunk } from "../../../../../services/redux/thunks/thunk";
import ProductReview from "../../../Review/Review";

// Cập nhật theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#76B900", // Màu xanh neon NVIDIA
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
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
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
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.02)',
          },
        },
      },
    },
  },
});

function ProductDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const {
    selectedProduct,
    listProduct,
    userCurrentLogged,
    cartItems,
  } = useSelector((state) => ({
    selectedProduct: state.product.selectedProduct,
    listProduct: state.product.listProduct,
    userCurrentLogged: state.user.userCurrentLogged,
    cartItems: state.cart.listCartItems,
  }));

  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const isLoading = useSelector((state) => state.product.isLoading);
  const [showFullSpecs, setShowFullSpecs] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [offsetY, setOffsetY] = useState(0);
  const navigate = useNavigate();
  const MAIN_IMAGE_WIDTH = 400;
  const MAIN_IMAGE_HEIGHT = 400;

  useEffect(() => {
    if (id) {
      dispatch(productThunk.getAllProduct());
      dispatch(productThunk.getProductById(id));
    }
    return () => {
      dispatch(clearSelectedProductId());
    };
  }, [id, dispatch]);

  const handleScroll = useCallback(() => {
    setOffsetY(window.pageYOffset);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setProduct({
      name: "ASUS PROART GeForce RTX 4060 24GB (PROART-RTX4060-24G)",
      price: 15199,
      oldPrice: 16199,
      discount: 25,
      images: [
        "http://res.cloudinary.com/dy53gt8yd/image/upload/v1726574589/rbduwtkahn5l9nyvpz6v.jpg",
        "http://res.cloudinary.com/dy53gt8yd/image/upload/v1726574591/zdrx1vnbvmfxezv8obd6.jpg",
        "http://res.cloudinary.com/dy53gt8yd/image/upload/v1726574594/sqh4srbpvjeciizpe26l.jpg",
      ],
      description:
        "General information: - Support change new in 7 days - Discount $10 buying with PC/Laptop",
      specifications: [
        { name: "Graphics Core", value: "NVIDIA® GeForce RTX™ 4060" },
        { name: "Standard Bus", value: "PCI-E 4.0" },
        { name: "Clock Speed", value: "OC Mode: 2550 MHz" },
        { name: "Default Mode", value: "2460 MHz (Boost Clock)" },
        { name: "CUDA Cores", value: "3072" },
        { name: "Memory Speed", value: "17 Gbps" },
        { name: "OpenGL", value: "OpenGL® 4.6" },
        { name: "Video Memory", value: "8 GB GDDR6X" },
        { name: "Memory Bus", value: "128-bit" },
        { name: "Resolution", value: "Maximum Resolution 7680 x 4320" },
        {
          name: "Connectors",
          value: "2 x Native HDMI 2.1, 2 x Native DisplayPort 1.4a",
        },
        {
          name: "Accessories",
          value:
            "Collectible Card, Quick Guide, Conversion Cable (1 to 3), PROART Graphics Card Holder, ASUS Velcro Strap & Hook, Thank You Card",
        },
        {
          name: "Software",
          value:
            "ASUS GPU Tweak III & GeForce Game Ready Driver & Studio Driver: Please download all software from the support website.",
        },
        { name: "Dimensions", value: "281 x 114 x 38 mm" },
        { name: "Recommended PSU", value: "450W" },
        { name: "Power Connectors", value: "1 x 8-pin" },
      ],
    });
  }, []);

  const visibleSpecs = useMemo(() => {
    return showFullSpecs
      ? selectedProduct?.specification?.length || 0
      : Math.ceil((selectedProduct?.specification?.length || 0) / 2);
  }, [showFullSpecs, selectedProduct]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedProduct.product_image.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === selectedProduct.product_image.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleAddToCart = useCallback((product, userCurrentLogged) => {
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
      // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng và totalPrice
      updateCartItem(existingCartItem.id, cartData);
    } else {
      // Thêm sản phẩm mới vào giỏ hàng
      addNewCartItem(cartData);
    }
  }, [dispatch, cartItems, navigate]);
  
  
  if (isLoading || !selectedProduct) {
    return (
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
        <CircularProgress size={60} thickness={4}  sx={{ color: '#4CAF50' }}  />
        <Typography variant="h6" sx={{ mt: 2, color: '#4CAF50' }}>
          PLEASE WAIT...
        </Typography>
      </Box>
    );
  }

  const handleProductClick = (id) => {
    navigate(`/websiteDoAn/ProductDetail/${id}`);
  };

  const filteredProducts = listProduct.filter(
    (product) => product.id !== selectedProduct?.id
  );

  return (
    <ThemeProvider theme={theme}>
    
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0}}
      >
        <Box
          sx={{
            width: "100%",
            minHeight: "100vh",
            mt: "90px",
            py: 4,
            px: { xs: 2, sm: 3, md: 4 },
            backgroundColor: "background.default",
            color: "text.primary",
          }}
        >
          <Paper
            elevation={3}
            sx={{ p: 3, mb: 3, backgroundColor: "background.paper" }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="body1">
                  <Home
                    sx={{ verticalAlign: "middle", mr: 1, color: "primary.main" }}
                  />
                  Home Page / {selectedProduct.productName}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          <Paper
            elevation={3}
            sx={{ p: 3, mb: 3, backgroundColor: "background.paper" }}
          >
            <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  position: "relative",
                  width: MAIN_IMAGE_WIDTH,
                  height: MAIN_IMAGE_HEIGHT,
                  margin: "0 auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                  "&:hover .arrows": { opacity: 1 },
                }}
                onMouseEnter={() => setShowArrows(true)}
                onMouseLeave={() => setShowArrows(false)}
              >
                <Box
                  sx={{
                    width: MAIN_IMAGE_WIDTH,
                    height: MAIN_IMAGE_HEIGHT,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "hidden",
                  }}
                >
                  <motion.img
                    key={currentImageIndex}
                    src={selectedProduct?.product_image[currentImageIndex]?.url}
                    alt={selectedProduct.productName}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
                <Box
                  className="arrows"
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    opacity: showArrows ? 1 : 0,
                    transition: "opacity 0.3s",
                  }}
                >
                  <IconButton
                    onClick={handlePrevImage}
                    sx={{ color: "white", backgroundColor: "rgba(0,0,0,0.5)" }}
                  >
                    <ArrowBackIos />
                  </IconButton>
                  <IconButton
                    onClick={handleNextImage}
                    sx={{ color: "white", backgroundColor: "rgba(0,0,0,0.5)" }}
                  >
                    <ArrowForwardIos />
                  </IconButton>
                </Box>
              </Box>
                <Box 
                  sx={{ 
                    display: "flex", 
                    justifyContent: "center",
                    mt: 2,
                    overflowX: "auto",
                    "&::-webkit-scrollbar": {
                      height: 8,
                    },
                    "&::-webkit-scrollbar-track": {
                      backgroundColor: "background.paper",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "primary.main",
                      borderRadius: 2,
                    },
                  }}
                >
                  {selectedProduct?.product_image.map((image, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={image.url}
                      alt={`Thumbnail ${index + 1}`}
                      sx={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        mr: 1,
                        flexShrink: 0,
                        border:
                          index === currentImageIndex
                            ? "2px solid #4CAF50"
                            : "2px solid transparent",
                        cursor: "pointer",
                      }}
                      onClick={() => setCurrentImageIndex(index)}
                    />
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <Typography variant="h4" gutterBottom color="primary">
                  {selectedProduct?.productName}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography variant="h5" color="error" sx={{ mr: 2 }}>
                  ${selectedProduct?.unitPrice - (selectedProduct?.unitPrice * (selectedProduct?.promotion.discountPercentage / 100))}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      textDecoration: "line-through",
                      mr: 2,
                      color: "text.secondary",
                    }}
                  >
                     ${selectedProduct?.unitPrice}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      bgcolor: "error.main",
                      color: "white",
                      p: 0.5,
                      borderRadius: 1,
                    }}
                  >
                    -{selectedProduct?.promotion.discountPercentage}%
                  </Typography>
                </Box>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    startIcon={<ShoppingCart />}
                    sx={{
                      mb: 2,
                      bgcolor: "primary.main",
                      "&:hover": { 
                        bgcolor: "primary.dark",
                        boxShadow: '0 0 15px #76B900',
                      },
                      fontSize: "1.1rem",
                      padding: "10px 20px",
                      position: 'relative',
                      overflow: 'hidden',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '-50%',
                        left: '-50%',
                        width: '200%',
                        height: '200%',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                        transform: 'rotate(45deg)',
                        transition: 'all 0.3s linear',
                      },
                      '&:hover::after': {
                        left: '100%',
                        top: '100%',
                      },
                    }}
                    onClick={()=>handleAddToCart(selectedProduct,userCurrentLogged)}
                  >
                    Add To Cart
                  </Button>
                </motion.div>
                <Typography variant="body1" paragraph>
                  {product?.description}
                </Typography>
                <Box
                  sx={{
                    border: 1,
                    borderColor: "primary.main",
                    p: 2,
                    mt: 2,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" gutterBottom color="primary">
                    Discount
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Discount $10 buying with PC GVN x ASUS EVANGELION 2" />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Discount $10 buying with PC GVN Gaming Intel i7-13700F/ VGA RTX 4070." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Discount $10 buying with PC GVN Gaming Intel i5-13600KF/ VGA RTX 3060." />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Discount $10 buying with North screen Bayou NB-F80 với màn hình giá chỉ 290.000đ." />
                    </ListItem>
                  </List>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Paper
            elevation={3}
            sx={{ p: 3, mb: 3, backgroundColor: "background.paper" }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} md={7}>
                <Typography variant="h5" gutterBottom color="primary">Product Description</Typography>
                {selectedProduct && selectedProduct?.specification && (
                  <>
                    <TableContainer component={Paper} sx={{ border: 1, borderColor: 'primary.main', borderRadius: 2, overflow: 'hidden' }}>
                      <Table>
                        <TableBody>
                          {selectedProduct.specification.slice(0, visibleSpecs).map((spec, index) => (
                            <TableRow 
                              key={spec.specificationName}
                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                              <TableCell 
                                component="th" 
                                scope="row"
                                sx={{ 
                                  backgroundColor: index % 2 === 0 ? 'rgba(76, 175, 80, 0.1)' : 'background.paper',
                                  fontWeight: 'bold',
                                  color: 'text.primary',
                                }}
                              >
                                <Typography variant="body1">{spec.specificationName}</Typography>
                              </TableCell>
                              <TableCell 
                                sx={{ 
                                  backgroundColor: index % 2 === 0 ? 'rgba(76, 175, 80, 0.1)' : 'background.paper',
                                  color: 'text.primary',
                                }}
                              >
                                <Typography variant="body2">{spec.specificationData}</Typography>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                      <Button
                        onClick={() => setShowFullSpecs(!showFullSpecs)}
                        endIcon={showFullSpecs ? <ExpandLess /> : <ExpandMore />}
                        sx={{ color: 'text.primary', textTransform: 'none' }}
                      >
                        <Typography variant="body1">
                          {showFullSpecs ? 'Thu gọn' : 'Xem thêm'}
                        </Typography>
                      </Button>
                    </Box>
                  </>
                )}
              </Grid>
              <Grid item xs={12} md={5}>
                <Typography variant="h5" gutterBottom color="primary">
                  Other products
                </Typography>
                <List>
                  {filteredProducts.map((product) => (
                    <ListItem
                      key={product.id}
                      alignItems="flex-start"
                      sx={{ mb: 2 }}
                      onClick={() => handleProductClick(product.id)}
                    >
                      <Box
                        component="img"
                        src={`${
                          product.product_image.find((img) => img.mainImage)?.url || ""
                  }`}
                        alt={product.productName}
                        sx={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          mr: 2,
                          borderRadius: 1,
                        }}
                      />
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="body1" component="span">
                          {product.productName}
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </Paper>
          <ProductReview selectedProduct={selectedProduct} />
        </Box>
      </motion.div>
    </ThemeProvider>
  );
}

export default ProductDetail;