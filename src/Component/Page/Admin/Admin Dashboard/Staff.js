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
    <div >
 
      {/* ================ Order Details List ================= */}
      <div className="details_table details">
        <div className="table recentOrders">
          <div className="cardHeader">
            <h2>Recent Employee</h2>
            <a
              href="#"
              className="btn"
              onClick={() => setActiveComponent({name:"AdminAddStaff"})}
            >
              + Add new Staff
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
                  Mobile
                </th>
                <th scope="col" style={{ textAlign: "end" }}>
                  Email
                </th>
          
                <th scope="col" style={{ textAlign: "end" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "start" }}>{user.id}</td>
                  <td style={{ textAlign: "start" }}>{user.fullname}</td>
                  <td style={{ textAlign: "end" }}>{user.mobile}</td>
                  <td style={{ textAlign: "end" }}>{user.email}</td>
                  
                  <td style={{ textAlign: "end" }}>
                    <button
                     className="status viewing mx-2"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminViewStaff",
                          props: { id: user.id },
                        })
                      }


            
                    >
                      View
                    </button>

                    <button
                      className="status editing mx-2"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminEditStaff",
                          props: { id: user.id },
                        })
                      }
                    >
                      Edit
                    </button>
                    <button className="status deleting mx-2"
                    onClick={()=>handleDelete(user.id)}
                    >Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
export default AdminStaff;
