import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  MenuItem,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productThunk } from '../../../../services/redux/thunks/thunk';
import './assets/css/style.scss';

function AdminProduct({ setActiveComponent, showAlert }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const listProduct = useSelector((state) => state.product.listProduct);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      await dispatch(productThunk.deleteProduct(selectedProductId));
      await dispatch(productThunk.getAllProduct());
      showAlert("Product deleted successfully.", "success");
    } catch (error) {
      console.error("Error deleting product:", error);
      showAlert("Failed to delete product.", "error");
    }
    setOpenDialog(false);
    setSelectedProductId(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (criteria) => {
    setSortBy(criteria);
    setAnchorEl(null);
  };

  const handleOpenDialog = (id) => {
    setSelectedProductId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProductId(null);
  };

  const sortedProducts = [...listProduct].sort((a, b) => {
    if (!sortBy) return 0;
    if (sortBy === 'category') {
      return (a.category?.name || "").localeCompare(b.category?.name || "");
    } else if (sortBy === 'manufacturer') {
      return (a.manufacturer?.name || "").localeCompare(b.manufacturer?.name || "");
    }
    return 0;
  });

  const filteredProducts = sortedProducts.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openPopover = Boolean(anchorEl);
  const idPopover = openPopover ? 'sort-popover' : undefined;

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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 2,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontSize: '2.5rem' }}>
            Recent Products
          </Typography>
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
                marginRight: 2,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setActiveComponent({ name: 'AdminAddProduct' })}
              sx={{ marginRight: 2 }}
            >
              + Add New Product
            </Button>
            <Button
              variant="outlined"
              aria-controls={openPopover ? 'sort-popover' : undefined}
              aria-haspopup="true"
              aria-expanded={openPopover ? 'true' : undefined}
              onClick={handleClick}
            >
              Sort By
            </Button>
            <Popover
              id={idPopover}
              open={openPopover}
              anchorEl={anchorEl}
              onClose={handleClosePopover}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              <MenuItem onClick={() => handleSortChange('category')}>Category</MenuItem>
              <MenuItem onClick={() => handleSortChange('manufacturer')}>Manufacturer</MenuItem>
              <MenuItem onClick={() => handleSortChange('')}>Clear Filters</MenuItem>
            </Popover>
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: 'start', fontSize: '1.5rem' }}>Id</TableCell>
                <TableCell style={{ textAlign: 'start', fontSize: '1.5rem' }}>Name</TableCell>
                <TableCell style={{ textAlign: 'end', fontSize: '1.5rem' }}>Price</TableCell>
                <TableCell style={{ textAlign: 'end', fontSize: '1.5rem' }}>Quantity</TableCell>
                <TableCell style={{ textAlign: 'end', fontSize: '1.5rem' }}>Category</TableCell>
                <TableCell style={{ textAlign: 'end', fontSize: '1.5rem' }}>Manufacturer</TableCell>
                <TableCell style={{ textAlign: 'end', fontSize: '1.5rem' }}>Status</TableCell>
                <TableCell style={{ textAlign: 'end', fontSize: '1.5rem' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell style={{ textAlign: 'start', fontSize: '1.3rem' }}>{product?.id}</TableCell>
                  <TableCell style={{ textAlign: 'start', fontSize: '1.3rem' }}>{product?.productName}</TableCell>
                  <TableCell style={{ textAlign: 'end', fontSize: '1.3rem' }}>${product?.unitPrice}</TableCell>
                  <TableCell style={{ textAlign: 'end', fontSize: '1.3rem' }}>{product?.unitInStock}</TableCell>
                  <TableCell style={{ textAlign: 'end', fontSize: '1.3rem' }}>
                    <span className="status shipped">
                      {product?.category == null ? 'None' : product?.category?.name}
                    </span>
                  </TableCell>
                  <TableCell style={{ textAlign: 'end', fontSize: '1.3rem' }}>
                    <span className="status viewing">
                      {product?.manufacturer == null ? 'None' : product?.manufacturer?.name}
                    </span>
                  </TableCell>
                  <TableCell style={{ textAlign: 'end', fontSize: '1.3rem' }}>
                    <span
                      className={`status ${product.unitInStock > 0 ? 'inprogress' : 'deleting'}`}
                    >
                      {product.unitInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </TableCell>
                  <TableCell style={{ textAlign: 'end', fontSize: '1.3rem' }}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setActiveComponent({
                          name: 'AdminViewProduct',
                          props: { id: product.id },
                        })
                      }
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setActiveComponent({
                          name: 'AdminEditProduct',
                          props: { id: product.id },
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleOpenDialog(product.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow className="nouser">
                  <TableCell
                    colSpan={8}
                    className="inform"
                    style={{ textAlign: 'center', paddingTop: 100 }}
                  >
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Dialog for confirming delete */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminProduct;
