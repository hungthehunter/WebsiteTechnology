import { IonIcon } from "@ionic/react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import {
  cartOutline,
  cashOutline,
  chatbubblesOutline,
  eyeOutline,
  personCircleOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllOrder, getAllUser } from "../../../Serivce/ApiService";
import "./assets/css/style.scss";

function AdminDashboard() {
  /*------- Page function -------*/
  const [activeIndex, setActiveIndex] = useState(null);
  const [menuActive, setMenuActive] = useState(true);
  const [activeComponent, setActiveComponent] = useState("defaultComponent");
  const listUser = useSelector((state) => state.user.listUser);
  const listOrder = useSelector((state) => state.order.listOrder);
  const handleMouseOver = (index) => {
    setActiveIndex(index);
  };
  const formatOrderStatus = (status) => {
    // Tách trước chữ hoa và thêm khoảng trắng
    return status.replace(/([a-z])([A-Z])/g, "$1 $2");
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
    const filteredUsers = users.filter(
      (user) =>
        user.username &&
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
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
      const usersResult = await getAllUser();
      const ordersResult = await getAllOrder();

      setUsers(usersResult.data);
      setFilteredUsers(usersResult.data);

      // If orders include nested objects for product and order status, we assume they are already resolved
      setOrders(ordersResult.data);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      {/* ======================= Cards ================== */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: 500, fontSize: "2.5rem", color: "#2a2185" }}
              >
                1,504
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#999", fontSize: "1.5rem", marginTop: 1 }}
              >
                Daily Views
              </Typography>
              <IonIcon
                icon={eyeOutline}
                style={{ fontSize: "4rem", color: "#999" }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: 500, fontSize: "2.5rem", color: "#2a2185" }}
              >
                80
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#999", fontSize: "1.5rem", marginTop: 1 }}
              >
                Sales
              </Typography>
              <IonIcon
                icon={cartOutline}
                style={{ fontSize: "4rem", color: "#999" }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: 500, fontSize: "2.5rem", color: "#2a2185" }}
              >
                284
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#999", fontSize: "1.5rem", marginTop: 1 }}
              >
                Comments
              </Typography>
              <IonIcon
                icon={chatbubblesOutline}
                style={{ fontSize: "4rem", color: "#999" }}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: 500, fontSize: "2.5rem", color: "#2a2185" }}
              >
                $7,842
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#999", fontSize: "1.5rem", marginTop: 1 }}
              >
                Earning
              </Typography>
              <IonIcon
                icon={cashOutline}
                style={{ fontSize: "4rem", color: "#999" }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ================ Order Details List ================= */}
      <Box sx={{ display: "flex", marginTop: 4, gap: 2 }}>
        {" "}
        {/* Thêm gap giữa hai Box */}
        <Box
          sx={{
            flex: 2,
            background: "#fff",
            padding: 2,
            borderRadius: 2,
            boxShadow: 1,
            display: "flex",
            flexDirection: "column",
            height: "65vh",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#2a2185" }}>
            Recent Orders
          </Typography>
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Payment</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listOrder.map((order, orderIndex) =>
                  order?.orderItem?.map((item, itemIndex) => (
                    <TableRow key={`${orderIndex}-${itemIndex}`}>
                      <TableCell>
                        <img
                          src={`${
                            item.product.product_image.find((img) => img.mainImage)
                              ?.url || ""
                          }`}
                          alt={item.productName}
                          style={{ width: "50px", height: "50px" }}
                        />
                      </TableCell>
                      <TableCell>{item.product.productName}</TableCell>
                      <TableCell>${order.total_price.toFixed(2)}</TableCell>
                      <TableCell>
                        {order.order_status === "Shipped" ? "Pay" : "Due"}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`status ${
                            order.order_status
                              ? order.order_status.toLowerCase()
                              : ""
                          }`}
                        >
                          {order.order_status
                            ? formatOrderStatus(order.order_status)
                            : "Unknown"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Box>
        </Box>
        {/* ================= New Customers ================ */}
        <Box
          sx={{
            flex: 1,
            background: "#fff",
            padding: 2,
            borderRadius: 2,
            boxShadow: 1,
            display: "flex",
            flexDirection: "column",
            height: "65vh",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, color: "#2a2185" }}>
            Recent Customers
          </Typography>
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            <Table>
              <TableBody>
                {listUser.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell width="60px">
                      <div className="imgBx">
                        <IonIcon
                          icon={personCircleOutline}
                          style={{ fontSize: "4rem" }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">
                        {user.fullname} <br /> <span>{user.email}</span>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
                {listUser.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={2} style={{ textAlign: "center" }}>
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default AdminDashboard;
