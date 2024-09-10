import axios from "axios";
import { useEffect, useState } from "react";
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
    const result = await axios.get("http://localhost:8080/api/roles");
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
  <div>
    {/* ================ Order Details List ================= */}
    <div className="details_table details">
      <div className="table recentOrders">
        <div className="cardHeader">
          <h2>Recent Access</h2>
          <a
            href="#"
            className="btn"
            onClick={() =>
              setActiveComponent({
                name: "AdminAddAccess"
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
            {functions.map((function_role, index) => (
              <tr key={index}>
                    <td style={{ textAlign: "start" }}>{function_role.id}</td>
                <td style={{ textAlign: "start" }}>{function_role.roleName}</td>
                <td style={{ textAlign: "end" }}>
                  <button
                    className="status viewing mx-2"
                    onClick={() =>
                      setActiveComponent({
                        name: "AdminViewProduct",
                        props: { id: function_role.id },
                      })
                    }
                  >
                    View
                  </button>

                  <button
                    className="status editing mx-2"
                    onClick={() =>
                      setActiveComponent({
                        name: "AdminEditProduct",
                        props: { id: function_role.id },
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="status deleting mx-2"
                    onClick={() => handleDelete(function_role.id)}
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
}
export default AdminRole;