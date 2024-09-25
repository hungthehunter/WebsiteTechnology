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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import ProductReview from "../../../Review/Review";

// Tạo theme tùy chỉnh
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

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [reviews, setReviews] = useState({
    total: 0,
    average: 0,
    distribution: [0, 0, 0, 0, 0], // 5 stars to 1 star
  });
  const [showFullSpecs, setShowFullSpecs] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const MAIN_IMAGE_WIDTH = 400; // Đặt chiều rộng mong muốn
  const MAIN_IMAGE_HEIGHT = 400; // Đặt chiều cao mong muốn

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

  if (!product) return <div>Loading...</div>;

  const visibleSpecs = showFullSpecs 
    ? product.specifications.length 
    : Math.ceil(product.specifications.length / 2);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <ThemeProvider theme={theme}>
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
                Home Page / {product.name}
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
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    transition: "opacity 0.5s ease-in-out",
                    opacity: showArrows ? 0.8 : 1,
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
                {product.images.map((image, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={image}
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
                {product.name}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Typography variant="h5" color="error" sx={{ mr: 2 }}>
                  ${product.price}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    textDecoration: "line-through",
                    mr: 2,
                    color: "text.secondary",
                  }}
                >
                  ${product.oldPrice}
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
                  -{product.discount}%
                </Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<ShoppingCart />}
                sx={{
                  mb: 2,
                  bgcolor: "primary.main",
                  "&:hover": { bgcolor: "primary.dark" },
                  fontSize: "1.1rem",
                  padding: "10px 20px",
                }}
              >
                BUY NOW
              </Button>
              <Typography variant="body1" paragraph>
                {product.description}
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
              {product && product.specifications && (
                <>
                  <TableContainer component={Paper} sx={{ border: 1, borderColor: 'primary.main', borderRadius: 2, overflow: 'hidden' }}>
                    <Table>
                      <TableBody>
                        {product.specifications.slice(0, visibleSpecs).map((spec, index) => (
                          <TableRow 
                            key={spec.name}
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
                              <Typography variant="body1">{spec.name}</Typography>
                            </TableCell>
                            <TableCell 
                              sx={{ 
                                backgroundColor: index % 2 === 0 ? 'rgba(76, 175, 80, 0.1)' : 'background.paper',
                                color: 'text.primary',
                              }}
                            >
                              <Typography variant="body2">{spec.value}</Typography>
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
                {[
                  {
                    id: 1,
                    name: "ASUS TUF Gaming GeForce RTX 3080",
                    image:
                      "http://res.cloudinary.com/dy53gt8yd/image/upload/v1726739700/laqtd1cgub5mvedjn7pj.jpg",
                  },
                  {
                    id: 2,
                    name: "ASUS ROG Strix GeForce RTX 3070",
                    image:
                      "http://res.cloudinary.com/dy53gt8yd/image/upload/v1726798021/w3moj3ibva8iwktvcxw8.jpg",
                  },
                ].map((product) => (
                  <ListItem
                    key={product.id}
                    alignItems="flex-start"
                    sx={{ mb: 2 }}
                  >
                    <Box
                      component="img"
                      src={product.image}
                      alt={product.name}
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
                        {product.name}
                      </Typography>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </Paper>
        <ProductReview reviews={reviews} />
      </Box>
    </ThemeProvider>
  );
}

export default ProductDetail;