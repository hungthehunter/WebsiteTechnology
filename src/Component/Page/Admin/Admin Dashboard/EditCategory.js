import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedCategoryId } from "../../../../services/redux/slices/categorySlice";
import { categoryThunk } from "../../../../services/redux/thunks/thunk";
import "./assets/css/style.scss";

function AdminEditCategory({ id, setActiveComponent, showAlert }) {
  const dispatch = useDispatch();

  // State để giữ các giá trị nhập liệu
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedPromotions, setSelectedPromotions] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Dữ liệu lấy từ Redux
  const listProduct = useSelector((state) => state.product.listProduct);
  // const listPromotion = useSelector((state) => state.promotion.listPromotion);
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );
  const isLoading = useSelector((state) => state.category.isLoading);

  // Fetch dữ liệu khi component load và khi `id` thay đổi
  useEffect(() => {
    dispatch(categoryThunk.getCategoryById(id));
  }, [dispatch, id]);

  // Đặt giá trị mặc định từ selectedCategory khi có dữ liệu
  useEffect(() => {
    if (selectedCategory) {
      setCategoryName(selectedCategory.name || "");
      setDescription(selectedCategory.description || "");
      setSelectedProduct(
        selectedCategory.products?.map((product) => product.id) || []
      );
      setSelectedPromotions(selectedCategory.promotion?.id || null);
      setImagePreview(selectedCategory.imageCloud?.url || "");
    }
  }, [selectedCategory]);
  
  // Handle Image Change for Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file)); // Show preview for new upload
    }
  };

  const handleCategoryChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // const handleProductChange = (e) => {
  //   setSelectedProduct(e.target.value);
  // };

  // const handlePromotionChange = (e) => {
  //   setSelectedPromotions(e.target.value);
  // };

  const clearForm = () => {
    setCategoryName("");
    setDescription("");
    // setSelectedProduct([]); 
    // setSelectedPromotions(null); 
    setImageFile(null); 
  };

  const handleSave = async (id) => {
    const formData = new FormData();
    const categoryDTO = {
      name: categoryName,
      description: description,
      // products: selectedProduct.map((id) => ({ id })),
      // promotion: selectedPromotions ? { id: selectedPromotions } : null,
    };

    formData.append(
      "category",
      new Blob([JSON.stringify(categoryDTO)], { type: "application/json" })
    );

    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      dispatch(
        categoryThunk.updateCategory({ id: id, categoryData: formData })
      ).then(() => {
        dispatch(categoryThunk.getAllCategories());
      });
      showAlert("Category updated successfully.", "success");
      dispatch(clearSelectedCategoryId());
      clearForm();
      setActiveComponent({ name: "AdminCategory" });
    } catch (error) {
      console.error("Error updating category:", error);
      showAlert("Failed to update category.", "error");
    }
  };

  // const filterProducts = listProduct.filter(
  //   (item) =>
  //     item.category &&
  //     selectedCategory &&
  //     (!item.category.id || item.category.id == selectedCategory.id)
  // );

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "black",
          zIndex: 9999,
        }}
      >
        <CircularProgress size={60} thickness={4} sx={{ color: "#4CAF50" }} />
        <Typography variant="h6" sx={{ mt: 2, color: "#4CAF50" }}>
          PLEASE WAIT...
        </Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Update Category
      </Typography>
      <form id="editForm">
        <Grid container spacing={2}>
          <TextField
            fullWidth
            margin="normal"
            label="Category Name"
            value={categoryName}
            onChange={handleCategoryChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={description}
            onChange={handleDescriptionChange}
          />

          {/* Product Selection */}
          {/* <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="product-select-label">Select Product</InputLabel>
            <Select
              labelId="product-select-label"
              value={selectedProduct}
              onChange={handleProductChange}
              label="Select Product"
              multiple
            >
              <MenuItem value={null}>None</MenuItem>
              {filterProducts.length > 0 ? (
                filterProducts.map((product) => (
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
          </FormControl> */}

          {/* Promotion Selection */}
          {/* <FormControl fullWidth margin="normal">
            <InputLabel id="promotion-select-label">
              Select Promotion
            </InputLabel>
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
          </FormControl> */}

          {/* Image Upload */}
          <FormControl fullWidth margin="normal">
            <Typography variant="body1" sx={{ marginBottom: 1 }}>
              Current Category Image:
            </Typography>
            {imagePreview && (
              <Box
                sx={{
                  marginBottom: 2,
                  textAlign: "center",
                }}
              >
                <img
                  src={imagePreview}
                  alt="Category"
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                  }}
                />
              </Box>
            )}
            <TextField
              type="file"
              fullWidth
              margin="normal"
              label="Upload New Image"
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
          </FormControl>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSave(selectedCategory.id)}
            >
              Update Category
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setActiveComponent({ name: "AdminCategory" })}
              sx={{ marginTop: 0, marginLeft: 2 }}
            >
              Return to Category
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

export default AdminEditCategory;
