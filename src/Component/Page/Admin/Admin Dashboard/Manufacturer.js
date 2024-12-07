import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputAdornment,
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
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { manufacturerThunk } from "../../../../services/redux/thunks/thunk";
import "./assets/css/style.scss";

function AdminManufacturer({ setActiveComponent, showAlert }) {
  /*------- State -------*/
  const [searchQuery, setSearchQuery] = useState("");

  /*------- Redux State & Hooks -------*/
  const listManufacturer = useSelector((state) => state.manufacturer.listManufacturer);
  const listProduct = useSelector((state) => state.product.listProduct);
  const dispatch = useDispatch();

  /*------- Handlers -------*/
  // Search manufacturer by name
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Check if manufacturer exists in products
  const checkManufacturerNameExists = (name) => {
    return listProduct.some(
      (product) => product.manufacturer.name.toLowerCase() === name.toLowerCase()
    );
  };

  // DELETE: Delete manufacturer by id
  const handleDelete = async (id, name) => {
    if (window.confirm("Are you sure you want to delete this manufacturer?")) {
      if (checkManufacturerNameExists(name)) {
        showAlert(
          "This manufacturer is associated with existing products. Cannot delete.",
          "warn"
        );
        setTimeout(() => setActiveComponent({ name: "AdminProduct" }), 1000);
      } else {
        try {
          await dispatch(manufacturerThunk.deleteManufacturer(id));
          showAlert("Delete manufacturer successfully", "success");
          dispatch(manufacturerThunk.getAllManufacturers());
          setActiveComponent({ name: "AdminManufacturer" });
        } catch (error) {
          showAlert("Failed to delete manufacturer", "error");
          console.error("Error deleting manufacturer:", error);
        }
      }
    }
  };

  /*------- Filtered List -------*/
  const filteredManufacturers = listManufacturer.filter((manufacturer) =>
    manufacturer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /*------- UI -------*/
  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          overflowY: "auto",
          boxShadow: 3,
          borderRadius: 2,
          padding: 3,
          backgroundColor: "white",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontSize: "2.5rem" }}>
            Recent Manufacturer
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* Search Field */}
            <TextField
              placeholder="Search by manufacturer name"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: "1.8rem", color: "#757575" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "300px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                  paddingRight: "10px",
                },
                "& .MuiOutlinedInput-input": {
                  padding: "12px 10px 12px 0",
                  fontSize: "1rem",
                },
                "& .MuiInputBase-input::placeholder": {
                  fontSize: "1rem",
                },
              }}
            />
            {/* Add Manufacturer Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={() => setActiveComponent({ name: "AdminAddManufacturer" })}
            >
              + Add New Manufacturer
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>Id</TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>Image</TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>Name</TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>Email</TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>Website</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredManufacturers.map((manufacturer, index) => (
                <TableRow key={index}>
                  <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                    {manufacturer.id}
                  </TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                    <img
                      src={manufacturer.imageCloud.url}
                      alt={manufacturer.name}
                      width="50"
                      style={{ objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                    {manufacturer.name}
                  </TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                    {manufacturer.email}
                  </TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                    <a href={manufacturer.website} target="_blank" rel="noopener noreferrer">
                      {manufacturer.website}
                    </a>
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminViewManufacturer",
                          props: { id: manufacturer.id },
                        })
                      }
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminEditManufacturer",
                          props: { id: manufacturer.id },
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(manufacturer.id, manufacturer.name)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredManufacturers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} style={{ textAlign: "center", padding: "50px" }}>
                    No manufacturer found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default AdminManufacturer;
