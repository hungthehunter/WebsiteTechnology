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
import CircularProgress from '@mui/material/CircularProgress';
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

  // Dữ liệu lấy từ Redux
  const listProduct = useSelector((state) => state.product.listProduct);
  const listPromotion = useSelector((state) => state.promotion.listPromotion);
  const selectedCategory = useSelector((state) => state.category.selectedCategory);
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
      setSelectedProduct(selectedCategory.products?.map((product) => product.id) || []);
      setSelectedPromotions(selectedCategory.promotion?.id || null);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleProductChange = (e) => {
    setSelectedProduct(e.target.value); // Đảm bảo giá trị giữ nguyên dạng mảng
  };

  const handlePromotionChange = (e) => {
    setSelectedPromotions(e.target.value);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const clearForm = () => {
    setCategoryName("");
    setDescription("");
    setSelectedProduct([]); // Reset lại mảng selectedProduct
    setSelectedPromotions(null); // Reset selectedPromotions
    setImageFile(null); // Xóa file ảnh
};

  const handleSave = async (id) => {
    const formData = new FormData();
    const categoryDTO = {
      name: categoryName,
      description: description,
      products: selectedProduct.map((id) => ({ id })),
      promotion: selectedPromotions ? { id: selectedPromotions } : null,
    };

    formData.append(
      "category",
      new Blob([JSON.stringify(categoryDTO)], { type: "application/json" })
    );

    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
       await dispatch(categoryThunk.updateCategory({id:id, categoryData:formData}));
        showAlert("Category updated successfully.", "success");
        dispatch(clearSelectedCategoryId());
        clearForm();
        setActiveComponent({ name: "AdminCategory" });

    } catch (error) {
      console.error("Error updating category:", error);
      showAlert("Failed to update category.", "error");
    }
  };


  if (isLoading) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'black',
        zIndex: 9999
      }}>
        <CircularProgress size={60} thickness={4}  sx={{ color: '#4CAF50' }}  />
        <Typography variant="h6" sx={{ mt: 2, color: '#4CAF50' }}>
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

        {/* Submit Button */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => handleSave(selectedCategory.id)}
        >
          Update Category
        </Button>
      </form>
    </Box>
  );
}

export default AdminEditCategory;
