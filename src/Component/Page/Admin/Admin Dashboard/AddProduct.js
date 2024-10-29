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

const AdminAddProduct = ({ setActiveComponent, showAlert }) => {
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
    status: "Available",
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

  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [files, setFiles] = useState([]);
  const [mainFile, setMainFile] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching categories", error);
      });

    axios
      .get("http://localhost:8080/api/manufacturers")
      .then((response) => {
        setManufacturers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching manufacturers", error);
      });

    axios
      .get("http://localhost:8080/api/promotions")
      .then((response) => {
        setPromotions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching promotions", error);
      });
  }, []);

  const handleAddSpecification = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      specification: [...prevFormData.specification, { specificationName: "", specificationData: "" }],
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
    setMainFile(e.target.files[0]); // Lấy tệp đầu tiên làm main image
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    formDataToSend.append(
      "product",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );

    if (mainFile) {
      formDataToSend.append("mainImage", mainFile);
    }

    files.forEach((file) => {
      formDataToSend.append("images", file);
    });

    axios
      .post("http://localhost:8080/api/products", formDataToSend)
      .then((response) => {
        showAlert("Add product successfully.", "success");
        setTimeout(() => setActiveComponent({ name: "AdminProduct" }), 1000);
      })
      .catch((error) => {
        console.error("There was an error creating the product!", error);
        showAlert("Failed to add product.", "error");
      });
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
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
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="CPU"
                    name="cpu"
                    value={formData.cpu}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="GPU"
                    name="gpu"
                    value={formData.gpu}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Unit Price"
                    name="unitPrice"
                    type="number"
                    value={formData.unitPrice}
                    onChange={handleChange}
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
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Battery Capacity"
                    name="batteryCapacity"
                    value={formData.batteryCapacity}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Operating System"
                    name="operatingSystem"
                    value={formData.operatingSystem}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Screen"
                    name="screen"
                    value={formData.screen}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="RAM"
                    name="ram"
                    value={formData.ram}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Design"
                    name="design"
                    value={formData.design}
                    onChange={handleChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
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
                </Grid>

                {/* Category */}
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={formData.category.id || ""}
                      onChange={handleChange}
                    >
                      <MenuItem value="">None</MenuItem>
                      {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                          {category.name}
                        </MenuItem>
                      ))}
                    </Select>
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
                    >
                      {manufacturers.map((manufacturer) => (
                        <MenuItem key={manufacturer.id} value={manufacturer.id}>
                          {manufacturer.name}
                        </MenuItem>
                      ))}
                    </Select>
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
                      {promotions.map((promotion) => (
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
                      onChange={(e) => handleSpecificationChange(index, 'specificationName', e.target.value)}
                      margin="normal"
                    />
                    <TextField
                      fullWidth
                      label="Specification Data"
                      value={spec.specificationData}
                      onChange={(e) => handleSpecificationChange(index, 'specificationData', e.target.value)}
                      margin="normal"
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
                  >
                    Choose Main Image
                    <input
                      type="file"
                      hidden
                      onChange={handleMainImagesChange}
                    />
                  </Button>
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
                  >
                    Choose Files
                    <input
                      type="file"
                      hidden
                      multiple
                      onChange={handleFileChange}
                    />
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary">
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