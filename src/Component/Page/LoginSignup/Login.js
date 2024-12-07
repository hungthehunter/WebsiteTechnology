import { Box, Button, Divider, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import { RxDiscordLogo } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  setLoginError,
  setUserLoggedIn,
} from "../../../services/redux/slices/userSlice";
import { cartThunk, userThunk } from "../../../services/redux/thunks/thunk";
import { loginValidationSchema } from "../../../services/yup/loginValidation";
import LoadingOverlay from "../Admin/Admin Dashboard/overlay/LoadingOverlay";
import "./LoginSignup.scss";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.user.isLoading);
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleLogin = (values) => {
    console.log("Handling login with values:", values);
    dispatch(userThunk.loginUser(values))
      .unwrap()
      .then((user) => {
        console.log("Login successful:", user);
        dispatch(setUserLoggedIn(user));
        dispatch(cartThunk.getUserCart(user?.id));
        toast.success("Login successfully");
        navigate("/websiteDoAn/");
      })
      .catch((error) => {
        console.log("Login failed:", error);
        dispatch(setLoginError(error));
        toast.error("Failed to login");
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginValidationSchema.validate(formValues, { abortEarly: false }); // Validate form values
      setFormErrors({}); // Clear any previous errors
      handleLogin(formValues); // Proceed with the login
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message; // Set validation errors
      });
      setFormErrors(newErrors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return (
    <Box
      className="account-section"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      {isLoading && <LoadingOverlay isLoading={isLoading} message="Loading..." />}
      <Grid
        container
        justifyContent="center"
        sx={{
          width: "100%",
          maxWidth: 1200, // Limit the max width of the form
        }}
      >
        <Grid item xs={12} sm={8} md={6} lg={5}>
          <Box
            sx={{
              p: 4,
              borderRadius: 2,
              boxShadow: 3,
              bgcolor: "background.paper",
            }}
          >
            <Typography variant="h5" align="center" gutterBottom>
              Your NVIDIA Account
            </Typography>

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  error={Boolean(formErrors.email)}
                  helperText={formErrors.email}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
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
                />
              </Box>

              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Link to="/websiteDoAn/SignUp" style={{ textDecoration: "none" }}>
                    <span>click here</span>
                  </Link>
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, mb: 2 }}
                color="primary"
                style={{ color: "#888", backgroundColor: "#F8F8F8" }}
              >
                Continue
              </Button>

              <Box sx={{ my: 2 }}>
                <Divider>or</Divider>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  color: "#000",
                }}
                style={{ color: "#000" }}
              >
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<FaGoogle />}
                  sx={{ justifyContent: "flex-start" }}
                  style={{ color: "#000" }}
                >
                  Log In With Google
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<MdFacebook />}
                  sx={{ justifyContent: "flex-start" }}
                  style={{ color: "#000" }}
                >
                  Log In With Facebook
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<RxDiscordLogo />}
                  sx={{ justifyContent: "flex-start" }}
                  style={{ color: "#000" }}
                >
                  Log In With Discord
                </Button>
              </Box>

              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="body2">
                  <Link to="/terms" style={{ textDecoration: "none" }}>
                    Terms
                  </Link>{" "}
                  |{" "}
                  <Link to="/privacy" style={{ textDecoration: "none" }}>
                    Privacy
                  </Link>{" "}
                  |{" "}
                  <Link to="/docs" style={{ textDecoration: "none" }}>
                    Docs
                  </Link>{" "}
                  |{" "}
                  <span className="contact" style={{ cursor: "pointer" }}>
                    Contact Support
                  </span>
                </Typography>
              </Box>
            </form>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
