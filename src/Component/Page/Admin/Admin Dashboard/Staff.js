import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import axios from "axios";
import { useEffect, useState } from "react";
import { getEmployees } from "../../../Serivce/ApiService";
import "./assets/css/style.scss";
function AdminStaff({ setActiveComponent ,showAlert}) {
  /*------- Page function -------*/
  const [activeIndex, setActiveIndex] = useState(null);
  const [menuActive, setMenuActive] = useState(false);

  const handleMouseOver = (index) => {
    setActiveIndex(index);
  };

  const toggleMenu = () => {
    setMenuActive(prev => !prev); // Correctly toggle the state
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

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // GET: Get User by id from Database

  const loadUsers = async () => {
    try {
      const result = await getEmployees();
    
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
        await axios.delete(`http://localhost:8080/api/v1/admin/${id}`);
        showAlert("Delete staff successfully.","success")
        loadUsers();
      } catch (error) {
        showAlert("Failed to delete staff successfully.","error")
        console.error("Error deleting image:", error);
      }
    }
  };
 
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
          margin: '0 auto', // Để căn giữa khung trong không gian của nó
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Typography variant="h4" gutterBottom sx={{ fontSize: '2.5rem' }}>
            Recent Employees
          </Typography>
          <Button variant="contained" color="primary" onClick={() => setActiveComponent({ name: "AdminAddStaff" })}>
            + Add New Staff
          </Button>
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Id</TableCell>
                <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Name</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: '1.5rem'}}>Mobile</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: '1.5rem'}}>Email</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: '1.5rem' }}>Role</TableCell>
                <TableCell style={{ textAlign: "end", fontSize: '1.5rem'}}>Action</TableCell>
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
                    <Button variant="outlined" onClick={() => setActiveComponent({ name: "AdminViewStaff", props: { id: user.id } })}>View</Button>
                    <Button variant="outlined" onClick={() => setActiveComponent({ name: "AdminEditStaff", props: { id: user.id } })}>Edit</Button>
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
export default AdminStaff;
