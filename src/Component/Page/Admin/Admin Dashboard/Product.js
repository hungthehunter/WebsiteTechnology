import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productThunk } from '../../../../services/redux/thunks/thunk';
import './assets/css/style.scss';

function AdminProduct({ setActiveComponent, showAlert }) {
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const listProduct = useSelector((state) => state.product.listProduct);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(productThunk.deleteProduct(id));
        await dispatch(productThunk.getAllProduct());
        showAlert("Delete product successfully.", "success");
      } catch (error) {
        console.error("Error deleting product:", error);
        showAlert("Failed to delete product.", "error");
      }
    }
  };

  // Handle Search Change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter products based on search query
  const filteredProducts = listProduct.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          width: '100%',
          height: '80vh',
          overflowY: 'auto',
          boxShadow: 3,
          borderRadius: 2,
          padding: 3,
          backgroundColor: 'white',
          margin: '0 auto',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: '2.5rem' }}>
            Recent Product
          </Typography>

          {/* Search Field and Add New Product Button in a Row */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              placeholder="Search by name"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: '1.8rem', color: '#757575' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px',
                  paddingRight: '10px',
                },
                '& .MuiOutlinedInput-input': {
                  padding: '12px 10px 12px 0',
                  fontSize: '1rem',
                },
                '& .MuiInputBase-input::placeholder': {
                  fontSize: '1rem',
                },
                marginRight: 2, // Space between search and button
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setActiveComponent({ name: "AdminAddProduct" })}
            >
              + Add New Product
            </Button>
          </Box>
        </Box>

        {/* Product Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Id</TableCell>
                <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Name</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: '1.5rem' }}>Price</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: '1.5rem' }}>Quantity</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: '1.5rem' }}>Status</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: '1.5rem' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell style={{ textAlign: "start", fontSize: '1.3rem' }}>{product.id}</TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: '1.3rem' }}>{product.productName}</TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: '1.3rem' }}>${product.unitPrice}</TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: '1.3rem' }}>{product.unitInStock}</TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: '1.3rem' }}>
                    <span className={`status ${product.unitInStock > 0 ? 'inprogress' : 'deleting'}`}>
                      {product.unitInStock > 0 ? 'In stock' : 'Out of stock'}
                    </span>
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: '1.3rem' }}>
                    <Button variant="outlined" onClick={() => setActiveComponent({ name: "AdminViewProduct", props: { id: product.id } })}>
                      View
                    </Button>
                    <Button variant="outlined" onClick={() => setActiveComponent({ name: "AdminEditProduct", props: { id: product.id } })}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(product.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow className="nouser">
                  <TableCell colSpan={6} className="inform" style={{ textAlign: "center", paddingTop: 100 }}>
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default AdminProduct;
