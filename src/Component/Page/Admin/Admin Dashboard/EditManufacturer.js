import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { getAllProduct } from "../../../Serivce/ApiService";
import "./assets/css/style.scss";
import { getManufacturerById } from "./service/AdminService";

function AdminEditManufacturer({ id, setActiveComponent, showAlert }) {
  const [manufacturer, setManufacturer] = useState({});
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    getManufacturer(id);
    getAllProducts();
  }, []);

  // Fetch manufacturer details
  const getManufacturer = async (id) => {
    try {
      const response = await getManufacturerById(id);
      setManufacturer(response.data);
      setSelectedProducts(response.data.products.map(product => product.id));
    } catch (error) {
      console.error("Error fetching manufacturer:", error);
      showAlert("Failed to fetch manufacturer details.", "error");
    }
  };

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const response = await getAllProduct();
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to get products:", error);
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const updatedManufacturer = {
      ...manufacturer,
      products: selectedProducts,
    };

    formData.append(
      "manufacturer",
      new Blob([JSON.stringify(updatedManufacturer)], { type: "application/json" })
    );

    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      const response = await axios.put(
        `http://localhost:8080/api/manufacturers/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        showAlert("Manufacturer updated successfully", "success");
        setActiveComponent({ name: "AdminManufacturer" });
      }
    } catch (error) {
      console.error("Error updating manufacturer:", error);
      showAlert("Failed to update manufacturer.", "error");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <h2>Edit Manufacturer</h2>
      <form onSubmit={handleSubmit}>
        {/* Product Selection */}
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="product-select-label">Select Products</InputLabel>
          <Select
            labelId="product-select-label"
            multiple
            value={selectedProducts}
            onChange={handleProductChange}
            renderValue={(selected) => selected.join(', ')}
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
          color="primary"
          type="submit"
        >
          Update Manufacturer
        </Button>
      </form>
    </Box>
  );
}

export default AdminEditManufacturer;
