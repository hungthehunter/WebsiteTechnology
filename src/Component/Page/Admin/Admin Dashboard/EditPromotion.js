import {
  Box,
  Button,
  Card,
  CardMedia,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { promotionThunk } from "../../../../services/redux/thunks/thunk";
import "./assets/css/style.scss";
import LoadingOverlay from "./overlay/LoadingOverlay";

function AdminEditPromotion({ id, setActiveComponent, showAlert }) {
  const isLoading = useSelector((state) => state.promotion.isLoading);
  const theme = useTheme();
  const [promotion, setPromotion] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null); // Ảnh mới
  const dispatch = useDispatch();

  const selectedPromotion = useSelector(
    (state) => state.promotion.selectedPromotion
  );

  const products = useSelector((state) => state.product.listProduct);
  const categories = useSelector((state) => state.category.listCategory);

  useEffect(() => {
    dispatch(promotionThunk.getPromotionById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedPromotion) {
      setPromotion(selectedPromotion);
      setSelectedProducts(
        selectedPromotion?.applicableProducts?.map((product) => product.id)
      );
      setSelectedCategories(
        selectedPromotion?.applicableCategories?.map((category) => category.id)
      );
    }
  }, [selectedPromotion]);

  const handleInputChange = (field) => (e) => {
    setPromotion((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleProductChange = (e) => {
    const value = e.target.value;
    setSelectedProducts(typeof value === "string" ? value.split(",") : value);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const updatedPromotion = {
      ...promotion,
      applicableProducts: selectedProducts?.map((id) => ({ id })),
      applicableCategories: selectedCategories?.map((id) => ({ id })),
    };

    formData.append(
      "promotion",
      new Blob([JSON.stringify(updatedPromotion)], { type: "application/json" })
    );

    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      await dispatch(
        promotionThunk.updatePromotion({
          id: selectedPromotion.id,
          promotionData: formData,
        })
      );
      showAlert("Promotion updated successfully", "success");
      setActiveComponent({ name: "AdminPromotion" });
    } catch (error) {
      console.error("Error updating promotion:", error);
      showAlert("Failed to update promotion.", "error");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      {isLoading && (
        <LoadingOverlay isLoading={isLoading} message="Loading..." />
      )}
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Edit Promotion
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Thông tin cơ bản */}
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          value={promotion.name || ""}
          onChange={handleInputChange("name")}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          value={promotion.description || ""}
          onChange={handleInputChange("description")}
        />
        <TextField
          fullWidth
          margin="normal"
          type="number"
          label="Discount Percentage"
          value={promotion.discountPercentage || ""}
          onChange={handleInputChange("discountPercentage")}
        />
        <TextField
          fullWidth
          margin="normal"
          type="datetime-local"
          label="Start Date"
          InputLabelProps={{ shrink: true }}
          value={promotion.startDate || ""}
          onChange={handleInputChange("startDate")}
        />
        <TextField
          fullWidth
          margin="normal"
          type="datetime-local"
          label="End Date"
          InputLabelProps={{ shrink: true }}
          value={promotion.endDate || ""}
          onChange={handleInputChange("endDate")}
        />

        {/* Hình ảnh */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Current Promotion Banner</Typography>
            <Card
              sx={{
                maxWidth: 400,
                marginTop: 2,
                border: `1px solid ${theme.palette.divider}`,
              }}
            >
              <CardMedia
                component="img"
                image={
                  imageFile
                    ? URL.createObjectURL(imageFile) // Hiển thị ảnh mới nếu có
                    : promotion?.imageCloud?.url // Hiển thị ảnh hiện tại từ imageCloud
                }
                alt="Promotion Banner"
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              type="file"
              fullWidth
              margin="normal"
              label="Upload New Banner"
              InputLabelProps={{ shrink: true }}
              inputProps={{ accept: "image/*" }}
              onChange={handleImageChange}
            />
          </Grid>
        </Grid>

        {/* Các sản phẩm và danh mục áp dụng */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="product-select-label">Applicable Products</InputLabel>
          <Select
            labelId="product-select-label"
            multiple
            value={selectedProducts}
            onChange={handleProductChange}
            renderValue={(selected) =>
              products
                ?.filter((product) => selected?.includes(product.id))
                .map((product) => product?.productName)
                .join(", ")
            }
          >
            {products?.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.productName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-select-label">
            Applicable Categories
          </InputLabel>
          <Select
            labelId="category-select-label"
            multiple
            value={selectedCategories}
            onChange={handleCategoryChange}
            renderValue={(selected) =>
              categories
                ?.filter((category) => selected?.includes(category.id))
                .map((category) => category?.name)
                .join(", ")
            }
          >
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Nút lưu và quay lại */}
        <Box sx={{ marginTop: 4 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginRight: 2 }}
            disabled={isLoading}
          >
            Update Promotion
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setActiveComponent({ name: "AdminPromotion" })}
            disabled={isLoading}
          >
            Return to Promotion List
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default AdminEditPromotion;
