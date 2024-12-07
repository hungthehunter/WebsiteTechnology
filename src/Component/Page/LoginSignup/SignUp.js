import { useTheme } from "@emotion/react";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userThunk } from "../../../services/redux/thunks/thunk";
import { signUpValidationSchema } from "../../../services/yup/signUpValidation";

const SignUp = () => {
  const theme = useTheme()
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
  const listUser = useSelector((state) => state.user.listUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setFormErrors({});
      await signUpValidationSchema.validate(formValues, { abortEarly: false });

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

      const formatDate = new Date(formValues.dateofbirth).toISOString();
      const userData = {
        ...formValues,
        dateOfBirth: formatDate,
        role: "User",
        decentralization: {
          id: 2
        },
      };

      await dispatch(userThunk.signUpUser(userData));
      toast.success("Sign up successfully. Please login before continuing.");
      navigate("/websiteDoAn/Login");
    } catch (error) {
      if (error.name === "ValidationError") {
        const newErrors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
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
        px: 2,
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
          // Responsive adjustments
          [theme.breakpoints.down("sm")]: {
            p: 3,
          },
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Create Your Account
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Full Name"
            name="fullname"
            value={formValues.fullname}
            onChange={handleChange}
            error={Boolean(formErrors.fullname)}
            helperText={formErrors.fullname}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            error={Boolean(formErrors.email)}
            helperText={formErrors.email}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            error={Boolean(formErrors.password)}
            helperText={formErrors.password}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            error={Boolean(formErrors.confirmPassword)}
            helperText={formErrors.confirmPassword}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            name="mobile"
            value={formValues.mobile}
            onChange={handleChange}
            error={Boolean(formErrors.mobile)}
            helperText={formErrors.mobile}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date of Birth"
            type="date"
            name="dateofbirth"
            value={formValues.dateofbirth}
            onChange={handleChange}
            error={Boolean(formErrors.dateofbirth)}
            helperText={formErrors.dateofbirth}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              mt: 3,
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            Create Account
          </Button>
        </form>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
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
