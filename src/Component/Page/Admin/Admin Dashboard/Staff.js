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
import { userThunk } from "../../../../services/redux/thunks/thunk";
import "./assets/css/style.scss";

function AdminStaff({ setActiveComponent, showAlert }) {
  const listUser = useSelector((state) => state.user.listUser);
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [roleFilter, setRoleFilter] = useState(""); // Role filter (User or Employee)
  const [sortOption, setSortOption] = useState("fullname");
  const [openDialog, setOpenDialog] = useState(false); // Dialog state
  const [selectedId, setSelectedId] = useState(null);

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

  // Filter users based on role and search query
  const filteredUsers = listUser
    .filter(
      (user) => (roleFilter ? user.role === roleFilter : true) // Apply role filter if selected
    )
    .filter((user) =>
      user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "fullname")
        return a.fullname.localeCompare(b.fullname);
      if (sortOption === "email") return a.email.localeCompare(b.email);
      return 0;
    });

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleDelete = async (id) => {
      try {
        await dispatch(userThunk.deleteUser(id));
        await dispatch(userThunk.getAllUsers());
        showAlert("Delete staff successfully.", "success");
      } catch (error) {
        showAlert("Failed to delete staff successfully.", "error");
        console.error("Error deleting user:", error);
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontSize: "2.5rem" }}>
            Recent Employees & Users
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* Search field */}
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
                  marginRight: 1,
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
              onClick={() => setActiveComponent({ name: "AdminAddStaff" })}
              sx={{ marginLeft: 2 }}
            >
              + Add New Staff
            </Button>
            <Button
              variant="contained"
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
              <MenuItem onClick={() => handleSortChange("fullname")}>
                Full Name
              </MenuItem>
              <MenuItem onClick={() => handleSortChange("email")}>
                Email
              </MenuItem>
              <MenuItem onClick={() => handleRoleFilterChange("User")}>
                User
              </MenuItem>
              <MenuItem onClick={() => handleRoleFilterChange("Employee")}>
                Employee
              </MenuItem>
              <MenuItem onClick={() => handleRoleFilterChange("")}>
                Clear Role Filter
              </MenuItem>
            </Popover>
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
                  Name
                </TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>
                  Mobile
                </TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>
                  Email
                </TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>
                  Role
                </TableCell>
                <TableCell style={{ textAlign: "end", fontSize: "1.5rem" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                    {user.id}
                  </TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: "1.3rem" }}>
                    {user.fullname}
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    {user.mobile}
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    {user.email}
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    <span className={`status ${user.role.toLowerCase()}`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: "1.3rem" }}>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminViewStaff",
                          props: { id: user.id },
                        })
                      }
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminEditStaff",
                          props: { id: user.id },
                        })
                      }
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleOpenDialog(user.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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
          .status.guest {
            background-color: #ff9800;
          }
        `}</style>

        {/* Dialog for Deletion Confirmation */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirm Deletion"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this user? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              color="error"
              variant="contained"
              autoFocus
            >
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default AdminStaff;
