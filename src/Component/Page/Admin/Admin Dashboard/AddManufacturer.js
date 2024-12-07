import {
  Box,
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { manufacturerThunk } from "../../../../services/redux/thunks/thunk";
import { addManufacturerValidationSchema } from "../../../../services/yup/Admin/Manufacturer/addManufacturerValidation";
import "./assets/css/style.scss";

function AdminAddManufacturer({ setActiveComponent, showAlert }) {
  const isLoading = useSelector((state) => state.manufacturer.isLoading);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [createdAt, setCreatedAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);
  const [errors, setErrors] = useState({});
  const listProduct = useSelector((state) => state.product.listProduct);
  const dispatch = useDispatch();

  const handleProductChange = (e) => setSelectedProduct(e.target.value);
  const handleImageChange = (e) => setImageFile(e.target.files[0]);
  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const handleAdd = async () => {
    const dataToValidate = {
      name,
      country,
      website,
      description,
      email,
      phone,
      address,
      imageFile,
      selectedProduct,
    };

    try {
      // Validate using Yup
      await addManufacturerValidationSchema.validate(dataToValidate, {
        abortEarly: false,
      });
      setErrors({}); // Clear errors if validation is successful

      const formData = new FormData();

      const manufacturerDTO = {
        name,
        country,
        website,
        description,
        email,
        phone,
        address,
        createdAt: createdAt ? createdAt.toISOString().substring(0, 10) : null,
        updatedAt: updatedAt ? updatedAt.toISOString().substring(0, 10) : null,
        products: selectedProduct.map((id) => ({ id })),
      };

      formData.append(
        "manufacturer",
        new Blob([JSON.stringify(manufacturerDTO)], {
          type: "application/json",
        })
      );

      if (imageFile) {
        formData.append("file", imageFile);
      }

      await dispatch(manufacturerThunk.createManufacturer(formData));
      showAlert("Add new manufacturer successfully", "success");
      setActiveComponent({ name: "AdminManufacturer" });
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors); // Update errors state
      } else {
        console.error("Error adding manufacturer:", error);
        showAlert("Failed to add manufacturer.", "error");
      }
    }
  };

  const filterProducts = listProduct.filter(
    (item) => !item.manufacturer || !item.manufacturer.id
  );

  return (
    <Box sx={{ padding: 4 }}>
      <h2>Add Manufacturer</h2>
      <form id="editForm">
        <FormControl fullWidth margin="normal" variant="outlined">
          <InputLabel id="product-select-label">Select Product</InputLabel>
          <Select
            labelId="product-select-label"
            value={selectedProduct}
            onChange={handleProductChange}
            label="Select Product"
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
              <MenuItem disabled value="">
                No products available
              </MenuItem>
            )}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Name"
          value={name}
          onChange={handleInputChange(setName)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Country"
          value={country}
          onChange={handleInputChange(setCountry)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Website"
          value={website}
          onChange={handleInputChange(setWebsite)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          value={description}
          onChange={handleInputChange(setDescription)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={email}
          onChange={handleInputChange(setEmail)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone"
          value={phone}
          onChange={handleInputChange(setPhone)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          value={address}
          onChange={handleInputChange(setAddress)}
        />

        <TextField
          fullWidth
          margin="normal"
          type="date"
          label="Created At"
          InputLabelProps={{ shrink: true }}
          value={createdAt ? createdAt.toISOString().substring(0, 10) : ""}
          onChange={(e) => setCreatedAt(new Date(e.target.value))}
        />

        <TextField
          fullWidth
          margin="normal"
          type="date"
          label="Updated At"
          InputLabelProps={{ shrink: true }}
          value={updatedAt ? updatedAt.toISOString().substring(0, 10) : ""}
          onChange={(e) => setUpdatedAt(new Date(e.target.value))}
        />

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
          onClick={handleAdd}
          disabled={isLoading}
        >
          Add Manufacturer
        </Button>
      </form>
    </Box>
  );
}

export default AdminAddManufacturer;
