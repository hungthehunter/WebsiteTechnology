import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Paper,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedUserId } from "../../../../services/redux/slices/userSlice";
import { userThunk } from "../../../../services/redux/thunks/thunk";
import "./assets/css/style.scss";

function AdminCustomer({ setActiveComponent, showAlert }) {
  const [sortBy, setSortBy] = useState(""); // State for sorting
  const [searchQuery, setSearchQuery] = useState(""); // State for search
  const [anchorEl, setAnchorEl] = useState(null); // State for Popover
  const dispatch = useDispatch();
  const listUser = useSelector((state) => state.user.listUser);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleView = (user) => {
    dispatch(selectedUserId(user));
    setActiveComponent({ name: "AdminViewCustomer", props: { id: user } });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter users based on search query and sort criteria
  const filteredUsers = listUser.filter((user) => {
    const matchesSearch = user.fullname.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSort = sortBy ? user.role === sortBy : true;
    return matchesSearch && matchesSort;
  });

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await dispatch(userThunk.deleteUser(id));
        dispatch(userThunk.getAllUsers());
        showAlert("Deleted customer successfully", "success");
      } catch (error) {
        showAlert("Failed to delete customer", "error");
        console.error("Error deleting customer:", error);
      }
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box
        sx={{
          width: "100%",
          height: "80vh",
          maxWidth: "100%",
          maxHeight: "80vh",
          overflowY: "auto",
          boxShadow: 3,
          borderRadius: 2,
          padding: 3,
          backgroundColor: "white",
          margin: "0 auto",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: "2.5rem" }}>
            Recent Customers
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Search Field */}
            <TextField
              placeholder="Search by name"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: "1.8rem", color: "#757575" }} />
                  </InputAdornment>
                ),
              }}
              sx={{
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
              onClick={() => setActiveComponent({ name: "AdminAddCustomer" })}
              sx={{ marginLeft: 2 }}
            >
              + Add New Customer
            </Button>
            <Button
              variant="outlined"
              aria-controls={open ? "demo-positioned-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              sx={{ marginLeft: 2 }}
            >
              Sort By
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <MenuItem onClick={() => handleSortChange("User")}>User</MenuItem>
              <MenuItem onClick={() => handleSortChange("Employee")}>Employee</MenuItem>
              <MenuItem onClick={() => handleSortChange("")}>Clear Filter</MenuItem>
            </Popover>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>Id</TableCell>
                <TableCell style={{ textAlign: "start", fontSize: "1.5rem" }}>Name</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>Mobile</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>Email</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>Role</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>{user.id}</TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>{user.fullname}</TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>{user.mobile}</TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>{user.email}</TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    <span className={`status ${user.role.toLowerCase()}`}>{user.role}</span>
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    <Button variant="outlined" onClick={() => handleView(user.id)}>
                      View
                    </Button>
                    <Button variant="outlined" onClick={() => setActiveComponent({ name: "AdminEditCustomer", props: { id: user.id } })}>
                      Edit
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => handleDelete(user.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Styles */}
        <style jsx>{`
          .status {
            padding: 4px 8px;
            border-radius: 4px;
            color: white;
          }
          .status.admin {
            background-color: #2196f3;
          }
          .status.user {
            background-color: #4caf50;
          }
          .status.employee {
            background-color: #ff9800;
          }
        `}</style>
      </Box>
    </Box>
  );
}

export default AdminCustomer;
