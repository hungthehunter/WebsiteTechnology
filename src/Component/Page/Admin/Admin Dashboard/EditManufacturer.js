import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedManufacturerId } from "../../../../services/redux/slices/manufacturerSlice";
import { manufacturerThunk } from "../../../../services/redux/thunks/thunk";
import "./assets/css/style.scss";

function AdminEditManufacturer({ id, setActiveComponent, showAlert }) {
  const theme = useTheme();
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const dispatch = useDispatch();

  // Lấy dữ liệu nhà sản xuất từ Redux store
  const selectedManufacturer = useSelector((state) => state.manufacturer.selectedManufacturer);
  
  useEffect(() => {
    dispatch(manufacturerThunk.getManufacturerById(id));
  }, [dispatch, id]);

  // Thiết lập manufacturer khi selectedManufacturer thay đổi
  useEffect(() => {
    if (selectedManufacturer) {
      setManufacturer(selectedManufacturer);
      setSelectedProducts(selectedManufacturer.products.map((product) => product.id)); // Thiết lập selectedProducts
    }
  }, [selectedManufacturer]);

  const [manufacturer, setManufacturer] = useState({});

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleProductChange = (e) => {
    const value = e.target.value;
    setSelectedProducts(typeof value === 'string' ? value.split(',') : value);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (id) => {
    const formData = new FormData();
    const updatedManufacturer = {
      ...manufacturer,
      products: selectedProducts.map(id => ({ id })),
    };

    formData.append(
      "manufacturer",
      new Blob([JSON.stringify(updatedManufacturer)], { type: "application/json" })
    );

    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
        await dispatch(manufacturerThunk.updateManufacturer({id: selectedManufacturer.id,manufacturerData:formData }))
        showAlert("Manufacturer updated successfully", "success");
        dispatch(clearSelectedManufacturerId());
        setActiveComponent({ name: "AdminManufacturer" });
    } catch (error) {
      console.error("Error updating manufacturer:", error);
      showAlert("Failed to update manufacturer.", "error");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Box className="details_table">
        <Box className="table recentOrders">
          <Typography variant="h4" sx={{ marginBottom: 2 }}>
            Edit Manufacturer
          </Typography>
          <form onSubmit={(e) => { e.preventDefault(); handleSubmit(id); }}>
            {/* Product Selection */}
            <FormControl fullWidth margin="normal" variant="outlined">
              <InputLabel id="product-select-label">Select Products</InputLabel>
              <Select
                labelId="product-select-label"
                multiple
                value={selectedProducts}
                onChange={handleProductChange}
                renderValue={(selected) => {
                  const selectedNames = products
                    .filter((product) => selected.includes(product.id))
                    .map((product) => product.productName);
                  return selectedNames.join(', ');
                }}
                label="Select Products"
              >
                {products.length > 0 ? (
                  products.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.productName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem disabled value="">
                    No products available
                  </MenuItem>
                )}
              </Select>
            </FormControl>

            {/* Các trường thông tin khác */}
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              value={manufacturer.name || ''}
              onChange={handleInputChange((value) => setManufacturer(prev => ({ ...prev, name: value })))}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Country"
              value={manufacturer.country || ''}
              onChange={handleInputChange((value) => setManufacturer(prev => ({ ...prev, country: value })))}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Website"
              value={manufacturer.website || ''}
              onChange={handleInputChange((value) => setManufacturer(prev => ({ ...prev, website: value })))}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Description"
              value={manufacturer.description || ''}
              onChange={handleInputChange((value) => setManufacturer(prev => ({ ...prev, description: value })))}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              value={manufacturer.email || ''}
              onChange={handleInputChange((value) => setManufacturer(prev => ({ ...prev, email: value })))}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              value={manufacturer.phone || ''}
              onChange={handleInputChange((value) => setManufacturer(prev => ({ ...prev, phone: value })))}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Address"
              value={manufacturer.address || ''}
              onChange={handleInputChange((value) => setManufacturer(prev => ({ ...prev, address: value })))}
            />
            <TextField
              fullWidth
              margin="normal"
              type="datetime-local"
              label="Created At"
              InputLabelProps={{ shrink: true }}
              value={manufacturer.createdAt ? new Date(manufacturer.createdAt).toISOString().substring(0, 16) : ''}
              onChange={(e) => setManufacturer(prev => ({ ...prev, createdAt: new Date(e.target.value) }))} 
            />
            <TextField
              fullWidth
              margin="normal"
              type="datetime-local"
              label="Updated At"
              InputLabelProps={{ shrink: true }}
              value={manufacturer.updatedAt ? new Date(manufacturer.updatedAt).toISOString().substring(0, 16) : ''}
              onChange={(e) => setManufacturer(prev => ({ ...prev, updatedAt: new Date(e.target.value) }))} 
            />

            {/* Image Upload */}
            <TextField
              type="file"
              fullWidth
              margin="normal"
              label="Manufacturer Image"
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: "image/*" }}
              onChange={handleImageChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
            
            <Button
              fullWidth
              variant="contained"
              sx={{ backgroundColor: theme.palette.primary.main }} 
              type="submit" // Thay đổi thành type="submit"
            >
              Update Manufacturer
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminEditManufacturer;
