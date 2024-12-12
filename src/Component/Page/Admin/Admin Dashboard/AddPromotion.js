import {
  Box,
  Button,
  InputAdornment,
  TextField
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { promotionThunk } from "../../../../services/redux/thunks/thunk";

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
  // const [selectedProducts, setSelectedProducts] = useState([]);
  // const [selectedCategories, setSelectedCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  // const [filterProducts, setFilterProducts] = useState(listProducts.filter((item) => !item.promotion || !item.promotion.id))

  const handleInputChange = (setter) => (e) => setter(e.target.value);
  const handleImageChange = (e) => setImageFile(e.target.files[0]);

  const handleAddPromotion = async () => {
    const formData = new FormData();

    const promotionDTO = {
      name: promotionName,
      description,
      discountPercentage: parseFloat(discountPercentage),
      startDate,
      endDate,
      // applicableProducts: selectedProducts.map((id) => ({ id })),
      // applicableCategories: selectedCategories.map((id) => ({ id })),
    };

    formData.append(
      "promotion",
      new Blob([JSON.stringify(promotionDTO)], { type: "application/json" })
    );

    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      // await addPromotionValidationSchema.validate(formData, { abortEarly: false });
      await dispatch(promotionThunk.createPromotion(formData));
      showAlert("Promotion added successfully.", "success");
      setActiveComponent({ name: "AdminPromotion" });
    } catch (error) {
      console.error("Error adding promotion:", error);
      showAlert("Failed to add promotion.", "error");
    }
  };
  
  // useEffect(() => {
  //   filtProduct();
  // }, [selectedCategories])

  // const filtProduct = () => {
  //   const available = listProducts.filter((item) => !item.promotion || !item.promotion.id);
  //   let products = [...available];
  //   let current = [...selectedProducts];

  //   if (selectedCategories.length == 0) {
  //     setFilterProducts(available);
  //     return;
  //   }

  //   for (let categoryId of selectedCategories){
  //     let category = listCategories.find((item) => item.id === categoryId);
  //     if (!category || !category.products) continue;

  //     category.products?.forEach((item) => {
  //       products = products.filter((product) => product.id !== item.id);
  //       current = current.filter((productId) => productId === item.id);
  //     })
  //   }

  //   setFilterProducts(products);
  //   setSelectedProducts(current);
  // }

  // const filterCategories = listCategories.filter((item) => !item.promotion || !item.promotion.id);

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
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={handleInputChange(setDescription)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Discount Percentage"
          type="number"
          value={discountPercentage}
          onChange={handleInputChange(setDiscountPercentage)}
        />
        <TextField
          fullWidth
          margin="normal"
          type="datetime-local"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={handleInputChange(setStartDate)}
        />
        <TextField
          fullWidth
          margin="normal"
          type="datetime-local"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={handleInputChange(setEndDate)}
        />

        {/* <FormControl fullWidth margin="normal">
          <InputLabel id="product-select-label">Select Products</InputLabel>
          <Select
            labelId="product-select-label"
            value={selectedProducts}
            onChange={(e) => setSelectedProducts(e.target.value)}
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
              <MenuItem disabled>No products available</MenuItem>
            )}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel id="category-select-label">Select Categories</InputLabel>
          <Select
            labelId="category-select-label"
            value={selectedCategories}
            onChange={(e) => setSelectedCategories(e.target.value)}
            multiple
          >
            <MenuItem value={null}>None</MenuItem>
            {filterCategories.length > 0 ? (
              filterCategories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No categories available</MenuItem>
            )}
          </Select>
        </FormControl> */}

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
