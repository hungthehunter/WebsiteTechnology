import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserLoggedIn } from "../../../services/redux/slices/userSlice";
import { userThunk } from "../../../services/redux/thunks/thunk";
import { accountDetailValidation } from "../../../services/yup/AccountDetailValidation";

const AccountDetail = () => {
  const userCurrentLogged = useSelector(
    (state) => state.user.userCurrentLogged
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    dateofbirth: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await accountDetailValidation.validate(formData, { abortEarly: false });

      const { fullname, email, password, mobile, dateofbirth } = formData;
      const updatedData = {
        fullname,
        email,
        mobile,
        dateofbirth,
        ...(showPasswordFields && { password }),
      };

      await dispatch(
        userThunk.updateUserInfo({
          id: userCurrentLogged.id,
          userData: updatedData,
        })
      );
      await dispatch(clearUserLoggedIn());
      toast.success("Update successfully, please log in again");
      navigate("/websiteDoAn/Login");
    } catch (error) {
      if (error.name === "ValidationError") {
        const validationErrors = error.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setErrors(validationErrors);
      } else {
        toast.error("Failed to update user information.");
      }
    }
  };

  useEffect(() => {
    if (userCurrentLogged) {
      const { fullname, email, mobile, dateofbirth } = userCurrentLogged;
      const formattedDate =
        dateofbirth && new Date(dateofbirth).toISOString().split("T")[0];

      setFormData({
        fullname,
        email,
        mobile,
        password: "",
        confirmPassword: "",
        dateofbirth: formattedDate || "",
      });
    }
  }, [userCurrentLogged]);

  return (
    <Container>
      <StyledContainer elevation={3}>
        <HeaderBox>
          <Title>Account Detail</Title>
        </HeaderBox>
        <ContentBox>
          <form onSubmit={handleSubmit}>
            <StyledFormBox>
              <TextField
                fullWidth
                label="Full Name"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fullname && Boolean(errors.fullname)}
                helperText={touched.fullname && errors.fullname}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.mobile && Boolean(errors.mobile)}
                helperText={touched.mobile && errors.mobile}
              />
              <Button
                variant="outlined"
                onClick={() => setShowPasswordFields((prev) => !prev)}
                sx={{ marginBottom: "16px" }}
              >
                {showPasswordFields
                  ? "Cancel Password Change"
                  : "Change Password"}
              </Button>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ marginBottom: "16px" }}
              >
                Please re-enter your password to confirm when updating your
                information.
              </Typography>
              {showPasswordFields && (
                <>
                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={
                      errors.password ||
                      "Enter new password if you wish to change it."
                    }
                  />
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={errors.confirmPassword}
                  />
                </>
              )}

              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                name="dateofbirth"
                value={formData.dateofbirth}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.dateofbirth && Boolean(errors.dateofbirth)}
                helperText={errors.dateofbirth}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </StyledFormBox>
            <Box textAlign="center">
              <SaveButton type="submit" variant="contained" size="large">
                Save Changes
              </SaveButton>
            </Box>
          </form>
        </ContentBox>
      </StyledContainer>
    </Container>
  );
};

export default AccountDetail;

// Styled Components
const StyledContainer = styled(Paper)({
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  marginTop: "24px",
});

const HeaderBox = styled(Box)({
  padding: "16px 24px",
  backgroundColor: "#f5f5f5",
  borderBottom: "1px solid #e0e0e0",
});

const Title = styled(Typography)({
  fontSize: "20px",
  fontWeight: "bold",
  color: "#3f51b5",
});

const ContentBox = styled(Box)({
  padding: "24px",
});

const StyledFormBox = styled(Box)({
  "& .MuiTextField-root": { marginBottom: "24px" },
});

const SaveButton = styled(Button)({
  textAlign: "center",
});
