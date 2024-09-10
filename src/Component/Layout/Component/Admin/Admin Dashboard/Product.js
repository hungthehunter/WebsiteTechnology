import axios from "axios";
import { useEffect, useState } from "react";
import "./assets/css/style.scss";
function AdminProduct({ setActiveComponent ,showAlert}) {
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
    const filteredUsers = products.filter((product) =>
      product.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  /*------- Database function -------*/
  // Set element User

  const [products, setProducts] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // GET: Get Product by id from Database

  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/products");
      setProducts(result.data);
      setFilteredUsers(result.data); // Initialize filteredUsers with all users
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  // DELETE: Delete User by id from Database
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        await axios.delete(`http://localhost:8080/api/products/${id}`);

        showAlert("Delete product successfully.","success");
        loadUsers();
      } catch (error) {
        console.error("Error deleting Product:", error);
        showAlert("Failed to delete product successfully.","error");
      }
    }
  };
  return (
    <div>
      {/* ================ Order Details List ================= */}
      <div className="details_table details">
        <div className="table recentOrders">
          <div className="cardHeader">
            <h2>Recent Product</h2>
            <a
              href="#"
              className="btn"
              onClick={() =>
                setActiveComponent({
                  name: "AdminAddProduct"
                })
              }
            >
              + Add new Product
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
                  Price
                </th>
                <th scope="col" style={{ textAlign: "end" }}>
                  quantity
                </th>
                <th scope="col" style={{ textAlign: "end" }}>
                  Status
                </th>
                <th scope="col" style={{ textAlign: "end" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((product, index) => (
                <tr key={index}>
                      <td style={{ textAlign: "start" }}>{product.id}</td>
                  <td style={{ textAlign: "start" }}>{product.productName}</td>
                  <td style={{ textAlign: "end" }}>${product.unitPrice}</td>
                  <td style={{ textAlign: "end" }} >{product.unitInStock}</td>
                  <td style={{ textAlign: "end" }} >
                 

                    <span  className={`status ${product.unitInStock > 0 ? "inprogress" : "deleting"}`}> {product.unitInStock > 0 ? "In stock" : "out of stock"}</span>
                   
                  </td>
                  <td style={{ textAlign: "end" }}>
                    <button
                      className="status viewing mx-2"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminViewProduct",
                          props: { id: product.id },
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
                          props: { id: product.id },
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="status deleting mx-2"
                      onClick={() => handleDelete(product.id)}
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
export default AdminProduct;
