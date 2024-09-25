import { useEffect, useState } from "react";
import { deleteManufactuereId, getAllManufacturer, getAllProduct } from "../../../Serivce/ApiService";
import "./assets/css/style.scss";
function AdminManufacturer({ setActiveComponent, showAlert }) {
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
    loadManufacturers();
    loadProducts();
  }, []);

  // Customer: Handle search bar

  const handleInputSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredUsers = manufacturer.filter((manufacturer) =>
      manufacturer.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  //Category: Check manufacturer exist
  const checkManufacturerNameExists = (name) => {
    return products.some(
      (product) =>
        product.manufacturer.manufacturerName.toLowerCase() ===
        name.toLowerCase()
    );
  };
  /*------- Database function -------*/
  // Set element User

  const [manufacturer, setManufacturer] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  // GET: Get User by id from Database

  const loadManufacturers = async () => {
    try {
      const result = await getAllManufacturer()
      setManufacturer(result.data);
      setFilteredUsers(result.data); // Initialize filteredUsers with all manufacturer
    } catch (error) {
      console.error("Failed to load manufacturer:", error);
    }
  };

  // GET: Get list of product from Database
  const loadProducts = async () => {
    try {
      const result = await getAllProduct()
      setProducts(result.data);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  // DELETE: Delete User by id from Database
  const handleDelete = async (id, name) => {
    if (window.confirm("Are you sure you want to delete this manufacturer?")) {
      if (checkManufacturerNameExists(name)) {
        alert(
          "This manufacturer is associated with existing products. Cannot delete."
        );

        showAlert(
          "This manufacturer is associated with existing products. Cannot delete.",
          "warn"
        );
        setTimeout(() => setActiveComponent({ name: "AdminProduct" }), 1000);
      } else {
        try {
          await deleteManufactuereId(id)
          showAlert("Delete manufacturer successfully", "success");
          setTimeout(() => loadManufacturers(), 1000);
        } catch (error) {
          showAlert("Failed to delete manufacturer successfully", "success");
          console.error("Error deleting image:", error);
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
            <h2>Recent Manufacturer</h2>
            <a
              href="#"
              className="btn"
              onClick={() =>
                setActiveComponent({
                  name: "AdminAddManufacturer",
                })
              }
            >
              + Add new Manufacturer
            </a>
          </div>
          <table>
            <thead>
              <tr>
                <th scope="col" style={{ textAlign: "start" }}>
                  Id
                </th>
                <th scope="col" style={{ textAlign: "start" }}>
                  Image
                </th>
                <th scope="col" style={{ textAlign: "start" }}>
                  Name
                </th>
                <th scope="col" style={{ textAlign: "start" }}>
                  Email
                </th>
                <th scope="col" style={{ textAlign: "start" }}>
                  Website
                </th>
               
                <th scope="col" style={{ textAlign: "end" }}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((manufacturer, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "start" }}>{manufacturer.id}</td>
                  <td style={{ textAlign: "start" }}>
                    <img
                      src={manufacturer.imageCloud.url}
                      alt={manufacturer.name}
                      width="50"
                      style={{ objectFit: "cover" }} // Optional: Adjust image fit within the width
                    />
                  </td>
                  <td style={{ textAlign: "start" }}>{manufacturer.name}</td>
                  <td style={{ textAlign: "start" }}>{manufacturer.email}</td>
                  <td style={{ textAlign: "start" }}>
                    <a
                      href={manufacturer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {manufacturer.website}
                    </a>
                  </td>

                

                  <td style={{ textAlign: "end" }}>
                  <button
                      className="status viewing mx-2"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminViewManufacturer",
                          props: { id: manufacturer.id },
                        })
                      }
                    >
                      View
                    </button>


                  <button
                      className="status editing mx-2"
                      onClick={() =>
                        setActiveComponent({
                          name: "AdminEditManufacturer",
                          props: { id: manufacturer.id },
                        })
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="status deleting mx-2"
                      onClick={() =>
                        handleDelete(
                          manufacturer.id,
                          manufacturer.manufacturerName
                        )
                      }
                    >
                      Delete Manufacturer
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
                    No manufacturer found
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
export default AdminManufacturer;
