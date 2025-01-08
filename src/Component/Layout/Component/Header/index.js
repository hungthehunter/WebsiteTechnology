// Imports remain the same
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineEventNote } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearUserCart } from "../../../../services/redux/slices/cartSlice.js";
import { clearUserLoggedIn } from "../../../../services/redux/slices/userSlice.js";
import icon from "../../../Assests/ICON";
import Sidebar from "../DefaultLayout/Sidebar/index.js";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function Header({ toggleSidebar }) {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userCurrentLogged = useSelector((state) => state.user.userCurrentLogged);
  const isLoggingOut = useSelector((state) => state.user.isLoggingOut);

  const [title, setTitle] = useState("NVIDIA STORE");
  const [showNav, setShowNav] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.selectedCartItem || []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
    }
    if (location.pathname === "/") {
      setTitle("NVIDIA STORE");
    } else if (location.pathname === "/Service") {
      setTitle("Service");
    } else if (location.pathname === "/Login") {
      setTitle("Login / Sign Up");
    }
  }, [location]);

 

  const handleLogout = () => {
    dispatch(clearUserLoggedIn());
    dispatch(clearUserCart());
    localStorage.removeItem("authToken");
    setEmail("");
    navigate("/WebsiteTechnology/Login");
  };

  const handleLoginLogout = () => {
    if (isLoggingOut) {
      handleLogout();
    } else {
      navigate("/WebsiteTechnology/Login");
    }
  };

  return (
    <header className={cx("wrapper")}>
      <div className={cx("inner")}>
        <nav className={cx("global-nav")}>
          <div className={cx("nav-header-container")}>
            <div className={cx("logo-container")}>
              <div className={cx("logo")}>
                <img src={icon.nvidia} alt="nvidia-icon" style={{ width: 110, height: 44 }} />
              </div>
            </div>
              <div className={cx("nav-tool-container")}>
                <div className={cx("header-action_text")}>
                  <span className={cx("box-icon")}>
                    <MdOutlineEventNote size={24} style={{ paddingRight: 5, marginLeft: 3 }} />
                  </span>
                  <span className={cx("box-text")}>
                    <Link to="/WebsiteTechnology/AccountHistory">Tra cứu</Link>
                  </span>
                </div>
                <div className={cx("header-action_text")}>
                  <span className={cx("box-icon")}>
                    <span className={cx("cart-counter")}>{cartItems.length}</span>
                    <FiShoppingCart size={23} style={{ paddingRight: 5, marginLeft: 3 }} onClick={() => setShowCart(!showCart)} />
                  </span>
                  <span className={cx("box-text")}>
                    <Link to="/WebsiteTechnology/CartPage">Giỏ hàng</Link>
                  </span>
                </div>
                {!isLoggingOut ? (
                  <div className={cx("header-action_text")} onClick={handleLogout}>
                    <span className={cx("box-icon")}>
                      <FaUserAlt size={23} style={{ paddingRight: 5, marginLeft: 3 }} />
                    </span>
                    <span className={cx("box-text")}>
                      <span>{userCurrentLogged?.email}</span>
                      <span>Đăng xuất</span>
                    </span>
                  </div>
                ) : (
                  <div className={cx("header-action_text")} onClick={handleLoginLogout}>
                    <span className={cx("box-icon")}>
                      <FaUserAlt size={23} style={{ paddingRight: 5, marginLeft: 3 }} />
                    </span>
                    <span className={cx("box-text")}>Đăng nhập</span>
                  </div>
                )}
                <GiHamburgerMenu size={28} className={cx("nav-header-item")} onClick={toggleSidebar} style={{ marginLeft: 10 }} />
                <Sidebar show={showNav} />
              </div>
  
          </div>
          <nav className={cx("navbar-fixed-top")}>
            <div className={cx("container")}>
              <div className={cx("row")}>
                <div className={cx("navbar-header")}>
                  <h1 className={cx("navbar-brand")}>{title}</h1>
                </div>
              </div>
            </div>
          </nav>
        </nav>
      </div>
    </header>
  );
}
export default Header;
