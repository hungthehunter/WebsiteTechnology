import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from "axios";
import * as React from 'react';
import { useEffect, useState } from "react";
import "./css/style.scss";

const AccountAddress = ({ setActiveComponent }) => {
  /*------- Page function -------*/
  /*------- User database -------*/

  const [address, setAddress] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const [openView, setOpenView] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    street: '',
    houseNumber: '',
    ward: '',
    district: '',
    city: '',
    country: '',
    user: {
      id: null
    }
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
    if (token) {
      GetUserAccount(token);
    }
  }, [])

  useEffect(() => {
    setNewAddress((prevState) => ({
      ...prevState,
      user: {
        id: userId
      }
    }));
  }, [userId]);

  const GetUserAccount = async (token) => {
    try {
      const result = await axios.get(
        "http://localhost:8080/api/v1/auth/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAddress(result.data.addresses);
      setUserId(result.data.id); // Lưu trữ userId
    } catch (error) {
      console.error("Failed to load Email:", error);
    }
  };

  const handleClickOpenView = (address) => {
    setSelectedAddress(address);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
    setSelectedAddress(null);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
    setNewAddress({
      street: '',
      houseNumber: '',
      ward: '',
      district: '',
      city: '',
      country: '',
      user: {
        id: userId
      }
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAddress({
      ...newAddress,
      [name]: value
    });
  };

  const handleAddAddress = async () => {
    const token = localStorage.getItem("authToken");
    try {
      const result = await axios.post(
        `http://localhost:8080/api/address`,
        newAddress,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
        }
      );
      GetUserAccount(token);
    } catch (error) {
      console.error("Failed to add address:", error);
    }
    console.log(newAddress);
    handleCloseAdd();
  };

  const handleDelete = async(id)=>{
    
      try {
        const result = await axios.delete(
          `http://localhost:8080/api/address/${id}`,
          newAddress,
        );
        alert("đã xóa thành công");
        setAddress((prevAddresses) => prevAddresses.filter(address => address.id !== id)); // Remove the deleted address from the state
      } catch (error) {
        console.error("Failed to add address:", error);
      }
    }

  return (
    <div>
      {/* ================ Order Details List ================= */}
      <div className="details_table details">
        <div className="table recentOrders">
          <div className="cardHeader">
            <h2>Address Detail</h2>
            <button
              className="btn"
              onClick={handleClickOpenAdd}
            >
              + Add new Address
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <th scope="col" style={{ textAlign: "start" }}>
                  Id
                </th>
                <th scope="col" style={{ textAlign: "start" }}>
                  Street
                </th>
                <th scope="col" style={{ textAlign: "end" }}>
                  House Number
                </th>
                <th scope="col" style={{ textAlign: "end" }}>
                  Ward
                </th>
                <th scope="col" style={{ textAlign: "end" }}>
                  District
                </th>
                <th scope="col" style={{ textAlign: "end" }}>
                  City
                </th>
                <th scope="col" style={{ textAlign: "end" }}>
                  Country
                </th>
                <th scope="col" style={{ textAlign: "end" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {address.map((product, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "start" }}>{product.id}</td>
                  <td style={{ textAlign: "start" }}>{product.street}</td>
                  <td style={{ textAlign: "end" }}>{product.houseNumber}</td>
                  <td style={{ textAlign: "end" }}>{product.ward}</td>
                  <td style={{ textAlign: "end" }}>{product.district}</td>
                  <td style={{ textAlign: "end" }}>{product.city}</td>
                  <td style={{ textAlign: "end" }}>{product.country}</td>
                  <td style={{ textAlign: "end" }}>
                    <button
                      className="status viewing mx-2"
                      onClick={() => handleClickOpenView(product)}
                    >
                      View
                    </button>
                
                    <button
                      className="status deleting mx-2"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={openView} onClose={handleCloseView}>
        <DialogTitle>Address Detail</DialogTitle>
        <DialogContent>
          {selectedAddress && (
            <>
              <TextField
                autoFocus
                margin="dense"
                id="street"
                label="Street"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedAddress.street}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                margin="dense"
                id="houseNumber"
                label="House Number"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedAddress.houseNumber}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                margin="dense"
                id="ward"
                label="Ward"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedAddress.ward}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                margin="dense"
                id="district"
                label="District"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedAddress.district}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                margin="dense"
                id="city"
                label="City"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedAddress.city}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                margin="dense"
                id="country"
                label="Country"
                type="text"
                fullWidth
                variant="outlined"
                value={selectedAddress.country}
                InputProps={{
                  readOnly: true,
                }}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <DialogTitle>Add New Address</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="street"
            label="Street"
            type="text"
            fullWidth
            variant="outlined"
            name="street"
            value={newAddress.street}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="houseNumber"
            label="House Number"
            type="text"
            fullWidth
            variant="outlined"
            name="houseNumber"
            value={newAddress.houseNumber}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="ward"
            label="Ward"
            type="text"
            fullWidth
            variant="outlined"
            name="ward"
            value={newAddress.ward}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="district"
            label="District"
            type="text"
            fullWidth
            variant="outlined"
            name="district"
            value={newAddress.district}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="city"
            label="City"
            type="text"
            fullWidth
            variant="outlined"
            name="city"
            value={newAddress.city}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            id="country"
            label="Country"
            type="text"
            fullWidth
            variant="outlined"
            name="country"
            value={newAddress.country}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdd} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddAddress} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AccountAddress;
