import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedCategoryId } from "../../../../services/redux/slices/categorySlice";
import { categoryThunk } from "../../../../services/redux/thunks/thunk";
import { editCategoryValidationSchema } from "../../../../services/yup/Admin/Category/editCategoryValidation";
import "./assets/css/style.scss";
function AdminEditCategory({ id, setActiveComponent, showAlert }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedPromotions, setSelectedPromotions] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const listProduct = useSelector((state) => state.product.listProduct);
  const listPromotion = useSelector((state) => state.promotion.listPromotion);
  const selectedCategory = useSelector(
    (state) => state.category.selectedCategory
  );
  const isLoading = useSelector((state) => state.category.isLoading);

  useEffect(() => {
    dispatch(categoryThunk.getCategoryById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedCategory) {
      setCategoryName(selectedCategory.name || "");
      setDescription(selectedCategory.description || "");
      setSelectedProduct(
        selectedCategory.products?.map((product) => product.id) || []
      );
      setSelectedPromotions(selectedCategory.promotion?.id || null);
    }
  }, [selectedCategory]);

  const validateFields = async () => {
    try {
      const data = {
        categoryName,
        description,
        imageFile,
        selectedPromotions,
        selectedProduct,
      };
      await editCategoryValidationSchema.validate(data, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const tempErrors = {};
      validationErrors.inner.forEach((err) => {
        tempErrors[err.path] = err.message;
      });
      setErrors(tempErrors);
      return false;
    }
  };

  const handleSave = async (id) => {
    const isValid = await validateFields();
    if (!isValid) {
      showAlert("Please correct the errors before proceeding.", "error");
      return;
    }

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
      await dispatch(
        categoryThunk.updateCategory({ id: id, categoryData: formData })
      );
      showAlert("Category updated successfully.", "success");
      dispatch(clearSelectedCategoryId());
      setActiveComponent({ name: "AdminCategory" });
    } catch (error) {
      console.error("Error updating category:", error);
      showAlert("Failed to update category.", "error");
    }
  };

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
      <Grid container spacing={2}>
        <TextField
          fullWidth
          margin="normal"
          label="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          error={!!errors.categoryName}
          helperText={errors.categoryName}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={!!errors.description}
          helperText={errors.description}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="product-select-label">Select Product</InputLabel>
          <Select
            labelId="product-select-label"
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            label="Select Product"
            multiple
          >
            {listProduct.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.productName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="promotion-select-label">Select Promotion</InputLabel>
          <Select
            labelId="promotion-select-label"
            value={selectedPromotions}
            onChange={(e) => setSelectedPromotions(e.target.value)}
            label="Select Promotion"
          >
            <MenuItem value={null}>None</MenuItem>
            {listPromotion.map((promotion) => (
              <MenuItem key={promotion.id} value={promotion.id}>
                {promotion.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          type="file"
          fullWidth
          margin="normal"
          label="Category Image"
          InputLabelProps={{ shrink: true }}
          inputProps={{ accept: "image/*" }}
          onChange={(e) => setImageFile(e.target.files[0])}
          error={!!errors.imageFile}
          helperText={errors.imageFile}
        />
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
            sx={{ marginLeft: 2 }}
          >
            Return to Category
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminEditCategory;
