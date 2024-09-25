import { TabPanel } from "@mui/lab";
import TabContext from "@mui/lab/TabContext";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import { getEmployeeById, getUserLogged, updateOrderById } from "../../Serivce/ApiService";
import "./css/style.scss";

const AccountOrder = ({ setActiveComponent }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [menuActive, setMenuActive] = useState(false);
  const [value, setValue] = useState("1"); // Set default value to "1"
  const [user, setUser] = useState();
  const [userId, setUserId] = useState("");
  const [historyProducts, setHistoryProducts] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMouseOver = (index) => {
    setActiveIndex(index);
  };

  const toggleMenu = () => {
    setMenuActive((prev) => !prev);
  };

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      loadUserHistoryProduct();
    }
  }, [userId]);

  const fetchUserId = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found. User must be logged in.");
      return;
    }
    try {
      const response = await getUserLogged(token)
      setUserId(response.data.id);
      setUser(response.data);
      console.log("Đây là id user", response.data.id);
    } catch (error) {
      console.error("Failed to fetch user information:", error);
    }
  };

  const loadUserHistoryProduct = async () => {
    try {
      const result = await getEmployeeById(userId);
      setHistoryProducts(result.data.purchase_history);
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  const handleUpdate = async (id) => {

    if (!id || isNaN(id)) {
      console.error("Invalid ID:", id);
      alert("Invalid order ID. Please try again.");
      return;
    }
    const updatedOrder = {
      order_status: "Return",
    };

    try {
      const response = await updateOrderById(id,updatedOrder);
      if (response.status === 200) {
        alert("Product updated successfully");
        loadUserHistoryProduct();
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update Product");
      console.log(updatedOrder);
    }
  };

  const renderProductTable = (title, statusFilter) => {
    // Lọc các sản phẩm theo trạng thái đơn hàng nếu có
    const filteredHistoryProducts = historyProducts.filter(
      (historyProduct) =>
        !statusFilter ||
        historyProduct.orders.order_status.toLowerCase() === statusFilter
    );

    return (
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
                Consignee Name
              </th>
              <th scope="col" style={{ textAlign: "end" }}>
                Delivery Date
              </th>
              <th scope="col" style={{ textAlign: "end" }}>
                Receipt Date
              </th>
              <th scope="col" style={{ textAlign: "end" }}>
                Note
              </th>
              <th scope="col" style={{ textAlign: "end" }}>
                Consignee Email
              </th>
              <th scope="col" style={{ textAlign: "end" }}>
                Consignee Mobile
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
            {filteredHistoryProducts.length > 0 ? (
              filteredHistoryProducts.map((historyProduct, index) => (
                <tr key={index}>
                  <td style={{ textAlign: "start" }}>{historyProduct.id}</td>
                  <td style={{ textAlign: "start" }}>{user.fullname}</td>
                  <td style={{ textAlign: "end" }}>
                    {historyProduct.orders.delivery_date}
                  </td>
                  <td style={{ textAlign: "end" }}>
                    {historyProduct.orders.receipt_date}
                  </td>
                  <td style={{ textAlign: "end" }}>
                    {historyProduct.orders.note}
                  </td>
                  <td style={{ textAlign: "end" }}>{user.email}</td>
                  <td style={{ textAlign: "end" }}>{user.mobile}</td>
                  <td style={{ textAlign: "end" }}>
                    <span
                      className={`status ${historyProduct.orders.order_status.toLowerCase()}`}
                    >
                      {historyProduct.orders.order_status}
                    </span>
                  </td>

                  <td style={{ textAlign: "end" }}>
                    {historyProduct.orders.order_status.toLowerCase() ===
                    "return" ? (
                      <button className="status canceling mx-2" disabled>
                      Canceling
                    </button>

                    
                    ) : (
                      <button
                      className="status deleting mx-2"
                      onClick={() => handleUpdate(historyProduct.orders.id)}
                    >
                      Delete
                    </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center" }}>
                  No product was found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

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
                  <Tab label="ALL" className="tab-title" value="1" />
                  <Tab label="In Progress" className="tab-title" value="2" />
                  <Tab label="Return" className="tab-title" value="3" />
                  <Tab label="Shipped" className="tab-title" value="4" />
                </Tabs>
              </Box>
              <TabPanel value="1">{renderProductTable("All Orders")}</TabPanel>
              <TabPanel value="2">
                {renderProductTable("In Progress Orders", "inprogress")}
              </TabPanel>
              <TabPanel value="3">
                {renderProductTable("Return Orders", "return")}
              </TabPanel>
              <TabPanel value="4">
                {renderProductTable("Shipped Orders", "shipped")}
              </TabPanel>
            </TabContext>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default AccountOrder;
