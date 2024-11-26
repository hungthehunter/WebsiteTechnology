import Pako from "pako";
import { useEffect, useState } from "react";
import { getCartById, getUserLogged } from "../../Serivce/ApiService";
import { TableContainer, Typography, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
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
  backgroundColor: '#e74c3c',
  color: 'white',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#c0392b'
  }
});

const decompressAndDisplayImage = (compressedBase64) => {
  if (!compressedBase64) return "";
  try {
    const binaryString = atob(compressedBase64);
    const binaryData = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      binaryData[i] = binaryString.charCodeAt(i);
    }
    const decompressedData = Pako.inflate(binaryData);
    const blob = new Blob([decompressedData], { type: "image/png" });
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error("Failed to decompress image:", error);
    return "";
  }
};

const AccountProductHistory = () => {
  const [userId, setUserId] = useState(null);
  const [historyProducts, setHistoryProducts] = useState([]);

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return console.error("User not logged in.");
      try {
        const response = await getUserLogged(token);
        setUserId(response.data.id);
      } catch (error) {
        console.error("Failed to fetch user information:", error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const loadUserHistoryProduct = async () => {
      if (!userId) return;
      try {
        const result = await getCartById(userId);
        const allProducts = result.data.flatMap(cart => cart.products || []);
        setHistoryProducts(allProducts);
      } catch (error) {
        console.error("Failed to load user history products:", error);
      }
    };
    loadUserHistoryProduct();
  }, [userId]);

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
                  <img src={decompressAndDisplayImage(product.product_image?.[0]?.imageData || "")} alt={product.productName} />
                </TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell align="right">${product.unitPrice.toFixed(2)}</TableCell>
                <TableCell align="right">{product.unitInStock}</TableCell>
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
                  <StyledDeleteButton variant="contained" size="small">
                    Delete
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
