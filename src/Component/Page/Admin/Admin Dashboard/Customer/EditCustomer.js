import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedUserId } from "../../../../../services/redux/slices/userSlice";
import { userThunk } from "../../../../../services/redux/thunks/thunk";
import { editUserValidationSchema } from "../../../../../services/yup/Admin/User/editUserValidation";
import "../assets/css/style.scss";

function AdminEditCustomer({ id, setActiveComponent, showAlert }) {
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const isLoading = useSelector((state) => state.address.isLoading);
  const [errors, setErrors] = useState({});
  const [fullname, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("true");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [decentralization, setDecentralization] = useState("");
  const [addresses, setAddresses] = useState([
    {
      houseNumber: "",
      street: "",
      ward: "",
      district: "",
      city: "",
      country: "",
      user: {
        id: id,
      },
    },
  ]);
  const [password, setPassword] = useState("");
  const listAccess = useSelector((state) => state.access.listAccess);
  const dispatch = useDispatch();

  const listAddress = (selectedUser?.addresses || []).filter(address => address.status === true);
  
  // Lấy thông tin người dùng theo ID
  useEffect(() => {
    dispatch(userThunk.getUserById(id));
  }, [dispatch, id]);

  // Lấy thông tin người dùng đã chọn


  // Cập nhật trạng thái khi selectedUser thay đổi
  useEffect(() => {
    if (selectedUser) {
      setFullName(selectedUser.fullname || "");
      setMobile(selectedUser.mobile || "");
      setEmail(selectedUser.email || "");
      setStatus(selectedUser.status ? "true" : "false");
      setDateOfBirth(selectedUser?.dateofbirth?.split("T")[0] || "");
      setDecentralization(selectedUser?.decentralization?.access.id );
      setAddresses(listAddress || []); 
    }
  }, [selectedUser,listAddress]);

  const handleAddressChange = (index, event) => {
    const { name, value } = event.target;
    setAddresses((prevAddresses) =>
      prevAddresses.map((address, addrIndex) =>
        addrIndex === index ? { ...address, [name]: value } : address
      )
    );
  };

  const addAddress = () => {
    setAddresses((prevAddresses) => [
      ...prevAddresses,
      {
        houseNumber: "",
        street: "",
        ward: "",
        district: "",
        city: "",
        country: "",
        user: {
          id: id,
        },
      },
    ]);
  };

  const removeAddress = (index) => {
    setAddresses((prevAddresses) =>
      prevAddresses.filter((_, addrIndex) => addrIndex !== index)
    );
  };

  const validateAddresses = () => {
    return addresses.every(
      (address) =>
        address.houseNumber &&
        address.street &&
        address.ward &&
        address.district &&
        address.city &&
        address.country
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const FormatDateOfBirth = new Date(dateOfBirth);
    const formatDate = FormatDateOfBirth.toISOString().split("T")[0];
  
    const userData = {
      fullname,
      mobile,
      email,
      password,
      status,
      role: "User",
      dateofbirth: formatDate,
      decentralization: { id: decentralization },
      addresses: Array.isArray(addresses) ? addresses : [], // Ensure addresses is always an array
    };
  
    console.log(userData);
  
    try {
      await editUserValidationSchema.validate(userData, { abortEarly: false });
  
      if (!validateAddresses()) {
        alert("Please fill out all address fields.");
        return;
      }
  
      await dispatch(userThunk.updateUser({ id: selectedUser.id, userData }));
      showAlert("Edit customer successfully.", "success");
      dispatch(clearSelectedUserId());
      setTimeout(() => setActiveComponent({ name: "AdminCustomer" }), 1000);
    } catch (validationErrors) {
      console.log(validationErrors);
  
      const errorMessages = Array.isArray(validationErrors.inner)
        ? validationErrors.inner.reduce((acc, error) => {
            acc[error.path] = error.message;
            return acc;
          }, {})
        : {}; // Ensure inner is an array before calling reduce
  
      setErrors(errorMessages);
    }
  };

  if (isLoading) {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'black',
        zIndex: 9999
      }}>
        <CircularProgress size={60} thickness={4}  sx={{ color: '#4CAF50' }}  />
        <Typography variant="h6" sx={{ mt: 2, color: '#4CAF50' }}>
          PLEASE WAIT...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Box className="details_table">
        <Box className="table recentOrders">
          <Box className="cardHeader">
            <Typography variant="h4">Edit User Information</Typography>
          </Box>
          <form onSubmit={handleSubmit} style={{ paddingTop: 15 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                  error={Boolean(errors.fullname)}
                  helperText={errors.fullname}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mobile"
                  type="number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  error={Boolean(errors.mobile)}
                  helperText={errors.mobile}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    label="Status"
                  >
                    <MenuItem value="true">Active</MenuItem>
                    <MenuItem value="false">Inactive</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Access</InputLabel>
                  <Select
                    value={decentralization}
                    onChange={(e) => setDecentralization(e.target.value)}
                    label="Access"
                  >
                    <MenuItem value="" disabled>
                      Select access
                    </MenuItem>
                    {listAccess.map((accessItem) => (
                      <MenuItem key={accessItem.id} value={accessItem.id}>
                        {accessItem.roleName}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.decentralization && <Typography color="error">{errors.decentralization}</Typography>}
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  type="date"
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  error={!!errors.dateOfBirth}
                  helperText={errors.dateOfBirth}
                />
              </Grid>

              {addresses.map((address, index) => (
                <Grid
                  container
                  spacing={2}
                  key={index}
                  sx={{ marginBottom: 2 }}
                >
                  <Grid item xs={12}>
                    <Typography variant="h6">Address {index + 1}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="House Number"
                      name="houseNumber"
                      value={address.houseNumber || ""}
                      onChange={(e) => handleAddressChange(index, e)}
                      error={!!errors[`addresses[${index}].houseNumber`]}
                      helperText={errors[`addresses[${index}].houseNumber`]}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Street"
                      name="street"
                      value={address.street || ""}
                      onChange={(e) => handleAddressChange(index, e)}
                      error={!!errors[`addresses[${index}].street`]}
                      helperText={errors[`addresses[${index}].street`]}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Ward"
                      name="ward"
                      value={address.ward || ""}
                      onChange={(e) => handleAddressChange(index, e)}
                      error={!!errors[`addresses[${index}].ward`]}
                      helperText={errors[`addresses[${index}].ward`]}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="District"
                      name="district"
                      value={address.district || ""}
                      onChange={(e) => handleAddressChange(index, e)}
                      error={!!errors[`addresses[${index}].district`]}
                      helperText={errors[`addresses[${index}].district`]}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={address.city || ""}
                      onChange={(e) => handleAddressChange(index, e)}
                      error={!!errors[`addresses[${index}].city`]}
                      helperText={errors[`addresses[${index}].city`]}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Country"
                      name="country"
                      value={address.country || ""}
                      onChange={(e) => handleAddressChange(index, e)}
                      error={!!errors[`addresses[${index}].country`]}
                      helperText={errors[`addresses[${index}].country`]}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <IconButton onClick={() => removeAddress(index)}>
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<Add />}
                  onClick={addAddress}
                  disabled={addresses.length >= 5 || isLoading}
                >
                  Add Address
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" type="submit">
                  Save Changes
                </Button>
                <Button
                variant="outlined"
                color="secondary"
                onClick={() => setActiveComponent({ name: "AdminCustomer" })}
                sx={{ marginTop: 0, marginLeft: 2 }}
              >
                Return to Customer
              </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminEditCustomer;
