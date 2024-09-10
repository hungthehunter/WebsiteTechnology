import { Add, Delete } from "@mui/icons-material";
import {
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
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./assets/css/style.scss";

function AdminEditStaff({ id, setActiveComponent ,showAlert }) {
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
  const [password, setPassword] = useState(""); // Keep password handling simple

  // Fetch decentralizations
  const [decentralizations, setDecentralizations] = useState([]);
  const getDecentralizations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/decentralizations"
      );
      setDecentralizations(response.data);
    } catch (error) {
      console.error("Error fetching decentralizations:", error);
    }
  };

  useEffect(() => {
    getDecentralizations();
  }, []);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/admin/${id}`
        );
        const { fullname, mobile, email, password, addresses, dateofbirth } =
          response.data;
        setFullName(fullname);
        setMobile(mobile);
        setEmail(email);
        const FormatDateOfBirth=dateofbirth.toISOString().split("T")[0]
        setDateOfBirth(FormatDateOfBirth);
        setAddresses(
          addresses && addresses.length > 0
            ? addresses
            : [
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
              ]
        );
        setPassword(password);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchCustomerData();
  }, [id]);

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
    const formatDate = dateOfBirth instanceof Date ? dateOfBirth.toISOString().split("T")[0] : dateOfBirth;

    if (!validateAddresses()) {
      alert("Please fill out all address fields.");
      return;
    }

    // Ensure addresses are not null
    const requestBody = {
      fullname,
      mobile,
      email,
      password,
      status,
      role: "Employee",
      dateofbirth: formatDate,
      decentralization: { id: decentralization },
      addresses: addresses , // Default to empty array if null
    };
console.log("Edit Staff submitting:",requestBody)
    try {
      await axios.put(`http://localhost:8080/api/v1/admin/${id}`, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      showAlert("Edit staff successfully.","success");
      setTimeout(()=>setActiveComponent({ name: "AdminStaff" }),1000)
    } catch (error) {
      showAlert("Failed to edit user.","error");
    }
  };

  return (
    <div>
      <div className="details_table details">
        <div className="table recentOrders">
          <div className="cardHeader">
            <Typography variant="h4">Edit User Information</Typography>
          </div>
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
                  label="Mobile"
                  type="number"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
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
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

              {/* Date of Birth */}
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
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Access</InputLabel>
                  <Select
                    value={decentralization}
                    onChange={(e) => setDecentralization(e.target.value)}
                    label="Access"
                  >
                    <MenuItem value="" disabled>
                      Select decentralizations
                    </MenuItem>
                    {decentralizations.map((decentralization) => (
                      <MenuItem key={decentralization.id} value={decentralization.id}>
                        {decentralization.access.roleName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
                >
                  Add Address
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Confirm
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={() => setActiveComponent({ name: "AdminCustomer" })}
                >
                  Return to Customer List
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminEditStaff;
