import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import "./css/style.scss";

const StyledTableContainer = styled(TableContainer)({
  margin: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  '& .MuiTableCell-head': {
    backgroundColor: '#f5f5f5',
    color: '#2c3e50',
    fontWeight: 600,
    textAlign: 'left',
    fontSize: '16px'
  },
  '& .MuiTableCell-root': {
    padding: '12px',
    fontSize: '14px',
    textAlign: 'center',
    '& img': {
      width: 50,
      height: 50,
      objectFit: 'cover',
      borderRadius: '4px'
    },
  }
});

const StyledTitle = styled(Typography)({
  fontWeight: 600,
  margin: '16px 0',
  padding: '12px',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #e0e0e0',
  color: '#3f51b5',
  textAlign: 'left'
});

const StyledDeleteButton = styled(Button)({
  backgroundColor: 'blue',
  color: 'white',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#c0392b'
  }
});

const AccountProductHistory = ({ setActiveComponent }) => {
  const navigate = useNavigate();
  const userCurrentLogged = useSelector((state) => state.user.userCurrentLogged);
  const listOrder = useSelector((state) => state.order.listOrder);
  const [historyProducts, setHistoryProducts] = useState([]);

  useEffect(() => {
    if (userCurrentLogged) {
      loadUserHistoryProducts();
    }
  }, [userCurrentLogged]);

  const loadUserHistoryProducts = () => {
    // Lọc các đơn hàng của người dùng hiện tại
    const userOrders = listOrder.filter(order => order.user.id === userCurrentLogged.id);

    // Lấy sản phẩm từ orderItem trong các đơn hàng
    const products = userOrders.flatMap(order => 
      order.orderItem.map(item => ({
        id: item.product.id,
        productName: item.product.productName, // Sửa tên thuộc tính nếu cần
        unitPrice: item.price,
        quantity: item.quanitty,
        productImage: `${item.product.product_image.find((img) => img.mainImage)?.url || ""}` ,
        status: item.quanitty > 0 ? "In stock" : "Out of stock"
      }))
    );

    setHistoryProducts(products);
  };

  return (
    <StyledTableContainer component={Paper}>
      <StyledTitle variant="h4">Product History</StyledTitle>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Product</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {historyProducts.length > 0 ? (
            historyProducts.map((product, index) => (
              <TableRow key={index} sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}>
                <TableCell>{product.id}</TableCell>
                <TableCell>
                <img
                        src={product?.productImage}
                        alt={product?.productName}
                        width="50"
                      />
                </TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell align="right">${product.unitPrice.toFixed(2)}</TableCell>
                <TableCell align="right">{product.quantity}</TableCell>
                <TableCell align="right">
                  <Typography
                    variant="body2"
                    sx={{
                      color: product.unitInStock > 0 ? 'success.main' : 'error.main',
                      fontWeight: 500
                    }}
                  >
                    {product.unitInStock > 0 ? "In stock" : "Out of stock"}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <StyledDeleteButton variant="contained" size="small"
                  onClick={()=>navigate(`/websiteDoAn/ProductDetail/${product.id}`)}
                  >
                    Visit
                  </StyledDeleteButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center" sx={{ color: '#757575', fontStyle: 'italic', padding: '12px' }}>
                No product was found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );



};

export default AccountProductHistory;
