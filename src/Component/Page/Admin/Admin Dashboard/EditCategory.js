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
import { getAllProduct, getAllPromotion, updateCategory } from "../../../Serivce/ApiService";
import "./assets/css/style.scss";
  
  function AdminEditCategory({ id ,setActiveComponent, showAlert  }) { // Added categoryId for update
    const [categoryName, setCategoryName] = useState("");
    const [selectedPromotions, setSelectedPromotions] = useState(null); // Single promotion
    const [promotions, setPromotions] = useState([]);
    const [products, setProducts] = useState([]);
    const [description, setDescription] = useState("");
    const [imageFile, setImageFile] = useState(null); // For image file
    const [selectedProduct, setSelectedProduct] = useState(null); // Single product
  
    useEffect(() => {
      getAllProducts();
      getAllPromotions();
      loadCategory(id);
    }, [id]);
  
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
  
    const handleSave = async (id) => {
      const formData = new FormData();
  
      // Create the CategoryDTO object
      const categoryDTO = {
        name: categoryName,
        description: description,
        products: selectedProduct ? [selectedProduct] : [], // Ensure it's an array
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
        const response = await updateCategory(id,formData);
        if (response.status === 200) {
          showAlert("Category updated successfully.", "success");
          setActiveComponent({ name: "AdminCategory" });
        }
      } catch (error) {
        console.error("Error updating category:", error);
        showAlert("Failed to update category.", "error");
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
  
    // GET: Function to get list of promotions
    const getAllPromotions = async () => {
      try {
        const response = await getAllPromotion();
        setPromotions(response.data);
      } catch (error) {
        console.error("Failed to get list of promotions:", error);
      }
    };
  
    // GET: Function to load category details for editing
    const loadCategory = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/categories/${id}`);
        const category = response.data;
  
        setCategoryName(category.name);
        setDescription(category.description);
        setSelectedProduct(category.products.length > 0 ? category.products[0].id : null); // Assuming single product selection
        setSelectedPromotions(category.promotion ? category.promotion.id : null);
        console.log("loadCategory",category);
        // Handle image and other properties as needed
      } catch (error) {
        console.error("Failed to load category details:", error);
        showAlert("Failed to load category details.", "error");
      }
    };
  
    return (
      <Box sx={{ padding: 4 }}>
        <h2>Update Category</h2>
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
              {promotions.length > 0 ? (
                promotions.map((promotion) => (
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
                  <Button variant="contained" component="span">
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
            onClick={handleSave}
          >
            Update Category
          </Button>
        </form>
      </Box>
    );
  }
  
  export default AdminEditCategory;
  