import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { manufacturerThunk } from "../../../../../services/redux/thunks/thunk";
import DeleteDialog from "./DeleteDialog";
import ManufacturerTable from "./ManufacturerTable";
import SearchBar from "./SearchBar";
function AdminManufacturer({ setActiveComponent, showAlert }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
  
    const listManufacturer = useSelector((state) => state.manufacturer.listManufacturer);
    const listProduct = useSelector((state) => state.product.listProduct);
    const dispatch = useDispatch();
  
    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
  
    const handleOpenDialog = (id, name) => {
      setSelectedId(id);
      setSelectedName(name);
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
      setSelectedName(null);
      setSelectedId(null);
    };
  
    const checkManufacturerNameExists = (name) => {
      return listProduct.some(
        (product) => product.manufacturer.name.toLowerCase() === name.toLowerCase()
      );
    };
  
    const handleDelete = async () => {
      if (checkManufacturerNameExists(selectedName)) {
        showAlert(
          "This manufacturer is associated with existing products. Cannot delete.",
          "warn"
        );
        setTimeout(() => setActiveComponent({ name: "AdminProduct" }), 1000);
      } else {
        try {
          await dispatch(manufacturerThunk.deleteManufacturer(selectedId));
          showAlert("Delete manufacturer successfully", "success");
          dispatch(manufacturerThunk.getAllManufacturers());
          setActiveComponent({ name: "AdminManufacturer" });
        } catch (error) {
          showAlert("Failed to delete manufacturer", "error");
          console.error("Error deleting manufacturer:", error);
        }
      }
      setOpenDialog(false);
      setSelectedId(null);
    };
  
    const filteredManufacturers = listManufacturer.filter((manufacturer) =>
      manufacturer.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
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
              <SearchBar value={searchQuery} onChange={handleSearchChange} />
              <Button
                variant="contained"
                color="primary"
                onClick={() => setActiveComponent({ name: "AdminAddManufacturer" })}
              >
                + Add New Manufacturer
              </Button>
            </Box>
          </Box>
  
          <ManufacturerTable
            manufacturers={filteredManufacturers}
            onView={(id) => setActiveComponent({ name: "AdminViewManufacturer", props: { id } })}
            onEdit={(id) => setActiveComponent({ name: "AdminEditManufacturer", props: { id } })}
            onDelete={handleOpenDialog}
          />
        </Box>
  
        <DeleteDialog
          open={openDialog}
          onClose={handleCloseDialog}
          onConfirm={handleDelete}
        />
      </Box>
    );
  }
  
  export default AdminManufacturer;