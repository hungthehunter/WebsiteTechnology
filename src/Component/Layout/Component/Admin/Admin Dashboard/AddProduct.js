import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AdminAddProduct = ({ setActiveComponent , showAlert }) => {
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
      id: "",
    },
    manufacturer: {
      id: "",
    },
    promotion: {
      id: "",
    },
  });

  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [files, setFiles] = useState([]);
  const [mainFile, setMainFile] = useState();
  const [extraImages, setExtraImages] = useState([]); // Extra images state

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
        console.error("Error fetching manufacturers", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "category") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: { id: value },
      }));
    } else if (name === "manufacturer") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        manufacturer: { id: value },
      }));
    } else if (name === "promotion") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        promotion: { id: value },
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

  const handleExtraImagesChange = (e) => {
    setExtraImages(Array.from(e.target.files));
  };

  // Append main image
  const handleMainImagesChange = (e) => {
    setMainFile(e.target.files[0]); // Lấy tệp đầu tiên làm main image
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    // Append product as JSON string
    formDataToSend.append(
      "product",
      new Blob([JSON.stringify(formData)], { type: "application/json" })
    );

    // Append main image
    if (mainFile) {
      formDataToSend.append("image", mainFile);
    }

    // Append images
    files.forEach((file) => {
      formDataToSend.append("images", file);
    });

    axios
      .post("http://localhost:8080/api/products", formDataToSend)
      .then((response) => {
        showAlert("Add product successfully.","success");
        setTimeout(() => setActiveComponent({ name: "AdminProduct" }), 1000);
      })
      .catch((error) => {
        console.error("There was an error creating the product!", error);
        showAlert("Failed to add product.","error");
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Typography variant="h4" gutterBottom>
        Add New Product
      </Typography>
      {[
        { label: "Product Name", name: "productName" },
        { label: "CPU", name: "cpu" },
        { label: "GPU", name: "gpu" },
        { label: "Unit Price", name: "unitPrice", type: "number" },
        { label: "Unit In Stock", name: "unitInStock", type: "number" },
        { label: "Unit In Order", name: "unitInOrder", type: "number" },
        { label: "Battery Capacity", name: "batteryCapacity" },
        { label: "Operating System", name: "operatingSystem" },
        { label: "Screen", name: "screen" },
        { label: "RAM", name: "ram" },
        { label: "Design", name: "design" },
        { label: "Warranty Information", name: "warrantyInformation" },
        { label: "General Information", name: "generalInformation" },
      ].map(({ label, name, type }) => (
        <TextField
          key={name}
          label={label}
          name={name}
          type={type || "text"}
          value={formData[name]}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      ))}
      <FormControl fullWidth margin="normal">
        <InputLabel>Category</InputLabel>
        <Select
          name="category" // Đặt tên là 'category'
          value={formData.category.id} // Sử dụng id
          onChange={handleChange}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.categoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Manufacturer</InputLabel>
        <Select
          name="manufacturer" // Đặt tên là 'manufacturer'
          value={formData.manufacturer.id} // Sử dụng id
          onChange={handleChange}
        >
          {manufacturers.map((manufacturer) => (
            <MenuItem key={manufacturer.id} value={manufacturer.id}>
              {manufacturer.manufacturerName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Promotion</InputLabel>
        <Select
          name="promotion" // Đặt tên là 'promotion'
          value={formData.promotion.id} // Sử dụng id
          onChange={handleChange}
        >
          {promotions.map((promotion) => (
            <MenuItem key={promotion.id} value={promotion.id}>
              {promotion.promotionName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <input type="file" onChange={handleMainImagesChange} />
      <input type="file" multiple onChange={handleFileChange} />
      <input type="file" multiple onChange={handleExtraImagesChange} />

      <Button type="submit" variant="contained" color="primary">
        Add Product
      </Button>
    </Box>
  );
};

export default AdminAddProduct;
