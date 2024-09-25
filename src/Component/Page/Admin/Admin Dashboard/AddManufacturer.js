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
import React, { useEffect, useState } from "react";
import { createManufacturer, getAllProduct } from "../../../Serivce/ApiService";
import "./assets/css/style.scss";

function AdminAddManufacturer({ setActiveComponent, showAlert }) {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Manufacturer new
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [createdAt, setCreatedAt] = useState(null); // kiểu Data
  const [updatedAt, setUpdatedAt] = useState(null); // kiểu Data

  useEffect(() => {
    getAllProducts();
  }, []);

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleAdd = async () => {
    const formData = new FormData();
  
    const manufacturerDTO = {
      name: name,
      country: country,
      website: website,
      description: description,
      email: email,
      phone: phone,
      address: address,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      products: selectedProduct ? [selectedProduct] : [],
    };

    formData.append(
      "manufacturer",
      new Blob([JSON.stringify(manufacturerDTO)], { type: "application/json" })
    );

    if (imageFile) {
      formData.append("file", imageFile);
    }
    try {
      const response = await createManufacturer(formData);
      if (response.status === 200) {
        showAlert("Add new manufacturer successfully", "success");
        setActiveComponent({ name: "AdminManufacturer" });
      }
    } catch (error) {
      console.error("Error add new manufacturer:", error);
      showAlert("Failed to add manufacturer.", "error");
    }
  };

  /*------------------------------ Database functions ------------------------------------*/

  // GET: Function to get list of products
  const getAllProducts = async () => {
    try {
      const response = await getAllProduct();
      setProducts(response.data);
    } catch (error) {
      console.error("Failed to get list of products:", error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <h2>Add Manufacturer</h2>
      <form id="editForm">

        {/* Product Selection */}
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="product-select-label">Select Product</InputLabel>
          <Select
            labelId="product-select-label"
            value={selectedProduct}
            onChange={handleProductChange}
            label="Select Product"
          >
            <MenuItem value={null}>None</MenuItem>
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
          value={name}
          onChange={handleInputChange(setName)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Country"
          value={country}
          onChange={handleInputChange(setCountry)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Website"
          value={website}
          onChange={handleInputChange(setWebsite)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          value={description}
          onChange={handleInputChange(setDescription)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={email}
          onChange={handleInputChange(setEmail)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          value={phone}
          onChange={handleInputChange(setPhone)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          value={address}
          onChange={handleInputChange(setAddress)}
        />
        <TextField
          fullWidth
          margin="normal"
          type="datetime-local"
          label="Created At"
          InputLabelProps={{ shrink: true }}
          value={createdAt ? createdAt.toISOString().substring(0, 16) : ""}
          onChange={(e) => setCreatedAt(new Date(e.target.value))}
        />
        <TextField
          fullWidth
          margin="normal"
          type="datetime-local"
          label="Updated At"
          InputLabelProps={{ shrink: true }}
          value={updatedAt ? updatedAt.toISOString().substring(0, 16) : ""}
          onChange={(e) => setUpdatedAt(new Date(e.target.value))}
        />

        {/* Image Upload */}
        <TextField
          type="file"
          fullWidth
          margin="normal"
          label="Manufacturer Image"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            accept: "image/*",
          }}
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
          onClick={handleAdd}
        >
          Add Manufacturer
        </Button>
      </form>
    </Box>
  );
}

export default AdminAddManufacturer;
