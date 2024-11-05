import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addressThunk, orderThunk, userThunk } from "../../../services/redux/thunks/thunk";
import AccountAddress from "./AccountAddress";
import AccountDetail from "./AccountDetail";
import AccountHeader from "./AccountHeader";
import AccountOrder from "./AccountOrder";
import AccountProductHistory from "./AccountProductHistory";
import "./css/style.scss";
import SidebarAccountHistory from "./SideBar";

const AccountHistory = () => {
  const isLoggingOut = useSelector((state) => state.user.isLoggingOut);
  const userCurrentLogged = useSelector((state) => state.user.userCurrentLogged);
  const [activeIndex, setActiveIndex] = useState(null);
  const [menuActive, setMenuActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  useEffect(() => {
    if (!userCurrentLogged && !isLoggingOut) {
      toast.error("PLEASE LOGIN BEFORE CONTINUING");
      navigate("/websiteDoAn/Login");
    }
  }, [userCurrentLogged, isLoggingOut, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(addressThunk.getAllAddresses()).unwrap(),
          dispatch(userThunk.getAllUsers()).unwrap(),
          dispatch(orderThunk.getAllOrders()).unwrap(),
        ]);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const getActiveComponent = () => {
    switch (activeComponent.name) {
      case "AccountDetail":
        return <AccountDetail setActiveComponent={setActiveComponent} />;
      case "AccountProductHistory":
        return <AccountProductHistory setActiveComponent={setActiveComponent} />;
      case "AccountAddress":
        return <AccountAddress setActiveComponent={setActiveComponent} />;
      case "AccountOrder":
        return <AccountOrder setActiveComponent={setActiveComponent} />;
      default:
        return <div>Component not found</div>;
    }
  };

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
