import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AccountAddress from "./AccountAddress";
import AccountDetail from "./AccountDetail";
import AccountHeader from "./AccountHeader";
import AccountOrder from "./AccountOrder";
import AccountProductHistory from "./AccountProductHistory";
import "./css/style.scss";
import SidebarAccountHistory from "./SideBar";

const AccountHistory = () => {
  /*------- Page function -------*/
  const [activeIndex, setActiveIndex] = useState(null);
  const [menuActive, setMenuActive] = useState(false);
  const [activeComponent, setActiveComponent] = useState({
    name: "AccountDetail",
    props: {},
  });

  const handleMouseOver = (index) => {
    setActiveIndex(index);
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
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
      case "AccountDetail":
        return <AccountDetail setActiveComponent={setActiveComponent} />;
      case "AccountProductHistory":
        return (
          <AccountProductHistory setActiveComponent={setActiveComponent} />
        );
      case "AccountAddress":
        return <AccountAddress setActiveComponent={setActiveComponent} />;
      case "AccountOrder":
        return <AccountOrder setActiveComponent={setActiveComponent} />;
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
    <div className="account-history">
      <div className="container">
        <SidebarAccountHistory
          activeIndex={activeIndex}
          handleMouseOver={handleMouseOver}
          setActiveComponent={setActiveComponent}
          setMenuActive={setMenuActive}
        />

        <div className={`main ${menuActive ? "active" : ""}`}>
          <AccountHeader toggleMenu={toggleMenu} menuActive={menuActive} />

          {getActiveComponent(activeComponent)}
        </div>
      </div>
    </div>
  );
};

export default AccountHistory;
