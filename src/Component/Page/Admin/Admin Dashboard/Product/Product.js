import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, Button, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productThunk } from "../../../../../services/redux/thunks/thunk";
import "../assets/css/style.scss";
import DeleteDialog from "./DeleteDialog";
import ProductTable from "./ProductTable";
import { useReloadTable } from "./ReloadTable";
import SearchBar from "./SearchBar";
import SortPopover from "./SortPopover";

function AdminProduct({ setActiveComponent, showAlert }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const listProduct = useSelector((state) => state.product.listProduct);
  const { shouldReload, reloadTable, isLoading } = useReloadTable(showAlert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (shouldReload) {
      reloadTable();
    }
  }, [shouldReload, reloadTable]);

  const handleDelete = async () => {
    try {
      await dispatch(productThunk.deleteProduct(selectedProductId));
      showAlert("Product deleted successfully.", "success");
    } catch (error) {
      console.error("Error deleting product:", error);
      showAlert("Failed to delete product.", "error");
    }
    setOpenDialog(false);
    setSelectedProductId(null);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleSortChange = (criteria) => {
    setSortBy(criteria);
    setAnchorEl(null);
  };

  const handleOpenDialog = (id) => {
    setSelectedProductId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProductId(null);
  };

  const sortedProducts = [...listProduct].sort((a, b) => {
    if (!sortBy) return 0;
    if (sortBy === "category") {
      return (a?.category?.name || "").localeCompare(b?.category?.name || "");
    } else if (sortBy === "manufacturer") {
      return (a?.manufacturer?.name || "").localeCompare(
        b?.manufacturer?.name || ""
      );
    }
    return 0;
  });

  const filteredProducts = sortedProducts?.filter((product) =>
    product?.productName?.toLowerCase().includes(searchQuery.toLowerCase())
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
            Recent Products
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={reloadTable}
              disabled={isLoading}
              sx={{ marginRight: 2 }}
            >
              {isLoading ? (
                <CircularProgress size={30} color="inherit" />
              ) : (
                <RefreshIcon />
              )}
            </IconButton>
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => setActiveComponent({ name: "AdminAddProduct" })}
              sx={{ marginRight: 2 }}
            >
              + Add New Product
            </Button>

            <SortPopover
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClick={handleClick}
              onClose={handleClosePopover}
              onSortChange={handleSortChange}
            />
          </Box>
        </Box>

        <ProductTable
          products={filteredProducts}
          onViewProduct={(id) =>
            setActiveComponent({ name: "AdminViewProduct", props: { id } })
          }
          onEditProduct={(id) =>
            setActiveComponent({ name: "AdminEditProduct", props: { id } })
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

export default AdminProduct;
