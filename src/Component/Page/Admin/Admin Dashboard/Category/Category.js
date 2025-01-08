import SearchIcon from "@mui/icons-material/Search";
import {
    Box,
    Button,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryThunk } from "../../../../services/redux/thunks/thunk";
import "./assets/css/style.scss";
import CategoryTable from "./CategoryTable";

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

        <CategoryTable
        products={filteredCategories}
        onViewProduct={(id) =>
          setActiveComponent({ name: "AdminViewCategory", props: { id } })
        }
        onEditProduct={(id) =>
          setActiveComponent({ name: "AdminEditCategory", props: { id } })
        }
        onDeleteProduct={handleOpenDialog}
        />

       </Box>

       <DeleteDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onDelete={handleDelete}
      />
    </Box>

);
}

export default AdminCategory;
        