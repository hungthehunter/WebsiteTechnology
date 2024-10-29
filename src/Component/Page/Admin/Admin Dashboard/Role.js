import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { getAllRole } from "../../../Serivce/ApiService";
import "./assets/css/style.scss";
function AdminRole({setActiveComponent , showAlert}){
/*------- Page function -------*/
const [activeIndex, setActiveIndex] = useState(null);
const [menuActive, setMenuActive] = useState(false);

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
  const filteredUsers = functions.filter((product) =>
    product.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  setFilteredUsers(filteredUsers);
};

/*------- Database function -------*/
// Set element User

const [functions, setFunctions] = useState([]);
const [filteredUsers, setFilteredUsers] = useState([]);
const [searchTerm, setSearchTerm] = useState("");

// GET: Get Product by id from Database

const loadUsers = async () => {
  try {
    const result = await getAllRole();
    setFunctions(result.data);
    setFilteredUsers(result.data);
  } catch (error) {
    console.error("Failed to load users:", error);
  }
};

// DELETE: Delete User by id from Database
const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this image?")) {
    try {
      await axios.delete(`http://localhost:8080/api/functions/${id}`);
      showAlert("Delete role successfully.","success");
      setTimeout(()=>loadUsers(),1000);
    } catch (error) {
      console.error("Error deleting Product:", error);
      showAlert("Failed to delete role successfully.","error");
    }
  }
};
return (
  <Box>
    <Box className="details_table details">
      <Box className="table recentOrders">
        <Box className="cardHeader">
          <Typography variant="h4">Recent Access</Typography>
          <Button
            variant="contained"
            onClick={() =>
              setActiveComponent({
                name: "AdminAddAccess",
              })
            }
          >
            + Add New Access
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((function_role, index) => (
                  <TableRow key={index}>
                    <TableCell align="left">{function_role.id}</TableCell>
                    <TableCell align="left">{function_role.roleName}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        onClick={() =>
                          setActiveComponent({
                            name: "AdminViewProduct",
                            props: { id: function_role.id },
                          })
                        }
                      >
                        View
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          setActiveComponent({
                            name: "AdminEditProduct",
                            props: { id: function_role.id },
                          })
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(function_role.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No roles found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  </Box>
);
}
export default AdminRole;