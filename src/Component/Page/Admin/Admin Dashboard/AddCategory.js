import {
  Box,
  Button,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryThunk } from "../../../../services/redux/thunks/thunk";
import { addCategoryValidationSchema } from "../../../../services/yup/Admin/Category/addCategoryValidation";
import "./assets/css/style.scss";

function AdminAddCategory({ setActiveComponent, showAlert }) {
  const isLoading = useSelector((state) => state.category.isLoading);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [selectedPromotions, setSelectedPromotions] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [errors, setErrors] = useState({});
  const listProduct = useSelector((state) => state.product.listProduct);
  const dispatch = useDispatch();

  const handleCategoryChange = (e) => setCategoryName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleImageChange = (e) => setImageFile(e.target.files[0]);

  const handleAdd = async () => {
    const dataToValidate = {
      categoryName,
      description,
      imageFile,
      // selectedPromotions,
      // selectedProduct,
    };

    try {
      // Validate using Yup
      await addCategoryValidationSchema.validate(dataToValidate, { abortEarly: false });
      setErrors({}); // Clear errors if validation passes

      const formData = new FormData();
      const categoryDTO = {
        name: categoryName,
        description,
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

      dispatch(categoryThunk.createCategory(formData));
      showAlert("Category added successfully.", "success");
      setActiveComponent({ name: "AdminCategory" });
    } catch (error) {
      if (error.name === "ValidationError") {
        // Map validation errors to the state
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Error adding category:", error);
        showAlert("Failed to add category.", "error");
      }
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
          error={!!errors.categoryName}
          helperText={errors.categoryName}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Description"
          name="description"
          value={description}
          onChange={handleDescriptionChange}
          error={!!errors.description}
          helperText={errors.description}
        />

        {/* <FormControl fullWidth margin="normal" error={!!errors.selectedPromotions}>
          <InputLabel id="promotion-select-label">Select Promotion</InputLabel>
          <Select
            labelId="promotion-select-label"
            value={selectedPromotions}
            onChange={handlePromotionChange}
            label="Select Promotion"
          >
            <MenuItem value={null}>None</MenuItem>
            {listPromotion.map((promotion) => (
              <MenuItem key={promotion.id} value={promotion.id}>
                {promotion.name}
              </MenuItem>
            ))}
          </Select>
          {errors.selectedPromotions && (
            <Typography variant="caption" color="error">
              {errors.selectedPromotions}
            </Typography>
          )}
        </FormControl> */}

        {/* <FormControl
          sx={{ display: !selectedPromotions ? "none" : "inline-flex" }}
          fullWidth
          margin="normal"
          variant="outlined"
        >
          <InputLabel id="product-select-label">Select Product</InputLabel>
          <Select
            labelId="product-select-label"
            value={selectedProduct}
            onChange={handleProductChange}
            label="Select Product"
            multiple
          >
            <MenuItem value={null}>None</MenuItem>
            {filterProducts.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.productName}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}

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
          error={!!errors.imageFile}
          helperText={errors.imageFile}
        />

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
