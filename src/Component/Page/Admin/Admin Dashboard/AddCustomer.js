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
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userThunk } from "../../../../services/redux/thunks/thunk";
import "./assets/css/style.scss";

function AdminAddCustomer({ setActiveComponent, showAlert }) {
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();
  // Form state
  const [fullname, setFullname] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [salary, setSalary] = useState();
  const [role, setRole] = useState("User");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [decentralization, setDecentralization] = useState("");
  const [addressList, setAddressList] = useState([
    {
      houseNumber: "",
      street: "",
      ward: "",
      district: "",
      city: "",
      country: "",
    },
  ]);
  // const listAccess = useSelector((state) => state.access.listAccess);
  const listDecentralization = useSelector((state) => state.decentralization.listDecentralization);

  // Role
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  // Address handlers
  const handleAddressChange = (index, event) => {
    const newAddressList = [...addressList];
    newAddressList[index][event.target.name] = event.target.value;
    setAddressList(newAddressList);
  };

  const addAddress = () => {
    setAddressList([
      ...addressList,
      {
        houseNumber: "",
        street: "",
        ward: "",
        district: "",
        city: "",
        country: "",
      },
    ]);
  };

  const removeAddress = (index) => {
    const newAddressList = addressList.filter((_, i) => i !== index);
    setAddressList(newAddressList);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const FormatDateOfBirth = new Date(dateOfBirth);
    const formatDate = FormatDateOfBirth.toISOString().split("T")[0];
    const userData = {
      fullname,
      mobile,
      email,
      password,
      role,
      salary,
      dateofbirth: formatDate,
      decentralization: { id: decentralization },
      addresses: addressList,
    };
    try {
      const response = dispatch(userThunk.createUser(userData))
      //Clear form
      setFullname("");
      setMobile("");
      setEmail("");
      setPassword("");
      setRole("User");
      setDateOfBirth("");
      setAddressList([
        {
          houseNumber: "",
          street: "",
          ward: "",
          district: "",
          city: "",
          country: "",
        },
      ]);
      console.log(response);
      showAlert("Add staff successfully.", "success");
      setTimeout(() => setActiveComponent({ name: "AdminStaff" }), 1000);
    } catch (error) {
      showAlert("Failed to add staff.", "error");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Information for New Staff
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Full Name"
              variant="outlined"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Mobile"
              type="number"
              variant="outlined"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Salary"
              variant="outlined"
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                value={role}
                onChange={handleRoleChange}
              >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Employee">Employee</MenuItem>
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
                {listDecentralization.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.access.roleName}
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
        </Grid>
        {/* Address Section */}
        {addressList.map((address, index) => (
          <div key={index} style={{ marginTop: 20 }}>
            <Typography variant="h6">Address {index + 1}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="House Number"
                  name="houseNumber"
                  variant="outlined"
                  value={address.houseNumber}
                  onChange={(e) => handleAddressChange(index, e)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Street"
                  name="street"
                  variant="outlined"
                  value={address.street}
                  onChange={(e) => handleAddressChange(index, e)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Ward"
                  name="ward"
                  variant="outlined"
                  value={address.ward}
                  onChange={(e) => handleAddressChange(index, e)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="District"
                  name="district"
                  variant="outlined"
                  value={address.district}
                  onChange={(e) => handleAddressChange(index, e)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  variant="outlined"
                  value={address.city}
                  onChange={(e) => handleAddressChange(index, e)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  variant="outlined"
                  value={address.country}
                  onChange={(e) => handleAddressChange(index, e)}
                />
              </Grid>
            </Grid>
            <IconButton
              color="error"
              onClick={() => removeAddress(index)}
              style={{ marginTop: 10 }}
            >
              <Delete />
            </IconButton>
          </div>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" startIcon={<Add />} onClick={addAddress}>
            Add Address
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
          >
            Confirm
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => setActiveComponent({ name: "AdminCustomer" })}
            disabled={isLoading}
          >
            Return to Customer List
          </Button>
        </Grid>
      </form>
    </Box>
  );
}

export default AdminAddCustomer;
