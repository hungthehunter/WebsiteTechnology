import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderThunk } from "../../../../../services/redux/thunks/thunk";
import AdminOrderDialog from "./AdminOrderDialog";
import AdminOrderSearch from "./AdminOrderSearch";
import AdminOrderTable from "./AdminOrderTable";

function AdminOrder({ setActiveComponent, showAlert }) {
  const listOrder = useSelector((state) => state.order.listOrder);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("productName");
  const [selectedId, setSelectedId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDelete = async () => {
    try {
      await dispatch(orderThunk.deleteOrder(selectedId));
      await dispatch(orderThunk.getAllOrders());
      showAlert("Delete order successfully", "success");
    } catch (error) {
      showAlert("Failed to delete order", "error");
    }
    setOpenDialog(false);
    setSelectedId(null);
  };

  const filteredOrders = listOrder.filter((order) =>
    order.user?.fullname.toLowerCase().includes(searchQuery.toLowerCase())
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
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
          <Typography variant="h4" sx={{ fontSize: "2.5rem" }}>
            Recent Orders
          </Typography>
          <AdminOrderSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            sortOption={sortOption}
            setSortOption={setSortOption}
          />
        </Box>

        <AdminOrderTable
          orders={filteredOrders}
          setActiveComponent={setActiveComponent}
          setSelectedId={setSelectedId}
          setOpenDialog={setOpenDialog}
        />

        <AdminOrderDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          onConfirm={handleDelete}
        />
      </Box>
    </Box>
  );
}

export default AdminOrder;
