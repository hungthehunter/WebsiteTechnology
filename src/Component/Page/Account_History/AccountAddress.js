import axios from "axios";
import { useEffect, useState } from "react";
import { createAddress, getUserLogged } from "../../Serivce/ApiService";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components
const StyledContainer = styled(Paper)({
  padding: '24px',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginTop: '20px',
});

const HeaderBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
});

const AddButton = styled(Button)({
  backgroundColor: '#3f51b5',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '16px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: '#303f9f',
  },
});

const StyledTableCell = styled(TableCell)({
  fontWeight: 'bold',
  fontSize: '16px',
});

const AccountAddress = () => {
  const [address, setAddress] = useState([]);
  const [userId, setUserId] = useState(null);
  const [openView, setOpenView] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    street: "",
    houseNumber: "",
    ward: "",
    district: "",
    city: "",
    country: "",
    user: { id: null },
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) GetUserAccount(token);
  }, []);

  useEffect(() => {
    setNewAddress((prevState) => ({
      ...prevState,
      user: { id: userId },
    }));
  }, [userId]);

  const GetUserAccount = async (token) => {
    try {
      const result = await getUserLogged(token);
      setAddress(result.data.addresses);
      setUserId(result.data.id);
    } catch (error) {
      console.error("Failed to load addresses:", error);
    }
  };

  const handleOpenView = (addr) => {
    setSelectedAddress(addr);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
    setSelectedAddress(null);
  };

  const handleOpenAdd = () => setOpenAdd(true);

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setNewAddress({
      street: "",
      houseNumber: "",
      ward: "",
      district: "",
      city: "",
      country: "",
      user: { id: userId },
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddAddress = async () => {
    try {
      await createAddress(newAddress);
      GetUserAccount(localStorage.getItem("authToken"));
    } catch (error) {
      console.error("Failed to add address:", error);
    }
    handleCloseAdd();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/address/${id}`);
      alert("Address deleted successfully");
      setAddress((prev) => prev.filter((addr) => addr.id !== id));
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  return (
    <StyledContainer>
      <HeaderBox>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#3f51b5', fontSize: '22px' }}>Address Detail</Typography>
        <AddButton variant="contained" onClick={handleOpenAdd}>
          + Add new Address
        </AddButton>
      </HeaderBox>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {["Id", "Street", "House Number", "Ward", "District", "City", "Country", "Action"].map((header) => (
                <StyledTableCell key={header}>{header}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {address.length > 0 ? (
              address.map((addr) => (
                <TableRow key={addr.id}>
                  <TableCell sx={{ fontSize: '15px' }}>{addr.id}</TableCell>
                  <TableCell sx={{ fontSize: '15px' }}>{addr.street}</TableCell>
                  <TableCell sx={{ fontSize: '15px' }}>{addr.houseNumber}</TableCell>
                  <TableCell sx={{ fontSize: '15px' }}>{addr.ward}</TableCell>
                  <TableCell sx={{ fontSize: '15px' }}>{addr.district}</TableCell>
                  <TableCell sx={{ fontSize: '15px' }}>{addr.city}</TableCell>
                  <TableCell sx={{ fontSize: '15px' }}>{addr.country}</TableCell>
                  <TableCell>
                    <Button variant="outlined" color="primary" size="small" sx={{ fontSize: '14px' }} onClick={() => handleOpenView(addr)}>
                      View
                    </Button>
                    <Button variant="outlined" color="error" size="small" sx={{ fontSize: '14px', marginLeft: '8px' }} onClick={() => handleDelete(addr.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center" sx={{ fontSize: '16px', fontStyle: 'italic', color: 'text.secondary' }}>
                  No address found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Viewing Address */}
      <Dialog open={openView} onClose={handleCloseView}>
        <DialogTitle>Address Detail</DialogTitle>
        <DialogContent>
          {selectedAddress && (
            <>
              {["street", "houseNumber", "ward", "district", "city", "country"].map((field) => (
                <TextField
                  key={field}
                  margin="dense"
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  type="text"
                  fullWidth
                  variant="outlined"
                  value={selectedAddress[field]}
                  InputProps={{ readOnly: true }}
                />
              ))}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView} color="primary">Close</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for Adding Address */}
      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          {["street", "houseNumber", "ward", "district", "city", "country"].map((field) => (
            <TextField
              key={field}
              margin="dense"
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              type="text"
              fullWidth
              variant="outlined"
              name={field}
              value={newAddress[field]}
              onChange={handleInputChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="primary">Cancel</Button>
          <Button onClick={handleAddAddress} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </StyledContainer>
  );
};

export default AccountAddress;
