import { IonIcon } from "@ionic/react";
import {
  arrowDownCircleOutline,
  arrowUpCircleOutline,
  cashOutline,
  desktopOutline,
  gridOutline,
  homeOutline,
  idCardOutline,
  logOutOutline,
  manOutline,
  peopleOutline,
  pricetagOutline,
  shieldOutline,
  statsChartOutline
} from "ionicons/icons";

import React, { useEffect, useState } from "react";
import { BsNvidia } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearUserCart } from "../../../../services/redux/slices/cartSlice";
import { clearUserLoggedIn } from "../../../../services/redux/slices/userSlice";

const SidebarAdmin = ({
  activeIndex,
  menuActive,
  handleMouseOver,
  setActiveComponent,
}) => {
  /*------- Page function -------*/

  const [userFunctions, setUserFunctions] = useState([]);
  const dispatch = useDispatch();

  const userCurrentLogged = useSelector((state) => state.user.userCurrentLogged);
  const navigate = useNavigate();

  const functionMap = {
    "View Customer List": "AdminCustomer",
    "Create Customer": "AdminAddCustomer",
    "Edit Customer": "AdminEditCustomer",
    "Delete Customer": "AdminDeleteCustomer",
    "View Product List": "AdminProduct",
    "Create Product": "AdminAddProduct",
    "Edit Product": "AdminEditProduct",
    "Delete Product": "AdminDeleteProduct",
    "View Access List": "AdminAccess",
    "Create Access": "AdminAddAccess",
    "Edit Access": "AdminEditAccess",
    "Delete Access": "AdminDeleteAccess",
    "View Staff List": "AdminStaff",
    "Create Staff": "AdminAddStaff",
    "Edit Staff": "AdminEditStaff",
    "Delete Staff": "AdminDeleteStaff",
    "View Order List": "AdminOrder",
    "Create Order": "AdminAddOrder",
    "Edit Order": "AdminEditOrder",
    "Delete Order": "AdminDeleteOrder", 
    "View Manufacturer List": "AdminManufacturer",
    "Create Manufacturer": "AdminAddManufacturer",
    "Edit Manufacturer": "AdminEditManufacturer",
    "Delete Manufacturer": "AdminDeleteManufacturer",
    "View Category List": "AdminCategory",
    "Create Category": "AdminAddCategory",
    "Edit Category": "AdminEditCategory",
    "Delete Category": "AdminDeleteCategory",  
    "View Dashboard": "AdminDashboard",
    "View Chart": "AdminChart",
    "View Import List": "AdminImport",
    "Create Import": "AdminAddImport",
    "Edit Import": "AdminEditImport",
    "View Export List": "AdminExport",
    "Create Export": "AdminAddExport",
    "Edit Export": "AdminEditExport",
    "View Promotion List": "AdminPromotion",
    "Create Promotion": "AdminPromotion",
    "Edit Promotion": "AdminPromotion",
    "Delete Promotion": "AdminDeletePromotion",
  };

  // Sidebar items with links and components
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
    {
      icon: arrowDownCircleOutline,
      title: "Import",
      link: "/websiteDoAn/AdminImport",
      component: "AdminImport",
    },
    {
      icon: arrowUpCircleOutline,
      title: "Export",
      link: "/websiteDoAn/AdminExport",
      component: "AdminExport"
    },
    {
      icon: pricetagOutline,
      title: "Promotion",
      link: "/websiteDoAn/AdminPromotion",
      component: "AdminPromotion"
    }
  ];

  // Populate user functions based on decentralization data
  useEffect(() => {
    if (userCurrentLogged && userCurrentLogged.decentralization) {
      const functions = userCurrentLogged.decentralization.functionIds.map(
        (func) => func.functionName
      );
      setUserFunctions(functions);
    }
  }, [userCurrentLogged]);

  const handleLoginLogout  = () => {
    dispatch(clearUserLoggedIn());
    dispatch(clearUserCart());
    localStorage.removeItem("authToken");
    navigate("/websiteDoAn/Login");
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
              to={item.link}
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
          onMouseOver={() => handleMouseOver(12)}
          className={activeIndex === 12 ? "hovered" : ""}
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
