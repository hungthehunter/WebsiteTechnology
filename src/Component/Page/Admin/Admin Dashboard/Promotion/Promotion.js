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
import { promotionThunk } from "../../../../services/redux/thunks/thunk";
import PromotionTable from "./PromotionTable";

const AdminPromotion = ({ setActiveComponent, showAlert }) => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const listPromotion = useSelector((state) => state.promotion.listPromotion);

  // State cho tìm kiếm
  const [searchKeyword, setSearchKeyword] = useState("");

  // Lọc danh sách khuyến mãi dựa trên từ khóa tìm kiếm
  const filteredPromotions = listPromotion.filter((promotion) =>
    promotion.name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  const handleOpenDialog = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedId(null);
  };

  // DELETE: Delete promotion by id from Database
  const handleDelete = async () => {
    try {
      dispatch(promotionThunk.deletePromotion(selectedId));
      dispatch(promotionThunk.getAllPromotions());
      showAlert("Delete promotion successfully", "success");
    } catch (error) {
      showAlert("Failed to delete promotion", "error");
      console.error("Error deleting promotion:", error);
    }
    setOpenDialog(false);
    setSelectedId(null);
  };

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
            Recent Promotion
          </Typography>
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <TextField
              placeholder="Search by Promotion Name"
              variant="outlined"
              size="small"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
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
              onClick={() => setActiveComponent({ name: "AdminAddPromotion" })}
            >
              + Add New Promotion
            </Button>
          </Box>
        </Box>

        <PromotionTable
        promotions={filteredPromotions}
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

export default AdminPromotion;
