import { useEffect, useState } from "react";
import { deleteCategoryId, getAllCategory } from "../../../Serivce/ApiService";
import "./assets/css/style.scss";
import { getAllProducts } from "./service/AdminService";
function AdminCategory({ setActiveComponent, showAlert }) {
  /*------- Page function -------*/
  const [activeIndex, setActiveIndex] = useState(null);
  const [menuActive, setMenuActive] = useState(false);

  const handleMouseOver = (index) => {
    setActiveIndex(index);
  };

  const toggleMenu = () => {
    setMenuActive((prev) => !prev); // Correctly toggle the state
  };

  // Category: Load List of Users when component mounts

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, []);

  // Category: Handle search bar

  const handleInputSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredUsers = category.filter((category) =>
      category.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  //Category: Check category exist
  const checkCategoryNameExists = (name) => {
    return products.some(
      (product) =>
        product.category.categoryName.toLowerCase() === name.toLowerCase()
    );
  };

  /*------- Database function -------*/
  // Set element User

  const [category, setCategory] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState("");

  // GET: Get User by id from Database

  const loadCategories = async () => {
    try {
      const result = await getAllCategory();
      setCategory(result.data);
      setFilteredUsers(result.data); // Initialize filteredUsers with all category
    } catch (error) {
      console.error("Failed to load category:", error);
    }
  };

  // GET: Get list of product from Database
  const loadProducts = async () => {
    try {
      const result = await getAllProducts();
      setProducts(result.data);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  // DELETE: Delete User by id from Database
  const handleDelete = async (id, name) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      if (checkCategoryNameExists(name)) {
        alert(
          "This manufacturer is associated with existing products. Cannot delete."
        );
        setActiveComponent({
          name: "AdminProduct",
        });
      } else {
        try {
          await deleteCategoryId(id)
          showAlert("Delete category successfully", "success");
          loadCategories(); // Reload categories after delete
        } catch (error) {
          showAlert("Failed to delete category successfully", "error");
          console.error("Error deleting category:", error);
        }
      }
    }
  };
  return (
    <div>
      {/* ================ Order Details List ================= */}
      <div className="details_table details">
        <div className="table recentOrders">
          <div className="cardHeader">
            <h2>Recent Category</h2>
            <a
              href="#"
              className="btn"
              onClick={() =>
                setActiveComponent({
                  name: "AdminAddCategory",
                })
              }
            >
              + Add new Category
            </a>
          </div>
          <table>
            <thead>
              <tr>
                <th scope="col" style={{ textAlign: "start" }}>
                  Id
                </th>
                <th scope="col" style={{ textAlign: "start" }}>
                  Category Image
                </th>
                <th scope="col" style={{ textAlign: "start" }}>
                  Category Name
                </th>

               
                <th scope="col" style={{ textAlign: "end" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((category, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "start" }}>{category.id}</td>
                  <td style={{ textAlign: "start" }}>
                    <img
                      src={category.imageCloud.url}
                      alt={category.name}
                      width="50"
                      style={{ objectFit: "cover" }} // Optional: Adjust image fit within the width
                    />
                  </td>
                  <td style={{ textAlign: "start" }}>{category.name}</td>
                  <td style={{ textAlign: "end" }}>
                  <button
                      className="status viewing mx-2"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminViewCategory",
                          props: { id: category.id },
                        })
                      }
                    >
                     View
                    </button>
                  <button
                      className="status editing mx-2"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminEditCategory",
                          props: { id: category.id },
                        })
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="status deleting mx-2"
                      onClick={() =>
                        handleDelete(category.id, category.categoryName)
                      }
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
                    No category found
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
export default AdminCategory;
