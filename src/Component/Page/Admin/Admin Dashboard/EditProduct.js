import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedProductId } from "../../../../services/redux/slices/productSlice";
import { productThunk } from "../../../../services/redux/thunks/thunk";
import "./assets/css/style.scss";

function AdminEditProduct({ id, setActiveComponent, showAlert }) {
  const isLoading = useSelector((state) => state.product.isLoading);
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const listCategory = useSelector((state) => state.category.listCategory);
  const listManufacturer = useSelector(
    (state) => state.manufacturer.listManufacturer
  );
  const listPromotion = useSelector((state) => state.promotion.listPromotion);
  const [mainFile, setMainFile] = useState();
  const [product, setProduct] = useState({
    unitPrice: "",
    unitInStock: "",
    unitInOrder: "",
    productName: "",
    status: "Available",
    manufacturer: { id: "" },
    specification: [],
    product_image: [],
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newManufacturer, setNewManufacturer] = useState("");
  const [files, setFiles] = useState([]);
  const [clonedImages, setClonedImages] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    
    dispatch(productThunk.getProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProduct({
        ...selectedProduct,
        manufacturer: { id: selectedProduct.manufacturer.id },
        specification: selectedProduct.specification || [],
      });
      setClonedImages(selectedProduct.product_image || []); // Set existing images
    }
  }, [selectedProduct]);

  const handleFilesChange = (event) => {
    const fileList = event.target.files;
    setFiles([...fileList]); // Set files directly without compression
  };

  const handleMainImagesChange = (e) => {
    setMainFile(e.target.files[0]);
  };

  const validateFields = () => {
    let tempErrors = {};
    if (!product.productName)
      tempErrors.productName = "Product Name is required";
    if (!product.unitPrice) tempErrors.unitPrice = "Unit Price is required";
    if (!product.unitInStock)
      tempErrors.unitInStock = "Unit In Stock is required";
    if (!product.unitInOrder)
      tempErrors.unitInOrder = "Unit In Order is required";
    if (!selectedManufacturer)
      tempErrors.selectedManufacturer = "Manufacturer is required";
    if (!selectedCategory) tempErrors.selectedCategory = "Category is required";
     if (!mainFile) tempErrors.mainFile = "Main product image is required";
  if (files.length === 0 && clonedImages.length === 0) tempErrors.additionalImages = "At least one additional image is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateFields()) {
      showAlert("Please fill in all required fields.", "error");
      return;
    }

    let categoryId = selectedCategory;
    let manufacturerId = selectedManufacturer;

    // Check for new category
    if (newCategory) {
      const existingCategory = listCategory.find(
        (category) =>
          category.categoryName.toLowerCase() === newCategory.toLowerCase()
      );
      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/categories",
          { categoryName: newCategory }
        );
        categoryId = response.data.id;
      }
    }

    // Check for new manufacturer
    if (newManufacturer) {
      const existingManufacturer = listManufacturer.find(
        (manufacturer) =>
          manufacturer.manufacturerName.toLowerCase() ===
          newManufacturer.toLowerCase()
      );
      if (existingManufacturer) {
        manufacturerId = existingManufacturer.id;
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/manufacturers",
          { manufacturerName: newManufacturer }
        );
        manufacturerId = response.data.id;
      }
    }

    // Prepare product data
    const updatedProduct = {
      ...product,
      manufacturer: { id: manufacturerId },
      product_image: [...clonedImages, ...files], // Combine existing and new images
    };

    // Create FormData to send to the server
    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(updatedProduct)], { type: "application/json" })
    );

    if (mainFile) {
      formData.append("mainImage", mainFile);
    }

    // Append new images
    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      await dispatch(
        productThunk.updateProduct({ id: id, productData: formData })
      );
      showAlert("Edit product successfully.", "success");
      dispatch(clearSelectedProductId());
      setTimeout(() => setActiveComponent({ name: "AdminProduct" }), 1000);
    } catch (error) {
      console.error("Error updating product:", error);
      showAlert("Failed to edit product.", "error");
    }
  };

  const handleRemoveImage = (index) => {
    setClonedImages(clonedImages.filter((_, imgIndex) => imgIndex !== index));
  };

  const handleRemoveSpecification = (index) => {
    setProduct({
      ...product,
      specification: product.specification.filter(
        (_, specIndex) => specIndex !== index
      ),
    });
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
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Edit Product
      </Typography>
      <Card>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Product Name"
                name="productName"
                value={product.productName}
                onChange={(e) =>
                  setProduct({ ...product, productName: e.target.value })
                }
                error={!!errors.productName}
                helperText={errors.productName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Unit Price"
                name="unitPrice"
                type="number"
                value={product.unitPrice || ""}
                onChange={(e) =>
                  setProduct({ ...product, unitPrice: e.target.value })
                }
                error={!!errors.unitPrice}
                helperText={errors.unitPrice}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Unit In Stock"
                name="unitInStock"
                type="number"
                value={product.unitInStock || ""}
                onChange={(e) =>
                  setProduct({ ...product, unitInStock: e.target.value })
                }
                error={!!errors.unitInStock}
                helperText={errors.unitInStock}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                margin="normal"
                label="Unit In Order"
                name="unitInOrder"
                type="number"
                value={product.unitInOrder || ""}
                onChange={(e) =>
                  setProduct({ ...product, unitInOrder: e.target.value })
                }
                error={!!errors.unitInOrder}
                helperText={errors.unitInOrder}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                margin="normal"
                error={!!errors.selectedManufacturer}
              >
                <InputLabel>Manufacturer</InputLabel>
                <Select
                  value={selectedManufacturer}
                  onChange={(e) => {
                    setSelectedManufacturer(e.target.value);
                    setProduct({
                      ...product,
                      manufacturer: { id: e.target.value },
                    });
                  }}
                >
                  {listManufacturer.map((manufacturer) => (
                    <MenuItem key={manufacturer.id} value={manufacturer.id}>
                      {manufacturer.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.selectedManufacturer && (
                <Typography color="error">
                  {errors.selectedManufacturer}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl
                fullWidth
                margin="normal"
                error={!!errors.selectedCategory}
              >
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setProduct({
                      ...product,
                      category: { id: e.target.value },
                    });
                  }}
                >
                  {listCategory.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.selectedCategory && (
                <Typography color="error">{errors.selectedCategory}</Typography>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Promotion</InputLabel>
                <Select
                  value={selectedPromotion}
                  onChange={(e) => {
                    setSelectedPromotion(e.target.value);
                    setProduct({
                      ...product,
                      promotion: { id: e.target.value },
                    });
                  }}
                >
                  {listPromotion.map((promotion) => (
                    <MenuItem key={promotion.id} value={promotion.id}>
                      {promotion.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {product.specification.map((spec, index) => (
              <Grid item xs={12} key={index}>
                <TextField
                  fullWidth
                  label="Specification Name"
                  value={spec.specificationName}
                  onChange={(e) => {
                    const newSpecifications = [...product.specification];
                    newSpecifications[index].specificationName = e.target.value; // Thay đổi giá trị specificationName
                    setProduct({
                      ...product,
                      specification: newSpecifications,
                    });
                  }}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  label="Specification Data"
                  value={spec.specificationData}
                  onChange={(e) => {
                    const newSpecifications = [...product.specification];
                    newSpecifications[index].specificationData = e.target.value;
                    setProduct({
                      ...product,
                      specification: newSpecifications,
                    });
                  }}
                  margin="normal"
                />
                <IconButton
                  color="error"
                  onClick={() => handleRemoveSpecification(index)}
                >
                  <Delete />
                </IconButton>
              </Grid>
            ))}

            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={() => {
                  const newSpecifications = [
                    ...product.specification,
                    { specificationName: "", specificationData: "" },
                  ];
                  setProduct({ ...product, specification: newSpecifications });
                }}
              >
                Add Specification
              </Button>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="file"
                fullWidth
                margin="normal"
                label="Main Product Image ( 1 image only)"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: "image/*" }}
                error={!!errors.mainFile}
                helperText={errors.mainFile}
                onChange={handleMainImagesChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="file"
                fullWidth
                margin="normal"
                label="Additional Images (at least 2 image and less than 5 image)"
                InputLabelProps={{ shrink: true }}
                inputProps={{ multiple: true }}
                error={!!errors.additionalImages}
                helperText={errors.additionalImages}
                onChange={handleFilesChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Existing Images</Typography>
              <Grid container spacing={2}>
                {clonedImages.map((image, index) => (
                  <Grid item xs={4} key={index}>
                    <div style={{ position: "relative" }}>
                      <img
                        src={image.url}
                        alt={`Product Image ${index}`}
                        style={{ width: "100%", height: "auto" }}
                      />
                      <IconButton
                        style={{ position: "absolute", top: 0, right: 0 }}
                        color="error"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Delete />
                      </IconButton>
                    </div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                sx={{ marginTop: 2 }}
              >
                Update Product
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => setActiveComponent({ name: "AdminProduct" })}
                sx={{ marginTop: 2, marginLeft: 2 }}
              >
                Return to AdminProduct
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AdminEditProduct;