import { IonIcon } from "@ionic/react";
import axios from "axios";
import {
  cartOutline,
  cashOutline,
  chatbubblesOutline,
  eyeOutline,
  personCircleOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import "./assets/css/style.scss";

function AdminDashboard() {
  /*------- Page function -------*/
  const [activeIndex, setActiveIndex] = useState(null);
  const [menuActive, setMenuActive] = useState(false);
  const [activeComponent, setActiveComponent] = useState("defaultComponent");
  const handleMouseOver = (index) => {
    setActiveIndex(index);
  };
  const formatOrderStatus = (status) => {
    // Tách trước chữ hoa và thêm khoảng trắng
    return status.replace(/([a-z])([A-Z])/g, '$1 $2');
  };
  
  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  // Dashboard: Load List of User when component mounts

  useEffect(() => {
    fetchData();
  }, []);

  // Dashboard: Handle search bar

  const handleInputSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredUsers = users.filter((user) =>
      user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  /*------- Database function -------*/
  // Set element User

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Set element Order
  const [orders, setOrders] = useState([]);

  // GET: List of User from Database And List of Order from Database
  const fetchData = async () => {
    try {
      const usersResult = await axios.get(
        "http://localhost:8080/api/v1/admin/listUsers"
      );
      const ordersResult = await axios.get("http://localhost:8080/api/orderDetails");

      setUsers(usersResult.data);
      setFilteredUsers(usersResult.data);

      // If orders include nested objects for product and order status, we assume they are already resolved
      setOrders(ordersResult.data);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  return (
    <div>
      {/* ======================= Cards ================== */}
      <div className="cardBox">
        <div className="card">
          <div>
            <div className="numbers">1,504</div>
            <div className="cardName">Daily Views</div>
            <div className="iconBx">
              <IonIcon icon={eyeOutline} style={{ fontSize: "4rem" }} />
            </div>
          </div>
        </div>
        <div className="card">
          <div>
            <div className="numbers">80</div>
            <div className="cardName">Sales</div>
          </div>
          <div className="iconBx">
            <IonIcon icon={cartOutline} style={{ fontSize: "4rem" }} />
          </div>
        </div>
        <div className="card">
          <div>
            <div className="numbers">284</div>
            <div className="cardName">Comments</div>
          </div>
          <div className="iconBx">
            <IonIcon icon={chatbubblesOutline} style={{ fontSize: "4rem" }} />
          </div>
        </div>
        <div className="card">
          <div>
            <div className="numbers">$7,842</div>
            <div className="cardName">Earning</div>
          </div>
          <div className="iconBx">
            <IonIcon icon={cashOutline} style={{ fontSize: "4rem" }} />
          </div>
        </div>
      </div>
      {/* ================ Order Details List ================= */}
      <div className="details">
        <div className="recentOrders">
          <div className="cardHeader">
            <h2>Recent Orders</h2>
            <a href="#" className="btn">
              View All
            </a>
          </div>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Price</td>
                <td>Payment</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {orders.map((detail,index) =>
                  <tr key={index}>
                    <td>{detail.product.productName}</td>
                    <td>${detail.unitPrice}</td>
                    <td>{detail.order.orderStatus === "Shipped" ? "Due":"Pay" }</td>
                    <td>
                      <span
                        className={`status ${detail.order.order_status ? detail.order.order_status.toLowerCase() : ''}`}
                      >
                        { detail.order.order_status ? formatOrderStatus(detail.order.order_status) : 'Unknown'}
                      </span>
                    </td>
                  </tr>
                
              )}

              <tr>
                <td>Apple Watch</td>
                <td>$1200</td>
                <td>Paid</td>
                <td>
                  <span className="status return">Return</span>
                </td>
              </tr>
              <tr>
                <td>Addidas Shoes</td>
                <td>$620</td>
                <td>Due</td>
                <td>
                  <span className="status inprogress">In Progress</span>
                </td>
              </tr>
            
              <tr>
                <td>Dell Laptop</td>
                <td>$110</td>
                <td>Due</td>
                <td>
                  <span className="status pending">Pending</span>
                </td>
              </tr>
              <tr>
                <td>Apple Watch</td>
                <td>$1200</td>
                <td>Paid</td>
                <td>
                  <span className="status return">Return</span>
                </td>
              </tr>
              <tr>
                <td>Addidas Shoes</td>
                <td>$620</td>
                <td>Due</td>
                <td>
                  <span className="status inprogress">In Progress</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* ================= New Customers ================ */}
        <div className="recentCustomers">
          <div className="cardHeader">
            <h2>Recent Customers</h2>
          </div>
          <table>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td width="60px">
                    <div className="imgBx">
                      <IonIcon
                        icon={personCircleOutline}
                        style={{ fontSize: "4rem" }}
                      />

                      {/* <img src="assets/imgs/customer02.jpg" alt="" /> */}
                    </div>
                  </td>
                  <td>
                    <h4>
                      {user.fullname} <br /> <span>{user.email}</span>
                    </h4>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr className="nouser">
                  <td style={{ display: "block", textAlign: "center" }}>
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
export default AdminDashboard;
