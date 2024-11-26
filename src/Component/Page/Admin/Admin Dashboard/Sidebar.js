import { IonIcon } from "@ionic/react";
import {
  cashOutline,
  desktopOutline,
  gridOutline,
  homeOutline,
  idCardOutline,
  logOutOutline,
  manOutline,
  peopleOutline,
  shieldOutline,
  statsChartOutline,
} from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { BsNvidia } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getUserLogged } from "../../../Serivce/ApiService";

const SidebarAdmin = ({
  activeIndex,
  menuActive,
  handleMouseOver,
  setActiveComponent,
}) => {
  /*------- Page function -------*/

  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFunctions, setUserFunctions] = useState([]);
  const navigate = useNavigate();

  const functionMap = {
    // New
    /* Customer */
    "View Customer List": "AdminCustomer",
    "Create Customer": "AdminAddCustomer",
    "Edit Customer": "AdminEditCustomer",
    "Delete Customer": "AdminDeleteCustomer",

    /* Product */
    "View Product List": "AdminProduct",
    "Create Product": "AdminAddProduct",
    "Edit Product": "AdminEditProduct",
    "Delete Product": "AdminDeleteProduct",

    /* Access */
    "View Access List": "AdminAccess",
    "Create Access": "AdminAddAccess",
    "Edit Access": "AdminEditAccess",
    "Delete Access": "AdminDeleteAccess",

    /* Staff */
    "View Staff List": "AdminStaff",
    "Create Staff": "AdminAddStaff",
    "Edit Staff": "AdminEditStaff",
    "Delete Staff": "AdminDeleteStaff",

    /* Order */
    "View Order List": "AdminOrder",
    "Create Order": "AdminAddOrder",
    "Edit Order": "AdminEditOrder",
    "Delete Order": "AdminDeleteOrder", 

    /* Manufacturer */
    "View Manufacturer List": "AdminManufacturer",
    "Create Manufacturer": "AdminAddManufacturer",
    "Edit Manufacturer": "AdminEditManufacturer",
    "Delete Manufacturer": "AdminDeleteManufacturer",

    /* Category */
    "View Category List": "AdminCategory",
    "Create Category": "AdminAddCategory",
    "Edit Category": "AdminEditCategory",
    "Delete Category": "AdminDeleteCategory",  

    /* Dash board and Chart */
    "View Dashboard": "AdminDashboard",
    "View Chart":"AdminChart"
    
  };

  // Define sidebar items with mapping to components
  const sidebarItems = [
    {
      icon: statsChartOutline,
      title: "Chart",
      link: "/websiteDoAn/AdminChart",
      component: "AdminChart",
    },
    {
      icon: homeOutline,
      title: "Dashboard",
      link: "/websiteDoAn/AdminDashboard",
      component: "AdminDashboard",
    },
    {
      icon: peopleOutline,
      title: "Customers",
      link: "/websiteDoAn/AdminCustomer",
      component: "AdminCustomer",
    },
    {
      icon: desktopOutline,
      title: "Product",
      link: "/websiteDoAn/AdminProduct",
      component: "AdminProduct",
    },
    {
      icon: cashOutline,
      title: "Order",
      link: "/websiteDoAn/AdminOrder",
      component: "AdminOrder",
    },
    {
      icon: manOutline,
      title: "Employee",
      link: "/websiteDoAn/AdminStaff",
      component: "AdminStaff",
    },
    {
      icon: gridOutline,
      title: "Category",
      link: "/websiteDoAn/AdminCategory",
      component: "AdminCategory",
    },
    {
      icon: idCardOutline,
      title: "Manufacturer",
      link: "/websiteDoAn/AdminManufacturer",
      component: "AdminManufacturer",
    },
    {
      icon: shieldOutline,
      title: "Access",
      link: "/websiteDoAn/AdminAccess",
      component: "AdminAccess",
    },
  ];

  /* Login out */

  const handleLoginLogout = () => {
    if (isLoggedIn) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userEmail"); // Remove the email from local storage
      setIsLoggedIn(false);
      setEmail(""); // Clear the email
      navigate("/websiteDoAn/Login"); // Navigate to login after logout
    } else {
      navigate("/websiteDoAn/Login");
    }
  };

  // Get User by Id
  const location = useLocation();
  const [userId, getUserId] = useState({});
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    GetUserAccount(token);
  }, [location]);

  const GetUserAccount = async (token) => {
    try {
      const result = await getUserLogged(token)
      getUserId(result.data);
      setUserFunctions(
        result.data.decentralization.functionIds.map(
          (func) => func.functionName
        )
      );
    } catch (error) {
      console.error("Failed to load User:", error);
    }
  };

  // Filter sidebar items based on user functions
  const filteredSidebarItems = sidebarItems.filter((item) =>
    userFunctions.includes(
      Object.keys(functionMap).find(
        (key) => functionMap[key] === item.component
      )
    )
  );

  return (
    <div className={`navigation ${menuActive ? "active" : ""}`}>
      <ul>
        <li>
          <Link to="/websiteDoAn/">
            <span className="icon" style={{ lineHeight: "60px" }}>
              <BsNvidia size={"3rem"} />
            </span>
            <span className="title">NVIDIA </span>
          </Link>
        </li>

        {filteredSidebarItems.map((item, index) => (
          <li
            key={index}
            className={activeIndex === index ? "hovered" : ""}
            onMouseOver={() => handleMouseOver(index)}
          >
            <a
              href="#"
              onClick={() => setActiveComponent({ name: item.component })}
            >
              <span className="icon">
                <IonIcon icon={item.icon} style={{ fontSize: "2rem" }} />
              </span>
              <span className="title">{item.title}</span>
            </a>
          </li>
        ))}
        <li
          onMouseOver={() => handleMouseOver(10)}
          className={activeIndex === 10 ? "hovered" : ""}
          onClick={handleLoginLogout}
        >
          <a href="#">
            <span className="icon" style={{ lineHeight: "60px" }}>
              <IonIcon icon={logOutOutline} style={{ fontSize: "2rem" }} />
            </span>
            <span className="title">Sign Out</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
