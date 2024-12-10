import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { promotionThunk } from "../../../../services/redux/thunks/thunk";
import { addPromotionValidationSchema } from "../../../../services/yup/Admin/Promotion/addPromotionValidation";

function AdminAddPromotion({ setActiveComponent, showAlert }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.promotion.isLoading);
  const listProducts = useSelector((state) => state.product.listProduct);
  const listCategories = useSelector((state) => state.category.listCategory);

  const [promotionName, setPromotionName] = useState("");
  const [description, setDescription] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const [errors, setErrors] = useState({});
  const [filterProducts, setFilterProducts] = useState(listProducts.filter((item) => !item.promotion || !item.promotion.id));

  const handleInputChange = (setter) => (e) => setter(e.target.value);
  const handleImageChange = (e) => setImageFile(e.target.files[0]);

  const validateForm = () => {
    try {
      // Validate form data using Yup
      const formData = {
        promotionName,
        description,
        discountPercentage,
        startDate,
        endDate,
        applicableProducts: selectedProducts,
        applicableCategories: selectedCategories,
      };
      addPromotionValidationSchema.validateSync(formData, { abortEarly: false });
      return true;  // Valid form
    } catch (error) {
      // If validation fails, set errors
      const validationErrors = {};
      error.inner.forEach((err) => {
        validationErrors[err.path] = err.message;
      });
      setErrors(validationErrors);
      return false;  // Invalid form
    }
  };

  const handleAddPromotion = async () => {
    if (!validateForm()) return;  // Validate form before submission

    const formData = new FormData();
    const promotionDTO = {
      name: promotionName,
      description,
      discountPercentage: parseFloat(discountPercentage),
      startDate,
      endDate,
      applicableProducts: selectedProducts.map((id) => ({ id })),
      applicableCategories: selectedCategories.map((id) => ({ id })),
    };

    formData.append("promotion", new Blob([JSON.stringify(promotionDTO)], { type: "application/json" }));
    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      await dispatch(promotionThunk.createPromotion(formData));
      showAlert("Promotion added successfully.", "success");
      setActiveComponent({ name: "AdminPromotion" });
    } catch (error) {
      console.error("Error adding promotion:", error);
      showAlert("Failed to add promotion.", "error");
    }
  };

  useEffect(() => {
    const available = listProducts.filter((item) => !item.promotion || !item.promotion.id);
    setFilterProducts(available);
  }, [listProducts]);

  return (
    <Box sx={{ padding: 4 }}>
      <h2>Add New Promotion</h2>
      <form id="promotionForm">
        <TextField
          fullWidth
          margin="normal"
          label="Promotion Name"
          value={promotionName}
          onChange={handleInputChange(setPromotionName)}
          error={Boolean(errors.promotionName)}
          helperText={errors.promotionName}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={handleInputChange(setDescription)}
          error={Boolean(errors.description)}
          helperText={errors.description}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Discount Percentage"
          type="number"
          value={discountPercentage}
          onChange={handleInputChange(setDiscountPercentage)}
          error={Boolean(errors.discountPercentage)}
          helperText={errors.discountPercentage}
        />
        <TextField
          fullWidth
          margin="normal"
          type="datetime-local"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={handleInputChange(setStartDate)}
          error={Boolean(errors.startDate)}
          helperText={errors.startDate}
        />
        <TextField
          fullWidth
          margin="normal"
          type="datetime-local"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={handleInputChange(setEndDate)}
          error={Boolean(errors.endDate)}
          helperText={errors.endDate}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="product-select-label">Select Products</InputLabel>
          <Select
            labelId="product-select-label"
            value={selectedProducts}
            onChange={(e) => setSelectedProducts(e.target.value)}
            multiple
            error={Boolean(errors.applicableProducts)}
          >
            <MenuItem value={null}>None</MenuItem>
            {filterProducts.length > 0 ? (
              filterProducts.map((product) => (
                <MenuItem key={product.id} value={product.id}>
                  {product.productName}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No products available</MenuItem>
            )}
          </Select>
          {errors.applicableProducts && (
            <FormHelperText error>{errors.applicableProducts}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="category-select-label">Select Categories</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategories}
            onChange={(e) => setSelectedCategories(e.target.value)}
            multiple
            error={Boolean(errors.applicableCategories)}
          >
            <MenuItem value={null}>None</MenuItem>
            {listCategories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          {errors.applicableCategories && (
            <FormHelperText error>{errors.applicableCategories}</FormHelperText>
          )}
        </FormControl>

        <TextField
          type="file"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          inputProps={{ accept: "image/*" }}
          onChange={handleImageChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button variant="contained" component="span" disabled={isLoading}>
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
          onClick={handleAddPromotion}
          disabled={isLoading}
          sx={{ marginTop: 2 }}
        >
          Add Promotion
        </Button>
      </form>
    </Box>
  );
}

export default AdminAddPromotion;
