import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryThunk } from "../../../../services/redux/thunks/thunk";
import "./assets/css/style.scss";

function AdminCategory({ setActiveComponent, showAlert }) {
  /*------- State & Hooks -------*/
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  const listCategory = useSelector((state) => state.category.listCategory);

  /*------- Handlers -------*/
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    setAnchorEl(null);
  };

  const handleOpenDialog = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "category-sort-menu" : undefined;

  const filteredCategories = listCategory
    .filter((category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "Name") return a.name.localeCompare(b.name);
      if (sortOption === "ID") return a.id - b.id;
      return 0;
    });

  const handleDelete = async () => {
    try {
      dispatch(categoryThunk.deleteCategory(selectedId));
      showAlert("Delete category successfully", "success");
    } catch (error) {
      showAlert("Failed to delete category", "error");
      console.error("Error deleting category:", error);
    }
    setOpenDialog(false);
    setSelectedId(null);
  };

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
            Recent Category
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <TextField
              placeholder="Search by name"
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
            <Button
              variant="contained"
              color="primary"
              onClick={() => setActiveComponent({ name: "AdminAddCategory" })}
            >
              + Add New Category
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                  Id
                </TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                  Category Image
                </TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                  Category Name
                </TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <TableRow key={index}>
                    <TableCell
                      style={{ textAlign: "start", fontSize: "1.3rem" }}
                    >
                      {category.id}
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "start", fontSize: "1.3rem" }}
                    >
                      <img
                        src={category.imageCloud.url}
                        alt={category.name}
                        width="50"
                        style={{ objectFit: "cover" }}
                      />
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "start", fontSize: "1.3rem" }}
                    >
                      {category.name}
                    </TableCell>
                    <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          setActiveComponent({
                            name: "AdminEditCategory",
                            props: { id: category.id },
                          })
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleOpenDialog(category.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    style={{
                      textAlign: "center",
                      padding: "50px",
                      fontSize: "1.5rem",
                    }}
                  >
                    No categories found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Dialog for confirming delete */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminCategory;
