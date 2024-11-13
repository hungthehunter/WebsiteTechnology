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
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedUserId } from "../../../../services/redux/slices/userSlice";
import { userThunk } from "../../../../services/redux/thunks/thunk";
import "./assets/css/style.scss";

function AdminEditStaff({ id, setActiveComponent, showAlert }) {
  const [fullname, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
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
  const listAccess = useSelector((state) => state.access.listAccess); // Lấy danh sách vai trò từ Redux
  const dispatch = useDispatch();

  // Lấy thông tin nhân viên theo ID
  useEffect(() => {
    dispatch(userThunk.getUserById(id));
  }, [dispatch, id]);

  // Lấy thông tin nhân viên đã chọn
  const selectedUser = useSelector((state) => state.user.selectedUser);
  const isLoading = useSelector((state) => state.user.isLoading);

  // Cập nhật trạng thái khi selectedUser thay đổi
  useEffect(() => {
    if (selectedUser) {
      setFullName(selectedUser.fullname || "");
      setMobile(selectedUser.mobile || "");
      setEmail(selectedUser.email || "");
      setStatus(selectedUser.status ? "true" : "false");
      setDateOfBirth(selectedUser?.dateofbirth?.split("T")[0] || "");
      setRole(selectedUser.role || ""); 
      setDecentralization(selectedUser?.decentralization?.access.id );
      setAddresses(selectedUser.addresses || []); 
    }
  }, [selectedUser]);

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

    if (!validateAddresses()) {
      alert("Please fill out all address fields.");
      return;
    }

    const requestBody = {
      fullname: fullname,
      mobile: mobile,
      email: email,
      status: status,
      role: "Employee",
      dateofbirth: formatDate,
      decentralization: { id: decentralization },
      addresses: addresses || [],
    };

    try {
      await dispatch(userThunk.updateUser({ id: selectedUser.id, userData: requestBody }));
      showAlert("Edit staff successfully.", "success");
      dispatch(clearSelectedUserId());
      setTimeout(() => setActiveComponent({ name: "AdminStaff" }), 1000);
    } catch (error) {
      console.error("Error editing user:", error);
      showAlert("Failed to edit staff.", "error");
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
        <CircularProgress size={60} thickness={4} sx={{ color: '#4CAF50' }} />
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
            <Typography variant="h4">Edit Staff Information</Typography>
          </Box>
          <form onSubmit={handleSubmit} style={{ paddingTop: 15 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={fullname}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mobile"
                  type="number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
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
                      Select Access
                    </MenuItem>
                    {listAccess.map((accessItem) => (
                      <MenuItem key={accessItem.id} value={accessItem.id}>
                        {accessItem.roleName}
                      </MenuItem>
                    ))}
                  </Select>
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
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Street"
                      name="street"
                      value={address.street || ""}
                      onChange={(e) => handleAddressChange(index, e)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Ward"
                      name="ward"
                      value={address.ward || ""}
                      onChange={(e) => handleAddressChange(index, e)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="District"
                      name="district"
                      value={address.district || ""}
                      onChange={(e) => handleAddressChange(index, e)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="City"
                      name="city"
                      value={address.city || ""}
                      onChange={(e) => handleAddressChange(index, e)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Country"
                      name="country"
                      value={address.country || ""}
                      onChange={(e) => handleAddressChange(index, e)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <IconButton
                      color="error"
                      onClick={() => removeAddress(index)}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}

              <Grid item xs={12}>
                <Button
                  startIcon={<Add />}
                  onClick={addAddress}
                  variant="outlined"
                >
                  Add Address
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Save Changes
                </Button>
                <Button
                variant="outlined"
                color="secondary"
                onClick={() => setActiveComponent({ name: "AdminStaff" })}
                sx={{ marginTop: 0, marginLeft: 2 }}
              >
                Return to Staff
              </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default AdminEditStaff;
