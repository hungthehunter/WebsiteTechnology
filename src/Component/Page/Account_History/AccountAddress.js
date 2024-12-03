import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addressThunk } from "../../../services/redux/thunks/thunk";
import { accountAddAddressValidation, accountEditAddressValidation } from "../../../services/yup/AccountAddressValidation";
import LoadingOverlay from "../Admin/Admin Dashboard/overlay/LoadingOverlay";


const StyledTableContainer = styled(TableContainer)({
  margin: "20px",
  borderRadius: "8px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  overflow: "hidden",
  "& .MuiTableCell-head": {
    backgroundColor: "#f5f5f5",
    color: "#2c3e50",
    fontWeight: 600,
    textAlign: "left",
    fontSize: "16px",
  },
  "& .MuiTableCell-root": {
    padding: "12px",
    fontSize: "14px",
    textAlign: "center",
  },
});

const StyledHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 20px",
  borderBottom: "1px solid #e0e0e0",
  backgroundColor: "#f5f5f5",
});

const StyledTitle = styled(Typography)({
  fontWeight: 600,
  color: "#3f51b5",
  textAlign: "left",
});

const StyledActionButton = styled(Button)({
  marginRight: "8px",
});

const AccountAddress = () => {
  const isLoading = useSelector((state) => state.address.isLoading)
  const [errors, setErrors] = useState({}); // State để lưu trữ lỗi validation
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    houseNumber: "",
    street: "",
    ward: "",
    district: "",
    city: "",
    country: "",
    status: true,
    user: { id: null },
  });

  const dispatch = useDispatch();
  const userCurrentLogged = useSelector(
    (state) => state.user.userCurrentLogged
  );
  const listAddress = useSelector((state) =>
    state?.address?.listAddress?.filter(
      (addr) => addr.user?.id === userCurrentLogged?.id && addr?.status
    )
  );

  useEffect(() => {
    if (userCurrentLogged) {
      setNewAddress((prevState) => ({
        ...prevState,
        user: { id: userCurrentLogged.id },
      }));
    }
  }, [userCurrentLogged]);

  const handleInputChange = (event, setState) => {
    const { name, value } = event.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = async () => {
    try {
      setErrors({}); // Reset previous errors
  
      // Check if the user already has 5 active addresses
      if (listAddress.length >= 5) {
        toast.error("You can only have a maximum of 5 active addresses.");
        return;
      }
  
      // Validate the new address data
      await accountAddAddressValidation.validate(newAddress, { abortEarly: false });
  
      // Check for duplicate address
      const isDuplicate = listAddress.some(
        (address) =>
          address.city === newAddress.city &&
          address.street === newAddress.street &&
          address.houseNumber === newAddress.houseNumber &&
          address.district === newAddress.district &&
          address.country === newAddress.country
      );
  
      if (isDuplicate) {
        toast.error("This address already exists.");
        setOpenAdd(false); // Close the dialog if duplicate
        return;
      }
  
      // Add the new address
      await dispatch(addressThunk.createAddress(newAddress)).unwrap();
      dispatch(addressThunk.getAllAddresses());
      toast.success("Address added successfully");
      setOpenAdd(false); // Close the dialog after success
    } catch (error) {
      console.error("Failed to add address:", error);
      if (error.name === "ValidationError") {
        const newErrors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setErrors(newErrors); // Update errors if validation fails
      }
    }
  };
  
  
  const handleEditAddress = async () => {
    console.log(editAddress.id);
    try {
      setErrors({}); // Reset errors

      // Ensure 'editAddress' includes the 'id' property before sending the request
      if (!editAddress.id) {
        toast.error("Address ID is missing");
        return;
      }

      // Validate the address before sending
      await accountEditAddressValidation.validate(editAddress, { abortEarly: false });

      // Proceed with the update, passing only the necessary address data
      const addressData = {
        houseNumber: editAddress.houseNumber,
        street: editAddress.street,
        ward: editAddress.ward,
        district: editAddress.district,
        city: editAddress.city,
        country: editAddress.country,
        status: true,
        user: { id: userCurrentLogged.id },
      };

      // Call the updateAddress action with only the necessary fields
      await dispatch(addressThunk.updateAddress({ id: editAddress.id, addressData })).unwrap();
      dispatch(addressThunk.getAllAddresses());
      toast.success("Address updated successfully");
      setOpenEdit(false); // Close the dialog after successful update
    } catch (error) {
      console.error("Failed to update address:", error);
      if (error.name === "ValidationError") {
        const newErrors = error.inner.reduce((acc, err) => {
          acc[err.path] = err.message;
          return acc;
        }, {});
        setErrors(newErrors); // Update errors to display them in the form
      } else {
        toast.error(error.message); // Display other types of error (like missing id)
      }
    }
};

  
  const handleDelete = async (id) => {
    try {
      await dispatch(addressThunk.deleteAddress(id));
      dispatch(addressThunk.getAllAddresses());
      toast.success("Address deleted successfully");
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  return (
    <StyledTableContainer component={Paper}>
            {isLoading && (
        <LoadingOverlay isLoading={isLoading} message="Please wait..." />
      )}
      <StyledHeader>
        <StyledTitle variant="h4">Address Details</StyledTitle>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAdd(true)}
        >
          + Add New Address
        </Button>
      </StyledHeader>
      <Table>
        <TableHead>
          <TableRow>
            {[
              "Id",
              "Street",
              "House Number",
              "Ward",
              "District",
              "City",
              "Country",
              "Action",
            ].map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {listAddress.length > 0 ? (
            listAddress.map((address) => (
              <TableRow key={address.id}>
                <TableCell>{address.id}</TableCell>
                <TableCell>{address.street}</TableCell>
                <TableCell>{address.houseNumber}</TableCell>
                <TableCell>{address.ward}</TableCell>
                <TableCell>{address.district}</TableCell>
                <TableCell>{address.city}</TableCell>
                <TableCell>{address.country}</TableCell>
                <TableCell>
                  <StyledActionButton
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setEditAddress(address); 
                      setOpenEdit(true);
                    }}
                  >
                    Edit
                  </StyledActionButton>
                  <StyledActionButton
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(address.id)}
                  >
                    Delete
                  </StyledActionButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">
                No address found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Add Address Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)}>
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          {["houseNumber", "street", "ward", "district", "city", "country"].map(
            (field) => (
              <TextField
                key={field}
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                fullWidth
                margin="dense"
                value={newAddress[field]}
                onChange={(e) => handleInputChange(e, setNewAddress)}
                error={!!errors[field]} // Kiểm tra và hiển thị lỗi nếu có
                helperText={errors[field]} // Hiển thị thông báo lỗi nếu có
              />
            )
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>Cancel</Button>
          <Button onClick={handleAddAddress}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Edit Address Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Address</DialogTitle>
        <DialogContent>
          {editAddress &&
            [
              "houseNumber",
              "street",
              "ward",
              "district",
              "city",
              "country",
            ].map((field) => (
              <TextField
                key={field}
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                fullWidth
                margin="dense"
                value={editAddress[field]}
                onChange={(e) => handleInputChange(e, setEditAddress)}
                error={!!errors[field]} // Kiểm tra và hiển thị lỗi nếu có
                helperText={errors[field]} // Hiển thị thông báo lỗi nếu có
              />
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button onClick={handleEditAddress}>Save</Button>
        </DialogActions>
      </Dialog>
    </StyledTableContainer>
  );
};

export default AccountAddress;
