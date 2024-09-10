import { TabPanel } from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import axios from "axios";
import { useEffect, useState } from "react";
import "./assets/css/style.scss";
import { deleteDecentralization, getAllDecentralization, getUser } from './service/AdminService';
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
      const response = await getUser();
      setUsers(response.data);
    } catch (error) {
      alert("Error loading user");
    }
  }

  // GET: Get Product by id from Database

  const loadFunction = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/functions");
      
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
        await axios.delete(`http://localhost:8080/api/functions/${id}`);
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
              + Add New Access
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
  return (
    <div>
      <div className="details_table details">
        <div className="table recentOrders">
          <Box sx={{ width: "100%" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  variant="fullWidth"
                  value={value}
                  onChange={handleChange}
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  <Tab label="ALL ACCESS" className="tab-title" value="1" />
                  <Tab label="ALL DECENTRALIZATION" className="tab-title" value="2" />
           
                </Tabs>
              </Box>
              <TabPanel value="1">
                {renderProductTableAccess("ALL ACCESS")}
              </TabPanel>
              <TabPanel value="2">
                {renderProductTableRole("ALL DECENTRALIZATION")}
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
}
export default AdminAccess;
