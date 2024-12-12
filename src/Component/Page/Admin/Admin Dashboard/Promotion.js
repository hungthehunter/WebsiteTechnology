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
import { promotionThunk } from "../../../../services/redux/thunks/thunk";

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
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                  Id
                </TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                  Image
                </TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                  Name
                </TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                  Discount (%)
                </TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>
                  Active
                </TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPromotions.map((promotion, index) => (
                <TableRow key={index}>
                  <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                    {promotion.id}
                  </TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                    <img
                      src={promotion?.imageCloud?.url}
                      alt={promotion?.name}
                      width="100"
                      height="30"
                      style={{ objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                    {promotion.name}
                  </TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                    {promotion.discountPercentage}
                  </TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                    {new Date(promotion.endDate) < new Date()
                      ? "Expired"
                      : "Not Expired"}
                  </TableCell>

                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminViewPromotion",
                          props: { id: promotion.id },
                        })
                      }
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminEditPromotion",
                          props: { id: promotion.id },
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleOpenDialog(promotion.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredPromotions.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    style={{ textAlign: "center", paddingTop: 100 }}
                  >
                    No promotions found
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
};

export default AdminPromotion;
