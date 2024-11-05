import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
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
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.product.selectedProduct);
  const listCategory = useSelector((state) => state.category.listCategory);
  const listManufacturer = useSelector((state) => state.manufacturer.listManufacturer);
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
  

  const handleUpdate = async () => {
    let categoryId = selectedCategory;
    let manufacturerId = selectedManufacturer;

    // Check for new category
    if (newCategory) {
      const existingCategory = listCategory.find(
        (category) => category.categoryName.toLowerCase() === newCategory.toLowerCase()
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
        (manufacturer) => manufacturer.manufacturerName.toLowerCase() === newManufacturer.toLowerCase()
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
        await dispatch(productThunk.updateProduct({id: id , productData: formData}))
        showAlert("Edit product successfully.", "success");
        dispatch(clearSelectedProductId());
        setTimeout(() => setActiveComponent({ name: "AdminProduct" }), 1000);

    } catch (error) {
      console.error("Error updating product:", error);
      showAlert("Failed to edit product.", "error");
    }
  };

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
                onChange={(e) => setProduct({ ...product, productName: e.target.value })}
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
                onChange={(e) => setProduct({ ...product, unitPrice: e.target.value })}
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
                onChange={(e) => setProduct({ ...product, unitInStock: e.target.value })}
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
                onChange={(e) => setProduct({ ...product, unitInOrder: e.target.value })}
              />
            </Grid>
              {/* Manufacturer Selection */}
              <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Manufacturer</InputLabel>
                <Select
                  value={selectedManufacturer}
                  onChange={(e) => {
                    setSelectedManufacturer(e.target.value);
                    setProduct({ ...product, manufacturer: { id: e.target.value } });
                  }}
                >
                  {listManufacturer.map((manufacturer) => (
                    <MenuItem key={manufacturer.id} value={manufacturer.id}>
                      {manufacturer.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Category Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setProduct({ ...product, category: { id: e.target.value } });
                  }}
                >
                  {listCategory.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {/* Promotion Selection */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Promotion</InputLabel>
                <Select
                  value={selectedPromotion}
                  onChange={(e) => {
                    setSelectedPromotion(e.target.value);
                    setProduct({ ...product, promotion: { id: e.target.value } });
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
            {/* Specifications */}
            {product.specification.map((spec, index) => (
              <Grid item xs={12} md={6} key={index}>
                <TextField
                  fullWidth
                  label="Specification Name"
                  value={spec.specificationName}
                  margin="normal"
                  disabled // Disable the default specification name field
                />
                <TextField
                  fullWidth
                  label="Specification Data"
                  value={spec.specificationData}
                  onChange={(e) => {
                    const newSpecifications = [...product.specification];
                    newSpecifications[index].specificationData = e.target.value;
                    setProduct({ ...product, specification: newSpecifications });
                  }}
                  margin="normal"
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button variant="outlined" onClick={() => {
                const newSpecifications = [...product.specification, { specificationName: "", specificationData: "" }];
                setProduct({ ...product, specification: newSpecifications });
              }}>
                Add Specification
              </Button>
            </Grid>
            {/* File Input for Images */}
            <Grid item xs={12}>
              <TextField
                type="file"
                fullWidth
                margin="normal"
                label="Main Product Image"
                InputLabelProps={{ shrink: true }}
                inputProps={{ accept: "image/*" }}
                onChange={handleMainImagesChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="file"
                fullWidth
                margin="normal"
                label="Additional Images"
                InputLabelProps={{ shrink: true }}
                inputProps={{ multiple: true }}
                onChange={handleFilesChange}
              />
            </Grid>
            {/* Display Existing Images */}
            <Grid item xs={12}>
              <Typography variant="h6">Existing Images</Typography>
              <Grid container spacing={2}>
                {clonedImages.map((image, index) => (
                  <Grid item xs={4} key={index}>
                    <img
                      src={image.url}
                      alt={`Product Image ${index}`}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            {/* Save Changes */}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdate}
                sx={{ marginTop: 2 }}
              >
                Update Product
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AdminEditProduct;
