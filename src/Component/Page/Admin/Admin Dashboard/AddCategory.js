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
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryThunk } from "../../../../services/redux/thunks/thunk";
import "./assets/css/style.scss";

function AdminAddCategory({ setActiveComponent, showAlert }) {
  const isLoading = useSelector((state) => state.category.isLoading);
  const [categoryName, setCategoryName] = useState("");
  const dispatch = useDispatch();
  const [selectedPromotions, setSelectedPromotions] = useState(null); 
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null); 
  const [selectedProduct, setSelectedProduct] = useState([]); 
  const listProduct = useSelector((state) => state.product.listProduct);
  const listPromotion = useSelector((state) => state.promotion.listPromotion);

  const handleCategoryChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value);
  };

  const handlePromotionChange = (e) => {
    setSelectedPromotions(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAdd = async () => {
    const formData = new FormData();

    // Create the CategoryDTO object
    const categoryDTO = {
      name: categoryName,
      description: description,
      products: selectedProduct.map(id => ({ id })), // Ensure it's an array
      promotion: selectedPromotions ? { id: selectedPromotions } : null, // Ensure it's an object
    };

    // Append the CategoryDTO as a JSON object
    formData.append(
      "category",
      new Blob([JSON.stringify(categoryDTO)], { type: "application/json" })
    );

    // Append the image file if it exists
    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
        dispatch(categoryThunk.createCategory(formData));
        showAlert("Category added successfully.", "success");
        setActiveComponent({ name: "AdminCategory" });
      
    } catch (error) {
      console.error("Error adding new category:", error);
      showAlert("Failed to add category.", "error");
    }
  };


  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Information of New Category
      </Typography>
      <form id="editForm">
        <TextField
          fullWidth
          margin="normal"
          label="Category Name"
          name="categoryName"
          value={categoryName}
          onChange={handleCategoryChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Description"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
        />

        {/* Product Selection */}
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="product-select-label">Select Product</InputLabel>
          <Select
            labelId="product-select-label"
            value={selectedProduct}
            onChange={handleProductChange}
            label="Select Product"
            multiple
          >
            <MenuItem value={null}>None</MenuItem>
            {listProduct.length > 0 ? (
              listProduct.map((product) => (
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

        {/* Promotion Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="promotion-select-label">Select Promotion</InputLabel>
          <Select
            labelId="promotion-select-label"
            value={selectedPromotions}
            onChange={handlePromotionChange}
            label="Select Promotion"
          >
            <MenuItem value={null}>None</MenuItem>
            {listPromotion.length > 0 ? (
              listPromotion.map((promotion) => (
                <MenuItem key={promotion.id} value={promotion.id}>
                  {promotion.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled value="">
                No promotion available
              </MenuItem>
            )}
          </Select>
        </FormControl>

        {/* Image Upload */}
        <TextField
          type="file"
          fullWidth
          margin="normal"
          label="Category Image"
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
                <Button variant="contained" component="span"
                disabled={isLoading}
                >
                  Upload
                </Button>
              </InputAdornment>
            ),
          }}
        />

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleAdd}
          disabled={isLoading}
        >
          Add Category
        </Button>
      </form>
    </Box>
  );
}

export default AdminAddCategory;
