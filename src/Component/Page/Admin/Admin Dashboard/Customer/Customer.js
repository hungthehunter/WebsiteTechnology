import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userThunk } from "../../../../../services/redux/thunks/thunk";
import CustomerTable from "./CustomerTable";
import DeleteDialog from "./DeleteDialog";
import SearchBar from "./SearchBar";
import SortPopover from "./SortPopover";

function AdminCustomer({ setActiveComponent, showAlert }) {
  const dispatch = useDispatch();
  const listUser = useSelector((state) => state.user.listUser);

  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [sortOption, setSortOption] = useState("fullname");
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleSearchChange = (event) => setSearchQuery(event.target.value);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSortChange = (option) => {
    setSortOption(option);
    handleClose();
  };
  const handleRoleFilterChange = (role) => {
    setRoleFilter(role);
    handleClose();
  };

  const handleOpenDialog = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  const handleDelete = async (id) => {
    try {
      await (userThunk.deleteUser(id));
      await dispatch(userThunk.getAllUsers());
      showAlert("Delete Customer successfully.", "success");
    } catch (error) {
      showAlert("Failed to delete Customer successfully.", "error");
      console.error("Error deleting user:", error);
    }
    handleCloseDialog();
  };

  const filteredUsers = listUser
    .filter((user) => (roleFilter ? user.role === roleFilter : true))
    .filter((user) =>
      user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "fullname") return a.fullname.localeCompare(b.fullname);
      if (sortOption === "email") return a.email.localeCompare(b.email);
      return 0;
    });

  return (
    <Box sx={{ padding: 2 }}>

      <Box sx={{ marginBottom: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography variant="h4">Recent Customer</Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SearchBar value={searchQuery} onChange={handleSearchChange} />

          <Button
            variant="contained"
            onClick={() => setActiveComponent({ name: "AdminAddCustomer" })}
            sx={{ marginLeft: 2 }}
          >
            + Add New Customer
          </Button>

          <Button
            variant="contained"
            aria-controls={anchorEl ? "sort-menu" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            sx={{ marginLeft: 2 }}
          >
            Sort By
          </Button>

          <SortPopover
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            onSortChange={handleSortChange}
            onRoleFilterChange={handleRoleFilterChange}
          />
        </Box>
      </Box>

      <CustomerTable
        users={filteredUsers}
        onView={(id) => setActiveComponent({ name: "AdminViewCustomer", props: { id } })}
        onEdit={(id) => setActiveComponent({ name: "AdminEditCustomer", props: { id } })}
        onDelete={handleOpenDialog}
      />

      <DeleteDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={() => handleDelete(selectedId)}
      />
    </Box>
  );
}

export default AdminCustomer;
