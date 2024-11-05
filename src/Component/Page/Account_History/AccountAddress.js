import {
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
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addressThunk } from "../../../services/redux/thunks/thunk";
import "./css/style.scss";

const AccountAddress = ({ setActiveComponent }) => {
  const [openView, setOpenView] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
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
  const userCurrentLogged = useSelector((state) => state.user.userCurrentLogged);
  const listAddress = useSelector((state) =>
    state?.address?.listAddress?.filter((addr) => addr.user?.id 
  === userCurrentLogged?.id && addr?.status)
  );

  useEffect(() => {
    if (userCurrentLogged) {
      setNewAddress((prevState) => ({
        ...prevState,
        user: { id: userCurrentLogged.id },
      }));
    }
  }, [userCurrentLogged]);

  const handleClickOpenView = (address) => {
    setSelectedAddress(address);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
    setSelectedAddress(null);
  };

  const handleClickOpenAdd = () => setOpenAdd(true);

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setNewAddress({
      houseNumber: "",
      street: "",
      ward: "",
      district: "",
      city: "",
      country: "",
      status: true,
      user: { id: userCurrentLogged?.id },
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = async () => {
    try {
       await dispatch(addressThunk.createAddress(newAddress)).unwrap();
      dispatch(addressThunk.getAllAddresses());
      toast.success("Địa chỉ đã được thêm thành công");
    } catch (error) {
      console.error("Failed to add address:", error);
    }
    handleCloseAdd();
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(addressThunk.deleteAddress(id));
      dispatch(addressThunk.getAllAddresses());
      toast.success("Đã xóa thành công");
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  return (
    <div className="details_table details">
      <div className="table recentOrders">
        <div className="cardHeader">
          <Typography variant="h5">Address Detail</Typography>
          <Button variant="contained" color="primary" onClick={handleClickOpenAdd}>
            + Add new Address
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {["Id", "Street", "House Number", "Ward", "District", "City", "Country", "Action"].map((header) => (
                  <TableCell key={header} align="left">{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {listAddress.length > 0 ? (
                listAddress.map((addr) => (
                  <TableRow key={addr.id}>
                    <TableCell>{addr.id}</TableCell>
                    <TableCell>{addr.street}</TableCell>
                    <TableCell>{addr.houseNumber}</TableCell>
                    <TableCell>{addr.ward}</TableCell>
                    <TableCell>{addr.district}</TableCell>
                    <TableCell>{addr.city}</TableCell>
                    <TableCell>{addr.country}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleClickOpenView(addr)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(addr.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">No address found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Dialog open={openView} onClose={handleCloseView}>
        <DialogTitle>Address Detail</DialogTitle>
        <DialogContent>
          {selectedAddress && (
            <>
              {["street", "houseNumber", "ward", "district", "city", "country"].map((field) => (
                <TextField
                  key={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  fullWidth
                  value={selectedAddress[field]}
                  InputProps={{ readOnly: true }}
                />
              ))}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView}>Close</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          {["houseNumber", "street", "ward", "district", "city", "country"].map((field) => (
            <TextField
              key={field}
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              fullWidth
              value={newAddress[field]}
              onChange={handleInputChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd}>Cancel</Button>
          <Button onClick={handleAddAddress}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AccountAddress;
