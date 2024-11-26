import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminAccess from "./Access";
import AdminAddAccess from "./AddAccess";
import AdminAddCategory from "./AddCategory";
import AdminAddCustomer from "./AddCustomer";
import AdminAddManufacturer from "./AddManufacturer";
import AdminAddProduct from "./AddProduct";
import AdminAddStaff from "./AddStaff";
import "./assets/css/style.scss";
import AdminCategory from "./Category";
import AdminChart from "./Chart";
import AdminCustomer from "./Customer";
import AdminDashboard from "./Dashboard";
import AdminEditAccess from "./EditAccess";
import AdminEditCategory from "./EditCategory";
import AdminEditCustomer from "./EditCustomer";
import AdminEditManufacturer from "./EditManufacturer";
import AdminEditOrder from "./EditOrder";
import AdminEditProduct from "./EditProduct";
import AdminEditStaff from "./EditStaff";
import AdminHeader from "./Header";
import AdminManufacturer from "./Manufacturer";
import AdminOrder from "./Order";
import AdminProduct from "./Product";
import AdminRole from "./Role";
import SidebarAdmin from "./Sidebar";
import AdminStaff from "./Staff";
import AdminViewCategory from "./ViewCategory";
import AdminViewCustomer from "./ViewCustomer";
import AdminViewManufacturer from "./ViewManufacturer";
import AdminViewProduct from "./ViewProduct";
import AdminViewStaff from "./ViewStaff";
function AdminPage() {
  /*------- Page function -------*/
  const [activeIndex, setActiveIndex] = useState(null);
  const [menuActive, setMenuActive] = useState(false);
  const [activeComponent, setActiveComponent] = useState({
    name: "AdminDashboard",
    props: {},
  });

  const handleMouseOver = (index) => {
    setActiveIndex(index);
  };

  // Snackbar alert state
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // "success" or "error"
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const showAlert = (message, type) => {
    setAlertMessage(message);
    setAlertType(type);
    setOpenSnackbar(true);
  };

  // Dashboard: Load List of User when component mounts

  useEffect(() => {
    loadUsers();
  }, []);

  // Dashboard: Handle search bar

  const handleInputSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  };

  // Dashboard: Handle change main page

  const getActiveComponent = () => {
    switch (activeComponent.name) {
      case "AdminDashboard":
        return <AdminDashboard />;
      case "AdminCustomer":
        return (
          <AdminCustomer
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );
      case "AdminOrder":
        return (
          <AdminOrder
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );
      case "AdminProduct":
        return (
          <AdminProduct
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );
      case "AdminStaff":
        return (
          <AdminStaff
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );
      case "AdminAddCustomer":
        return (
          <AdminAddCustomer
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );
      case "AdminCategory":
        return (
          <AdminCategory
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );
      case "AdminManufacturer":
        return (
          <AdminManufacturer
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );
      case "AdminAddManufacturer":
        return (
          <AdminAddManufacturer
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );

      case "AdminEditManufacturer":
        return (
            <AdminEditManufacturer
              id={activeComponent.props.id}
              setActiveComponent={setActiveComponent}
              showAlert={showAlert}
            />
          );
          case "AdminViewManufacturer":
            return (
                <AdminViewManufacturer
                  id={activeComponent.props.id}
                  setActiveComponent={setActiveComponent}
                  showAlert={showAlert}
                />
              );
      
      

      case "AdminViewCustomer":
        return (
          <AdminViewCustomer
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );
      case "AdminEditCustomer":
        return (
          <AdminEditCustomer
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );
      case "AdminViewProduct":
        return (
          <AdminViewProduct
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );

        case "AdminViewCategory":
          return (
            <AdminViewCategory
              id={activeComponent.props.id}
              setActiveComponent={setActiveComponent}
              showAlert={showAlert}
            />
          );
      case "AdminEditProduct":
        return (
          <AdminEditProduct
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );
      case "AdminAddProduct":
        return (
          <AdminAddProduct
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );
        
      case "AdminEditCategory":
        return (
          <AdminEditCategory
          id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );

      case "AdminEditOrder":
        return (
          <AdminEditOrder
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );

      case "AdminAddStaff":
        return (
          <AdminAddStaff
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );
      case "AdminViewStaff":
        return (
          <AdminViewStaff
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );

      case "AdminEditStaff":
        return (
          <AdminEditStaff
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );
      case "AdminAddCategory":
        return (
          <AdminAddCategory
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );
      case "AdminChart":
        return (
          <AdminChart
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );
      case "AdminAccess":
        return (
          <AdminAccess
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );
      case "AdminAddAccess":
        return (
          <AdminAddAccess
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );
      case "AdminEditAccess":
        return (
          <AdminEditAccess
            id={activeComponent.props.id}
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );

      case "AdminRole":
        return (
          <AdminRole
            setActiveComponent={setActiveComponent}
            showAlert={showAlert}
          />
        );

      default:
        return <div>Component not found</div>;
    }
  };

  /*------- Database function -------*/
  // Set element User

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // GET: List of User from Database

  const loadUsers = async () => {
    try {
      const result = await axios.get(
        "http://localhost:8080/api/v1/admin/listUsers"
      );
      setUsers(result.data);
      setFilteredUsers(result.data); // Initialize filteredUsers with all users
    } catch (error) {
      console.error("Failed to load users:", error);
    }
  };

  // GET: Current User Logged or No validation
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);

    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (!token) {
        alert("PLEASE LOGIN BEFORE CONTINUING");
        navigate("/websiteDoAn/Login");
      }
    }
  }, [navigate]); // Removed location from dependencies

  return (
    <div className="adminDashboard">
      <div className="container">
        <SidebarAdmin
          activeIndex={activeIndex}
          handleMouseOver={handleMouseOver}
          setActiveComponent={setActiveComponent}
          setMenuActive={menuActive}
        />

        <div className={`main ${menuActive ? "active" : ""}`}>
          <AdminHeader
            toggleMenu={toggleMenu}
            menuActive={menuActive}
            openSnackbar={openSnackbar}
            alertMessage={alertMessage}
            alertType={alertType}
            handleCloseSnackbar={handleCloseSnackbar}
          />

          {getActiveComponent(activeComponent)}
        </div>
      </div>
    </div>
  );
}
export default AdminPage;
