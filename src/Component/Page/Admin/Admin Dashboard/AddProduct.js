import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productThunk } from "../../../../services/redux/thunks/thunk";
import {
  productImageValidationSchema,
  productValidationSchema,
} from "../../../../services/yup/Admin/Product/productValidation";
import LoadingOverlay from "./overlay/LoadingOverlay";

const AdminAddProduct = ({ setActiveComponent, showAlert }) => {
  const [errors, setErrors] = useState({});

  const isLoading = useSelector((state) => state.product.isLoading);
  const defaultSpecifications = [
    { specificationName: "CPU", specificationData: "" },
    { specificationName: "RAM", specificationData: "" },
    { specificationName: "Hard Drive", specificationData: "" },
    { specificationName: "Graphics Card", specificationData: "" },
    { specificationName: "Screen", specificationData: "" },
    { specificationName: "Port", specificationData: "" },
    { specificationName: "Keyboard", specificationData: "" },
    { specificationName: "LAN", specificationData: "" },
    { specificationName: "Wireless", specificationData: "" },
    { specificationName: "Bluetooth", specificationData: "" },
    { specificationName: "Operating System", specificationData: "" },
    { specificationName: "Battery", specificationData: "" },
    { specificationName: "Weight", specificationData: "" },
    { specificationName: "Color", specificationData: "" },
    { specificationName: "Size", specificationData: "" },
    { specificationName: "Relationship", specificationData: "" },
  ];

  const [formData, setFormData] = useState({
    productName: "",
    cpu: "",
    gpu: "",
    unitPrice: "",
    unitInStock: "",
    unitInOrder: "",
    batteryCapacity: "",
    operatingSystem: "",
    screen: "",
    ram: "",
    design: "",
    warrantyInformation: "",
    generalInformation: "",
    status: true,
    category: {
      id: null,
    },
    manufacturer: {
      id: "",
    },
    promotion: {
      id: null,
    },
    specification: defaultSpecifications, // Khởi tạo với các specification mặc định
  });

  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [mainFile, setMainFile] = useState();
  const listCategory = useSelector((state) => state.category.listCategory);
  const listManufacturer = useSelector(
    (state) => state.manufacturer.listManufacturer
  );
  const listPromotion = useSelector((state) => state.promotion.listPromotion);

  const handleAddSpecification = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      specification: [
        ...prevFormData.specification,
        { specificationName: "", specificationData: "" },
      ],
    }));
  };

  const handleSpecificationChange = (index, field, value) => {
    const newSpecifications = [...formData.specification];
    newSpecifications[index] = {
      ...newSpecifications[index],
      [field]: value,
    };
    setFormData((prevFormData) => ({
      ...prevFormData,
      specification: newSpecifications,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: { id: value || null },
      }));
    } else if (name === "manufacturer") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        manufacturer: { id: value },
      }));
    } else if (name === "promotion") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        promotion: { id: value || null },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleMainImagesChange = (e) => {
    setMainFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();

    productData.append(
      "product",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );

    if (mainFile) {
      productData.append("mainImage", mainFile);
    }

    files.forEach((file) => {
      productData.append("images", file);
    });

    try {
      await productValidationSchema.validate(formData, { abortEarly: false });
      setErrors({});

      await productImageValidationSchema.validate(
        { mainImage: mainFile, additionalImage: files },
        { abortEarly: false }
      );

      dispatch(productThunk.createProduct(productData));
      dispatch(productThunk.getAllProduct());
      showAlert("Add product successfully.", "success");
      setErrors({});

      setTimeout(() => setActiveComponent({ name: "AdminProduct" }), 1000);
    } catch (error) {
      if (error.name === "ValidationError") {
        alertValidationError(error);
      } else {
        console.error("There was an error creating the product!", error);
        showAlert("Failed to add product.", "error");
      }
    }
  };

  const alertValidationError = (error) => {
    const validationErrors = error.inner.reduce((acc, err) => {
      acc[err.path] = err.message;
      return acc;
    }, {});
    setErrors(validationErrors);
    console.log(validationErrors);
    showAlert("Failed to add product. Check the information again", "error");
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      {isLoading && (
        <LoadingOverlay isLoading={isLoading} message="Loading..." />
      )}
      <Grid item xs={12} md={8}>
        <Card>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Typography variant="h5" gutterBottom>
                Add New Product
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Product Name"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    margin="normal"
                    error={!!errors.productName}
                    helperText={errors.productName}
                  />
                </Grid>
                {/* <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="CPU"
                    name="cpu"
                    value={formData.cpu}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid> */}
                {/* <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="GPU"
                    name="gpu"
                    value={formData.gpu}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid> */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Unit Price"
                    name="unitPrice"
                    type="number"
                    value={formData.unitPrice}
                    onChange={handleChange}
                    error={errors.unitPrice}
                    helperText={errors.unitPrice}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Unit In Stock"
                    name="unitInStock"
                    type="number"
                    value={formData.unitInStock}
                    error={errors.unitInStock}
                    helperText={errors.unitInStock}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Unit In Order"
                    name="unitInOrder"
                    type="number"
                    value={formData.unitInOrder}
                    error={errors.unitInOrder}
                    helperText={errors.unitInOrder}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                {/* <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Battery Capacity"
                    name="batteryCapacity"
                    value={formData.batteryCapacity}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid> */}
                {/* <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Operating System"
                    name="operatingSystem"
                    value={formData.operatingSystem}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid> */}
                {/* <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Screen"
                    name="screen"
                    value={formData.screen}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid> */}
                {/* <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="RAM"
                    name="ram"
                    value={formData.ram}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid> */}
                {/* <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Design"
                    name="design"
                    value={formData.design}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid> */}
                {/* <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Warranty Information"
                    name="warrantyInformation"
                    value={formData.warrantyInformation}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="General Information"
                    name="generalInformation"
                    value={formData.generalInformation}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid> */}

                {/* Category */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category.id || ""}
                      onChange={handleChange}
                      error={errors["category.id"]}
                    >
                      <MenuItem value="">None</MenuItem>
                      {listCategory.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={errors["category.id"]}>{errors["category.id"]}</FormHelperText>
                  </FormControl>
                </Grid>

                {/* Manufacturer */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Manufacturer</InputLabel>
                    <Select
                      name="manufacturer"
                      value={formData.manufacturer.id || ""}
                      onChange={handleChange}
                      error={errors["manufacturer.id"]}
                    >
                      {listManufacturer.map((manufacturer) => (
                        <MenuItem key={manufacturer.id} value={manufacturer.id}>
                          {manufacturer.name}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={errors["manufacturer.id"]}>{errors["manufacturer.id"]}</FormHelperText>
                  </FormControl>
                </Grid>

                {/* Promotion */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Promotion</InputLabel>
                    <Select
                      name="promotion"
                      value={formData.promotion.id || ""}
                      onChange={handleChange}
                    >
                      <MenuItem value="">None</MenuItem>
                      {listPromotion.map((promotion) => (
                        <MenuItem key={promotion.id} value={promotion.id}>
                          {promotion.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Specifications */}
                {formData.specification.map((spec, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <TextField
                      fullWidth
                      label="Specification Name"
                      value={spec.specificationName}
                      onChange={(e) =>
                        handleSpecificationChange(
                          index,
                          "specificationName",
                          e.target.value
                        )
                      }
                      margin="normal"
                      error={
                        errors[`specification[${index}].specificationName`]
                      }
                      helperText={
                        errors[`specification[${index}].specificationName`]
                      }
                    />
                    <TextField
                      fullWidth
                      label="Specification Data"
                      value={spec.specificationData}
                      onChange={(e) =>
                        handleSpecificationChange(
                          index,
                          "specificationData",
                          e.target.value
                        )
                      }
                      margin="normal"
                      error={
                        errors[`specification[${index}].specificationData`]
                      }
                      helperText={
                        errors[`specification[${index}].specificationData`]
                      }
                    />
                  </Grid>
                ))}

                <Grid item xs={12}>
                  <Button variant="outlined" onClick={handleAddSpecification}>
                    Add Specification
                  </Button>
                </Grid>

                {/* Main image */}
                <Grid item xs={12} md={6}>
                  <Typography variant="body1" gutterBottom>
                    Upload Main Image
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    disabled={isLoading}
                  >
                    Choose Main Image
                    <input
                      type="file"
                      hidden
                      onChange={handleMainImagesChange}
                    />
                  </Button>
                  <FormHelperText error={errors.mainImage}>{errors.mainImage}</FormHelperText>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="body1" gutterBottom>
                    Upload Additional Images
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    sx={{ marginBottom: 2 }}
                    disabled={isLoading}
                  >
                    Choose Files
                    <input
                      type="file"
                      hidden
                      multiple
                      onChange={handleFileChange}
                    />
                  </Button>
                  <FormHelperText error={errors.additionalImage}>{errors.additionalImage}</FormHelperText>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                  >
                    Add Product
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AdminAddProduct;
