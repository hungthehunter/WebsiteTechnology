import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bannerThunk } from "../../../../../services/redux/thunks/thunk";
import LoadingOverlay from "../overlay/LoadingOverlay";

function AdminAddBanner({ setActiveComponent, showAlert }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.promotion.isLoading);

  // State cho Banner
  const [bannerName, setBannerName] = useState("");
  const [specifications, setSpecifications] = useState([
    { specificationName: "", specificationData: "" },
  ]);
  const [imageFile, setImageFile] = useState(null);

  const handleInputChange = (setter) => (e) => setter(e.target.value);
  const handleSpecificationChange = (index, field) => (e) => {
    const newSpecs = [...specifications];
    newSpecs[index][field] = e.target.value;
    setSpecifications(newSpecs);
  };

  const addSpecification = () => {
    setSpecifications([
      ...specifications,
      { specificationName: "", specificationData: "" },
    ]);
  };

  const removeSpecification = (index) => {
    const newSpecs = specifications.filter((_, i) => i !== index);
    setSpecifications(newSpecs);
  };

  const handleImageChange = (e) => setImageFile(e.target.files[0]);

  const handleAddBanner = async () => {
    const formData = new FormData();

    const bannerDTO = {
      name: bannerName,
      status: true,
      specification: specifications.filter(
        (spec) => spec.specificationName && spec.specificationData
      ),
    };

    formData.append(
      "banner",
      new Blob([JSON.stringify(bannerDTO)], { type: "application/json" })
    );

    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      await dispatch(bannerThunk.createBanner(formData));
      showAlert("Banner added successfully.", "success");
      setActiveComponent({ name: "AdminBanner" });
    } catch (error) {
      console.error("Error adding banner:", error);
      showAlert("Failed to add banner.", "error");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        Add New Banner
      </Typography>

      {/* Banner Name */}
      <TextField
        fullWidth
        margin="normal"
        label="Banner Name"
        value={bannerName}
        onChange={handleInputChange(setBannerName)}
      />

      {/* Specifications */}
      <Typography variant="h6" sx={{ mt: 2 }}>
        Specifications
      </Typography>
      {specifications.map((spec, index) => (
        <Grid container spacing={2} key={index} alignItems="center">
          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Specification Name"
              value={spec.specificationName}
              onChange={handleSpecificationChange(index, "specificationName")}
            />
          </Grid>
          <Grid item xs={5}>
            <TextField
              fullWidth
              label="Specification Data"
              value={spec.specificationData}
              onChange={handleSpecificationChange(index, "specificationData")}
            />
          </Grid>
          <Grid item xs={2}>
            <IconButton onClick={() => removeSpecification(index)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      <Button
        startIcon={<AddIcon />}
        onClick={addSpecification}
        sx={{ mt: 2 }}
        variant="outlined"
      >
        Add Specification
      </Button>

      {/* Image Upload */}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Upload Image
      </Typography>
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

      {/* Submit Button */}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleAddBanner}
        disabled={isLoading}
        sx={{ marginTop: 4 }}
      >
        Add Banner
      </Button>

      {isLoading && (
        <LoadingOverlay isLoading={isLoading} message="Please wait..." />
      )}
    </Box>
  );
}

export default AdminAddBanner;
