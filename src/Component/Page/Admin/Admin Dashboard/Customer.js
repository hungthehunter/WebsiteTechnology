import { Box, Button, MenuItem, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from "react";
import { deleteUserById, getAllUser } from "../../../Serivce/ApiService";
import "./assets/css/style.scss";
function AdminCustomer({ setActiveComponent , showAlert }) {
  /*------- Page function -------*/
  const [activeIndex, setActiveIndex] = useState(null);
  const [menuActive, setMenuActive] = useState(false);
  const [sortBy, setSortBy] = useState(""); // Thêm state để lưu giá trị sắp xếp
  const [anchorEl, setAnchorEl] = useState(null); // Thêm state cho Popover
  const [users, setUsers] = useState([]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl); // Kiểm tra xem Popover có mở hay không
  const id = open ? 'simple-popover' : undefined;
  const handleSortChange = (value) => {
    if (!value) return; // Kiểm tra xem value có tồn tại không
    setSortBy(value);
    // Sắp xếp người dùng dựa trên role
    const sortedUsers = [...users].sort((a, b) => {
      if (value === "user") {
        return users.role === "User" ? -1 : 1; // Đưa User lên đầu
      } else if (value === "employee") {
        return users.role === "Employee" ? -1 : 1; // Đưa Employee lên đầu
      }
      return 0; // Không sắp xếp nếu không có giá trị
    });
    setFilteredUsers(sortedUsers);
  };
  
  const handleMouseOver = (index) => {
    setActiveIndex(index);
  };

  const toggleMenu = () => {
    setMenuActive((prev) => !prev); // Correctly toggle the state
  };

  // Customer: Load List of Users when component mounts

  useEffect(() => {
    loadUsers();
  }, []);

  // Customer: Handle search bar

  const handleInputSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  /*------- Database function -------*/
  // Set element User


  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // GET: Get User by id from Database

  const loadUsers = async () => {
    try {
      const result = await getAllUser ();
        // Filter users where role is 'Admin'
        const filteredUsers = result.data.filter(user => user.role !== "Admin");
        setUsers(filteredUsers);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  // DELETE: Delete User by id from Database
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await deleteUserById(id);
        showAlert("Delete customer successfully.","success");
        loadUsers();
      } catch (error) {
        showAlert("Failed to delete customer successfully.","error");
        console.error("Error deleting image:", error);
      }
    }
  };
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Box sx={{ padding: 2 }}>
    <Box 
      sx={{ 
        width: '100%', 
        height: '80vh',
        maxWidth: '100%', 
        maxHeight: '80vh', 
        overflowY: 'auto',
        boxShadow: 3, 
        borderRadius: 2, 
        padding: 3, 
        backgroundColor: 'white', 
        margin: '0 auto', 
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: '2.5rem' }}> {/* Tăng kích thước chữ */}
          Recent Customers
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="contained" color="primary" onClick={() => setActiveComponent({ name: "AdminAddCustomer" })}>
              + Add New Customer
            </Button>
            <Button
              variant="outlined"
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{ marginLeft: 2 }} // Thêm khoảng cách giữa hai nút
            >
              Sort By
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              <MenuItem onClick={() => handleSortChange('user')}>User</MenuItem>
              <MenuItem onClick={() => handleSortChange('employee')}>Employee</MenuItem>
            </Popover>
          </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Id</TableCell>
              <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Name</TableCell>
              <TableCell style={{ textAlign: "end", fontSize: '1.5rem' }}>Mobile</TableCell>
              <TableCell style={{ textAlign: "end", fontSize: '1.5rem' }}>Email</TableCell>
              <TableCell style={{ textAlign: "end", fontSize: '1.5rem' }}>Role</TableCell>
              <TableCell style={{ textAlign: "end", fontSize: '1.5rem' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell style={{ textAlign: "start", fontSize: '1.3rem' }}>{user.id}</TableCell>
                <TableCell style={{ textAlign: "start", fontSize: '1.3rem' }}>{user.fullname}</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: '1.3rem' }}>{user.mobile}</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: '1.3rem' }}>{user.email}</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: '1.3rem' }}>
                  <span className={`status ${user.role.toLowerCase()}`}>{user.role}</span>
                </TableCell>
                <TableCell style={{ textAlign: "end", fontSize: '1.3rem' }}>
                  <Button variant="outlined" onClick={() => setActiveComponent({ name: "AdminViewCustomer", props: { id: user.id } })}>View</Button>
                  <Button variant="outlined" onClick={() => setActiveComponent({ name: "AdminEditCustomer", props: { id: user.id } })}>Edit</Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(user.id)}>Delete</Button>
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
    </Box>
  </Box>
);
}
export default AdminCustomer;



// {filteredUsers.length === 0 && (
//   <tr className="nouser">
//     <td
//       colSpan={5}
//       className="inform"
//       style={{ textAlign: "center", paddingTop: 100 }}
//     >
//       No users found
//     </td>
//   </tr>
// )}