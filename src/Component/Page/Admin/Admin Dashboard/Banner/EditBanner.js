import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Grid,
  IconButton,
  TextField,
  Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bannerThunk } from "../../../../../services/redux/thunks/thunk";
import { editValidationschema } from "../../../../../services/yup/Admin/Banner/editValidationForm";
import LoadingOverlay from "../overlay/LoadingOverlay";

function AdminEditBanner({ id, setActiveComponent, showAlert }) {
  const isLoading = useSelector((state) => state.banner.isLoading);
  const dispatch = useDispatch();
  const selectedBanner = useSelector((state) => state.banner.selectedBanner); // Giả định API trả về banner

  const [banner, setBanner] = useState({
    id: "",
    status: true,
    name: "",
    specification: [],
    imageCloud: {
      id: "",
      public_id: "",
      url: "",
      format: "",
      mainImage: true,
    },
  });

  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  // Fetch banner by ID
  useEffect(() => {
    dispatch(bannerThunk.getBannerById(id));
  }, [dispatch, id]);

  // Update state from selectedBanner
  useEffect(() => {
    if (selectedBanner) {
      setBanner(selectedBanner);
    }
  }, [selectedBanner]);

  // Handle Input Change
  const handleInputChange = (field) => (e) => {
    setBanner((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Handle Specification Change
  const handleSpecificationChange = (index, field) => (e) => {
    setBanner((prev) => ({
      ...prev,
      specification: prev.specification.map((spec, i) =>
        i === index ? { ...spec, [field]: e.target.value } : spec
      ),
    }));
  };
  

  // Add Specification
  const handleAddSpecification = () => {
    setBanner((prev) => ({
      ...prev,
      specification: [
        ...prev.specification,
        { id: Date.now(), specificationName: "", specificationData: "" },
      ],
    }));
  };

  // Remove Specification
  const handleRemoveSpecification = (index) => {
    const updatedSpecs = [...banner.specification];
    updatedSpecs.splice(index, 1);
    setBanner((prev) => ({ ...prev, specification: updatedSpecs }));
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  // Validate Form
  const validateForm = async () => {
    try {
      await editValidationschema.validate(banner, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  // Submit Form
  const handleSubmit = async () => {
    const isValid = await validateForm();
    if (!isValid) return
    (
      <div>no that no</div>
    )
    ;


    const formData = new FormData();
    const updatedBanner = { ...banner };

    formData.append(
      "banner",
      new Blob([JSON.stringify(updatedBanner)], { type: "application/json" })
    );

    if (imageFile) {
      formData.append("file", imageFile);
    }

    try {
      await dispatch(
        bannerThunk.updateBanner({
          id: banner.id,
          bannerData: formData,
        })
      );
      showAlert("Banner updated successfully", "success");
      setActiveComponent({ name: "AdminBanner" });
    } catch (error) {
      console.error("Error updating banner:", error);
      showAlert("Failed to update banner.", "error");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      {isLoading && (
        <LoadingOverlay isLoading={isLoading} message="Loading..." />
      )}
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Edit Banner
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {/* Basic Info */}
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          value={banner.name || ""}
          onChange={handleInputChange("name")}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Status"
          value={banner.status || ""}
          onChange={handleInputChange("status")}
          error={!!errors.status}
          helperText={errors.status}
        />

        {/* Specification */}
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Specifications
        </Typography>
        {banner.specification.map((spec, index) => (
          <Grid container spacing={2} key={spec.id} alignItems="center">
            <Grid item xs={5}>
              <TextField
                fullWidth
                margin="normal"
                label="Specification Name"
                value={spec.specificationName}
                onChange={handleSpecificationChange(index, "specificationName")}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                margin="normal"
                label="Specification Data"
                value={spec.specificationData}
                onChange={handleSpecificationChange(index, "specificationData")}
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => handleRemoveSpecification(index)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Button variant="outlined" onClick={handleAddSpecification}>
          Add Specification
        </Button>

        {/* Banner Image */}
        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Current Banner Image
        </Typography>
        <Card sx={{ maxWidth: 400, marginTop: 2 }}>
          <CardMedia
            component="img"
            image={
              imageFile
                ? URL.createObjectURL(imageFile)
                : banner.imageCloud?.url
            }
            alt="Banner"
          />
        </Card>
        <TextField
          type="file"
          fullWidth
          margin="normal"
          label="Upload New Banner"
          InputLabelProps={{ shrink: true }}
          inputProps={{ accept: "image/*" }}
          onChange={handleImageChange}
        />

        {/* Actions */}
        <Box sx={{ marginTop: 4 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ marginRight: 2 }}
            disabled={isLoading}
          >
            Update Banner
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setActiveComponent({ name: "AdminBanner" })}
            disabled={isLoading}
          >
            Return to List
          </Button>
        </Box>
      </form>
    </Box>
  );
}

export default AdminEditBanner;
