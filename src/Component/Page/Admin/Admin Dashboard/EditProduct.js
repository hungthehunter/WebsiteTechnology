import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import imageCompression from "browser-image-compression";
import React, { useEffect, useState } from "react";
import { getAllCategory, getAllManufacturer, getProductById } from "../../../Serivce/ApiService";
import "./assets/css/style.scss";

function AdminEditProduct({ id, setActiveComponent, showAlert }) {
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

  const [product, setProduct] = useState({
    unitPrice: "",
    unitInStock: "",
    unitInOrder: "",
    productName: "",
    status: "Available",
    manufacturer: { id: "" },
    specification: defaultSpecifications,
    product_image: [], // Thêm trường cho hình ảnh sản phẩm
  });
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newManufacturer, setNewManufacturer] = useState("");
  const [files, setFiles] = useState([]);
  const [mainFile, setMainFile] = useState(null);
  const [clonedImages, setClonedImages] = useState([]); // Biến để lưu hình ảnh cũ

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
      setClonedImages(response.data.product_image); // Lưu hình ảnh cũ vào biến clone
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
      const response = await getAllManufacturer();
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
          console.log(`Compressed file size: ${compressedSizeMB.toFixed(2)} MB`);

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

    // Prepare product data
    const updatedProduct = {
      unitPrice: product.unitPrice,
      unitInStock: product.unitInStock,
      unitInOrder: product.unitInOrder,
      productName: product.productName,
      status: product.status,
      manufacturer: { id: manufacturerId },
      specification: product.specification || [],
    };

    // Create FormData to send to the server
    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(updatedProduct)], { type: "application/json" })
    );

    // Append the main image if it exists
    if (mainFile) {
      formData.append("mainImage", mainFile);
    }

    // Kết hợp hình ảnh cũ và hình ảnh mới
    const combinedImages = [...clonedImages, ...files];
    combinedImages.forEach((image) => {
      formData.append("images", image); // Append all images (old + new)
    });

    try {
      // Gửi yêu cầu cập nhật sản phẩm
      const response = await axios.put(
        `http://localhost:8080/api/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        showAlert("Edit product successfully.", "success");
        setTimeout(() => setActiveComponent({ name: "AdminProduct" }), 1000);
      }
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
            {/* Specifications */}
            {product.specification.map((spec, index) => (
              <Grid item xs={12} md={6} key={index}>
                <TextField
                  fullWidth
                  label="Specification Name"
                  value={spec.specificationName}
                  onChange={(e) => {
                    const newSpecifications = [...product.specification];
                    newSpecifications[index].specificationName = e.target.value;
                    setProduct({ ...product, specification: newSpecifications });
                  }}
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
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  accept: "image/*",
                }}
                onChange={handleMainImageChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="file"
                fullWidth
                margin="normal"
                label="Additional Images"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  multiple: true,
                }}
                onChange={handleFilesChange}
              />
            </Grid>
            {/* Display Existing Images */}
            <Grid item xs={12}>
              <Typography variant="h6">Existing Images</Typography>
              <Grid container spacing={2}>
                {clonedImages &&
                  clonedImages.map((image, index) => (
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