import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import imageCompression from "browser-image-compression";
import React, { useEffect, useState } from "react";
import { getAllCategory, getAllManufacturer, getProductById } from "../../../Serivce/ApiService";
import "./assets/css/style.scss";

function AdminEditProduct({ id, setActiveComponent ,showAlert}) {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newManufacturer, setNewManufacturer] = useState("");
  const [files, setFiles] = useState([]);
  const [mainFile, setMainFile] = useState(null);

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  useEffect(() => {
    loadProduct();
    loadCategories();
    loadManufacturers();
  }, []);

  const loadProduct = async () => {
    try {
      const response = await getProductById(id);
      setProduct(response.data);
      setSelectedCategory(response.data.category.id);
      setSelectedManufacturer(response.data.manufacturer.id);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await getAllCategory();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const loadManufacturers = async () => {
    try {
      const response = await getAllManufacturer()
      setManufacturers(response.data);
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
    }
  };

  const handleMainImageChange = async (event) => {
    const file = event.target.files[0];

    if (file && file.size <= MAX_FILE_SIZE) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        setMainFile(compressedFile);
      } catch (error) {
        console.error("Error during main image compression:", error);
      }
    } else {
      console.warn("Main image exceeds the size limit of 2MB.");
    }
  };

  const handleFilesChange = async (event) => {
    const fileList = event.target.files;
    const validFiles = [];

    for (const file of fileList) {
      const originalSizeMB = file.size / (1024 * 1024);
      console.log(`Original file size: ${originalSizeMB.toFixed(2)} MB`);

      if (originalSizeMB <= 2) {
        try {
          const options = {
            maxSizeMB: 1, // Maximum file size in MB
            maxWidthOrHeight: 1920, // Maximum width or height in px
            useWebWorker: true, // Use web workers for compression
          };

          const compressedFile = await imageCompression(file, options);
          const compressedSizeMB = compressedFile.size / (1024 * 1024);
          console.log(
            `Compressed file size: ${compressedSizeMB.toFixed(2)} MB`
          );

          validFiles.push(compressedFile);
        } catch (error) {
          console.error("Error during image compression:", error);
        }
      } else {
        console.warn(`${file.name} exceeds the size limit of 2MB.`);
      }
    }

    setFiles(validFiles);
  };

  const handleGeneralInfoChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setNewCategory(""); // Clear newCategory if an existing category is selected
  };

  const handleManufacturerChange = (e) => {
    setSelectedManufacturer(e.target.value);
    setNewManufacturer(""); // Clear newManufacturer if an existing manufacturer is selected
  };

  const handleUpdate = async () => {
    let categoryId = selectedCategory;
    let manufacturerId = selectedManufacturer;

    // Check if new category needs to be added
    if (newCategory) {
      const existingCategory = categories.find(
        (category) =>
          category.categoryName.toLowerCase() === newCategory.toLowerCase()
      );
      if (existingCategory) {
        categoryId = existingCategory.id;
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/categories",
          {
            categoryName: newCategory,
          }
        );
        categoryId = response.data.id;
        setCategories([...categories, response.data]);
      }
    }

    // Check if new manufacturer needs to be added
    if (newManufacturer) {
      const existingManufacturer = manufacturers.find(
        (manufacturer) =>
          manufacturer.manufacturerName.toLowerCase() ===
          newManufacturer.toLowerCase()
      );
      if (existingManufacturer) {
        manufacturerId = existingManufacturer.id;
      } else {
        const response = await axios.post(
          "http://localhost:8080/api/manufacturers",
          {
            manufacturerName: newManufacturer,
          }
        );
        manufacturerId = response.data.id;
        setManufacturers([...manufacturers, response.data]);
      }
    }

    // Prepare the product data
    const updatedProduct = {
      cpu: product.cpu,
      gpu: product.gpu,
      unitPrice: product.unitPrice,
      unitInStock: product.unitInStock,
      unitInOrder: product.unitInOrder,
      batteryCapacity: product.batteryCapacity,
      operatingSystem: product.operatingSystem,
      screen: product.screen,
      ram: product.ram,
      productName: product.productName,
      design: product.design,
      warrantyInformation: product.warrantyInformation,
      generalInformation: product.generalInformation,
      status: product.status,
      category: { id: categoryId },
      manufacturer: { id: manufacturerId },
      promotion: { id: product.promotion?.id || null }, // Ensure promotion is included
    };

    // Add files (images) to FormData
    const formData = new FormData();
    formData.append("product", 
      new Blob([JSON.stringify(updatedProduct)], { type: "application/json" })
    )

    // Add files (images) to FormData
    files.forEach((file) => {
      formData.append("images", file); 
    });

    // Append the main image
    formData.append("mainImage", mainFile);

    // Log the total number of files
    console.log(`Total number of files: ${files.length}`);

    try {
      // Update the product with new images
      const response = await axios.put(
        `http://localhost:8080/api/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure this is set for the request
          },
        }
      );

      if (response.status === 200) {
        showAlert("Edit product successfully.","success");
        setTimeout(()=>setActiveComponent({ name: "AdminProduct" }),1000);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      showAlert("Failed to edit product.","error");
    }
  };

  const handleDeleteImage = (index) => {
    const updatedList = product.product_image.filter((_, i) => i !== index);
    const updatedProduct = {
      ...product,
      product_image: updatedList,
    };
    setProduct(updatedProduct);
  };

  const handleDeleteMainImage = () => {
    const updatedProduct = {
      ...product,
      mainImage: null,
    };

    setProduct(updatedProduct);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <h2>Edit Product</h2>
      <form id="editForm">
        {/* General Information Fields */}
        <TextField
          fullWidth
          margin="normal"
          label="Product Name"
          name="productName"
          value={product.productName || ""}
          onChange={handleGeneralInfoChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Unit Price"
          name="unitPrice"
          type="number"
          value={product.unitPrice || ""}
          onChange={handleGeneralInfoChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Quantity in Stock"
          name="unitInStock"
          type="number"
          value={product.unitInStock || ""}
          onChange={handleGeneralInfoChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Quantity in Order"
          name="unitInOrder"
          type="number"
          value={product.unitInOrder || ""}
          onChange={handleGeneralInfoChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="CPU"
          name="cpu"
          value={product.cpu || ""}
          onChange={handleGeneralInfoChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="RAM"
          name="ram"
          value={product.ram || ""}
          onChange={handleGeneralInfoChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="GPU"
          name="gpu"
          value={product.gpu || ""}
          onChange={handleGeneralInfoChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Battery Capacity"
          name="batteryCapacity"
          value={product.batteryCapacity || ""}
          onChange={handleGeneralInfoChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Operating System"
          name="operatingSystem"
          value={product.operatingSystem || ""}
          onChange={handleGeneralInfoChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Screen"
          name="screen"
          value={product.screen || ""}
          onChange={handleGeneralInfoChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Design"
          name="design"
          value={product.design || ""}
          onChange={handleGeneralInfoChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Warranty Information"
          name="warrantyInformation"
          value={product.warrantyInformation || ""}
          onChange={handleGeneralInfoChange}
        />
        <TextField
          fullWidth
          margin="normal"
          label="General Information"
          name="generalInformation"
          value={product.generalInformation || ""}
          onChange={handleGeneralInfoChange}
        />

        {/* Category and Manufacturer Selection */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            onChange={handleCategoryChange}
            displayEmpty
          >
            <MenuItem value="null">
              None
            </MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
          {newCategory && (
            <TextField
              fullWidth
              margin="normal"
              label="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
          )}
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Manufacturer</InputLabel>
          <Select
            value={selectedManufacturer}
            onChange={handleManufacturerChange}
            displayEmpty
          >
            <MenuItem value="null">
              None
            </MenuItem>
            {manufacturers.map((manufacturer) => (
              <MenuItem key={manufacturer.id} value={manufacturer.id}>
                {manufacturer.name}
              </MenuItem>
            ))}
          </Select>
          {newManufacturer && (
            <TextField
              fullWidth
              margin="normal"
              label="New Manufacturer"
              value={newManufacturer}
              onChange={(e) => setNewManufacturer(e.target.value)}
            />
          )}
        </FormControl>

        {/* File Input for Images */}
        <TextField
          type="file"
          fullWidth
          margin="normal"
          label="Product Images"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            multiple: true,
          }}
          onChange={handleFilesChange}
        />

        <TextField
          type="file"
          fullWidth
          margin="normal"
          label="Main Product Image"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            accept: "image/*",
          }}
          onChange={handleMainImageChange}
        />

<Grid container spacing={2}>
  {/* Display Existing Images */}
  {product.product_image &&
    product.product_image
      .filter(image => !image.isMainImage) // Filter out main image
      .map((image, index) => (
        <Grid item xs={4} key={index}>
          <img
            src={image.url}
            alt={`Product Image ${index}`}
            style={{ width: "100%", height: "auto" }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleDeleteImage(index)}
          >
            Delete
          </Button>
        </Grid>
      ))}

  {/* Display Main Image */}
  {product.product_image &&
    product.product_image
      .filter(image => image.isMainImage) // Filter to get the main image
      .map((image, index) => (
        <Grid item xs={12} mt={2} key={index}>
          <Box>
            <img
              src={image.url} // Assuming `image.url` for main image
              alt="Main Product Image"
              style={{ width: "100%", height: "auto" }}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={handleDeleteMainImage}
              sx={{ mt: 2 }}
            >
              Delete Main Image
            </Button>
          </Box>
        </Grid>
      ))}
</Grid>


        {/* Save Changes */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpdate}
          sx={{ marginTop: 2 }}
        >
          Update Product
        </Button>
      </form>
    </Box>
  );
}

export default AdminEditProduct;
