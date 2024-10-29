import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import { deleteDecentralization, deleteFunction, getAllDecentralization, getAllFunction, getAllUser } from '../../../Serivce/ApiService';
import "./assets/css/style.scss";
function AdminAccess({ setActiveComponent ,showAlert }) {
  /*------- Page function -------*/
  const [activeIndex, setActiveIndex] = useState(null);
  const [menuActive, setMenuActive] = useState(false);
  const [value, setValue] = useState("1");
  const [users,setUsers]=useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); 

  const handleMouseOver = (index) => {
    setActiveIndex(index);
  };

  const toggleMenu = () => {
    setMenuActive((prev) => !prev); // Correctly toggle the state
  };

  // Customer: Load List of Users when component mounts

  useEffect(() => {
    loadFunction();
    getAllDecentralizations();
    loadUser();
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

  // Access: Check role exist
  const checkRoleNameExists = (name) => {
    return users.some(
      (user) => user.decentralization.access.roleName.toLowerCase() === name.toLowerCase()
    );
  };
  
  

  /*------- Database function -------*/
  // Set element User

  const [functions, setFunctions] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // GET: Get User from Database

  const loadUser = async () =>{
    try {
      const response = await getAllUser();
      setUsers(response.data);
    } catch (error) {
      alert("Error loading user");
    }
  }

  // GET: Get Product by id from Database

  const loadFunction = async () => {
    try {
      const result = await getAllFunction();
      
      setFunctions(result.data);
      setFilteredUsers(result.data); // Initialize filteredUsers with all users
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  // DELETE: Delete User by id from Database
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await deleteFunction(id);
        loadFunction();
        showAlert("Delete access successfully","success")
      } catch (error) {
        showAlert("Failed to delete access.","error")
      }
    }
  };

  // CHANGE: handle change table
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // GET: All Role from database (TABLE)
const [decentralizations,setDecentralizations]=useState([]);
const getAllDecentralizations= async () => {
  try {
    const result = await getAllDecentralization();
    setDecentralizations(result.data);
  } catch (error) {
    console.error("Failed to load users:", error);
  }
};

//DELETE: DELETE TABLE ROLES BY ID
const deleteAccess = async (name,id) => {

  if(checkRoleNameExists(name)){
    alert("Please delete or update the user Role before continuing this action");
    setActiveComponent({
      name: "AdminStaff",
    })
  }else{

    try {
      const result = await deleteDecentralization(id);
      alert("DELETE Role successful")
      getAllDecentralizations();
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  }
 
};

  const renderProductTableAccess = (title) => (
    <div>
      {/* ================ Order Details List ================= */}
      <div className="details_table details">
        <div className="table recentOrders">
          <div className="cardHeader">
            <h2>{title}</h2>
            <a
              href="#"
              className="btn"
              onClick={() =>
                setActiveComponent({
                  name: "AdminAddAccess",
                })
              }
            >
              + Add New Decentralization
            </a>
          </div>
          <table>
            <thead>
              <tr>
                <th scope="col" style={{ textAlign: "start" }}>
                  Id
                </th>
                <th scope="col" style={{ textAlign: "start" }}>
                  Name
                </th>
                <th scope="col" style={{ textAlign: "end" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {functions.map((decentralization, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "start" }}>{decentralization.id}</td>
                  <td style={{ textAlign: "start" }}>
                    {decentralization.functionName}
                  </td>
                  <td style={{ textAlign: "end" }}>
                    <button
                      className="status deleting mx-2"
                      onClick={() => handleDelete(decentralization.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr className="nouser">
                  <td
                    colSpan={5}
                    className="inform"
                    style={{ textAlign: "center", paddingTop: 100 }}
                  >
                    No Access found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderProductTableRole = (title) => (
    <div>
      {/* ================ Order Details List ================= */}
      <div className="details_table details">
        <div className="table recentOrders">
          <div className="cardHeader">
            <h2>{title}</h2>
       
          </div>
          <table>
            <thead>
              <tr>
                <th scope="col" style={{ textAlign: "start" }}>
                  Id
                </th>
                <th scope="col" style={{ textAlign: "start" }}>
                  Name
                </th>
                <th scope="col" style={{ textAlign: "end" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {decentralizations.map((decentralization, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "start" }}>{decentralization.id}</td>
                  <td style={{ textAlign: "start" }}>
                    {decentralization.access.roleName}
                  </td>
                  <td style={{ textAlign: "end" }}>
                    <button
                      className="status editing mx-2"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminEditAccess",
                          props: { id: decentralization.id },
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="status deleting mx-2"
                      onClick={() => deleteAccess(decentralization.access.roleName,decentralization.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr className="nouser">
                  <td
                    colSpan={5}
                    className="inform"
                    style={{ textAlign: "center", paddingTop: 100 }}
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
  const [showAccessTable, setShowAccessTable] = useState(true); // Thêm trạng thái để theo dõi bảng nào đang hiển thị

  const toggleTable = () => {
    setShowAccessTable((prev) => !prev); // Chuyển đổi giữa hai bảng
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
          margin: '0 auto', 
        }}
      >
       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
  <Typography variant="h4" gutterBottom sx={{ fontSize: '2.5rem' }}>
    Recent Access
  </Typography>
  <Box sx={{ display: 'flex', gap: 1 }}> {/* Thêm Box để chứa các nút và sử dụng gap để tạo khoảng cách */}
    <Button variant="contained" color="primary" onClick={() => setActiveComponent({ name: "AdminAddAccess" })}>
      + Add New Access
    </Button>
    <Button variant="outlined" onClick={toggleTable}>
      {showAccessTable ? "Show Roles" : "Show Access"} {/* Nút để chuyển đổi giữa hai bảng */}
    </Button>
  </Box>
</Box>
        
        {showAccessTable ? ( // Hiển thị bảng Access
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Id</TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Name</TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: '1.5rem' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {functions.map((decentralization, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ textAlign: "start", fontSize: '1.3rem' }}>{decentralization.id}</TableCell>
                    <TableCell style={{ textAlign: "start", fontSize: '1.3rem' }}>{decentralization.functionName}</TableCell>
                    <TableCell style={{ textAlign: "end", fontSize: '1.3rem' }}>
                      <Button variant="outlined" color="error" onClick={() => handleDelete(decentralization.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : ( // Hiển thị bảng Roles
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Id</TableCell>
                  <TableCell style={{ textAlign: "start", fontSize: '1.5rem' }}>Role Name</TableCell>
                  <TableCell style={{ textAlign: "end", fontSize: '1.5rem' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {decentralizations.map((decentralization, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ textAlign: "start", fontSize: '1.3rem' }}>{decentralization.id}</TableCell>
                    <TableCell style={{ textAlign: "start", fontSize: '1.3rem' }}>{decentralization.access.roleName}</TableCell>
                    <TableCell style={{ textAlign: "end", fontSize: '1.3rem' }}>
                      <Button variant="outlined" color="error" onClick={() => deleteAccess(decentralization.access.roleName, decentralization.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
}
export default AdminAccess;
