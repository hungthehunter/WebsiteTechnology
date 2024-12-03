import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userThunk } from "../../../services/redux/thunks/thunk";
import { signUpValidationSchema } from "../../../services/yup/signUpValidation";

const SignUp = () => {
  const isLoading = useSelector((state) => state.user.isLoading);
  const [formValues, setFormValues] = useState({
    fullname: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateofbirth: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const listUser = useSelector((state) => state.user.listUser); // Current user list
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate form values using Yup
      await signUpValidationSchema.validate(formValues, { abortEarly: false });
      setFormErrors({}); // Clear previous errors

      // Check if email or phone number already exists
      const emailExists = listUser.some((user) => user.email === formValues.email);
      const mobileExists = listUser.some((user) => user.mobile === formValues.mobile);

      if (emailExists) {
        setFormErrors({ email: "This email is already registered" });
        toast.error("This email is already registered.");
        return;
      }

      if (mobileExists) {
        setFormErrors({ mobile: "This phone number is already registered" });
        toast.error("This phone number is already registered.");
        return;
      }

      // Proceed with user registration
      await dispatch(userThunk.signUpUser(formValues));
      toast.success("Sign up successfully. Please login before continuing.");
      navigate("/websiteDoAn/Login");
    } catch (error) {
      if (error.inner) {
        // Handle Yup validation errors
        const newErrors = {};
        error.inner.forEach((err) => {
          newErrors[err.path] = err.message;
        });
        setFormErrors(newErrors);
      } else {
        toast.error("Failed to sign up. Please try again.");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "130%",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Box
        sx={{
          width: 500,
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Create Your Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            variant="outlined"
            fullWidth
            name="fullname"
            value={formValues.fullname}
            onChange={handleChange}
            error={Boolean(formErrors.fullname)}
            helperText={formErrors.fullname}
            margin="normal"
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            value={formValues.email}
            onChange={handleChange}
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
            margin="normal"
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            name="password"
            value={formValues.password}
            onChange={handleChange}
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
            margin="normal"
          />

          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            error={Boolean(formErrors.confirmPassword)}
            helperText={formErrors.confirmPassword}
            margin="normal"
          />

          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            name="mobile"
            value={formValues.mobile}
            onChange={handleChange}
            error={Boolean(formErrors.mobile)}
            helperText={formErrors.mobile}
            margin="normal"
          />

          <TextField
            label="Date of Birth"
            type="date"
            variant="outlined"
            fullWidth
            name="dateofbirth"
            value={formValues.dateofbirth}
            onChange={handleChange}
            error={Boolean(formErrors.dateofbirth)}
            helperText={formErrors.dateofbirth}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            style={{ color: "#999", backgroundColor: "#F8F8F8" }}
            disabled = {isLoading}
          >
            Create Account
          </Button>
        </form>

        <Typography variant="body2" align="center">
          Already have an account?{" "}
          <Link to="/websiteDoAn/Login" style={{ textDecoration: "none" }}>
            Login here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUp;
