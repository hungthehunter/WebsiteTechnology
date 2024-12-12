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
import { customerValidationSchema } from "../../../../services/yup/Admin/User/addUserValidation"; // Import your validation schema
import "./assets/css/style.scss";

function AdminAddCustomer({ setActiveComponent, showAlert }) {
  const isLoading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();

  // State của form
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

  // State lỗi
  const [errors, setErrors] = useState({});

  const listDecentralization = useSelector(
    (state) => state.decentralization.listDecentralization
  );

  // Thay đổi role
  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  // Xử lý thay đổi địa chỉ
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

  // Hàm xác thực
  const validate = () => {
    try {
      customerValidationSchema.validateSync(
        {
          fullname,
          mobile,
          email,
          password,
          salary,
          dateOfBirth,
          decentralization,
          addresses: addressList,
        },
        { abortEarly: false }
      );
      return {}; // Nếu không có lỗi
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      return validationErrors;
    }
  };

  // Xử lý submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validate(); // Lấy lỗi xác thực
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Đặt lỗi vào state
      return; // Dừng lại nếu có lỗi
    }

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
      decentralization: decentralization,
      addresses: addressList,
    };

    try {
      const response = await dispatch(userThunk.createUser(userData));
      // Xóa form sau khi thêm thành công
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
      showAlert("Add staff successfully.", "success");
      setTimeout(() => setActiveComponent({ name: "AdminStaff" }), 1000);
    } catch (error) {
      showAlert("Failed to add staff.", "error");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Information for New Customer
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
              error={Boolean(errors.fullname)}
              helperText={errors.fullname}
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
              error={Boolean(errors.mobile)}
              helperText={errors.mobile}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
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
              error={Boolean(errors.salary)}
              helperText={errors.salary}
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
              error={Boolean(errors.password)}
              helperText={errors.password}
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
                error={Boolean(errors.decentralization)}
              >
                <MenuItem value="" disabled>
                  Select access
                </MenuItem>
                {listDecentralization.map((item) => (
                  <MenuItem key={item.id} value={item}>
                    {item.access.roleName}
                  </MenuItem>
                ))}
              </Select>
              {errors.decentralization && (
                <Typography color="error" variant="caption">
                  {errors.decentralization}
                </Typography>
              )}
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
              error={Boolean(errors.dateOfBirth)}
              helperText={errors.dateOfBirth}
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
                  error={Boolean(errors?.addresses?.[index]?.houseNumber)}
                  helperText={errors?.addresses?.[index]?.houseNumber}
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
                  error={Boolean(errors?.addresses?.[index]?.street)}
                  helperText={errors?.addresses?.[index]?.street}
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
                  error={Boolean(errors?.addresses?.[index]?.ward)}
                  helperText={errors?.addresses?.[index]?.ward}
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
                  error={Boolean(errors?.addresses?.[index]?.district)}
                  helperText={errors?.addresses?.[index]?.district}
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
                  error={Boolean(errors?.addresses?.[index]?.city)}
                  helperText={errors?.addresses?.[index]?.city}
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
                  error={Boolean(errors?.addresses?.[index]?.country)}
                  helperText={errors?.addresses?.[index]?.country}
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
