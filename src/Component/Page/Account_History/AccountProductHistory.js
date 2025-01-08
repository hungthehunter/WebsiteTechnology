import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./css/style.scss";
// Styled components
const StyledGridContainer = styled(Grid)({
  margin: "20px",
  gap: "16px",
  justifyContent: "center",
});

const StyledCard = styled(Card)({
  width: 250, // Fixed width
  height: 350, // Fixed height
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const StyledCardMedia = styled(CardMedia)({
  width: 230,
  height: 150,
  objectFit: "cover",
  borderRadius: "4px",
});

const StyledCardContent = styled(CardContent)({
  flex: 1, // Makes the content grow to fill available space
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "8px",
});

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  color: "black",
  "&:hover": {
    backgroundColor: "transparent",
    color: "#76b900",
    "& .MuiButton-endIcon": {
      transform: "translateX(10px)",
      transition: "color 0.3s ease, transform 0.3s ease ",
      color: "#76b900",
    },
  },
}));

const AccountProductHistory = ({ setActiveComponent }) => {
  const userCurrentLogged = useSelector(
    (state) => state.user.userCurrentLogged
  );
  const listOrder = useSelector((state) => state.order.listOrder);
  const [historyProducts, setHistoryProducts] = useState([]);
   
  useEffect(() => {
    if (userCurrentLogged) {
      loadUserHistoryProducts();
    }
  }, [userCurrentLogged]);

  const loadUserHistoryProducts = () => {
    // Lọc các đơn hàng của người dùng hiện tại
    const userOrders = listOrder?.filter(
      (order) => order?.user?.id === userCurrentLogged?.id
    );

    // Lấy sản phẩm từ orderItem trong các đơn hàng
    const products = userOrders?.flatMap((order) =>
      order?.orderItem?.map((item) => ({
        id: item?.product?.id,
        productName: item?.product?.productName,
        unitPrice: item?.product?.unitPrice,
        quantity: item?.quantity,
        productImage: `${
          item?.product?.product_image?.find((img) => img?.mainImage)?.url || ""
        }`,
      }))
    );

    // Loại bỏ các sản phẩm trùng lặp dựa trên tên sản phẩm (productName)
    const uniqueProducts = Array.from(
      new Map(
        products?.map((product) => [product?.productName, product])
      ).values()
    );

    setHistoryProducts(uniqueProducts);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom style={{ fontSize: "26px" }}>
        Product History
      </Typography>
      <StyledGridContainer
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        {historyProducts.length > 0 ? (
          historyProducts.map((product, index) => (
            <Grid item key={index}>
              <StyledCard>
                <StyledCardMedia
                  component="img"
                  src={product?.productImage}
                  alt={product?.productName || "Product"}
                />
                <StyledCardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    style={{ fontSize: "20px" }}
                  >
                    {product?.productName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ fontSize: "16px" }}
                  >
                    Price: ${product?.unitPrice?.toFixed(2)}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      color: product?.unitInStock > 0 ? "green" : "red",
                      fontSize: "16px",
                    }}
                  >
                    {product?.unitInStock > 0 ? "In stock" : "Out of stock"}
                  </Typography>
                </StyledCardContent>
                <CardActions style={{ justifyContent: "center" }}>
                  <StyledButton
                    component={Link}
                    to={`/websiteDoAn/ProductDetail/${product?.id}`}
                    endIcon={<ArrowForwardIosOutlinedIcon fontSize="3" />}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      marginTop: "auto",
                    }}
                  >
                    Shop Now
                  </StyledButton>
                </CardActions>
              </StyledCard>
            </Grid>
          ))
        ) : (
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ fontSize: "16px" }}
          >
            No product was found
          </Typography>
        )}
      </StyledGridContainer>
    </div>
  );
};

export default AccountProductHistory;
